'use client';

import { useLeitner } from '@/hooks/use-leitner';
import { useStats } from '@/hooks/use-stats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ProgressChart } from '@/components/progress-chart';
import { BoxDistribution } from '@/components/box-distribution';
import { BookOpen, TrendingUp, Calendar, Target } from 'lucide-react';

export default function DashboardPage() {
  const { getProgress, isLoaded } = useLeitner();
  const { stats } = useStats();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  const progress = getProgress();
  const todayStats = stats.find(
    (s) => s.date === new Date().toISOString().split('T')[0]
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Track your learning progress</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Words</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progress.totalCards}</div>
            <p className="text-xs text-muted-foreground">In your collection</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progress.cardsDueToday}</div>
            <p className="text-xs text-muted-foreground">Cards to review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Studied Today</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {todayStats?.reviewed || 0}
            </div>
            <p className="text-xs text-muted-foreground">Cards reviewed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accuracy Today</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {todayStats && todayStats.reviewed > 0
                ? Math.round((todayStats.correct / todayStats.reviewed) * 100)
                : 0}
              %
            </div>
            <p className="text-xs text-muted-foreground">
              {todayStats?.correct || 0} / {todayStats?.reviewed || 0} correct
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressChart stats={stats} />
        <BoxDistribution
          distribution={progress.cardsInBox}
          totalCards={progress.totalCards}
        />
      </div>

      {/* Mastery Level */}
      <Card>
        <CardHeader>
          <CardTitle>Mastery Level</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Mastered (Box 5)</span>
                <span className="text-sm text-muted-foreground">
                  {progress.cardsInBox[5]} cards
                </span>
              </div>
              <Progress
                value={
                  progress.totalCards > 0
                    ? (progress.cardsInBox[5] / progress.totalCards) * 100
                    : 0
                }
                className="h-2"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Learning (Box 1-4)</span>
                <span className="text-sm text-muted-foreground">
                  {progress.totalCards - progress.cardsInBox[5]} cards
                </span>
              </div>
              <Progress
                value={
                  progress.totalCards > 0
                    ? ((progress.totalCards - progress.cardsInBox[5]) /
                        progress.totalCards) *
                      100
                    : 0
                }
                className="h-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
