'use client';

import { useState } from 'react';
import { useLeitner } from '@/hooks/use-leitner';
import { useSettings } from '@/hooks/use-settings';
import { useBacklog } from '@/hooks/use-backlog';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { WordCard } from '@/components/word-card';
import { CommandPalette } from '@/components/command-palette';
import { QuickActionsBar } from '@/components/quick-actions-bar';
import { AIWidget } from '@/components/ai-widget';
import { Loader2, BookOpen, Target, TrendingUp, Calendar, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const { cards, getProgress, dueCards, isLoaded } = useLeitner();
  const { settings } = useSettings();
  const { readyItems } = useBacklog();
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Setup keyboard shortcuts
  useKeyboardShortcuts({
    onCommandPalette: () => setIsCommandOpen(true),
  });

  const progress = isLoaded ? getProgress() : null;
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
        <p className="text-sm text-muted-foreground">
          Press <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Cmd+K</kbd> to open command palette
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            <CardTitle className="text-sm font-medium">Backlog Ready</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{readyItems.length}</div>
            <p className="text-xs text-muted-foreground">Words ready to add</p>
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

      {/* Quick Actions Bar */}
      <QuickActionsBar onCommandPaletteOpen={() => setIsCommandOpen(true)} />

      {/* Call to Action - Review */}
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

      {/* Backlog CTA */}
      {readyItems.length > 0 && (
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h3 className="text-lg font-semibold">Words Ready in Backlog</h3>
              <p className="text-sm text-muted-foreground">
                {readyItems.length} words are scheduled for today
              </p>
            </div>
            <Link href="/backlog">
              <Button size="lg" className="gap-2">
                <Calendar className="h-4 w-4" />
                View Backlog
              </Button>
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

      {/* Empty State */}
      {cards.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center space-y-4">
            <Sparkles className="h-16 w-16 mx-auto text-muted-foreground" />
            <h2 className="text-2xl font-bold">Ready to Start Learning?</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Use the quick actions above or press <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Cmd+K</kbd> to add your first words
            </p>
            <div className="flex gap-3 justify-center pt-4">
              <Button onClick={() => setIsCommandOpen(true)}>
                Open Command Palette
              </Button>
              <Link href="/generate">
                <Button variant="outline">Generate Words</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Command Palette */}
      <CommandPalette open={isCommandOpen} onOpenChange={setIsCommandOpen} />

      {/* AI Widget */}
      <AIWidget />
    </div>
  );
}
