'use server';

import { createClient } from '@/lib/supabase/server';
import { encryptApiKey, decryptApiKey, isValidGeminiApiKey } from '@/lib/crypto';
import { ErrorMessages } from '@/lib/errors';

/**
 * Server Action: Save user's personal Gemini API key
 */
export async function saveGeminiApiKeyAction(
  apiKey: string
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        error: ErrorMessages.AUTH_UNAUTHORIZED.en,
      };
    }

    // Validate API key format
    if (!isValidGeminiApiKey(apiKey)) {
      return {
        success: false,
        error: 'Invalid API key format. Gemini API keys should start with "AIza".',
      };
    }

    // Encrypt API key before storing
    const encryptedKey = encryptApiKey(apiKey);

    // Update settings
    const { error } = await supabase
      .from('settings')
      .update({ 
        gemini_api_key: encryptedKey,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', user.id);

    if (error) {
      console.error('Error saving API key:', error);
      return {
        success: false,
        error: 'Failed to save API key. Please try again.',
      };
    }

    return { success: true };
  } catch (error: any) {
    console.error('saveGeminiApiKeyAction error:', error);
    return {
      success: false,
      error: error.message || 'An error occurred while saving API key.',
    };
  }
}

/**
 * Server Action: Remove user's personal Gemini API key
 */
export async function removeGeminiApiKeyAction(): Promise<
  { success: true } | { success: false; error: string }
> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        error: ErrorMessages.AUTH_UNAUTHORIZED.en,
      };
    }

    // Remove API key
    const { error } = await supabase
      .from('settings')
      .update({ 
        gemini_api_key: null,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', user.id);

    if (error) {
      console.error('Error removing API key:', error);
      return {
        success: false,
        error: 'Failed to remove API key. Please try again.',
      };
    }

    return { success: true };
  } catch (error: any) {
    console.error('removeGeminiApiKeyAction error:', error);
    return {
      success: false,
      error: error.message || 'An error occurred while removing API key.',
    };
  }
}

/**
 * Server Action: Get user's API key status (masked for display)
 */
export async function getApiKeyStatusAction(): Promise<
  { success: true; hasKey: boolean; maskedKey?: string } | { success: false; error: string }
> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        error: ErrorMessages.AUTH_UNAUTHORIZED.en,
      };
    }

    const { data: settings } = await supabase
      .from('settings')
      .select('gemini_api_key')
      .eq('user_id', user.id)
      .single();

    if (!settings?.gemini_api_key) {
      return {
        success: true,
        hasKey: false,
      };
    }

    // Decrypt and mask for display
    const decrypted = decryptApiKey(settings.gemini_api_key);
    const masked = decrypted ? `${decrypted.substring(0, 8)}...${decrypted.substring(decrypted.length - 4)}` : '';

    return {
      success: true,
      hasKey: true,
      maskedKey: masked,
    };
  } catch (error: any) {
    console.error('getApiKeyStatusAction error:', error);
    return {
      success: false,
      error: error.message || 'An error occurred while fetching API key status.',
    };
  }
}
