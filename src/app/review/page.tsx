'use client';

import { useState, useEffect } from 'react';
import { useLeitner } from '@/hooks/use-leitner';
import { useSettings } from '@/hooks/use-settings';
import { Flashcard } from '@/components/flashcard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LockedEmptyState } from '@/components/locked-empty-state';
import { CheckCircle2, Home as HomeIcon, Lock } from 'lucide-react';
import Link from 'next/link';
import { computeDueCards, computeNextDueIn, applyAnswer } from '@/lib/leitner';
import { canStartReview } from '@/lib/locked-mode';

export default function ReviewPage() {
  const { cards, updateCard, isLoaded } = useLeitner();
  const { settings } = useSettings();
  const [reviewQueue, setReviewQueue] = useState<typeof cards>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0, hard: 0 });
  const [isComplete, setIsComplete] = useState(false);

  // Initialize review queue with due cards
  useEffect(() => {
    if (isLoaded) {
      const dueCards = computeDueCards(cards);
      if (reviewQueue.length === 0 && dueCards.length > 0) {
        setReviewQueue([...dueCards]);
      }
    }
  }, [isLoaded, cards, reviewQueue.length]);

  useEffect(() => {
    if (isLoaded && reviewQueue.length === 0) {
      const dueCards = computeDueCards(cards);
      if (dueCards.length === 0) {
        setIsComplete(true);
      }
    }
  }, [isLoaded, cards, reviewQueue.length]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  // Locked Mode: Check if user can start review
  const dueCards = computeDueCards(cards);
  const nextDueIn = computeNextDueIn(cards);
  
  if (settings.isLockedMode && !canStartReview(cards, settings.isLockedMode)) {
    return (
      <div className="max-w-2xl mx-auto">
        <LockedEmptyState nextDueIn={nextDueIn} />
      </div>
    );
  }

  if (isComplete || reviewQueue.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardContent className="py-12 space-y-6">
            <CheckCircle2 className="h-16 w-16 mx-auto text-green-500" />
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Review Complete!</h2>
              <p className="text-muted-foreground">
                {sessionStats.correct + sessionStats.incorrect + sessionStats.hard > 0
                  ? `You reviewed ${sessionStats.correct + sessionStats.incorrect + sessionStats.hard} cards today`
                  : 'No cards due for review right now'}
              </p>
            </div>

            {sessionStats.correct + sessionStats.incorrect + sessionStats.hard > 0 && (
              <div className="flex items-center justify-center gap-8 py-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">
                    {sessionStats.correct}
                  </p>
                  <p className="text-sm text-muted-foreground">Correct</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-yellow-600">
                    {sessionStats.hard}
                  </p>
                  <p className="text-sm text-muted-foreground">Hard</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-red-600">
                    {sessionStats.incorrect}
                  </p>
                  <p className="text-sm text-muted-foreground">Wrong</p>
                </div>
              </div>
            )}

            {nextDueIn !== null && (
              <p className="text-sm text-muted-foreground">
                Next review in: {formatDuration(nextDueIn)}
              </p>
            )}

            <Link href="/">
              <Button size="lg" className="gap-2">
                <HomeIcon className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentCard = reviewQueue[currentIndex];
  const progressPercent = reviewQueue.length > 0 ? ((currentIndex + 1) / reviewQueue.length) * 100 : 100;

  if (!currentCard) {
    setIsComplete(true);
    return null;
  }

  const handleAnswer = (answer: 'correct' | 'wrong' | 'hard') => {
    // Apply strict Leitner rules
    const updatedCard = applyAnswer(currentCard, answer, {
      intervals: settings.reviewIntervals,
      maxBox: 5,
    });

    // Update card in storage
    updateCard(updatedCard);

    // Update session stats
    setSessionStats((prev) => ({
      ...prev,
      correct: answer === 'correct' ? prev.correct + 1 : prev.correct,
      incorrect: answer === 'wrong' ? prev.incorrect + 1 : prev.incorrect,
      hard: answer === 'hard' ? prev.hard + 1 : prev.hard,
    }));

    // Move to next card
    if (currentIndex < reviewQueue.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsComplete(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header with Locked Mode Indicator */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Review Session</h1>
          <p className="text-muted-foreground">
            Card {currentIndex + 1} of {reviewQueue.length}
          </p>
        </div>
        {settings.isLockedMode && (
          <div className="flex items-center gap-2 text-yellow-600">
            <Lock className="h-5 w-5" />
            <span className="text-sm font-medium">Locked Mode</span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <Progress value={progressPercent} className="h-2" />

      {/* Flashcard */}
      <Flashcard
        wordData={currentCard.wordData}
        onCorrect={() => handleAnswer('correct')}
        onIncorrect={() => handleAnswer('wrong')}
        onHard={() => handleAnswer('hard')}
        showHardButton={true}
      />

      {/* Card Info */}
      <Card className="bg-muted/50">
        <CardContent className="py-4">
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <p className="text-muted-foreground">Box</p>
              <p className="font-semibold">{currentCard.boxIndex}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Correct</p>
              <p className="font-semibold text-green-600">{currentCard.correctCount}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Wrong</p>
              <p className="font-semibold text-red-600">{currentCard.incorrectCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  return `${seconds} second${seconds > 1 ? 's' : ''}`;
}
