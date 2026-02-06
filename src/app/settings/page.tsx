'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Nav } from '@/components/nav';
import { Settings } from '@/types';
import { DEV_MODE } from '@/lib/dev-auth';
import {
  calculateStreak,
  calculateAccuracy,
  getNextDueTime,
  getBoxDistribution,
} from '@/lib/streak';
import { Button, Card, CardHeader, CardTitle, CardContent, Toggle } from '@/components/ui';
import { useLanguage, Language } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
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
  const router = useRouter();
  const supabase = createClient();
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  const handleSignOut = async () => {
    if (!confirm(t.settings.logoutConfirm)) return;

    if (DEV_MODE) {
      router.push('/login');
      return;
    }
    await supabase.auth.signOut();
    router.push('/login');
  };

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

    // Build update payload - don't include created_at to avoid overwriting
    const updatePayload = {
      user_id: user.id,
      intervals: settings?.intervals || DEFAULT_SETTINGS.intervals,
      daily_limit: newSettings.daily_limit ?? settings?.daily_limit ?? DEFAULT_SETTINGS.daily_limit,
      hide_future_cards: newSettings.hide_future_cards ?? settings?.hide_future_cards ?? DEFAULT_SETTINGS.hide_future_cards,
      updated_at: new Date().toISOString(),
    };

    // First check if settings exist for this user
    const { data: existingSettings } = await supabase
      .from('settings')
      .select('user_id')
      .eq('user_id', user.id)
      .single();

    if (existingSettings) {
      // Settings exist, do update
      const { error: updateError } = await supabase
        .from('settings')
        .update({
          intervals: updatePayload.intervals,
          daily_limit: updatePayload.daily_limit,
          hide_future_cards: updatePayload.hide_future_cards,
          updated_at: updatePayload.updated_at,
        })
        .eq('user_id', user.id);

      if (updateError) {
        toast.error(t.settings.settingsError);
        console.error('Update error:', updateError);
        setSaving(false);
        return;
      }
    } else {
      // Settings don't exist, do insert
      const { error: insertError } = await supabase
        .from('settings')
        .insert(updatePayload);

      if (insertError) {
        toast.error(t.settings.settingsError);
        console.error('Insert error:', insertError);
        setSaving(false);
        return;
      }
    }

    // Update local state with new values
    setSettings({
      ...settings,
      ...updatePayload,
      created_at: settings?.created_at || new Date().toISOString(),
    } as Settings);
    toast.success(t.settings.settingsSaved);
    setSaving(false);
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    toast.success(t.settings.settingsSaved);
  };

  if (loading || !settings) {
    return (
      <div className="min-h-screen bg-bg">
        <Nav />
        <div className="max-w-5xl mx-auto p-4 text-text-muted">{t.common.loading}</div>
      </div>
    );
  }

  const intervals = settings.intervals as Record<string, number>;

  return (
    <div className="min-h-screen bg-bg">
      <Nav />
      <div className="max-w-5xl mx-auto p-4 py-6 space-y-6">
        <h1 className="text-2xl font-semibold text-text tracking-tight">{t.settings.title}</h1>

        {/* Language Settings Card */}
        <Card padding="lg">
          <CardHeader>
            <CardTitle>{t.settings.language}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-text-muted">
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

        {/* Appearance Card */}
        <Card padding="lg">
          <CardHeader>
            <CardTitle>{t.settings.appearance}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-text-muted">
              {t.settings.appearanceDesc}
            </p>
            <div className="flex gap-2">
              <Button
                variant={theme === 'light' ? 'primary' : 'secondary'}
                size="md"
                onClick={() => setTheme('light')}
              >
                ☀️ {t.settings.lightMode}
              </Button>
              <Button
                variant={theme === 'dark' ? 'primary' : 'secondary'}
                size="md"
                onClick={() => setTheme('dark')}
              >
                🌙 {t.settings.darkMode}
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
              <div className="text-center p-4 bg-info/10 rounded-xl">
                <div className="text-3xl font-bold text-info">{stats.totalCards}</div>
                <div className="text-sm text-text-muted">{t.settings.totalWords}</div>
              </div>
              <div className="text-center p-4 bg-success/10 rounded-xl">
                <div className="text-3xl font-bold text-success">{stats.totalReviews}</div>
                <div className="text-sm text-text-muted">{t.settings.totalReviews}</div>
              </div>
              <div className="text-center p-4 bg-warning/10 rounded-xl">
                <div className="text-3xl font-bold text-warning">{stats.streak}</div>
                <div className="text-sm text-text-muted">{t.settings.streak}</div>
              </div>
              <div className="text-center p-4 bg-accent/10 rounded-xl">
                <div className="text-3xl font-bold text-accent">{stats.accuracy}%</div>
                <div className="text-sm text-text-muted">{t.settings.accuracy}</div>
              </div>
            </div>

            {/* Next review timer */}
            {stats.nextDue && (
              <div className="p-4 bg-accent/10 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-text">{t.settings.nextReview}</div>
                    <div className="text-2xl font-bold text-accent">
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
              <h3 className="text-sm font-medium text-text mb-3">{t.settings.boxDistribution}</h3>
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((box) => {
                  const count = stats.boxDistribution[box] || 0;
                  const percentage = stats.totalCards > 0 ? (count / stats.totalCards) * 100 : 0;
                  return (
                    <div key={box} className="flex items-center gap-3">
                      <div className="w-16 text-sm font-medium text-text-muted">{t.common.box} {box}</div>
                      <div className="flex-1 h-8 bg-muted rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-accent flex items-center justify-end px-2 text-accent-fg text-sm font-medium transition-all"
                          style={{ width: `${Math.max(percentage, count > 0 ? 10 : 0)}%` }}
                        >
                          {count > 0 && count}
                        </div>
                      </div>
                      <div className="w-8 text-sm text-text-muted text-left">{count}</div>
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
              <label className="block text-sm font-medium text-text">
                {t.settings.dailyLimit}
              </label>
              <p className="text-sm text-text-muted">
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
            <div className="pt-4 border-t">
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
            <p className="text-sm text-text-muted mb-4">
              {t.settings.reviewIntervalsDesc}
            </p>
            <div className="grid grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5].map((box) => (
                <div key={box} className="text-center p-4 bg-surface-2 rounded-xl">
                  <div className="text-xs font-medium text-text-muted mb-2">{t.common.box} {box}</div>
                  <div className="text-2xl font-bold text-text">{intervals[box]}</div>
                  <div className="text-xs text-text-muted">{t.settings.day}</div>
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
            <ul className="space-y-2 text-sm text-text">
              {t.settings.howItWorksItems.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Account Card */}
        <Card padding="lg">
          <CardHeader>
            <CardTitle>{t.settings.account}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-text-muted">
              {t.settings.accountDesc}
            </p>
            <Button
              variant="danger"
              size="md"
              onClick={handleSignOut}
            >
              {t.nav.logout}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
