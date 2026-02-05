// Dev auth helper - temporary file for debugging
export const DEV_MODE = true;

export async function getOrDevUser(supabase: any) {
  if (DEV_MODE) {
    return { id: 'dev-user-id', email: 'dev@example.com' };
  }
  
  const { data: { user }, error } = await supabase.auth.getUser();
  return user;
}
