'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { useAISuggestions } from '@/hooks/use-ai-suggestions';
import { 
  Sparkles, 
  X, 
  ChevronUp,
  ChevronDown,
  AlertCircle,
  Info,
  CheckCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type WidgetState = 'minimized' | 'normal' | 'expanded';

export function AIWidget() {
  const [state, setState] = useState<WidgetState>('normal');
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const { suggestions, topSuggestion } = useAISuggestions();
  
  // Load dismissed suggestions from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('dismissed_suggestions');
    if (stored) {
      try {
        setDismissed(new Set(JSON.parse(stored)));
      } catch (e) {
        console.error('Failed to load dismissed suggestions:', e);
      }
    }
  }, []);
  
  // Filter out dismissed suggestions
  const activeSuggestions = suggestions.filter(
    (s) => !dismissed.has(s.id) || !s.dismissable
  );
  
  const currentSuggestion = activeSuggestions[0] || null;
  
  const handleDismiss = (id: string) => {
    const newDismissed = new Set(dismissed);
    newDismissed.add(id);
    setDismissed(newDismissed);
    localStorage.setItem('dismissed_suggestions', JSON.stringify([...newDismissed]));
  };
  
  const handleAction = (action: () => void) => {
    action();
  };
  
  // Don't show if no suggestions
  if (!currentSuggestion) {
    return null;
  }
  
  // Minimized state
  if (state === 'minimized') {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setState('normal')}
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg"
        >
          <Sparkles className="h-5 w-5" />
        </Button>
      </div>
    );
  }
  
  const getIcon = () => {
    switch (currentSuggestion.type) {
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'action':
        return <Sparkles className="h-5 w-5 text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };
  
  const getBgColor = () => {
    switch (currentSuggestion.type) {
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'action':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      default:
        return 'bg-card border';
    }
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50 w-80">
      <Card className={cn('shadow-lg', getBgColor())}>
        <CardContent className="p-4 space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getIcon()}
              <span className="font-semibold text-sm">AI Assistant</span>
            </div>
            <div className="flex items-center gap-1">
              {state === 'normal' && activeSuggestions.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setState('expanded')}
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
              )}
              {state === 'expanded' && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setState('normal')}
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setState('minimized')}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Normal State - Single Suggestion */}
          {state === 'normal' && (
            <div className="space-y-3">
              <p className="text-sm">{currentSuggestion.message}</p>
              
              <div className="flex items-center gap-2">
                {currentSuggestion.action && (
                  <Button
                    onClick={() => handleAction(currentSuggestion.action!.execute)}
                    size="sm"
                    className="flex-1"
                  >
                    {currentSuggestion.action.label}
                  </Button>
                )}
                {currentSuggestion.dismissable && (
                  <Button
                    onClick={() => handleDismiss(currentSuggestion.id)}
                    variant="ghost"
                    size="sm"
                  >
                    Later
                  </Button>
                )}
              </div>
              
              {activeSuggestions.length > 1 && (
                <p className="text-xs text-muted-foreground text-center">
                  +{activeSuggestions.length - 1} more suggestion{activeSuggestions.length > 2 ? 's' : ''}
                </p>
              )}
            </div>
          )}
          
          {/* Expanded State - All Suggestions */}
          {state === 'expanded' && (
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {activeSuggestions.map((suggestion, idx) => (
                <div
                  key={suggestion.id}
                  className={cn(
                    'p-3 rounded-lg border',
                    idx === 0 ? 'bg-accent' : 'bg-background'
                  )}
                >
                  <p className="text-sm mb-2">{suggestion.message}</p>
                  <div className="flex items-center gap-2">
                    {suggestion.action && (
                      <Button
                        onClick={() => handleAction(suggestion.action!.execute)}
                        size="sm"
                        variant={idx === 0 ? 'default' : 'outline'}
                        className="flex-1"
                      >
                        {suggestion.action.label}
                      </Button>
                    )}
                    {suggestion.dismissable && (
                      <Button
                        onClick={() => handleDismiss(suggestion.id)}
                        variant="ghost"
                        size="sm"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
