'use client';

import { Button } from './ui/button';
import { Plus, Camera, Sparkles, Calendar, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface QuickActionsBarProps {
  onCommandPaletteOpen?: () => void;
  className?: string;
}

export function QuickActionsBar({ onCommandPaletteOpen, className }: QuickActionsBarProps) {
  const actions = [
    {
      id: 'add-word',
      label: 'Add Word',
      icon: Plus,
      onClick: onCommandPaletteOpen,
      shortcut: '⌘K',
      variant: 'default' as const,
    },
    {
      id: 'generate',
      label: 'Generate',
      icon: Sparkles,
      href: '/generate',
      shortcut: '⌘G',
      variant: 'outline' as const,
    },
    {
      id: 'ocr',
      label: 'From Image',
      icon: Camera,
      href: '/ocr',
      shortcut: '⌘I',
      variant: 'outline' as const,
    },
    {
      id: 'backlog',
      label: 'Backlog',
      icon: Calendar,
      href: '/backlog',
      shortcut: '⌘B',
      variant: 'outline' as const,
    },
    {
      id: 'stats',
      label: 'Dashboard',
      icon: BarChart3,
      href: '/dashboard',
      variant: 'outline' as const,
    },
  ];

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-lg border">
        <span className="text-sm font-medium text-muted-foreground mr-2">
          Quick Actions:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {actions.map((action) => {
            const Icon = action.icon;
            
            if (action.onClick) {
              return (
                <Button
                  key={action.id}
                  onClick={action.onClick}
                  variant={action.variant}
                  size="sm"
                  className="gap-2 relative group"
                  title={action.shortcut ? `${action.label} (${action.shortcut})` : action.label}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{action.label}</span>
                  {action.shortcut && (
                    <kbd className="hidden md:inline-flex ml-1 h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-50 group-hover:opacity-100">
                      {action.shortcut}
                    </kbd>
                  )}
                </Button>
              );
            }
            
            return (
              <Link key={action.id} href={action.href!}>
                <Button
                  variant={action.variant}
                  size="sm"
                  className="gap-2 relative group"
                  title={action.shortcut ? `${action.label} (${action.shortcut})` : action.label}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{action.label}</span>
                  {action.shortcut && (
                    <kbd className="hidden md:inline-flex ml-1 h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-50 group-hover:opacity-100">
                      {action.shortcut}
                    </kbd>
                  )}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
