'use client';

import { useState, useEffect, useCallback } from 'react';
import { LeitnerCard, WordData, Progress } from '@/types';
import {
  loadCards as loadCardsLocal,
  saveCards as saveCardsLocal,
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
  computeDueCards,
  getCardsByBox,
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
    async (newWords: number, reviewed: number, correct: number, incorrect: number, hard: number = 0) => {
      updateTodayStatsLocal(newWords, reviewed, correct, incorrect, hard);
      if (useSupabase) {
        await dbUpdateTodayStats(newWords, reviewed, correct, incorrect, hard);
      }
    },
    [useSupabase]
  );

  // Add a new card (accepts full card object with normalizedKey)
  const addCard = useCallback(
    async (card: LeitnerCard) => {
      setCards((prev) => [...prev, card]);
      await updateTodayStats(1, 0, 0, 0, 0);
      if (useSupabase) {
        await dbSaveCard(card);
      }
    },
    [useSupabase, updateTodayStats]
  );

  // Update an existing card
  const updateCard = useCallback(
    async (updatedCard: LeitnerCard) => {
      setCards((prev) =>
        prev.map((card) => (card.id === updatedCard.id ? updatedCard : card))
      );
      if (useSupabase) {
        await dbSaveCard(updatedCard);
      }
    },
    [useSupabase]
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

  // Get progress statistics
  const getProgress = useCallback((): Progress => {
    const dueCards = computeDueCards(cards);
    const todayString = getTodayString();
    const newWordsToday = cards.filter((card) => {
      const cardDate = new Date(card.createdAt).toISOString().split('T')[0];
      return cardDate === todayString;
    }).length;

    return {
      totalCards: cards.length,
      cardsInBox: {
        1: getCardsByBox(cards, 1).length,
        2: getCardsByBox(cards, 2).length,
        3: getCardsByBox(cards, 3).length,
        4: getCardsByBox(cards, 4).length,
        5: getCardsByBox(cards, 5).length,
      },
      cardsDueToday: dueCards.length,
      newWordsToday,
      studiedToday: 0,
      correctToday: 0,
      incorrectToday: 0,
      lastStudyDate: '',
    };
  }, [cards]);

  // Compute due cards using strict Leitner rules
  const dueCards = computeDueCards(cards);

  return {
    cards,
    dueCards,
    isLoaded,
    addCard,
    updateCard,
    deleteCard,
    getProgress,
  };
}
