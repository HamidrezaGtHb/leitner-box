'use client';

import { useLeitner } from '@/hooks/use-leitner';
import { useSettings } from '@/hooks/use-settings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AIChat } from '@/components/ai-chat';
import { AIChatFAB } from '@/components/ai-chat-fab';
import { Loader2, BookOpen, Target, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { LeitnerCard, WordData } from '@/types';
import { computeNextDueIn, createCard } from '@/lib/leitner';
import { generateNormalizedKey } from '@/lib/duplicate-detector';

export default function HomePage() {
  const { cards, dueCards, isLoaded, addCard } = useLeitner();
  const { settings } = useSettings();

  const nextDueIn = computeNextDueIn(cards);
  const progress = isLoaded ? { newWordsToday: 0, totalCards: cards.length } : null;

  const handleCardsCreated = async (wordDataList: WordData[]) => {
    for (const wordData of wordDataList) {
      const normalizedKey = generateNormalizedKey(wordData.word);
      const card = createCard(wordData, normalizedKey);
      await addCard(card);
    }
  };

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
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <span className="hidden lg:inline">
            Press <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Cmd+K</kbd> for AI
          </span>
          <span className="lg:hidden">
            Tap the <span className="text-primary font-semibold">+ button</span> below for AI
          </span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due Today</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dueCards.length}</div>
            <p className="text-xs text-muted-foreground">Cards ready</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Today</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {progress?.newWordsToday} / {settings.dailyNewWords}
            </div>
            <Progress
              value={((progress?.newWordsToday || 0) / settings.dailyNewWords) * 100}
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {nextDueIn !== null ? formatDuration(nextDueIn) : 'Now'}
            </div>
            <p className="text-xs text-muted-foreground">Until next card</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progress?.totalCards || 0}</div>
            <p className="text-xs text-muted-foreground">Cards total</p>
          </CardContent>
        </Card>
      </div>

      {/* Leitner Guidance Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            What Should I Do Now?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {dueCards.length > 0 ? (
            <div className="space-y-2">
              <p className="text-lg font-semibold text-green-700 dark:text-green-400">
                ✅ Review your due cards first!
              </p>
              <p className="text-sm text-muted-foreground">
                You have <strong>{dueCards.length} cards</strong> ready for review. According to the Leitner system, 
                reviewing cards on time is the priority.
              </p>
              <Link href="/review">
                <Button size="lg" className="mt-2">
                  Start Review ({dueCards.length} cards)
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {nextDueIn !== null && nextDueIn > 0 ? (
                <>
                  <p className="text-lg font-semibold text-blue-700 dark:text-blue-400">
                    ⏰ Next review in {formatDuration(nextDueIn)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    You can add new words now if you haven't reached your daily limit ({settings.dailyNewWords} per day).
                    Use the AI assistant below to add words!
                  </p>
                </>
              ) : (
                <>
                  <p className="text-lg font-semibold text-green-700 dark:text-green-400">
                    ✨ Ready to add new words!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    You have no cards due. It's a great time to add new vocabulary using the AI assistant below.
                  </p>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Chat - Desktop Only */}
      <div className="hidden lg:block">
        <Card>
          <CardHeader>
            <CardTitle>AI Assistant</CardTitle>
            <p className="text-sm text-muted-foreground">
              Ask for words, upload images for OCR, or request specific topics
            </p>
          </CardHeader>
          <CardContent>
            <AIChat onCardsCreated={handleCardsCreated} />
          </CardContent>
        </Card>
      </div>

      {/* Floating Action Button - Mobile Only */}
      <AIChatFAB onCardsCreated={handleCardsCreated} />

      {/* Empty State */}
      {cards.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center space-y-4">
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground" />
            <h2 className="text-2xl font-bold">Start Your Learning Journey!</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Use the AI assistant to add your first German words. Try:
            </p>
            <div className="flex flex-col gap-2 max-w-sm mx-auto text-sm text-left bg-muted p-4 rounded-lg">
              <p>💬 "Add the word 'der Bahnhof'"</p>
              <p>💬 "Give me 10 B2 words about travel"</p>
              <p>📷 Upload an image to extract words</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d`;
  if (hours > 0) return `${hours}h`;
  if (minutes > 0) return `${minutes}m`;
  return `${seconds}s`;
}
