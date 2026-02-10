/**
 * Simple encryption/decryption utility for API keys
 * Uses base64 encoding with a simple XOR cipher for basic obfuscation
 * Note: This is not military-grade encryption, but sufficient for API keys in database
 */

const CRYPTO_SECRET = process.env.CRYPTO_SECRET || 'leitner-box-secret-key-2026';

/**
 * Encrypt a string (API key) for storage
 */
export function encryptApiKey(apiKey: string): string {
  if (!apiKey) return '';
  
  try {
    // XOR cipher with secret
    const encrypted = Array.from(apiKey)
      .map((char, i) => {
        const secretChar = CRYPTO_SECRET.charCodeAt(i % CRYPTO_SECRET.length);
        return String.fromCharCode(char.charCodeAt(0) ^ secretChar);
      })
      .join('');
    
    // Base64 encode
    return Buffer.from(encrypted, 'binary').toString('base64');
  } catch (error) {
    console.error('Encryption error:', error);
    return '';
  }
}

/**
 * Decrypt a string (API key) from storage
 */
export function decryptApiKey(encryptedKey: string): string {
  if (!encryptedKey) return '';
  
  try {
    // Base64 decode
    const encrypted = Buffer.from(encryptedKey, 'base64').toString('binary');
    
    // XOR cipher with secret (same operation decrypts)
    const decrypted = Array.from(encrypted)
      .map((char, i) => {
        const secretChar = CRYPTO_SECRET.charCodeAt(i % CRYPTO_SECRET.length);
        return String.fromCharCode(char.charCodeAt(0) ^ secretChar);
      })
      .join('');
    
    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    return '';
  }
}

/**
 * Validate if a string looks like a valid Gemini API key
 */
export function isValidGeminiApiKey(apiKey: string): boolean {
  if (!apiKey) return false;
  
  // Gemini API keys typically start with "AIza" and are ~39 characters
  const pattern = /^AIza[A-Za-z0-9_-]{35,}$/;
  return pattern.test(apiKey.trim());
}

/**
 * Mask API key for display (show only first 8 and last 4 chars)
 */
export function maskApiKey(apiKey: string): string {
  if (!apiKey || apiKey.length < 12) return '••••••••••••';
  
  const first = apiKey.substring(0, 8);
  const last = apiKey.substring(apiKey.length - 4);
  const masked = '•'.repeat(Math.max(apiKey.length - 12, 4));
  
  return `${first}${masked}${last}`;
}
