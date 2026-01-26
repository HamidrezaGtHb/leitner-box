'use client';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';

interface BoxDistributionProps {
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
  totalCards: number;
}

const BOX_COLORS = {
  1: 'bg-red-500',
  2: 'bg-orange-500',
  3: 'bg-yellow-500',
  4: 'bg-green-500',
  5: 'bg-blue-500',
};

const BOX_LABELS = {
  1: 'Daily',
  2: 'Every 2 Days',
  3: 'Every 4 Days',
  4: 'Weekly',
  5: 'Bi-weekly',
};

export function BoxDistribution({ distribution, totalCards }: BoxDistributionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cards Distribution</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {([1, 2, 3, 4, 5] as const).map((box) => {
          const count = distribution[box] || 0;
          const percentage = totalCards > 0 ? (count / totalCards) * 100 : 0;

          return (
            <div key={box} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded ${BOX_COLORS[box]}`} />
                  <span className="font-medium">Box {box}</span>
                  <span className="text-muted-foreground">({BOX_LABELS[box]})</span>
                </div>
                <span className="font-bold">{count}</span>
              </div>
              <Progress value={percentage} className="h-2" />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
