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
import { Button, Card, CardHeader, CardTitle, CardContent, Toggle, Input } from '@/components/ui';
import { useLanguage, Language } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import { saveGeminiApiKeyAction, removeGeminiApiKeyAction, getApiKeyStatusAction } from '@/app/actions/settings-actions';
import toast from 'react-hot-toast';

const DEFAULT_SETTINGS: Settings = {
  user_id: 'default',
  intervals: { 1: 1, 2: 2, 3: 4, 4: 8, 5: 16 },
  daily_limit: 10,
  hide_future_cards: true,
  gemini_api_key: null,
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
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [maskedApiKey, setMaskedApiKey] = useState('');
  const [savingApiKey, setSavingApiKey] = useState(false);
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
    loadApiKeyStatus();
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

  const loadApiKeyStatus = async () => {
    const result = await getApiKeyStatusAction();
    if (result.success) {
      setHasApiKey(result.hasKey);
      setMaskedApiKey(result.maskedKey || '');
    }
  };

  const handleSaveApiKey = async () => {
    if (!apiKeyInput.trim()) {
      toast.error('Please enter an API key');
      return;
    }

    setSavingApiKey(true);
    const result = await saveGeminiApiKeyAction(apiKeyInput.trim());
    
    if (result.success) {
      toast.success('API key saved successfully!');
      setApiKeyInput('');
      setShowApiKey(false);
      await loadApiKeyStatus();
    } else {
      toast.error(result.error);
    }
    
    setSavingApiKey(false);
  };

  const handleRemoveApiKey = async () => {
    if (!confirm('Remove your personal API key? The app will use the default shared key.')) {
      return;
    }

    setSavingApiKey(true);
    const result = await removeGeminiApiKeyAction();
    
    if (result.success) {
      toast.success('API key removed');
      setHasApiKey(false);
      setMaskedApiKey('');
    } else {
      toast.error(result.error);
    }
    
    setSavingApiKey(false);
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

        {/* 1. Statistics & Report Card */}
        <Card padding="lg">
          <CardHeader>
            <CardTitle>📊 {t.settings.statsReport}</CardTitle>
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

        {/* 2. Learning Settings Card */}
        <Card padding="lg">
          <CardHeader>
            <CardTitle>⚙️ {t.settings.learningSettings}</CardTitle>
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

        {/* 3. Review Intervals Card */}
        <Card padding="lg">
          <CardHeader>
            <CardTitle>🔄 {t.settings.reviewIntervals}</CardTitle>
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

        {/* 4. Appearance Card */}
        <Card padding="lg">
          <CardHeader>
            <CardTitle>🎨 {t.settings.appearance}</CardTitle>
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
              <Button
                variant={theme === 'system' ? 'primary' : 'secondary'}
                size="md"
                onClick={() => setTheme('system')}
              >
                💻 {t.settings.systemMode}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 5. Language Settings Card */}
        <Card padding="lg">
          <CardHeader>
            <CardTitle>🌍 {t.settings.language}</CardTitle>
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

        {/* 6. Personal AI API Key Card */}
        <Card padding="lg" className="border-accent/30">
          <CardHeader>
            <CardTitle>🤖 Personal AI API Key</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-text-muted">
                Use your own free Gemini API key to avoid quota limits. Each user gets:
              </p>
              <ul className="text-sm text-text-muted list-disc list-inside space-y-1 ml-2">
                <li><strong>15 requests/minute</strong> - Perfect for personal use</li>
                <li><strong>1,500 requests/day</strong> - More than enough</li>
                <li><strong>100% Free</strong> - No credit card required</li>
              </ul>
            </div>

            {hasApiKey ? (
              /* Has API Key - Show Status */
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-success/10 rounded-xl border border-success/30">
                  <span className="text-2xl">✅</span>
                  <div className="flex-1">
                    <div className="font-medium text-success">API Key Active</div>
                    <div className="text-xs text-text-muted font-mono mt-0.5">
                      {maskedApiKey}
                    </div>
                  </div>
                  <Button
                    variant="danger-soft"
                    size="sm"
                    onClick={handleRemoveApiKey}
                    disabled={savingApiKey}
                  >
                    Remove
                  </Button>
                </div>
                <p className="text-xs text-success">
                  ✓ All AI generations now use your personal API key
                </p>
              </div>
            ) : (
              /* No API Key - Show Setup */
              <div className="space-y-3">
                <div className="p-3 bg-info/10 rounded-xl border border-info/30">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">ℹ️</span>
                    <div className="font-medium text-info">Using Shared API Key</div>
                  </div>
                  <p className="text-xs text-text-muted">
                    Currently using the default shared key. Add your personal key for unlimited usage.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text">
                    Enter Your Gemini API Key
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Input
                        type={showApiKey ? 'text' : 'password'}
                        value={apiKeyInput}
                        onChange={(e) => setApiKeyInput(e.target.value)}
                        placeholder="AIza..."
                        inputSize="md"
                        className="font-mono text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
                      >
                        {showApiKey ? '🙈' : '👁️'}
                      </button>
                    </div>
                    <Button
                      variant="success"
                      size="md"
                      onClick={handleSaveApiKey}
                      disabled={savingApiKey || !apiKeyInput.trim()}
                      loading={savingApiKey}
                    >
                      Save
                    </Button>
                  </div>
                </div>

                <div className="p-3 bg-muted/30 rounded-xl space-y-2">
                  <div className="text-sm font-medium text-text">How to get your free API key:</div>
                  <ol className="text-sm text-text-muted list-decimal list-inside space-y-1 ml-2">
                    <li>Visit <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">Google AI Studio</a></li>
                    <li>Sign in with your Google account</li>
                    <li>Click "Create API Key" (takes 30 seconds)</li>
                    <li>Copy the key and paste it above</li>
                  </ol>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 7. How Leitner System Works Card */}
        <Card padding="lg">
          <CardHeader>
            <CardTitle>📚 {t.settings.howItWorks}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-text">
              {t.settings.howItWorksItems.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* 8. Account & Logout Card */}
        <Card padding="lg">
          <CardHeader>
            <CardTitle>👤 {t.settings.account}</CardTitle>
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
