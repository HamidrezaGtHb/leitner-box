'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Button, Card, CardContent, Input } from '@/components/ui';
import { useLanguage, Language } from '@/lib/i18n';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const router = useRouter();
  const supabase = createClient();
  const { language, setLanguage, t } = useLanguage();

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Language Toggle */}
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
          >
            {language === 'en' ? '🇩🇪 Deutsch' : '🇬🇧 English'}
          </Button>
        </div>

        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-3xl font-bold text-gray-900">{t.login.title}</h1>
          <p className="mt-2 text-gray-600">{t.login.subtitle}</p>
        </div>

        <Card padding="lg">
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
                <div className="text-sm text-rose-600 bg-rose-50 p-3 rounded-lg">
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

        <p className="text-center text-sm text-gray-500">
          {t.login.footer}
        </p>
      </div>
    </div>
  );
}
