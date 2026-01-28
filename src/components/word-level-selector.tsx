'use client';

import { Button } from './ui/button';
import { cn } from '@/lib/utils';

type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

interface WordLevelSelectorProps {
  selected: Level;
  onSelect: (level: Level) => void;
}

const levels: { value: Level; label: string; description: string }[] = [
  { value: 'A1', label: 'A1', description: 'Beginner' },
  { value: 'A2', label: 'A2', description: 'Elementary' },
  { value: 'B1', label: 'B1', description: 'Intermediate' },
  { value: 'B2', label: 'B2', description: 'Upper Intermediate' },
  { value: 'C1', label: 'C1', description: 'Advanced' },
  { value: 'C2', label: 'C2', description: 'Proficiency' },
];

export function WordLevelSelector({ selected, onSelect }: WordLevelSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">Select Level (CEFR)</label>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {levels.map((level) => (
          <Button
            key={level.value}
            variant={selected === level.value ? 'default' : 'outline'}
            onClick={() => onSelect(level.value)}
            className="flex flex-col h-auto py-3"
          >
            <span className="text-lg font-bold">{level.label}</span>
            <span className="text-xs opacity-80">{level.description}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
