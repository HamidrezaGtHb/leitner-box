/**
 * Duplicate Detection using Levenshtein Distance
 * Finds similar words in the card collection to prevent duplicates
 */

import levenshtein from 'fast-levenshtein';

/**
 * Calculate similarity percentage between two words
 * @returns number between 0-100 (100 = identical)
 */
export function calculateSimilarity(word1: string, word2: string): number {
  const normalized1 = word1.toLowerCase().trim();
  const normalized2 = word2.toLowerCase().trim();
  
  // Exact match
  if (normalized1 === normalized2) {
    return 100;
  }
  
  const distance = levenshtein.get(normalized1, normalized2);
  const maxLen = Math.max(word1.length, word2.length);
  
  if (maxLen === 0) return 100;
  
  const similarity = Math.round((1 - distance / maxLen) * 100);
  return Math.max(0, Math.min(100, similarity));
}

/**
 * Check if two words are likely duplicates
 * Threshold: 85% similarity
 */
export function isDuplicateWord(word1: string, word2: string, threshold: number = 85): boolean {
  return calculateSimilarity(word1, word2) >= threshold;
}

/**
 * Normalize German word for comparison
 * Handles common variations and typos
 */
export function normalizeGermanWord(word: string): string {
  return word
    .toLowerCase()
    .trim()
    .replace(/ß/g, 'ss')  // ß → ss
    .replace(/ä/g, 'ae')  // ä → ae
    .replace(/ö/g, 'oe')  // ö → oe
    .replace(/ü/g, 'ue'); // ü → ue
}

/**
 * Find best matches for a word
 * Returns top N matches sorted by similarity
 */
export interface Match {
  word: string;
  similarity: number;
}

export function findBestMatches(
  targetWord: string,
  words: string[],
  topN: number = 5,
  minSimilarity: number = 70
): Match[] {
  const matches: Match[] = words
    .map((word) => ({
      word,
      similarity: calculateSimilarity(targetWord, word),
    }))
    .filter((match) => match.similarity >= minSimilarity)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topN);
  
  return matches;
}
