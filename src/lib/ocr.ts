import { createWorker } from 'tesseract.js';

/**
 * Extract text from image using Tesseract OCR
 */
export async function extractTextFromImage(
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> {
  const worker = await createWorker('deu', 1, {
    logger: (m) => {
      if (m.status === 'recognizing text' && onProgress) {
        onProgress(Math.round(m.progress * 100));
      }
    },
  });

  const {
    data: { text },
  } = await worker.recognize(file);

  await worker.terminate();

  return text;
}

/**
 * Clean and tokenize extracted text
 */
export function cleanAndTokenize(text: string): string[] {
  // Remove special characters and normalize
  const cleaned = text
    .replace(/[^\p{L}\s\-]/gu, ' ') // Keep letters, spaces, and hyphens
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();

  // Split into words
  const words = cleaned.split(/\s+/);

  // Filter out very short or very long words
  return words.filter((word) => word.length >= 2 && word.length <= 30);
}

/**
 * Filter for German words using basic heuristics
 */
export function filterGermanWords(words: string[]): string[] {
  const germanWords: string[] = [];

  for (const word of words) {
    // Skip if empty or invalid
    if (!word || word.length < 2) continue;

    // Convert to lowercase for processing
    const lower = word.toLowerCase();

    // Skip common non-German words (basic filter)
    if (/^(the|and|or|is|are|was|were|in|on|at)$/i.test(word)) continue;

    // German-specific patterns (Umlauts, ß, capitalized nouns)
    const hasGermanChars = /[äöüÄÖÜß]/.test(word);
    const startsWithCapital = /^[A-ZÄÖÜ]/.test(word);

    // Keep if it has German characters or starts with capital (potential noun)
    if (hasGermanChars || startsWithCapital || word.length > 4) {
      germanWords.push(word);
    }
  }

  // Remove duplicates (case-insensitive)
  const uniqueWords = Array.from(
    new Map(germanWords.map((w) => [w.toLowerCase(), w])).values()
  );

  return uniqueWords;
}

/**
 * Extract German words from an image
 */
export async function extractGermanWordsFromImage(
  file: File,
  onProgress?: (progress: number) => void
): Promise<string[]> {
  // Step 1: OCR
  const text = await extractTextFromImage(file, (p) => {
    if (onProgress) onProgress(Math.round(p * 0.7)); // 70% of progress
  });

  // Step 2: Tokenize
  const words = cleanAndTokenize(text);
  if (onProgress) onProgress(80);

  // Step 3: Filter German words
  const germanWords = filterGermanWords(words);
  if (onProgress) onProgress(100);

  return germanWords;
}

/**
 * Validate words using AI (batch)
 */
export async function validateGermanWords(
  words: string[],
  minLevel: 'B1' | 'B2' | 'C1' | 'C2' = 'B1'
): Promise<string[]> {
  // This will be called from the API route
  const response = await fetch('/api/validate-words', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ words, minLevel }),
  });

  if (!response.ok) {
    throw new Error('Failed to validate words');
  }

  const data = await response.json();
  return data.validWords;
}
