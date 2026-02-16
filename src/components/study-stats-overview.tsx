import type { StudyStats } from '@/types';
import { Card, CardContent } from './ui';
import { useLanguage } from '@/lib/i18n';

interface StatsOverviewProps {
  stats: StudyStats;
  loading?: boolean;
}

export function StudyStatsOverview({ stats, loading }: StatsOverviewProps) {
  const { t } = useLanguage();

  if (loading) {
    return (
      <Card padding="md">
        <CardContent>
          <div className="animate-pulse">Loading stats...</div>
        </CardContent>
      </Card>
    );
  }

  const items = [
    { icon: '○', label: t.study.notStarted, count: stats.notStarted, color: 'text-gray-600' },
    { icon: '🥉', label: t.study.bronze, count: stats.bronze, color: 'text-orange-600' },
    { icon: '🥈', label: t.study.silver, count: stats.silver, color: 'text-gray-600' },
    { icon: '🥇', label: t.study.gold, count: stats.gold, color: 'text-yellow-600' },
  ];

  return (
    <Card padding="md">
      <CardContent>
        <h3 className="text-sm font-semibold text-text mb-3">{t.study.progressOverview}</h3>
        <div className="grid grid-cols-4 gap-2">
          {items.map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className={`text-lg font-bold ${item.color}`}>{item.count}</div>
              <div className="text-xs text-text-muted">{item.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
