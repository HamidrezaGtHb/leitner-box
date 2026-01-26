'use client';

import { DailyStats } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface ProgressChartProps {
  stats: DailyStats[];
}

export function ProgressChart({ stats }: ProgressChartProps) {
  const maxValue = Math.max(...stats.map((s) => s.reviewed), 10);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Last 7 Days Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between gap-2 h-48">
          {stats.slice(-7).map((stat) => {
            const height = (stat.reviewed / maxValue) * 100;
            const date = new Date(stat.date);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

            return (
              <div key={stat.date} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col items-center justify-end h-40">
                  <div className="w-full space-y-1">
                    {stat.correct > 0 && (
                      <div
                        className="bg-green-500 w-full rounded-t transition-all"
                        style={{
                          height: `${(stat.correct / maxValue) * 160}px`,
                        }}
                        title={`Correct: ${stat.correct}`}
                      />
                    )}
                    {stat.incorrect > 0 && (
                      <div
                        className="bg-red-500 w-full rounded-b transition-all"
                        style={{
                          height: `${(stat.incorrect / maxValue) * 160}px`,
                        }}
                        title={`Incorrect: ${stat.incorrect}`}
                      />
                    )}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium">{dayName}</p>
                  <p className="text-xs text-muted-foreground">{stat.reviewed}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded" />
            <span>Correct</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded" />
            <span>Incorrect</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
