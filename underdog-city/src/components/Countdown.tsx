"use client";

import { useEffect, useState } from "react";

function getRemaining(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
  };
}

export default function Countdown({ targetDate }: { targetDate?: string }) {
  const target = targetDate ? new Date(targetDate).getTime() : null;
  const [remaining, setRemaining] = useState(() =>
    target ? getRemaining(target) : null
  );

  useEffect(() => {
    if (!target) return;
    const id = setInterval(() => setRemaining(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!remaining) {
    return (
      <p className="font-display text-sm uppercase tracking-widest text-(--color-muted-bone)">
        Coming soon
      </p>
    );
  }

  const units: [string, number][] = [
    ["Days", remaining.days],
    ["Hours", remaining.hours],
    ["Min", remaining.minutes],
    ["Sec", remaining.seconds],
  ];

  return (
    <div role="timer" aria-label="Countdown to launch" className="flex gap-6">
      {units.map(([label, value]) => (
        <div key={label} className="flex flex-col items-center">
          <span className="font-display text-3xl text-(--color-gild-glow)">
            {String(value).padStart(2, "0")}
          </span>
          <span className="mt-1 text-xs uppercase tracking-widest text-(--color-muted-bone)">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
