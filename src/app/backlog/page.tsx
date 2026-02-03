'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Nav } from '@/components/nav';
import { BacklogItem } from '@/types';
import { normalizeTerm } from '@/lib/utils';
import { generateCardBack } from '@/lib/gemini';
import { getOrDevUser } from '@/lib/dev-auth';

export default function BacklogPage() {
  const [backlog, setBacklog] = useState<BacklogItem[]>([]);
  const [newTerm, setNewTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [converting, setConverting] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    loadBacklog();
  }, []);

  const loadBacklog = async () => {
    const user = await getOrDevUser(supabase);
    if (!user) return;

    const { data } = await supabase
      .from('backlog')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    setBacklog(data || []);
    setLoading(false);
  };

  const handleAddToBacklog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTerm.trim()) return;

    const user = await getOrDevUser(supabase);
    if (!user) return;

    const normalized = normalizeTerm(newTerm);

    // Check if already exists in cards or backlog
    const { data: existingCard } = await supabase
      .from('cards')
      .select('id')
      .eq('user_id', user.id)
      .eq('term_normalized', normalized)
      .single();

    if (existingCard) {
      alert('This term already exists in your cards!');
      return;
    }

    const { error } = await supabase.from('backlog').insert({
      user_id: user.id,
      term: newTerm.trim(),
      term_normalized: normalized,
    });

    if (error) {
      if (error.code === '23505') {
        alert('This term already exists in your backlog!');
      } else {
        console.error('Error adding to backlog:', error);
      }
    } else {
      setNewTerm('');
      loadBacklog();
    }
  };

  const handleConvertToCard = async (item: BacklogItem, useAI: boolean) => {
    setConverting(item.id);

    try {
      const user = await getOrDevUser(supabase);
      if (!user) return;

      let cardBack;

      if (useAI) {
        // Generate with AI
        cardBack = await generateCardBack({
          term: item.term,
          level: item.level || undefined,
          pos: item.pos || undefined,
        });
      } else {
        // Manual: create minimal back
        cardBack = {
          term: item.term,
          language: 'de' as const,
          level: item.level || 'B1',
          pos: (item.pos || 'other') as any,
          ipa: null,
          meaning_fa: ['معنی را اضافه کنید'],
          meaning_en: ['Add meaning'],
          examples: [],
          synonyms: [],
          antonyms: [],
          collocations: [],
          register_note: null,
          grammar: {},
          learning_tips: [],
        };
      }

      // Insert card
      const { error } = await supabase.from('cards').insert({
        user_id: user.id,
        term: item.term,
        term_normalized: item.term_normalized,
        level: item.level,
        pos: item.pos,
        box: 1,
        due_date: new Date().toISOString().split('T')[0], // Due today
        back_json: cardBack,
      });

      if (error) {
        console.error('Error creating card:', error);
        alert('Error creating card');
      } else {
        // Remove from backlog
        await supabase.from('backlog').delete().eq('id', item.id);
        loadBacklog();
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error converting to card');
    } finally {
      setConverting(null);
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from('backlog').delete().eq('id', id);
    loadBacklog();
  };

  if (loading) {
    return (
      <div>
        <Nav />
        <div className="max-w-4xl mx-auto p-4">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <Nav />
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-bold">Backlog</h1>

        {/* Add form */}
        <form onSubmit={handleAddToBacklog} className="flex gap-2">
          <input
            type="text"
            value={newTerm}
            onChange={(e) => setNewTerm(e.target.value)}
            placeholder="Add a German term (e.g., der Bahnhof)"
            className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add
          </button>
        </form>

        {/* Backlog list */}
        {backlog.length === 0 ? (
          <div className="text-center py-12 text-gray-600">
            No items in backlog. Add some terms above!
          </div>
        ) : (
          <div className="space-y-3">
            {backlog.map((item) => (
              <div
                key={item.id}
                className="bg-white border rounded-lg p-4 flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold">{item.term}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(item.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleConvertToCard(item, true)}
                    disabled={converting === item.id}
                    className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                  >
                    {converting === item.id ? 'Converting...' : 'AI Complete'}
                  </button>
                  <button
                    onClick={() => handleConvertToCard(item, false)}
                    disabled={converting === item.id}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    Manual
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
