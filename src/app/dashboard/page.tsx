'use client';

import { useLeitner } from '@/hooks/use-leitner';
import { useSettings } from '@/hooks/use-settings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  TrendingUp, 
  Clock, 
  Target, 
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lock
} from 'lucide-react';
import { computeNextDueIn, getCardsByBox, getDashboardStats, formatNextDueIn } from '@/lib/leitner';
import { CountdownFromMillis } from '@/components/countdown-timer';

export default function DashboardPage() {
  const { cards, dueCards, isLoaded } = useLeitner();
  const { settings } = useSettings();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  const nextDueIn = computeNextDueIn(cards);
  const totalCorrect = cards.reduce((sum, card) => sum + card.correctCount, 0);
  const totalIncorrect = cards.reduce((sum, card) => sum + card.incorrectCount, 0);
  const totalHard = cards.reduce((sum, card) => sum + (card.hardCount || 0), 0);
  const totalReviews = totalCorrect + totalIncorrect + totalHard;
  const accuracy = totalReviews > 0 ? ((totalCorrect / totalReviews) * 100).toFixed(1) : 0;

  const dashboardStats = getDashboardStats(cards, settings.dailyNewWords);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Track your learning progress</p>
      </div>

      {/* Leitner Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due Now</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{dueCards.length}</div>
            <p className="text-xs text-muted-foreground">Cards ready to review</p>
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
            <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{accuracy}%</div>
            <Progress value={Number(accuracy)} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cards</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cards.length}</div>
            <p className="text-xs text-muted-foreground">In your collection</p>
          </CardContent>
        </Card>
      </div>

      {/* Settings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Daily New Words</span>
              <Badge variant="secondary">{settings.dailyNewWords} words/day</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Locked Mode</span>
              {settings.isLockedMode ? (
                <Badge variant="default" className="gap-1">
                  <Lock className="h-3 w-3" />
                  Enabled
                </Badge>
              ) : (
                <Badge variant="outline">Disabled</Badge>
              )}
            </div>
            <div>
              <span className="text-sm font-medium">Review Intervals</span>
              <div className="flex gap-2 mt-2">
                {settings.reviewIntervals.map((days, idx) => (
                  <Badge key={idx} variant="outline">
                    Box {idx + 1}: {days}d
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Review Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Correct</span>
              </div>
              <span className="text-2xl font-bold text-green-600">{totalCorrect}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium">Hard</span>
              </div>
              <span className="text-2xl font-bold text-yellow-600">{totalHard}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium">Wrong</span>
              </div>
              <span className="text-2xl font-bold text-red-600">{totalIncorrect}</span>
            </div>
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Reviews</span>
                <span className="text-xl font-bold">{totalReviews}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Box Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Leitner Box Distribution</CardTitle>
          <p className="text-sm text-muted-foreground">
            Cards progress through boxes based on your answers
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {([1, 2, 3, 4, 5] as const).map((boxNum) => {
            const boxStats = dashboardStats.boxes[boxNum];
            const percentage = cards.length > 0 ? (boxStats.totalCount / cards.length) * 100 : 0;
            const interval = settings.reviewIntervals[boxNum - 1];

            return (
              <div key={boxNum} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Box {boxNum}</Badge>
                    <span className="text-sm text-muted-foreground">
                      Every {interval} day{interval > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    {boxStats.dueCount > 0 && (
                      <Badge variant="destructive" className="gap-1">
                        {boxStats.dueCount} due
                      </Badge>
                    )}
                    {boxStats.nextDueIn !== null && boxStats.dueCount === 0 && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <CountdownFromMillis milliseconds={boxStats.nextDueIn} />
                      </span>
                    )}
                    <span className="text-sm font-semibold">
                      {boxStats.totalCount} cards
                    </span>
                  </div>
                </div>
                <Progress value={percentage} />
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Guidance Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle>Leitner System Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <p className="font-semibold">✅ When cards are due:</p>
            <p className="text-muted-foreground">Review them immediately. This is your top priority!</p>
          </div>
          <div>
            <p className="font-semibold">➕ When to add new words:</p>
            <p className="text-muted-foreground">
              Add new words when you have no due cards and haven't reached your daily limit ({settings.dailyNewWords}/day).
            </p>
          </div>
          <div>
            <p className="font-semibold">🎯 Answer honestly:</p>
            <p className="text-muted-foreground">
              <strong>Correct</strong> → Move to next box | 
              <strong> Hard</strong> → Stay or move back | 
              <strong> Wrong</strong> → Back to Box 1
            </p>
          </div>
          <div>
            <p className="font-semibold">🔒 Locked Mode:</p>
            <p className="text-muted-foreground">
              {settings.isLockedMode 
                ? 'Enabled - You can only access due cards for focused review'
                : 'Disabled - You can browse all cards freely'}
            </p>
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
