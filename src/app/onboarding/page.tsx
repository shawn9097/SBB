"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import PlanPicker from "@/components/PlanPicker";

const NICHES = [
  { value: "roofing", label: "Roofing" },
  { value: "hvac", label: "HVAC Replacement" },
  { value: "painting", label: "Painting" },
  { value: "kitchen_bath", label: "Kitchen & Bath Remodeling" },
  { value: "landscaping", label: "Landscaping" },
  { value: "fencing", label: "Fence Building" },
] as const;

const FIELD =
  "w-full border border-[#E0D3B2] bg-[#FBF6EA] rounded px-3 py-2 text-sm text-[#0F1417] focus:outline-none focus:border-[#C8923A]";
const LABEL = "block text-sm font-medium text-[#28394B] mb-1.5";
const HINT = "text-xs text-[#6B7178] mb-1.5";

interface SuccessState {
  inbound_email_address: string;
  voice_twin_ready: boolean;
}

export default function Onboarding() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<SuccessState | null>(null);

  async function handleSignOut() {
    await createSupabaseBrowserClient().auth.signOut();
    router.push("/login");
    router.refresh();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Something went wrong. Please try again.");
        return;
      }
      setSuccess({
        inbound_email_address: json.inbound_email_address,
        voice_twin_ready: json.voice_twin_ready,
      });
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <main className="min-h-screen bg-[#EFE6D0] text-[#0F1417] px-6 py-16">
        <div className="max-w-lg w-full mx-auto text-center">
          <p className="font-mono text-xs tracking-widest uppercase text-[#6B7178] mb-4">
            You&apos;re set up
          </p>
          <h1 className="font-serif text-4xl font-semibold mb-6 tracking-tight">
            Your Warmside address is ready<span className="text-[#C8923A]">.</span>
          </h1>
          <p className="text-[#3A4148] mb-6 leading-relaxed">
            BCC this address whenever you send an estimate. We&apos;ll take it from
            there — following up in your voice until the prospect replies.
          </p>
          <div className="bg-[#28394B] text-[#EFE6D0] rounded-lg px-6 py-5 font-mono text-lg break-all mb-6">
            {success.inbound_email_address}
          </div>
          <p className="text-sm text-[#6B7178] mb-12">
            {success.voice_twin_ready
              ? "✓ Voice Twin trained — your follow-ups will sound like you wrote them."
              : "Voice Twin not trained yet — follow-ups will use our proven templates until you add writing samples."}
          </p>

          <h2 className="font-serif text-2xl font-semibold mb-2 tracking-tight">
            Activate your plan
          </h2>
          <p className="text-sm text-[#3A4148] mb-6">
            Pick a plan to turn your follow-ups on. Cancel anytime · 30-day guarantee.
          </p>
          <PlanPicker />

          <a
            href="/dashboard"
            className="inline-block mt-8 text-sm text-[#6B7178] hover:text-[#A57628] underline"
          >
            Skip for now — go to dashboard
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#EFE6D0] text-[#0F1417] px-6 py-16">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <p className="font-mono text-xs tracking-widest uppercase text-[#6B7178]">
            Onboarding · Voice Twin
          </p>
          <button
            type="button"
            onClick={handleSignOut}
            className="font-mono text-xs text-[#6B7178] hover:text-[#A57628] underline"
          >
            Sign out
          </button>
        </div>
        <h1 className="font-serif text-4xl font-semibold mb-3 tracking-tight">
          Let&apos;s teach Warmside your voice<span className="text-[#C8923A]">.</span>
        </h1>
        <p className="text-[#3A4148] mb-10 leading-relaxed">
          A few details about your business, then paste a handful of real texts and
          emails you&apos;ve sent customers. The more you give us, the more your
          follow-ups will sound exactly like you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <section className="space-y-4">
            <h2 className="font-serif text-xl font-semibold border-b border-[#E0D3B2] pb-2">
              Your business
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={LABEL}>First name</label>
                <input name="first_name" required className={FIELD} />
              </div>
              <div>
                <label className={LABEL}>Last name</label>
                <input name="last_name" required className={FIELD} />
              </div>
            </div>
            <div>
              <label className={LABEL}>Company name</label>
              <input name="company_name" required className={FIELD} />
            </div>
            <div>
              <label className={LABEL}>Mobile phone</label>
              <p className={HINT}>Where we forward prospect replies.</p>
              <input name="phone" type="tel" required className={FIELD} />
            </div>
            <div>
              <label className={LABEL}>Trade</label>
              <select name="trade_niche" required defaultValue="" className={FIELD}>
                <option value="" disabled>
                  Choose your trade…
                </option>
                {NICHES.map((n) => (
                  <option key={n.value} value={n.value}>
                    {n.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={LABEL}>
                  What sets your work apart?{" "}
                  <span className="font-normal text-[#6B7178]">(optional)</span>
                </label>
                <p className={HINT}>e.g. &ldquo;a full tear-off, not a layover&rdquo;</p>
                <input name="trade_value_1" className={FIELD} />
              </div>
              <div>
                <label className={LABEL}>
                  Typical lead time{" "}
                  <span className="font-normal text-[#6B7178]">(optional)</span>
                </label>
                <p className={HINT}>e.g. &ldquo;2–4&rdquo; weeks</p>
                <input name="lead_time_weeks" className={FIELD} />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-xl font-semibold border-b border-[#E0D3B2] pb-2">
              Your voice
            </h2>
            <div>
              <label className={LABEL}>
                Real texts you&apos;ve sent customers{" "}
                <span className="font-normal text-[#6B7178]">(optional)</span>
              </label>
              <p className={HINT}>
                Paste a few. Separate each one with a blank line.
              </p>
              <textarea name="sample_texts" rows={5} className={FIELD} />
            </div>
            <div>
              <label className={LABEL}>
                Emails that closed deals{" "}
                <span className="font-normal text-[#6B7178]">(optional)</span>
              </label>
              <p className={HINT}>Separate each email with a blank line.</p>
              <textarea name="sample_emails" rows={5} className={FIELD} />
            </div>
            <div>
              <label className={LABEL}>
                Trade or regional notes{" "}
                <span className="font-normal text-[#6B7178]">(optional)</span>
              </label>
              <input name="trade_notes" className={FIELD} />
            </div>
            <div>
              <label className={LABEL}>
                Things you&apos;d never say{" "}
                <span className="font-normal text-[#6B7178]">(optional)</span>
              </label>
              <p className={HINT}>Words or phrases that don&apos;t sound like you.</p>
              <input name="never_say" className={FIELD} />
            </div>
          </section>

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
            {submitting ? "Setting up your Voice Twin…" : "Create my Warmside address"}
          </button>
        </form>
      </div>
    </main>
  );
}
