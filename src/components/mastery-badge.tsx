import type { MasteryLevel } from '@/types';

interface MasteryBadgeProps {
  level: MasteryLevel;
  size?: 'sm' | 'md' | 'lg';
}

export function MasteryBadge({ level, size = 'sm' }: MasteryBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  const levelConfig = {
    0: { icon: '○', label: 'Not started', color: 'bg-gray-200 text-gray-600' },
    1: { icon: '🥉', label: 'Bronze', color: 'bg-orange-100 text-orange-700' },
    2: { icon: '🥈', label: 'Silver', color: 'bg-gray-300 text-gray-700' },
    3: { icon: '🥇', label: 'Gold', color: 'bg-yellow-100 text-yellow-700' },
  };

  const config = levelConfig[level];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded font-medium ${sizeClasses[size]} ${config.color}`}
      title={config.label}
    >
      {config.icon}
    </span>
  );
}
