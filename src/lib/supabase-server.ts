import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Cookie-backed Supabase client for Server Components, Server Actions, and Route Handlers.
// Reads the user's session from request cookies and respects RLS (anon key).
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          // Server Components can't set cookies; the middleware refreshes the session.
          // Swallowing the error here is the documented Supabase SSR pattern.
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            /* no-op: called from a Server Component */
          }
        },
      },
    }
  );
}
