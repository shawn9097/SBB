"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function EmailForm({
  variant = "primary",
}: {
  variant?: "primary" | "secondary";
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { error?: string };

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMsg(data.error ?? "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Connection failed. Try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-2 text-center">
        <div className="w-10 h-px bg-[#A8772E] opacity-60" />
        <p
          className="text-[#C9A227] text-base tracking-wider"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Welcome to Underdog City, tenant.
        </p>
        <p className="text-[#A9A192] text-sm">{"You'll hear it first."}</p>
      </div>
    );
  }

  const isPrimary = variant === "primary";

  return (
    <div className="w-full max-w-md space-y-2">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3"
        noValidate
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          disabled={status === "loading"}
          className="flex-1 min-w-0 bg-[#151310] border border-[#A8772E]/40 text-[#E3DCCB] placeholder:text-[#A9A192]/60 px-4 py-3 text-sm focus:outline-none focus:border-[#C9A227] transition-colors duration-200 disabled:opacity-50"
          aria-label="Email address"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={`shrink-0 px-6 py-3 text-[0.65rem] tracking-[0.22em] uppercase font-semibold transition-all duration-200 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed ${
            isPrimary
              ? "bg-[#A8772E] text-[#0A0A0B] hover:bg-[#E8B84B]"
              : "bg-transparent border border-[#A8772E] text-[#C9A227] hover:bg-[#A8772E]/10 hover:border-[#C9A227]"
          }`}
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          {status === "loading" ? "···" : "Claim Your Key"}
        </button>
      </form>

      {status === "error" && errorMsg && (
        <p className="text-[#6E1414] text-xs text-center sm:text-left px-1">
          {errorMsg}
        </p>
      )}
    </div>
  );
}
