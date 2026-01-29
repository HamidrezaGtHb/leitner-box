'use client';

import { useLeitner } from './use-leitner';
import { LeitnerCard } from '@/types';
import { calculateSimilarity, isDuplicateWord } from '@/lib/duplicate-detector';

export interface DuplicateResult {
  isDuplicate: boolean;
  existingCard?: LeitnerCard;
  similarity: number;
  suggestion: string;
}

export function useDuplicateCheck() {
  const { cards } = useLeitner();
  
  const checkDuplicate = (word: string): DuplicateResult => {
    if (!word || !word.trim()) {
      return {
        isDuplicate: false,
        similarity: 0,
        suggestion: '',
      };
    }
    
    const normalizedWord = word.trim().toLowerCase();
    let bestMatch: { card: LeitnerCard; similarity: number } | null = null;
    
    // Check all existing cards
    for (const card of cards) {
      const cardWord = card.wordData.word.toLowerCase();
      const similarity = calculateSimilarity(normalizedWord, cardWord);
      
      if (!bestMatch || similarity > bestMatch.similarity) {
        bestMatch = { card, similarity };
      }
      
      // Early exit for exact match
      if (similarity === 100) {
        break;
      }
    }
    
    // Threshold: 85% = likely duplicate
    const threshold = 85;
    
    if (bestMatch && bestMatch.similarity >= threshold) {
      const boxNumber = bestMatch.card.boxIndex;
      return {
        isDuplicate: true,
        existingCard: bestMatch.card,
        similarity: bestMatch.similarity,
        suggestion: bestMatch.similarity === 100
          ? `Already exists in Box ${boxNumber}`
          : `Similar word "${bestMatch.card.wordData.word}" in Box ${boxNumber} (${bestMatch.similarity}% match)`,
      };
    }
    
    return {
      isDuplicate: false,
      similarity: bestMatch?.similarity || 0,
      suggestion: '',
    };
  };
  
  const checkMultipleDuplicates = (words: string[]): Map<string, DuplicateResult> => {
    const results = new Map<string, DuplicateResult>();
    
    for (const word of words) {
      results.set(word, checkDuplicate(word));
    }
    
    return results;
  };
  
  return {
    checkDuplicate,
    checkMultipleDuplicates,
  };
}
