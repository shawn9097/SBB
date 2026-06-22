"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

const FIELD =
  "w-full border border-[#E0D3B2] bg-[#FBF6EA] rounded px-3 py-2 text-sm text-[#0F1417] focus:outline-none focus:border-[#C8923A]";
const LABEL = "block text-sm font-medium text-[#28394B] mb-1.5";

export default function Login() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") || "");
    const password = String(data.get("password") || "");

    const supabase = createSupabaseBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setSubmitting(false);
      return;
    }

    const next =
      new URLSearchParams(window.location.search).get("next") || "/onboarding";
    router.push(next);
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#EFE6D0] text-[#0F1417] flex items-center justify-center px-6 py-16">
      <div className="max-w-sm w-full">
        <p className="font-mono text-xs tracking-widest uppercase text-[#6B7178] mb-4">
          Welcome back
        </p>
        <h1 className="font-serif text-3xl font-semibold mb-8 tracking-tight">
          Log in<span className="text-[#C8923A]">.</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={LABEL}>Email</label>
            <input name="email" type="email" required className={FIELD} />
          </div>
          <div>
            <label className={LABEL}>Password</label>
            <input name="password" type="password" required className={FIELD} />
          </div>

          {error && (
            <p className="text-sm text-[#9B2C2C] bg-[#F7E4E1] border border-[#E8C4BE] rounded px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#28394B] text-[#EFE6D0] px-8 py-4 rounded text-base font-medium hover:bg-[#1A2530] transition-colors disabled:opacity-60"
          >
            {submitting ? "Logging in…" : "Log in"}
          </button>
        </form>

        <p className="text-sm text-[#6B7178] mt-6 text-center">
          Need an account?{" "}
          <a href="/signup" className="text-[#A57628] underline">
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}
