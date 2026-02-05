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
import { Button, Card, CardHeader, CardTitle, CardContent, Toggle, BoxBadge } from '@/components/ui';
import { useLanguage, Language } from '@/lib/i18n';
import toast from 'react-hot-toast';

const DEFAULT_SETTINGS: Settings = {
  user_id: 'default',
  intervals: { 1: 1, 2: 2, 3: 4, 4: 8, 5: 16 },
  daily_limit: 10,
  hide_future_cards: true,
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
  const [saving, setSaving] = useState(false);
  const supabase = createClient();
  const { language, setLanguage, t } = useLanguage();

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

    setSettings(data || DEFAULT_SETTINGS);
    setLoading(false);
  };

  const loadStats = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { count: cardsCount } = await supabase
      .from('cards')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    const { count: reviewsCount } = await supabase
      .from('reviews')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    const streak = await calculateStreak(supabase, user.id);
    const accuracy = await calculateAccuracy(supabase, user.id);
    const boxDistribution = await getBoxDistribution(supabase, user.id);
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

  const saveSettings = async (newSettings: Partial<Settings>) => {
    setSaving(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error(t.settings.pleaseLogin);
      setSaving(false);
      return;
    }

    const updatedSettings = {
      ...settings,
      ...newSettings,
      user_id: user.id,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('settings')
      .upsert(updatedSettings, { onConflict: 'user_id' });

    if (error) {
      toast.error(t.settings.settingsError);
      console.error('Error saving settings:', error);
    } else {
      setSettings(updatedSettings as Settings);
      toast.success(t.settings.settingsSaved);
    }
    setSaving(false);
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    toast.success(t.settings.settingsSaved);
  };

  if (loading || !settings) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <div className="max-w-4xl mx-auto p-4">{t.common.loading}</div>
      </div>
    );
  }

  const intervals = settings.intervals as Record<string, number>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">{t.settings.title}</h1>

        {/* Language Settings Card */}
        <Card padding="lg">
          <CardHeader>
            <CardTitle>{t.settings.language}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-500">
              {t.settings.languageDesc}
            </p>
            <div className="flex gap-2">
              <Button
                variant={language === 'en' ? 'primary' : 'secondary'}
                size="md"
                onClick={() => handleLanguageChange('en')}
              >
                🇬🇧 {t.settings.english}
              </Button>
              <Button
                variant={language === 'de' ? 'primary' : 'secondary'}
                size="md"
                onClick={() => handleLanguageChange('de')}
              >
                🇩🇪 {t.settings.german}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Card */}
        <Card padding="lg">
          <CardHeader>
            <CardTitle>{t.settings.statsReport}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Main stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <div className="text-3xl font-bold text-blue-600">{stats.totalCards}</div>
                <div className="text-sm text-gray-600">{t.settings.totalWords}</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl">
                <div className="text-3xl font-bold text-emerald-600">{stats.totalReviews}</div>
                <div className="text-sm text-gray-600">{t.settings.totalReviews}</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl">
                <div className="text-3xl font-bold text-amber-600">{stats.streak}</div>
                <div className="text-sm text-gray-600">{t.settings.streak}</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <div className="text-3xl font-bold text-purple-600">{stats.accuracy}%</div>
                <div className="text-sm text-gray-600">{t.settings.accuracy}</div>
              </div>
            </div>

            {/* Next review timer */}
            {stats.nextDue && (
              <div className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-700">{t.settings.nextReview}</div>
                    <div className="text-2xl font-bold text-indigo-600">
                      {stats.nextDue.hoursUntil < 24
                        ? `${stats.nextDue.hoursUntil} ${t.settings.hoursLater}`
                        : stats.nextDue.dueDate}
                    </div>
                  </div>
                  <div className="text-4xl">⏰</div>
                </div>
              </div>
            )}

            {/* Box distribution */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">{t.settings.boxDistribution}</h3>
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((box) => {
                  const count = stats.boxDistribution[box] || 0;
                  const percentage = stats.totalCards > 0 ? (count / stats.totalCards) * 100 : 0;
                  return (
                    <div key={box} className="flex items-center gap-3">
                      <div className="w-16 text-sm font-medium text-gray-600">{t.common.box} {box}</div>
                      <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-end px-2 text-white text-sm font-medium transition-all"
                          style={{ width: `${Math.max(percentage, count > 0 ? 10 : 0)}%` }}
                        >
                          {count > 0 && count}
                        </div>
                      </div>
                      <div className="w-8 text-sm text-gray-600 text-left">{count}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Settings Card */}
        <Card padding="lg">
          <CardHeader>
            <CardTitle>{t.settings.learningSettings}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Daily Limit */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                {t.settings.dailyLimit}
              </label>
              <p className="text-sm text-gray-500">
                {t.settings.dailyLimitDesc}
              </p>
              <div className="flex gap-2 flex-wrap">
                {[5, 10, 15, 20].map((limit) => (
                  <Button
                    key={limit}
                    variant={settings.daily_limit === limit ? 'primary' : 'secondary'}
                    size="md"
                    disabled={saving}
                    onClick={() => saveSettings({ daily_limit: limit })}
                  >
                    {limit} {t.common.cards}
                  </Button>
                ))}
              </div>
            </div>

            {/* Hide Future Cards */}
            <div className="pt-4 border-t border-gray-100">
              <Toggle
                checked={settings.hide_future_cards}
                onChange={(checked) => saveSettings({ hide_future_cards: checked })}
                disabled={saving}
                label={t.settings.hideFutureCards}
                description={t.settings.hideFutureCardsDesc}
              />
            </div>
          </CardContent>
        </Card>

        {/* Review Intervals Card */}
        <Card padding="lg">
          <CardHeader>
            <CardTitle>{t.settings.reviewIntervals}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">
              {t.settings.reviewIntervalsDesc}
            </p>
            <div className="grid grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5].map((box) => (
                <div key={box} className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-xs font-medium text-gray-500 mb-2">{t.common.box} {box}</div>
                  <div className="text-2xl font-bold text-gray-900">{intervals[box]}</div>
                  <div className="text-xs text-gray-500">{t.settings.day}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* How it Works Card */}
        <Card padding="lg">
          <CardHeader>
            <CardTitle>{t.settings.howItWorks}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-700">
              {t.settings.howItWorksItems.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
