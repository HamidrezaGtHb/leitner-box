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
 * Looks for patterns like "der/die/das Word" for nouns, or standalone words
 */
export function parseGermanTerms(lines: string[]): string[] {
  const terms: string[] = [];

  for (const line of lines) {
    // Pattern 1: Lines starting with articles (der, die, das)
    const articleMatch = line.match(/^(der|die|das)\s+([A-ZÄÖÜ][a-zäöüß]+)/i);
    if (articleMatch) {
      terms.push(`${articleMatch[1]} ${articleMatch[2]}`);
      continue;
    }

    // Pattern 2: Just capitalized German words (potential nouns)
    const capitalizedMatch = line.match(/^([A-ZÄÖÜ][a-zäöüß]+)$/);
    if (capitalizedMatch) {
      terms.push(capitalizedMatch[1]);
      continue;
    }

    // Pattern 3: Verbs in infinitive (lowercase, ending in -en, -ern, -eln)
    const verbMatch = line.match(/^([a-zäöüß]+(?:en|ern|eln))$/);
    if (verbMatch) {
      terms.push(verbMatch[1]);
    }
  }

  return terms;
}
