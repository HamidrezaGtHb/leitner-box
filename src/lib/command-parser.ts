/**
 * Natural Language Command Parser
 * Interprets user input and converts to structured commands
 */

export type CommandType =
  | 'add-word'
  | 'add-bulk'
  | 'generate'
  | 'extract-image'
  | 'show-stats'
  | 'navigate'
  | 'unknown';

export interface ParsedCommand {
  type: CommandType;
  args: Record<string, any>;
  confidence: number; // 0-100
  raw: string;
}

type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

/**
 * Parse user input into a structured command
 */
export function parseCommand(input: string): ParsedCommand {
  const trimmed = input.trim().toLowerCase();
  
  if (!trimmed) {
    return {
      type: 'unknown',
      args: {},
      confidence: 0,
      raw: input,
    };
  }
  
  // Pattern 1: Generate command "10 b2" or "generate 10 b2"
  const generateMatch = trimmed.match(/(?:gen(?:erate)?\s+)?(\d+)\s*(a1|a2|b1|b2|c1|c2)/i);
  if (generateMatch) {
    const count = parseInt(generateMatch[1], 10);
    const level = generateMatch[2].toUpperCase() as Level;
    return {
      type: 'generate',
      args: { count, level },
      confidence: 95,
      raw: input,
    };
  }
  
  // Pattern 2: Just number and level "10 b2"
  const shortGenerateMatch = trimmed.match(/^(\d+)\s*(a1|a2|b1|b2|c1|c2)$/i);
  if (shortGenerateMatch) {
    const count = parseInt(shortGenerateMatch[1], 10);
    const level = shortGenerateMatch[2].toUpperCase() as Level;
    return {
      type: 'generate',
      args: { count, level },
      confidence: 90,
      raw: input,
    };
  }
  
  // Pattern 3: Image/OCR keywords
  const imageKeywords = /^(image|img|pic|picture|photo|ocr|scan|extract)$/i;
  if (imageKeywords.test(trimmed)) {
    return {
      type: 'extract-image',
      args: {},
      confidence: 95,
      raw: input,
    };
  }
  
  // Pattern 4: Stats/Dashboard keywords
  const statsKeywords = /^(stats?|statistics|dash(?:board)?|progress|chart)$/i;
  if (statsKeywords.test(trimmed)) {
    return {
      type: 'show-stats',
      args: {},
      confidence: 95,
      raw: input,
    };
  }
  
  // Pattern 5: Navigation keywords
  const navPatterns = [
    { pattern: /^(review|start|begin)$/i, target: '/review' },
    { pattern: /^(backlog|queue|scheduled)$/i, target: '/backlog' },
    { pattern: /^(library|lib|words|all)$/i, target: '/library' },
    { pattern: /^(settings?|config|preferences)$/i, target: '/settings' },
    { pattern: /^(home|main)$/i, target: '/' },
  ];
  
  for (const { pattern, target } of navPatterns) {
    if (pattern.test(trimmed)) {
      return {
        type: 'navigate',
        args: { path: target },
        confidence: 90,
        raw: input,
      };
    }
  }
  
  // Pattern 6: Add word command "add haus" or just "haus"
  const addWordMatch = trimmed.match(/^(?:add\s+)?([a-zäöüß]+)$/i);
  if (addWordMatch) {
    const word = addWordMatch[1];
    return {
      type: 'add-word',
      args: { word },
      confidence: 85,
      raw: input,
    };
  }
  
  // Pattern 7: Bulk add "add 5 words" or "5 words"
  const bulkAddMatch = trimmed.match(/^(?:add\s+)?(\d+)\s+words?$/i);
  if (bulkAddMatch) {
    const count = parseInt(bulkAddMatch[1], 10);
    return {
      type: 'add-bulk',
      args: { count },
      confidence: 80,
      raw: input,
    };
  }
  
  // Default: if it looks like a German word, treat as add-word
  if (/^[a-zäöüß]+$/i.test(trimmed) && trimmed.length >= 2) {
    return {
      type: 'add-word',
      args: { word: trimmed },
      confidence: 70,
      raw: input,
    };
  }
  
  // Unknown command
  return {
    type: 'unknown',
    args: {},
    confidence: 0,
    raw: input,
  };
}

/**
 * Get suggestions for a partial input
 */
export function getSuggestions(input: string): string[] {
  const trimmed = input.trim().toLowerCase();
  
  const allSuggestions = [
    // Generate commands
    '10 b1',
    '10 b2',
    '25 b2',
    '50 c1',
    // Navigation
    'review',
    'backlog',
    'library',
    'stats',
    'dashboard',
    'settings',
    // Actions
    'image',
    'ocr',
    'generate',
  ];
  
  if (!trimmed) {
    return allSuggestions.slice(0, 5);
  }
  
  return allSuggestions
    .filter((suggestion) => suggestion.startsWith(trimmed))
    .slice(0, 5);
}
