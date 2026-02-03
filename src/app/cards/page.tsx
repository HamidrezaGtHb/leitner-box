'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Nav } from '@/components/nav';
import { Card } from '@/types';
import { getOrDevUser } from '@/lib/dev-auth';

export default function CardsPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [filterBox, setFilterBox] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    const user = await getOrDevUser(supabase);
    if (!user) return;

    const { data } = await supabase
      .from('cards')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    setCards(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this card?')) return;

    await supabase.from('cards').delete().eq('id', id);
    loadCards();
  };

  const filteredCards = cards.filter((card) => {
    if (filterBox !== 'all' && card.box !== filterBox) return false;
    if (searchQuery && !card.term.toLowerCase().includes(searchQuery.toLowerCase()))
      return false;
    return true;
  });

  if (loading) {
    return (
      <div>
        <Nav />
        <div className="max-w-6xl mx-auto p-4">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <Nav />
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-bold">All Cards ({cards.length})</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search terms..."
            className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setFilterBox('all')}
              className={`px-3 py-2 rounded text-sm ${
                filterBox === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              All
            </button>
            {[1, 2, 3, 4, 5].map((box) => (
              <button
                key={box}
                onClick={() => setFilterBox(box)}
                className={`px-3 py-2 rounded text-sm ${
                  filterBox === box
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                Box {box}
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        {filteredCards.length === 0 ? (
          <div className="text-center py-12 text-gray-600">
            {searchQuery
              ? 'No cards match your search'
              : filterBox !== 'all'
              ? `No cards in Box ${filterBox}`
              : 'No cards yet. Add some from the Backlog!'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCards.map((card) => (
              <div
                key={card.id}
                className="bg-white border rounded-lg p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="font-semibold text-lg">{card.term}</div>
                  <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    Box {card.box}
                  </div>
                </div>

                <div className="text-sm text-gray-600 space-y-1" dir="rtl">
                  {card.back_json.meaning_fa.slice(0, 2).map((m, i) => (
                    <div key={i}>• {m}</div>
                  ))}
                </div>

                {card.back_json.grammar.noun && (
                  <div className="text-xs text-gray-500">
                    {card.back_json.grammar.noun.article}
                    {card.back_json.grammar.noun.plural &&
                      `, Pl: ${card.back_json.grammar.noun.plural}`}
                  </div>
                )}

                <div className="text-xs text-gray-500">
                  Due: {card.due_date}
                </div>

                <button
                  onClick={() => handleDelete(card.id)}
                  className="w-full py-1 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
