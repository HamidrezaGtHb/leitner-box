import Papa from 'papaparse';
import { Level, POS } from '@/types';

export interface CSVRow {
  term: string;
  level?: Level;
  pos?: POS;
  topic?: string;
}

export interface ParseResult {
  data: CSVRow[];
  errors: string[];
}

/**
 * Parse CSV file with German vocabulary terms
 * Expected columns: term, level (optional), pos (optional), topic (optional)
 */
export async function parseCSVFile(file: File): Promise<ParseResult> {
  return new Promise((resolve) => {
    const errors: string[] = [];
    const data: CSVRow[] = [];

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        // Validate and process each row
        results.data.forEach((row: any, index: number) => {
          // Validate required field
          if (!row.term || typeof row.term !== 'string' || row.term.trim() === '') {
            errors.push(`Row ${index + 1}: Missing or invalid 'term' field`);
            return;
          }

          // Validate optional level
          let level: Level | undefined;
          if (row.level) {
            const validLevels: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
            if (validLevels.includes(row.level as Level)) {
              level = row.level as Level;
            } else {
              errors.push(`Row ${index + 1}: Invalid level '${row.level}'`);
            }
          }

          // Validate optional pos
          let pos: POS | undefined;
          if (row.pos) {
            const validPOS: POS[] = ['noun', 'verb', 'adjective', 'adverb', 'phrase', 'other'];
            if (validPOS.includes(row.pos as POS)) {
              pos = row.pos as POS;
            } else {
              errors.push(`Row ${index + 1}: Invalid pos '${row.pos}'`);
            }
          }

          // Add valid row
          data.push({
            term: row.term.trim(),
            level,
            pos,
            topic: row.topic ? row.topic.trim() : undefined,
          });
        });

        resolve({ data, errors });
      },
      error: (error) => {
        errors.push(`Parse error: ${error.message}`);
        resolve({ data, errors });
      },
    });
  });
}

/**
 * Generate sample CSV content for download
 */
export function generateSampleCSV(): string {
  return `term,level,pos,topic
der Bahnhof,B1,noun,travel
lernen,A1,verb,education
schnell,A2,adjective,
gehen,A1,verb,movement
die Reise,B1,noun,travel`;
}
