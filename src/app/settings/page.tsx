'use client';

import { useState, useEffect } from 'react';
import { useSettings } from '@/hooks/use-settings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, Target, Palette, CheckCircle2, Lock } from 'lucide-react';
import { useTheme } from 'next-themes';

const DAILY_LIMITS = [5, 10, 15] as const;

export default function SettingsPage() {
  const { settings, updateSettings, isLoaded } = useSettings();
  const { theme, setTheme } = useTheme();
  const [provider, setProvider] = useState<'openai' | 'gemini'>('gemini');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedProvider = (localStorage.getItem('ai_provider') || 'gemini') as 'openai' | 'gemini';
      setProvider(storedProvider);
    }
  }, []);

  const handleSaveProvider = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ai_provider', provider);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Customize your learning experience</p>
      </div>

      <Tabs defaultValue="learning" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="learning" className="gap-2">
            <Target className="h-4 w-4" />
            Learning
          </TabsTrigger>
          <TabsTrigger value="provider" className="gap-2">
            <Bot className="h-4 w-4" />
            AI Provider
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
        </TabsList>

        {/* Learning Settings */}
        <TabsContent value="learning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Goals</CardTitle>
              <CardDescription>
                Set your daily limit for new words
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">New Words Per Day</label>
                <div className="grid grid-cols-3 gap-2">
                  {DAILY_LIMITS.map((limit) => (
                    <Button
                      key={limit}
                      variant={
                        settings.dailyNewWords === limit ? 'default' : 'outline'
                      }
                      onClick={() => updateSettings({ dailyNewWords: limit })}
                    >
                      {limit} words
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Current: {settings.dailyNewWords} new words per day
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Locked Mode
              </CardTitle>
              <CardDescription>
                Enforce strict review discipline by blocking non-due cards
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="locked-mode" className="text-base">
                    Enable Locked Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Only review due cards, hide future boxes and library backs
                  </p>
                </div>
                <Switch
                  id="locked-mode"
                  checked={settings.isLockedMode}
                  onCheckedChange={(checked) => updateSettings({ isLockedMode: checked })}
                />
              </div>

              {settings.isLockedMode && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <Lock className="inline h-4 w-4 mr-1" />
                    <strong>Locked Mode is active:</strong> You can only review due cards. Library and future boxes are restricted.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Review Intervals</CardTitle>
              <CardDescription>
                Days to wait before reviewing cards in each box (Strict Leitner)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-5 gap-2">
                {settings.reviewIntervals.map((interval, idx) => (
                  <div key={idx} className="space-y-2">
                    <Label htmlFor={`interval-${idx}`} className="text-xs">
                      Box {idx + 1}
                    </Label>
                    <Input
                      id={`interval-${idx}`}
                      type="number"
                      min="1"
                      value={interval}
                      onChange={(e) => {
                        const newIntervals = [...settings.reviewIntervals];
                        newIntervals[idx] = parseInt(e.target.value) || 1;
                        updateSettings({ reviewIntervals: newIntervals });
                      }}
                      className="text-center"
                    />
                    <p className="text-xs text-center text-muted-foreground">
                      {interval}d
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Default: [1, 2, 4, 7, 14] days. Customize for your learning pace.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Provider Settings */}
        <TabsContent value="provider" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Provider</CardTitle>
              <CardDescription>
                Select your preferred AI provider for word enrichment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Button
                  variant={provider === 'gemini' ? 'default' : 'outline'}
                  onClick={() => setProvider('gemini')}
                  className="flex-1"
                >
                  Gemini
                  {provider === 'gemini' && (
                    <CheckCircle2 className="ml-2 h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant={provider === 'openai' ? 'default' : 'outline'}
                  onClick={() => setProvider('openai')}
                  className="flex-1"
                >
                  OpenAI
                  {provider === 'openai' && (
                    <CheckCircle2 className="ml-2 h-4 w-4" />
                  )}
                </Button>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium">
                  {provider === 'gemini' ? 'Google Gemini' : 'OpenAI GPT-4o-mini'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {provider === 'gemini'
                    ? 'Fast and efficient for language learning tasks. Good balance of speed and quality.'
                    : 'High-quality responses with excellent language understanding.'}
                </p>
              </div>

              <Button onClick={handleSaveProvider} className="w-full gap-2">
                {saved ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Saved!
                  </>
                ) : (
                  'Save Preference'
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>
                Choose your preferred color scheme
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={theme === 'light' ? 'default' : 'outline'}
                  onClick={() => setTheme('light')}
                >
                  Light
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  onClick={() => setTheme('dark')}
                >
                  Dark
                </Button>
                <Button
                  variant={theme === 'system' ? 'default' : 'outline'}
                  onClick={() => setTheme('system')}
                >
                  System
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gender Color Coding</CardTitle>
              <CardDescription>
                Visual indicators for German noun genders
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">der (masculine)</span>
                <div className="px-3 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-bold">
                  Blue
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">die (feminine)</span>
                <div className="px-3 py-1 rounded bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 font-bold">
                  Red
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">das (neuter)</span>
                <div className="px-3 py-1 rounded bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 font-bold">
                  Green
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
