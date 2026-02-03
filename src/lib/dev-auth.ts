import { SupabaseClient } from '@supabase/supabase-js';

// Dev mode: when true, bypasses authentication
export const DEV_MODE = true;

// A fixed UUID for development - all data will be stored under this user
export const DEV_USER_ID = '00000000-0000-0000-0000-000000000001';

// Mock user object for dev mode
export const DEV_USER = {
  id: DEV_USER_ID,
  email: 'dev@localhost',
  aud: 'authenticated',
  role: 'authenticated',
  created_at: new Date().toISOString(),
} as const;

/**
 * Gets the current user, falling back to dev user when DEV_MODE is enabled
 * Works with both client and server Supabase clients
 */
export async function getOrDevUser(supabase: SupabaseClient) {
  // Try to get real user first
  const { data: { user } } = await supabase.auth.getUser();

  // If user exists, return them
  if (user) {
    return user;
  }

  // If no user and dev mode is on, return dev user
  if (DEV_MODE) {
    return DEV_USER;
  }

  return null;
}
