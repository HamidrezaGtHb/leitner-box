'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Nav } from '@/components/nav';
import { Settings } from '@/types';
import {
  calculateStreak,
  calculateAccuracy,
  getNextDueTime,
  getBoxDistribution,
} from '@/lib/streak';

// Default settings when none exist in database
const DEFAULT_SETTINGS: Settings = {
  user_id: 'default',
  intervals: { 1: 1, 2: 2, 3: 4, 4: 8, 5: 16 },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [stats, setStats] = useState({
    totalCards: 0,
    totalReviews: 0,
    streak: 0,
    accuracy: 0,
    boxDistribution: {} as Record<number, number>,
    nextDue: null as { dueDate: string; hoursUntil: number } | null,
  });
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadSettings();
    loadStats();
  }, []);

  const loadSettings = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
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
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    // Total cards
    const { count: cardsCount } = await supabase
      .from('cards')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    // Total reviews
    const { count: reviewsCount } = await supabase
      .from('reviews')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    // Streak
    const streak = await calculateStreak(supabase, user.id);

    // Accuracy
    const accuracy = await calculateAccuracy(supabase, user.id);

    // Box distribution
    const boxDistribution = await getBoxDistribution(supabase, user.id);

    // Next due
    const nextDue = await getNextDueTime(supabase, user.id);

    setStats({
      totalCards: cardsCount || 0,
      totalReviews: reviewsCount || 0,
      streak,
      accuracy,
      boxDistribution,
      nextDue,
    });
  };

  if (loading || !settings) {
    return (
      <div>
        <Nav />
        <div className="max-w-4xl mx-auto p-4">در حال بارگذاری...</div>
      </div>
    );
  }

  const intervals = settings.intervals as Record<string, number>;

  return (
    <div>
      <Nav />
      <div className="max-w-4xl mx-auto p-4 space-y-8">
        <h1 className="text-2xl font-bold">Settings</h1>

        {/* Statistics */}
        <div className="bg-white border rounded-lg p-6 space-y-6">
          <h2 className="text-lg font-semibold">Statistics</h2>

          {/* Main stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">
                {stats.totalCards}
              </div>
              <div className="text-sm text-gray-600">Total Cards</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">
                {stats.totalReviews}
              </div>
              <div className="text-sm text-gray-600">Total Reviews</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-3xl font-bold text-orange-600">
                {stats.streak}
              </div>
              <div className="text-sm text-gray-600">Day Streak 🔥</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">
                {stats.accuracy}%
              </div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>
          </div>

          {/* Next review timer */}
          {stats.nextDue && (
            <div className="p-4 bg-indigo-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-700">
                    Next Review
                  </div>
                  <div className="text-2xl font-bold text-indigo-600">
                    {stats.nextDue.hoursUntil < 24
                      ? `in ${stats.nextDue.hoursUntil}h`
                      : `on ${stats.nextDue.dueDate}`}
                  </div>
                </div>
                <div className="text-4xl">⏰</div>
              </div>
            </div>
          )}

          {/* Box distribution chart */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Cards per Box
            </h3>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((box) => {
                const count = stats.boxDistribution[box] || 0;
                const percentage =
                  stats.totalCards > 0
                    ? (count / stats.totalCards) * 100
                    : 0;
                return (
                  <div key={box} className="flex items-center gap-3">
                    <div className="w-16 text-sm font-medium text-gray-700">
                      Box {box}
                    </div>
                    <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-end px-2 text-white text-sm font-medium transition-all"
                        style={{ width: `${Math.max(percentage, count > 0 ? 10 : 0)}%` }}
                      >
                        {count > 0 && count}
                      </div>
                    </div>
                    <div className="w-12 text-sm text-gray-600">
                      {count}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

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
