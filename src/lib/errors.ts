/**
 * User-friendly error messages in Persian and English
 */

export class AppError extends Error {
  constructor(
    public code: string,
    public messageFa: string,
    public messageEn: string
  ) {
    super(messageEn);
    this.name = 'AppError';
  }
}

export const ErrorMessages = {
  // AI/Gemini Errors
  AI_GENERATION_FAILED: {
    code: 'AI_GENERATION_FAILED',
    fa: 'خطا در تولید محتوا توسط هوش مصنوعی. لطفاً دوباره تلاش کنید.',
    en: 'AI generation failed. Please try again.',
  },
  AI_INVALID_RESPONSE: {
    code: 'AI_INVALID_RESPONSE',
    fa: 'پاسخ هوش مصنوعی نامعتبر است. لطفاً دوباره تلاش کنید.',
    en: 'AI response is invalid. Please try again.',
  },
  AI_API_KEY_MISSING: {
    code: 'AI_API_KEY_MISSING',
    fa: 'کلید API هوش مصنوعی تنظیم نشده است.',
    en: 'AI API key is not configured.',
  },
  AI_QUOTA_EXCEEDED: {
    code: 'AI_QUOTA_EXCEEDED',
    fa: 'محدودیت استفاده از هوش مصنوعی به پایان رسیده است.',
    en: 'AI quota exceeded.',
  },

  // Database Errors
  DB_DUPLICATE_TERM: {
    code: 'DB_DUPLICATE_TERM',
    fa: 'این کلمه قبلاً اضافه شده است.',
    en: 'This term already exists.',
  },
  DB_CONNECTION_FAILED: {
    code: 'DB_CONNECTION_FAILED',
    fa: 'خطا در اتصال به پایگاه داده.',
    en: 'Database connection failed.',
  },
  DB_OPERATION_FAILED: {
    code: 'DB_OPERATION_FAILED',
    fa: 'خطا در انجام عملیات. لطفاً دوباره تلاش کنید.',
    en: 'Database operation failed. Please try again.',
  },

  // Auth Errors
  AUTH_UNAUTHORIZED: {
    code: 'AUTH_UNAUTHORIZED',
    fa: 'لطفاً وارد شوید.',
    en: 'Please sign in.',
  },
  AUTH_SESSION_EXPIRED: {
    code: 'AUTH_SESSION_EXPIRED',
    fa: 'نشست شما منقضی شده است. لطفاً دوباره وارد شوید.',
    en: 'Your session has expired. Please sign in again.',
  },

  // Validation Errors
  VALIDATION_REQUIRED_FIELD: {
    code: 'VALIDATION_REQUIRED_FIELD',
    fa: 'لطفاً تمام فیلدهای الزامی را پر کنید.',
    en: 'Please fill all required fields.',
  },
  VALIDATION_INVALID_FORMAT: {
    code: 'VALIDATION_INVALID_FORMAT',
    fa: 'فرمت ورودی نامعتبر است.',
    en: 'Invalid input format.',
  },

  // Network Errors
  NETWORK_ERROR: {
    code: 'NETWORK_ERROR',
    fa: 'خطا در اتصال به اینترنت.',
    en: 'Network error.',
  },

  // File Upload Errors
  FILE_UPLOAD_FAILED: {
    code: 'FILE_UPLOAD_FAILED',
    fa: 'خطا در آپلود فایل.',
    en: 'File upload failed.',
  },
  FILE_INVALID_FORMAT: {
    code: 'FILE_INVALID_FORMAT',
    fa: 'فرمت فایل نامعتبر است.',
    en: 'Invalid file format.',
  },
  FILE_TOO_LARGE: {
    code: 'FILE_TOO_LARGE',
    fa: 'حجم فایل خیلی بزرگ است.',
    en: 'File is too large.',
  },

  // OCR Errors
  OCR_EXTRACTION_FAILED: {
    code: 'OCR_EXTRACTION_FAILED',
    fa: 'خطا در استخراج متن از تصویر.',
    en: 'Text extraction from image failed.',
  },
  OCR_NO_TEXT_FOUND: {
    code: 'OCR_NO_TEXT_FOUND',
    fa: 'هیچ متنی در تصویر یافت نشد.',
    en: 'No text found in image.',
  },

  // Generic
  UNKNOWN_ERROR: {
    code: 'UNKNOWN_ERROR',
    fa: 'خطای ناشناخته. لطفاً دوباره تلاش کنید.',
    en: 'Unknown error. Please try again.',
  },
} as const;

/**
 * Map common error codes to user-friendly messages
 */
export function mapErrorToMessage(error: any): { code: string; fa: string; en: string } {
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
  return new AppError(mapped.code, mapped.fa, mapped.en);
}

/**
 * Get error message in user's preferred language
 */
export function getErrorMessage(error: any, language: 'fa' | 'en' = 'fa'): string {
  if (error instanceof AppError) {
    return language === 'fa' ? error.messageFa : error.messageEn;
  }

  const mapped = mapErrorToMessage(error);
  return language === 'fa' ? mapped.fa : mapped.en;
}
