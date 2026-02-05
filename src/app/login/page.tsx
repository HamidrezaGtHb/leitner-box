'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Button, Card, CardContent, Input, CalendarIcon, SunIcon, MoonIcon } from '@/components/ui';
import { useLanguage } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const router = useRouter();
  const supabase = createClient();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert(t.login.confirmEmail);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push('/today');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'de' : 'en');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 transition-colors">
      <div className="max-w-md w-full space-y-8">
        {/* Top Controls */}
        <div className="flex justify-between items-center">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <MoonIcon size={20} /> : <SunIcon size={20} />}
          </button>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
          >
            {language === 'en' ? '🇩🇪 Deutsch' : '🇬🇧 English'}
          </Button>
        </div>

        <div className="text-center">
          <div className="flex justify-center mb-4">
            <CalendarIcon size={64} className="text-gray-900 dark:text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">40Tagen</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">{t.login.subtitle}</p>
        </div>

        <Card padding="lg" className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="space-y-6">
            <div className="flex gap-2">
              <Button
                variant={mode === 'login' ? 'primary' : 'secondary'}
                size="md"
                className="flex-1"
                onClick={() => setMode('login')}
              >
                {t.login.loginTab}
              </Button>
              <Button
                variant={mode === 'signup' ? 'primary' : 'secondary'}
                size="md"
                className="flex-1"
                onClick={() => setMode('signup')}
              >
                {t.login.signupTab}
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                label={t.login.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={t.login.emailPlaceholder}
                inputSize="md"
              />

              <Input
                type="password"
                label={t.login.password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder={t.login.passwordPlaceholder}
                inputSize="md"
              />

              {error && (
                <div className="text-sm text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
              >
                {mode === 'login' ? t.login.loginButton : t.login.signupButton}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          {t.login.footer}
        </p>
      </div>
    </div>
  );
}
