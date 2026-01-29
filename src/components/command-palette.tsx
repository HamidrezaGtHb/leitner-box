'use client';

import { useEffect, useState, useCallback } from 'react';
import { Command } from 'cmdk';
import { useCommands } from '@/hooks/use-commands';
import { parseCommand } from '@/lib/command-parser';
import { useDuplicateCheck } from '@/hooks/use-duplicate-check';
import { 
  Search, 
  Clock, 
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [search, setSearch] = useState('');
  const [recentCommands, setRecentCommands] = useState<string[]>([]);
  const { commands, parseAndExecute, searchCommands } = useCommands();
  const { checkDuplicate } = useDuplicateCheck();
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState('');
  const [duplicateWarning, setDuplicateWarning] = useState('');

  // Load recent commands from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('recent_commands');
    if (stored) {
      try {
        setRecentCommands(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load recent commands:', e);
      }
    }
  }, []);

  // Save recent command
  const addToRecent = useCallback((cmd: string) => {
    setRecentCommands((prev) => {
      const updated = [cmd, ...prev.filter((c) => c !== cmd)].slice(0, 5);
      localStorage.setItem('recent_commands', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Check for duplicates on search change
  useEffect(() => {
    if (!search.trim()) {
      setDuplicateWarning('');
      return;
    }

    const parsed = parseCommand(search);
    if (parsed.type === 'add-word' && parsed.args.word) {
      const result = checkDuplicate(parsed.args.word);
      if (result.isDuplicate && result.similarity >= 85) {
        setDuplicateWarning(result.suggestion);
      } else {
        setDuplicateWarning('');
      }
    } else {
      setDuplicateWarning('');
    }
  }, [search, checkDuplicate]);

  const handleExecute = async (value: string) => {
    if (!value.trim()) return;
    
    setIsExecuting(true);
    setError('');
    
    try {
      await parseAndExecute(value);
      addToRecent(value);
      onOpenChange(false);
      setSearch('');
      setDuplicateWarning('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to execute command');
    } finally {
      setIsExecuting(false);
    }
  };

  const filteredCommands = search ? searchCommands(search) : commands;

  return (
    <Command.Dialog 
      open={open} 
      onOpenChange={onOpenChange}
      label="Command Palette"
      className={cn(
        "fixed top-[20%] left-1/2 -translate-x-1/2",
        "w-full max-w-2xl",
        "bg-background border rounded-lg shadow-2xl",
        "animate-in fade-in-0 zoom-in-95"
      )}
    >
      <div className="flex items-center border-b px-3">
        <Search className="h-4 w-4 text-muted-foreground mr-2" />
        <Command.Input
          value={search}
          onValueChange={setSearch}
          placeholder="Type a command or search..."
          className="flex h-12 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          autoFocus
        />
        {isExecuting && (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        )}
      </div>

      {/* Duplicate Warning */}
      {duplicateWarning && (
        <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800">
          <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          <span className="text-sm text-yellow-700 dark:text-yellow-300">
            {duplicateWarning}
          </span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800">
          <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
          <span className="text-sm text-red-700 dark:text-red-300">{error}</span>
        </div>
      )}

      <Command.List className="max-h-[400px] overflow-y-auto p-2">
        <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
          No results found.
        </Command.Empty>

        {/* Recent Commands */}
        {!search && recentCommands.length > 0 && (
          <Command.Group heading="Recent">
            {recentCommands.map((cmd) => (
              <Command.Item
                key={cmd}
                value={cmd}
                onSelect={() => handleExecute(cmd)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-sm cursor-pointer hover:bg-accent aria-selected:bg-accent"
              >
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="flex-1">{cmd}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Command.Item>
            ))}
          </Command.Group>
        )}

        {/* Actions */}
        <Command.Group heading="Actions">
          {filteredCommands
            .filter((cmd) => cmd.category === 'action')
            .map((cmd) => (
              <Command.Item
                key={cmd.id}
                value={cmd.label}
                onSelect={() => {
                  const parsed = parseCommand(search || cmd.label);
                  handleExecute(search || cmd.label);
                }}
                className="flex items-center gap-3 px-2 py-2 rounded-sm cursor-pointer hover:bg-accent aria-selected:bg-accent"
              >
                <cmd.icon className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <div className="font-medium">{cmd.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {cmd.description}
                  </div>
                </div>
                {cmd.shortcut && (
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    {cmd.shortcut}
                  </kbd>
                )}
              </Command.Item>
            ))}
        </Command.Group>

        {/* Generation */}
        <Command.Group heading="Generation">
          {filteredCommands
            .filter((cmd) => cmd.category === 'generation')
            .map((cmd) => (
              <Command.Item
                key={cmd.id}
                value={cmd.label}
                onSelect={() => handleExecute(search || cmd.label)}
                className="flex items-center gap-3 px-2 py-2 rounded-sm cursor-pointer hover:bg-accent aria-selected:bg-accent"
              >
                <cmd.icon className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <div className="font-medium">{cmd.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {cmd.description}
                  </div>
                </div>
                {cmd.shortcut && (
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    {cmd.shortcut}
                  </kbd>
                )}
              </Command.Item>
            ))}
        </Command.Group>

        {/* Navigation */}
        <Command.Group heading="Navigation">
          {filteredCommands
            .filter((cmd) => cmd.category === 'navigation')
            .map((cmd) => (
              <Command.Item
                key={cmd.id}
                value={cmd.label}
                onSelect={() => {
                  cmd.execute();
                  onOpenChange(false);
                }}
                className="flex items-center gap-3 px-2 py-2 rounded-sm cursor-pointer hover:bg-accent aria-selected:bg-accent"
              >
                <cmd.icon className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <div className="font-medium">{cmd.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {cmd.description}
                  </div>
                </div>
                {cmd.shortcut && (
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    {cmd.shortcut}
                  </kbd>
                )}
              </Command.Item>
            ))}
        </Command.Group>
      </Command.List>

      {/* Footer */}
      <div className="flex items-center justify-between border-t px-3 py-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>↑↓ Navigate</span>
          <span>↵ Execute</span>
          <span>Esc Close</span>
        </div>
        <span>Cmd+K to open</span>
      </div>
    </Command.Dialog>
  );
}
