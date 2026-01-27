'use client';

import { useState, useEffect } from 'react';
import { useLeitner } from '@/hooks/use-leitner';
import { Flashcard } from '@/components/flashcard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Home as HomeIcon } from 'lucide-react';
import Link from 'next/link';

export default function ReviewPage() {
  const { dueCards, reviewCard, isLoaded } = useLeitner();
  const [reviewQueue, setReviewQueue] = useState<typeof dueCards>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0 });
  const [isComplete, setIsComplete] = useState(false);

  // Initialize review queue once when page loads
  useEffect(() => {
    if (isLoaded && reviewQueue.length === 0 && dueCards.length > 0) {
      setReviewQueue([...dueCards]);
    }
  }, [isLoaded, dueCards, reviewQueue.length]);

  useEffect(() => {
    if (isLoaded && dueCards.length === 0 && reviewQueue.length === 0) {
      setIsComplete(true);
    }
  }, [isLoaded, dueCards, reviewQueue.length]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (isComplete || (reviewQueue.length === 0 && dueCards.length === 0)) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardContent className="py-12 space-y-6">
            <CheckCircle2 className="h-16 w-16 mx-auto text-green-500" />
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">All Done!</h2>
              <p className="text-muted-foreground">
                {sessionStats.correct + sessionStats.incorrect > 0
                  ? `You reviewed ${sessionStats.correct + sessionStats.incorrect} cards today`
                  : 'No cards due for review right now'}
              </p>
            </div>

            {sessionStats.correct + sessionStats.incorrect > 0 && (
              <div className="flex items-center justify-center gap-8 py-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">
                    {sessionStats.correct}
                  </p>
                  <p className="text-sm text-muted-foreground">Correct</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-red-600">
                    {sessionStats.incorrect}
                  </p>
                  <p className="text-sm text-muted-foreground">Incorrect</p>
                </div>
              </div>
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

  // Safety check - if no current card, show complete
  if (!currentCard) {
    setIsComplete(true);
    return null;
  }

  const handleCorrect = () => {
    reviewCard(currentCard.id, true);
    setSessionStats((prev) => ({ ...prev, correct: prev.correct + 1 }));

    if (currentIndex < reviewQueue.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleIncorrect = () => {
    reviewCard(currentCard.id, false);
    setSessionStats((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));

    if (currentIndex < reviewQueue.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsComplete(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Review Session</h1>
            <p className="text-muted-foreground">
              Card {currentIndex + 1} of {reviewQueue.length}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Session Progress</p>
            <div className="flex items-center gap-3">
              <span className="text-sm text-green-600 font-medium">
                ✓ {sessionStats.correct}
              </span>
              <span className="text-sm text-red-600 font-medium">
                ✗ {sessionStats.incorrect}
              </span>
            </div>
          </div>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>

      {/* Flashcard */}
      <Flashcard
        wordData={currentCard.wordData}
        onCorrect={handleCorrect}
        onIncorrect={handleIncorrect}
      />

      {/* Box Info */}
      <Card className="bg-muted/50">
        <CardContent className="py-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Current Box</span>
            <span className="font-medium">Box {currentCard.box} of 5</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
