'use client';

import { useState, useEffect, useCallback } from 'react';
import { LeitnerCard, WordData, Progress } from '@/types';
import {
  loadCards as loadCardsLocal,
  saveCards as saveCardsLocal,
  loadSettings,
  updateTodayStats as updateTodayStatsLocal,
} from '@/lib/storage';
import {
  dbLoadCards,
  dbSaveCard,
  dbDeleteCard,
  dbUpdateTodayStats,
} from '@/lib/db';
import { isSupabaseConfigured } from '@/lib/supabase';
import {
  createCard,
  moveCardUp,
  moveCardDown,
  getDueCards,
  getNewCards,
  getCardsByBox,
  hasReachedDailyLimit,
} from '@/lib/leitner';
import { getTodayString } from '@/lib/utils';

export function useLeitner() {
  const [cards, setCards] = useState<LeitnerCard[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [useSupabase, setUseSupabase] = useState(false);

  // Load cards on mount
  useEffect(() => {
    async function loadData() {
      const supabaseEnabled = isSupabaseConfigured();
      setUseSupabase(supabaseEnabled);

      if (supabaseEnabled) {
        try {
          const dbCards = await dbLoadCards();
          if (dbCards.length > 0) {
            setCards(dbCards);
          } else {
            // Fallback to localStorage if Supabase is empty
            const localCards = loadCardsLocal();
            setCards(localCards);
            // Migrate local cards to Supabase
            for (const card of localCards) {
              await dbSaveCard(card);
            }
          }
        } catch (error) {
          console.error('Error loading from Supabase:', error);
          setCards(loadCardsLocal());
        }
      } else {
        setCards(loadCardsLocal());
      }
      setIsLoaded(true);
    }

    loadData();
  }, []);

  // Save to localStorage as backup
  useEffect(() => {
    if (isLoaded) {
      saveCardsLocal(cards);
    }
  }, [cards, isLoaded]);

  const updateTodayStats = useCallback(
    async (newWords: number, reviewed: number, correct: number, incorrect: number) => {
      updateTodayStatsLocal(newWords, reviewed, correct, incorrect);
      if (useSupabase) {
        await dbUpdateTodayStats(newWords, reviewed, correct, incorrect);
      }
    },
    [useSupabase]
  );

  const addWord = useCallback(
    async (wordData: WordData) => {
      const card = createCard(wordData);
      setCards((prev) => [...prev, card]);
      await updateTodayStats(1, 0, 0, 0);
      if (useSupabase) {
        await dbSaveCard(card);
      }
    },
    [useSupabase, updateTodayStats]
  );

  const reviewCard = useCallback(
    async (cardId: string, correct: boolean) => {
      let updatedCard: LeitnerCard | null = null;

      setCards((prev) =>
        prev.map((card) => {
          if (card.id === cardId) {
            updatedCard = correct ? moveCardUp(card) : moveCardDown(card);
            return updatedCard;
          }
          return card;
        })
      );

      await updateTodayStats(0, 1, correct ? 1 : 0, correct ? 0 : 1);

      if (useSupabase && updatedCard) {
        await dbSaveCard(updatedCard);
      }
    },
    [useSupabase, updateTodayStats]
  );

  const deleteCard = useCallback(
    async (cardId: string) => {
      setCards((prev) => prev.filter((card) => card.id !== cardId));
      if (useSupabase) {
        await dbDeleteCard(cardId);
      }
    },
    [useSupabase]
  );

  const getProgress = useCallback((): Progress => {
    const settings = loadSettings();
    const todayString = getTodayString();
    const due = getDueCards(cards);

    const cardsInBox = {
      1: getCardsByBox(cards, 1).length,
      2: getCardsByBox(cards, 2).length,
      3: getCardsByBox(cards, 3).length,
      4: getCardsByBox(cards, 4).length,
      5: getCardsByBox(cards, 5).length,
    };

    const newWordsToday = cards.filter((card) => {
      const cardDate = new Date(card.createdAt).toISOString().split('T')[0];
      return cardDate === todayString;
    }).length;

    return {
      totalCards: cards.length,
      cardsInBox,
      cardsDueToday: due.length,
      newWordsToday,
      studiedToday: 0,
      correctToday: 0,
      incorrectToday: 0,
      lastStudyDate: todayString,
    };
  }, [cards]);

  const canAddNewWord = useCallback((): boolean => {
    const settings = loadSettings();
    return !hasReachedDailyLimit(cards, settings.dailyNewWords);
  }, [cards]);

  return {
    cards,
    isLoaded,
    useSupabase,
    addWord,
    reviewCard,
    deleteCard,
    getProgress,
    canAddNewWord,
    dueCards: getDueCards(cards),
    newCards: getNewCards(cards),
  };
}
