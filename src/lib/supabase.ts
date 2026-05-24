import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Browser-safe client (uses anon key, respects RLS)
export const supabase = createClient(url, anon);

// Server-only admin client (bypasses RLS — only use in API routes)
export function supabaseAdmin() {
  if (!serviceRole) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  return createClient(url, serviceRole, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
