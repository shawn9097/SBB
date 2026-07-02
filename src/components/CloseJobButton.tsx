"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CloseJobButton({ campaignId }: { campaignId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function markWon() {
    const raw = window.prompt("Job value (optional) — enter the amount you closed for:");
    if (raw === null) return; // cancelled
    const jobValue = raw.trim() ? Number(raw.replace(/[^0-9.]/g, "")) : undefined;

    setBusy(true);
    try {
      const res = await fetch("/api/close-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ campaignId, jobValue }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        window.alert(json.error || "Could not close the job. Please try again.");
        return;
      }
      router.refresh();
    } catch {
      window.alert("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={markWon}
      disabled={busy}
      className="text-xs font-medium px-2.5 py-1 rounded-full border border-[#3F5B34] text-[#3F5B34] hover:bg-[#DCE7D5] transition-colors disabled:opacity-60"
    >
      {busy ? "Saving…" : "Mark won"}
    </button>
  );
}
