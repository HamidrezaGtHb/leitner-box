'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Nav } from '@/components/nav';
import { Settings } from '@/types';
import { getOrDevUser } from '@/lib/dev-auth';

// Default settings when none exist in database
const DEFAULT_SETTINGS: Settings = {
  user_id: 'default',
  intervals: { 1: 1, 2: 2, 3: 4, 4: 8, 5: 16 },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [stats, setStats] = useState({ totalCards: 0, totalReviews: 0 });
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadSettings();
    loadStats();
  }, []);

  const loadSettings = async () => {
    const user = await getOrDevUser(supabase);
    if (!user) {
      setSettings(DEFAULT_SETTINGS);
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from('settings')
      .select('*')
      .eq('user_id', user.id)
      .single();

    // Use default settings if none found
    setSettings(data || DEFAULT_SETTINGS);
    setLoading(false);
  };

  const loadStats = async () => {
    const user = await getOrDevUser(supabase);
    if (!user) return;

    const { count: cardsCount } = await supabase
      .from('cards')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    const { count: reviewsCount } = await supabase
      .from('reviews')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    setStats({
      totalCards: cardsCount || 0,
      totalReviews: reviewsCount || 0,
    });
  };

  if (loading || !settings) {
    return (
      <div>
        <Nav />
        <div className="max-w-4xl mx-auto p-4">Loading...</div>
      </div>
    );
  }

  const intervals = settings.intervals as Record<string, number>;

  return (
    <div>
      <Nav />
      <div className="max-w-4xl mx-auto p-4 space-y-8">
        <h1 className="text-2xl font-bold">Settings</h1>

        {/* Review Intervals */}
        <div className="bg-white border rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold">Review Intervals (Read-only)</h2>
          <p className="text-sm text-gray-600">
            Cards advance through boxes with these intervals:
          </p>
          <div className="grid grid-cols-5 gap-3">
            {[1, 2, 3, 4, 5].map((box) => (
              <div
                key={box}
                className="text-center p-3 bg-gray-50 rounded border"
              >
                <div className="text-xs text-gray-600 mb-1">Box {box}</div>
                <div className="text-2xl font-bold">{intervals[box]}</div>
                <div className="text-xs text-gray-600">
                  day{intervals[box] > 1 ? 's' : ''}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white border rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold">Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded">
              <div className="text-3xl font-bold text-blue-600">
                {stats.totalCards}
              </div>
              <div className="text-sm text-gray-600">Total Cards</div>
            </div>
            <div className="p-4 bg-green-50 rounded">
              <div className="text-3xl font-bold text-green-600">
                {stats.totalReviews}
              </div>
              <div className="text-sm text-gray-600">Total Reviews</div>
            </div>
          </div>
        </div>

        {/* Leitner System Info */}
        <div className="bg-white border rounded-lg p-6 space-y-3">
          <h2 className="text-lg font-semibold">How Leitner System Works</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• New cards start in Box 1 and are due immediately</li>
            <li>• Answer <strong>Correct</strong>: card moves to next box</li>
            <li>• Answer <strong>Wrong</strong>: card returns to Box 1</li>
            <li>• Cards only appear in "Today" when they are due</li>
            <li>• Box 5 is the final box (16-day intervals)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
