'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Clock } from 'lucide-react';
import { formatNextDueIn } from '@/lib/leitner';

interface LockedEmptyStateProps {
  nextDueIn: number | null;
  message?: string;
}

export function LockedEmptyState({ nextDueIn, message }: LockedEmptyStateProps) {
  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-center">
          <Lock className="h-6 w-6 text-yellow-500" />
          Locked Mode Active
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-muted-foreground">
          {message || 'No cards are due for review right now.'}
        </p>
        {nextDueIn !== null && (
          <div className="flex items-center justify-center gap-2 text-lg font-semibold">
            <Clock className="h-5 w-5" />
            <span>Next review in: {formatNextDueIn(nextDueIn)}</span>
          </div>
        )}
        <p className="text-sm text-muted-foreground">
          Come back later or disable Locked Mode in Settings to access all cards.
        </p>
      </CardContent>
    </Card>
  );
}
