/**
 * Duplicate Detection using Levenshtein Distance
 * Finds similar words in the card collection to prevent duplicates
 */

import levenshtein from 'fast-levenshtein';
import { dbFindCardByNormalizedKey, dbFindBacklogByNormalizedKey } from './db';
import { loadCards, loadBacklog } from './storage';
import { isSupabaseConfigured } from './supabase';

/**
 * Generate normalized key for deduplication
 * Removes articles, normalizes spaces, lowercase, keeps German characters
 */
export function generateNormalizedKey(word: string): string {
  let normalized = word
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' '); // Normalize spaces

  // Remove German articles at the beginning
  normalized = normalized.replace(/^(der|die|das|ein|eine)\s+/i, '');

  // Remove special characters except German umlauts and ß
  normalized = normalized.replace(/[^\w\säöüß]/gi, '');

  return normalized;
}

/**
 * Normalize German word for comparison (legacy)
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

/**
 * Check for duplicate across the entire system (cards + backlog)
 */
export async function checkDuplicateAcrossSystem(
  word: string,
  userId?: string
): Promise<{ exists: boolean; location: 'cards' | 'backlog' | null; word?: string }> {
  const normalized = generateNormalizedKey(word);

  if (isSupabaseConfigured() && userId) {
    // Check Supabase
    const existingCard = await dbFindCardByNormalizedKey(normalized, userId);
    if (existingCard) {
      return { exists: true, location: 'cards', word: existingCard.wordData.word };
    }

    const existingBacklog = await dbFindBacklogByNormalizedKey(normalized, userId);
    if (existingBacklog) {
      return { exists: true, location: 'backlog', word: existingBacklog.wordData.word };
    }
  } else {
    // Check LocalStorage
    const cards = loadCards();
    const existingCard = cards.find((c) => c.normalizedKey === normalized);
    if (existingCard) {
      return { exists: true, location: 'cards', word: existingCard.wordData.word };
    }

    const backlog = loadBacklog();
    const existingBacklog = backlog.find((b) => b.normalizedKey === normalized);
    if (existingBacklog) {
      return { exists: true, location: 'backlog', word: existingBacklog.wordData.word };
    }
  }

  return { exists: false, location: null };
}

/**
 * Check multiple words for duplicates
 */
export async function checkMultipleDuplicates(
  words: string[],
  userId?: string
): Promise<{
  duplicates: string[];
  unique: string[];
  details: Record<string, { location: 'cards' | 'backlog'; existingWord: string }>;
}> {
  const duplicates: string[] = [];
  const unique: string[] = [];
  const details: Record<string, { location: 'cards' | 'backlog'; existingWord: string }> = {};

  for (const word of words) {
    const result = await checkDuplicateAcrossSystem(word, userId);
    if (result.exists && result.location && result.word) {
      duplicates.push(word);
      details[word] = {
        location: result.location,
        existingWord: result.word,
      };
    } else {
      unique.push(word);
    }
  }

  return { duplicates, unique, details };
}
