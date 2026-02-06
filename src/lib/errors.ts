/**
 * User-friendly error messages in English and German
 */

export class AppError extends Error {
  constructor(
    public code: string,
    public messageEn: string,
    public messageDe: string
  ) {
    super(messageEn);
    this.name = 'AppError';
  }
}

export const ErrorMessages = {
  // AI/Gemini Errors
  AI_GENERATION_FAILED: {
    code: 'AI_GENERATION_FAILED',
    en: 'AI generation failed. Please try again.',
    de: 'KI-Generierung fehlgeschlagen. Bitte versuchen Sie es erneut.',
  },
  AI_INVALID_RESPONSE: {
    code: 'AI_INVALID_RESPONSE',
    en: 'AI response is invalid. Please try again.',
    de: 'KI-Antwort ist ungültig. Bitte versuchen Sie es erneut.',
  },
  AI_API_KEY_MISSING: {
    code: 'AI_API_KEY_MISSING',
    en: 'AI API key is not configured.',
    de: 'KI-API-Schlüssel ist nicht konfiguriert.',
  },
  AI_QUOTA_EXCEEDED: {
    code: 'AI_QUOTA_EXCEEDED',
    en: 'AI quota exceeded.',
    de: 'KI-Kontingent überschritten.',
  },

  // Database Errors
  DB_DUPLICATE_TERM: {
    code: 'DB_DUPLICATE_TERM',
    en: 'This term already exists.',
    de: 'Dieser Begriff existiert bereits.',
  },
  DB_CONNECTION_FAILED: {
    code: 'DB_CONNECTION_FAILED',
    en: 'Database connection failed.',
    de: 'Datenbankverbindung fehlgeschlagen.',
  },
  DB_OPERATION_FAILED: {
    code: 'DB_OPERATION_FAILED',
    en: 'Database operation failed. Please try again.',
    de: 'Datenbankoperation fehlgeschlagen. Bitte versuchen Sie es erneut.',
  },

  // Auth Errors
  AUTH_UNAUTHORIZED: {
    code: 'AUTH_UNAUTHORIZED',
    en: 'Please sign in.',
    de: 'Bitte anmelden.',
  },
  AUTH_SESSION_EXPIRED: {
    code: 'AUTH_SESSION_EXPIRED',
    en: 'Your session has expired. Please sign in again.',
    de: 'Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.',
  },

  // Validation Errors
  VALIDATION_REQUIRED_FIELD: {
    code: 'VALIDATION_REQUIRED_FIELD',
    en: 'Please fill all required fields.',
    de: 'Bitte füllen Sie alle erforderlichen Felder aus.',
  },
  VALIDATION_INVALID_FORMAT: {
    code: 'VALIDATION_INVALID_FORMAT',
    en: 'Invalid input format.',
    de: 'Ungültiges Eingabeformat.',
  },

  // Network Errors
  NETWORK_ERROR: {
    code: 'NETWORK_ERROR',
    en: 'Network error.',
    de: 'Netzwerkfehler.',
  },

  // File Upload Errors
  FILE_UPLOAD_FAILED: {
    code: 'FILE_UPLOAD_FAILED',
    en: 'File upload failed.',
    de: 'Datei-Upload fehlgeschlagen.',
  },
  FILE_INVALID_FORMAT: {
    code: 'FILE_INVALID_FORMAT',
    en: 'Invalid file format.',
    de: 'Ungültiges Dateiformat.',
  },
  FILE_TOO_LARGE: {
    code: 'FILE_TOO_LARGE',
    en: 'File is too large.',
    de: 'Datei ist zu groß.',
  },

  // OCR Errors
  OCR_EXTRACTION_FAILED: {
    code: 'OCR_EXTRACTION_FAILED',
    en: 'Text extraction from image failed.',
    de: 'Textextraktion aus Bild fehlgeschlagen.',
  },
  OCR_NO_TEXT_FOUND: {
    code: 'OCR_NO_TEXT_FOUND',
    en: 'No text found in image.',
    de: 'Kein Text im Bild gefunden.',
  },

  // Generic
  UNKNOWN_ERROR: {
    code: 'UNKNOWN_ERROR',
    en: 'Unknown error. Please try again.',
    de: 'Unbekannter Fehler. Bitte versuchen Sie es erneut.',
  },
} as const;

/**
 * Map common error codes to user-friendly messages
 */
export function mapErrorToMessage(error: any): { code: string; en: string; de: string } {
  // Supabase duplicate key error
  if (error?.code === '23505') {
    return ErrorMessages.DB_DUPLICATE_TERM;
  }

  // Network errors
  if (error?.message?.includes('fetch') || error?.message?.includes('network')) {
    return ErrorMessages.NETWORK_ERROR;
  }

  // Auth errors
  if (error?.message?.includes('JWT') || error?.message?.includes('auth')) {
    return ErrorMessages.AUTH_UNAUTHORIZED;
  }

  // Gemini API errors
  if (error?.message?.includes('API key') || error?.message?.includes('GEMINI')) {
    return ErrorMessages.AI_API_KEY_MISSING;
  }

  if (error?.message?.includes('quota') || error?.message?.includes('limit')) {
    return ErrorMessages.AI_QUOTA_EXCEEDED;
  }

  // Default
  return ErrorMessages.UNKNOWN_ERROR;
}

/**
 * Create an AppError from any error
 */
export function createAppError(error: any, fallbackCode = 'UNKNOWN_ERROR'): AppError {
  const mapped = mapErrorToMessage(error);
  return new AppError(mapped.code, mapped.en, mapped.de);
}

/**
 * Get error message in user's preferred language
 */
export function getErrorMessage(error: any, language: 'en' | 'de' = 'en'): string {
  if (error instanceof AppError) {
    return language === 'de' ? error.messageDe : error.messageEn;
  }

  const mapped = mapErrorToMessage(error);
  return language === 'de' ? mapped.de : mapped.en;
}
