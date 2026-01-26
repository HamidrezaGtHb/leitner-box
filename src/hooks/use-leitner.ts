'use client';

import { useState, useEffect } from 'react';
import { LeitnerCard, WordData, Progress } from '@/types';
import {
  loadCards,
  saveCards,
  loadSettings,
  updateTodayStats,
} from '@/lib/storage';
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

  // Load cards on mount
  useEffect(() => {
    const loadedCards = loadCards();
    setCards(loadedCards);
    setIsLoaded(true);
  }, []);

  // Save cards whenever they change
  useEffect(() => {
    if (isLoaded) {
      saveCards(cards);
    }
  }, [cards, isLoaded]);

  const addWord = (wordData: WordData) => {
    const card = createCard(wordData);
    setCards((prev) => [...prev, card]);
    updateTodayStats(1, 0, 0, 0);
  };

  const reviewCard = (cardId: string, correct: boolean) => {
    setCards((prev) =>
      prev.map((card) => {
        if (card.id === cardId) {
          const updatedCard = correct ? moveCardUp(card) : moveCardDown(card);
          updateTodayStats(0, 1, correct ? 1 : 0, correct ? 0 : 1);
          return updatedCard;
        }
        return card;
      })
    );
  };

  const deleteCard = (cardId: string) => {
    setCards((prev) => prev.filter((card) => card.id !== cardId));
  };

  const getProgress = (): Progress => {
    const settings = loadSettings();
    const todayString = getTodayString();
    const dueCards = getDueCards(cards);
    const newCards = getNewCards(cards);

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
      cardsDueToday: dueCards.length,
      newWordsToday,
      studiedToday: 0, // Will be tracked in daily stats
      correctToday: 0,
      incorrectToday: 0,
      lastStudyDate: todayString,
    };
  };

  const canAddNewWord = (): boolean => {
    const settings = loadSettings();
    return !hasReachedDailyLimit(cards, settings.dailyNewWords);
  };

  return {
    cards,
    isLoaded,
    addWord,
    reviewCard,
    deleteCard,
    getProgress,
    canAddNewWord,
    dueCards: getDueCards(cards),
    newCards: getNewCards(cards),
  };
}
