"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function EmailCapture({ cta = "Claim Your Key" }: { cta?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("subscribe failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="font-display text-(--color-gild-glow) text-sm tracking-wide">
        Check your inbox to confirm your key. Welcome to the underground.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 rounded-sm border border-(--color-tarnished-gold)/40 bg-(--color-charcoal) px-4 py-3 text-(--color-bone) placeholder:text-(--color-muted-bone) outline-none focus:border-(--color-gild-glow)"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-sm border border-(--color-antique-gold) bg-(--color-antique-gold)/10 px-6 py-3 font-display text-sm uppercase tracking-widest text-(--color-gild-glow) transition hover:bg-(--color-antique-gold)/20 disabled:opacity-50"
      >
        {status === "loading" ? "Opening the gate…" : cta}
      </button>
      {status === "error" && (
        <p className="text-sm text-(--color-crimson) sm:absolute">
          Something broke down here. Try again.
        </p>
      )}
    </form>
  );
}
