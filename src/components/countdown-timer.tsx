'use client';

import { useState, useEffect } from 'react';
import { formatNextDueIn } from '@/lib/leitner';

interface CountdownTimerProps {
  /** Target timestamp in milliseconds */
  targetTime: number;
  /** Callback when countdown reaches zero */
  onComplete?: () => void;
  /** Optional className for styling */
  className?: string;
  /** Show "Due now!" when complete (default: true) */
  showDueNow?: boolean;
}

/**
 * Live countdown timer that updates every second
 * Shows time remaining until targetTime
 */
export function CountdownTimer({
  targetTime,
  onComplete,
  className,
  showDueNow = true,
}: CountdownTimerProps) {
  const [remaining, setRemaining] = useState<number>(
    Math.max(0, targetTime - Date.now())
  );

  useEffect(() => {
    // Update immediately
    setRemaining(Math.max(0, targetTime - Date.now()));

    const interval = setInterval(() => {
      const newRemaining = Math.max(0, targetTime - Date.now());
      setRemaining(newRemaining);

      if (newRemaining === 0 && onComplete) {
        onComplete();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime, onComplete]);

  if (remaining === 0) {
    if (showDueNow) {
      return <span className={`text-green-600 font-semibold ${className || ''}`}>Due now!</span>;
    }
    return null;
  }

  return <span className={className}>{formatNextDueIn(remaining)}</span>;
}

/**
 * Countdown timer that accepts milliseconds remaining directly
 * (instead of target timestamp)
 */
interface CountdownFromMillisProps {
  /** Milliseconds remaining */
  milliseconds: number | null;
  /** Optional className for styling */
  className?: string;
}

export function CountdownFromMillis({ milliseconds, className }: CountdownFromMillisProps) {
  const [remaining, setRemaining] = useState<number | null>(milliseconds);

  useEffect(() => {
    if (milliseconds === null) {
      setRemaining(null);
      return;
    }

    setRemaining(milliseconds);
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newRemaining = Math.max(0, milliseconds - elapsed);
      setRemaining(newRemaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [milliseconds]);

  if (remaining === null) {
    return <span className={className}>--</span>;
  }

  if (remaining === 0) {
    return <span className={`text-green-600 font-semibold ${className || ''}`}>Due now!</span>;
  }

  return <span className={className}>{formatNextDueIn(remaining)}</span>;
}
