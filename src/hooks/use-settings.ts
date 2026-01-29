'use client';

import { useState, useEffect } from 'react';
import { UserSettings } from '@/types';
import { loadSettings, saveSettings } from '@/lib/storage';

export function useSettings() {
  const [settings, setSettings] = useState<UserSettings>({
    dailyNewWords: 10,
    theme: 'system',
    isLockedMode: false,
    reviewIntervals: [1, 2, 4, 7, 14],
    autoAddFromBacklog: true,
    maxBacklogSize: 500,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loaded = loadSettings();
    setSettings(loaded);
    setIsLoaded(true);
  }, []);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    saveSettings(updated);
  };

  return {
    settings,
    isLoaded,
    updateSettings,
  };
}
