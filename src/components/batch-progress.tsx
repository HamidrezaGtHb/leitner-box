'use client';

import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

interface BatchProgressProps {
  current: number;
  total: number;
  currentWord?: string;
  failed?: number;
  status: 'idle' | 'processing' | 'completed' | 'error';
}

export function BatchProgress({
  current,
  total,
  currentWord,
  failed = 0,
  status,
}: BatchProgressProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <Card>
      <CardContent className="py-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {status === 'processing' && (
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            )}
            {status === 'completed' && (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            )}
            {status === 'error' && <XCircle className="h-5 w-5 text-red-500" />}
            <div>
              <p className="font-medium">
                {status === 'idle' && 'Ready to generate'}
                {status === 'processing' && 'Generating words...'}
                {status === 'completed' && 'Generation complete!'}
                {status === 'error' && 'Generation failed'}
              </p>
              {currentWord && status === 'processing' && (
                <p className="text-sm text-muted-foreground">
                  Current: {currentWord}
                </p>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">
              {current}/{total}
            </p>
            {failed > 0 && (
              <p className="text-xs text-red-500">{failed} failed</p>
            )}
          </div>
        </div>

        <Progress value={percentage} className="h-2" />

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{Math.round(percentage)}% complete</span>
          {status === 'processing' && (
            <span>~{Math.ceil((total - current) * 0.2)}s remaining</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
