"use client";

import { useState } from "react";

// Only Standard is offered for now. Add the Volume entry back here once its
// Stripe product exists and STRIPE_VOLUME_PRICE_ID is set.
const PLANS = [
  {
    tier: "standard" as const,
    name: "Standard",
    price: "$129",
    limit: "Up to 100 estimates/mo",
    features: [
      "All 6 trade sequences",
      "Voice Twin personalisation",
      "SMS + email follow-up",
      "Real-time reply forwarding",
      "ROI dashboard",
    ],
  },
];

const SINGLE_PLAN = PLANS.length === 1;

export default function PlanPicker() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function choose(tier: "standard" | "volume") {
    setLoading(tier);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier }),
      });
      const json = await res.json();
      if (!res.ok || !json.url) {
        setError(json.error || "Could not start checkout. Please try again.");
        setLoading(null);
        return;
      }
      window.location.href = json.url;
    } catch {
      setError("Network error. Please try again.");
      setLoading(null);
    }
  }

  return (
    <div>
      <div
        className={
          SINGLE_PLAN
            ? "max-w-sm mx-auto"
            : "grid sm:grid-cols-2 gap-6"
        }
      >
        {PLANS.map((plan) => (
          <div
            key={plan.tier}
            className="border border-[#E0D3B2] rounded-lg p-6 bg-[#F4ECD9] text-left"
          >
            <div className="font-mono text-xs tracking-widest uppercase text-[#6B7178] mb-2">
              {plan.name}
            </div>
            <div className="font-serif text-4xl font-semibold mb-1">
              {plan.price}
              <span className="text-lg font-normal text-[#6B7178]">/mo</span>
            </div>
            <div className="text-sm text-[#6B7178] mb-5">{plan.limit}</div>
            <ul className="space-y-2 mb-6">
              {plan.features.map((f) => (
                <li
                  key={f}
                  className="text-sm text-[#3A4148] flex items-start gap-2"
                >
                  <span className="text-[#C8923A] mt-0.5">·</span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => choose(plan.tier)}
              disabled={loading !== null}
              className="w-full bg-[#28394B] text-[#EFE6D0] px-6 py-3 rounded text-sm font-medium hover:bg-[#1A2530] transition-colors disabled:opacity-60"
            >
              {loading === plan.tier ? "Starting checkout…" : `Start ${plan.name}`}
            </button>
          </div>
        ))}
      </div>
      {error && (
        <p className="text-sm text-[#9B2C2C] bg-[#F7E4E1] border border-[#E8C4BE] rounded px-3 py-2 mt-4">
          {error}
        </p>
      )}
    </div>
  );
}
