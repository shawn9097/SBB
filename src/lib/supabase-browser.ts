import { createBrowserClient } from "@supabase/ssr";

// Browser Supabase client for client components (login/signup). Uses the anon key
// and persists the session in cookies so the server can read it.
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
