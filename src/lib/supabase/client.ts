import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/3800b4ab-4f41-4969-919d-5622e2a1a76b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'supabase/client.ts:4',message:'Creating Supabase client',data:{hasUrl:!!process.env.NEXT_PUBLIC_SUPABASE_URL,hasKey:!!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,url:process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0,30)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
