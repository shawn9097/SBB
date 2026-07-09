"use client";

import { useId, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function EmailCapture({ cta = "Claim Your Key" }: { cta?: string }) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const inputId = useId();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company }),
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
      <p
        role="status"
        aria-live="polite"
        className="font-display text-sm tracking-wide text-(--color-gild-glow)"
      >
        Check your inbox to confirm your key — the vault opens from there.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
    >
      <label htmlFor={inputId} className="sr-only">
        Email address
      </label>
      <input
        id={inputId}
        type="email"
        required
        autoComplete="email"
        disabled={status === "loading"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 rounded-sm border border-(--color-tarnished-gold)/40 bg-(--color-charcoal) px-4 py-3 text-(--color-bone) placeholder:text-(--color-muted-bone) outline-none focus-visible:border-(--color-gild-glow) disabled:opacity-60"
      />

      {/* Honeypot — hidden from humans, catches bots. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="hidden"
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-sm border border-(--color-antique-gold) bg-(--color-antique-gold)/10 px-6 py-3 font-display text-sm uppercase tracking-widest text-(--color-gild-glow) transition hover:bg-(--color-antique-gold)/20 disabled:opacity-50"
      >
        {status === "loading" ? "Opening the gate…" : cta}
      </button>

      {status === "error" && (
        <p
          role="alert"
          className="text-sm text-(--color-gild-glow) sm:absolute sm:mt-14"
        >
          Something broke down here. Try again.
        </p>
      )}
    </form>
  );
}
