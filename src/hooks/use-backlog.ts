'use client';

import { useState, useEffect } from 'react';
import { BacklogItem, WordData, Priority, BacklogSource } from '@/types';
import { loadBacklog, saveBacklog, getReadyBacklogItems } from '@/lib/storage';
import { generateId } from '@/lib/utils';
import { generateNormalizedKey } from '@/lib/duplicate-detector';

export function useBacklog() {
  const [backlog, setBacklog] = useState<BacklogItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load backlog on mount
  useEffect(() => {
    const loaded = loadBacklog();
    setBacklog(loaded);
    setIsLoaded(true);
  }, []);

  // Save backlog whenever it changes
  useEffect(() => {
    if (isLoaded) {
      saveBacklog(backlog);
    }
  }, [backlog, isLoaded]);

  const addToBacklog = (
    wordData: WordData,
    scheduledFor: number = Date.now(),
    priority: Priority = 'medium',
    source: BacklogSource = 'manual'
  ) => {
    const item: BacklogItem = {
      id: generateId(),
      normalizedKey: generateNormalizedKey(wordData.word),
      wordData,
      scheduledFor,
      priority,
      source,
      createdAt: Date.now(),
    };
    setBacklog((prev) => [...prev, item]);
  };

  const addManyToBacklog = (
    words: WordData[],
    scheduledFor: number = Date.now(),
    priority: Priority = 'medium',
    source: BacklogSource = 'generated'
  ) => {
    const items: BacklogItem[] = words.map((wordData) => ({
      id: generateId(),
      normalizedKey: generateNormalizedKey(wordData.word),
      wordData,
      scheduledFor,
      priority,
      source,
      createdAt: Date.now(),
    }));
    setBacklog((prev) => [...prev, ...items]);
  };

  const removeFromBacklog = (id: string) => {
    setBacklog((prev) => prev.filter((item) => item.id !== id));
  };

  const updateBacklogItem = (id: string, updates: Partial<BacklogItem>) => {
    setBacklog((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const clearBacklog = () => {
    setBacklog([]);
  };

  const getReadyItems = (): BacklogItem[] => {
    return getReadyBacklogItems(backlog);
  };

  const getFutureItems = (): BacklogItem[] => {
    const now = Date.now();
    return backlog.filter((item) => item.scheduledFor > now);
  };

  return {
    backlog,
    isLoaded,
    addToBacklog,
    addManyToBacklog,
    removeFromBacklog,
    updateBacklogItem,
    clearBacklog,
    readyItems: getReadyItems(),
    futureItems: getFutureItems(),
  };
}
