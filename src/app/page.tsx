'use client';

import { useState, useEffect } from 'react';
import { useLeitner } from '@/hooks/use-leitner';
import { useSettings } from '@/hooks/use-settings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { WordCard } from '@/components/word-card';
import { enrichWord } from '@/lib/ai-agent';
import { PlusCircle, Loader2, BookOpen, Target, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const { cards, addWord, canAddNewWord, getProgress, dueCards, isLoaded } = useLeitner();
  const { settings } = useSettings();
  const [word, setWord] = useState('');
  const [isEnriching, setIsEnriching] = useState(false);
  const [error, setError] = useState('');
  const [provider, setProvider] = useState<'openai' | 'gemini'>('gemini');

  // Load provider preference from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedProvider = (localStorage.getItem('ai_provider') || 'gemini') as 'openai' | 'gemini';
      setProvider(storedProvider);
    }
  }, []);

  const progress = isLoaded ? getProgress() : null;
  const newWordsLeft = settings.dailyNewWords - (progress?.newWordsToday || 0);

  const handleAddWord = async () => {
    if (!word.trim()) {
      setError('Please enter a German word');
      return;
    }

    if (!canAddNewWord()) {
      setError(`Daily limit reached (${settings.dailyNewWords} words)`);
      return;
    }

    setIsEnriching(true);
    setError('');

    try {
      const wordData = await enrichWord(word.trim(), provider);
      addWord(wordData);
      setWord('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add word');
    } finally {
      setIsEnriching(false);
    }
  };

  const recentCards = cards.slice(-5).reverse();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Master German with Leitner
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          AI-powered spaced repetition system for learning German vocabulary
        </p>
      </div>


      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due Today</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dueCards.length}</div>
            <p className="text-xs text-muted-foreground">Cards ready to review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Words Today</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {progress?.newWordsToday} / {settings.dailyNewWords}
            </div>
            <Progress
              value={(progress?.newWordsToday || 0) / settings.dailyNewWords * 100}
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cards</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progress?.totalCards || 0}</div>
            <p className="text-xs text-muted-foreground">In your collection</p>
          </CardContent>
        </Card>
      </div>

      {/* Add Word Section */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Word</CardTitle>
          <CardDescription>
            Enter a German word or verb to get AI-powered translations and examples
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter German word (e.g., Haus, lernen, schön)"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddWord()}
              disabled={isEnriching || !canAddNewWord()}
              className="text-lg"
            />
            <Button
              onClick={handleAddWord}
              disabled={isEnriching || !canAddNewWord()}
              size="lg"
            >
              {isEnriching ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <PlusCircle className="h-5 w-5" />
              )}
            </Button>
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          {!canAddNewWord() && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                You've reached your daily limit of {settings.dailyNewWords} new words.
                Come back tomorrow or adjust your limit in{' '}
                <Link href="/settings" className="underline font-medium">
                  Settings
                </Link>
                .
              </p>
            </div>
          )}

          {newWordsLeft > 0 && (
            <p className="text-sm text-muted-foreground">
              {newWordsLeft} new {newWordsLeft === 1 ? 'word' : 'words'} remaining today
            </p>
          )}
        </CardContent>
      </Card>

      {/* Call to Action */}
      {dueCards.length > 0 && (
        <Card className="bg-primary/5 border-primary">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h3 className="text-lg font-semibold">Ready to Review?</h3>
              <p className="text-sm text-muted-foreground">
                You have {dueCards.length} cards waiting for review
              </p>
            </div>
            <Link href="/review">
              <Button size="lg">Start Review</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Recent Words */}
      {recentCards.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Recent Words</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentCards.map((card) => (
              <WordCard key={card.id} wordData={card.wordData} />
            ))}
          </div>
        </div>
      )}

      {cards.length === 0 && (
        <div className="text-center py-12 space-y-4">
          <BookOpen className="h-16 w-16 mx-auto text-muted-foreground" />
          <h2 className="text-2xl font-bold">No words yet</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Start building your German vocabulary by adding your first word above.
            Don't forget to set your API key in Settings first!
          </p>
        </div>
      )}
    </div>
  );
}
