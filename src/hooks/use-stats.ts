'use client';

import { useState, useEffect } from 'react';
import { DailyStats } from '@/types';
import { loadDailyStats } from '@/lib/storage';

export function useStats() {
  const [stats, setStats] = useState<DailyStats[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loaded = loadDailyStats();
    setStats(loaded);
    setIsLoaded(true);
  }, []);

  const refreshStats = () => {
    const loaded = loadDailyStats();
    setStats(loaded);
  };

  return {
    stats,
    isLoaded,
    refreshStats,
  };
}
