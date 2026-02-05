import { createWorker } from 'tesseract.js';

/**
 * Extract German text from an image using Tesseract OCR
 */
export async function extractTextFromImage(
  imageFile: File
): Promise<string[]> {
  const worker = await createWorker('deu'); // German language

  try {
    const { data } = await worker.recognize(imageFile);
    
    // Split by lines and clean up
    const lines = data.text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    return lines;
  } finally {
    await worker.terminate();
  }
}

/**
 * Parse extracted text to find German terms
 * More flexible: extracts any German-looking words
 */
export function parseGermanTerms(lines: string[]): string[] {
  const terms: string[] = [];
  const seenTerms = new Set<string>();

  for (const line of lines) {
    // Skip very short lines or lines with numbers only
    if (line.length < 2 || /^\d+$/.test(line)) continue;

    // Extract all potential German words from the line
    // Matches words with German characters (including umlauts and ß)
    const words = line.match(/[a-zäöüßA-ZÄÖÜ][a-zäöüßA-ZÄÖÜ]+/g) || [];

    for (const word of words) {
      // Skip very short words and common non-German patterns
      if (word.length < 3) continue;
      if (/^[A-Z]+$/.test(word)) continue; // Skip all caps (likely abbreviations)
      
      // Normalize: trim and check for duplicates
      const normalized = word.trim();
      const lowerNormalized = normalized.toLowerCase();
      
      // Skip if already added (case-insensitive)
      if (seenTerms.has(lowerNormalized)) continue;
      
      // Pattern 1: Capitalized words (likely nouns)
      if (/^[A-ZÄÖÜ][a-zäöüß]+$/.test(normalized)) {
        terms.push(normalized);
        seenTerms.add(lowerNormalized);
        continue;
      }

      // Pattern 2: Lowercase words ending in common verb suffixes
      if (/^[a-zäöüß]+(?:en|ern|eln|ieren)$/.test(normalized)) {
        terms.push(normalized);
        seenTerms.add(lowerNormalized);
        continue;
      }

      // Pattern 3: Any word with German umlauts (likely German)
      if (/[äöüßÄÖÜ]/.test(normalized)) {
        terms.push(normalized);
        seenTerms.add(lowerNormalized);
      }
    }
  }

  return terms;
}
