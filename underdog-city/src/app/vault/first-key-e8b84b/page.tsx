import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { socials } from "@/content/music";

export const metadata: Metadata = {
  title: "The Vault — Underdog City",
  description: "Your key worked.",
  robots: { index: false, follow: false },
};

export default function VaultFirstKey() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-(--color-void) px-6 py-20 text-center">
      <div
        aria-hidden
        className="gild-glow pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(168,119,46,0.14),transparent_60%)]"
      />
      <div className="crack-line absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 opacity-60" />

      <Image
        src="/hero-mask.webp"
        alt="The masked king of Underdog City"
        width={280}
        height={280}
        priority
        className="mb-8 w-[200px] sm:w-[260px]"
        style={{
          WebkitMaskImage: "radial-gradient(circle, black 55%, transparent 100%)",
          maskImage: "radial-gradient(circle, black 55%, transparent 100%)",
        }}
      />

      <p className="font-display text-xs uppercase tracking-[0.3em] text-(--color-tarnished-gold)">
        Your key worked
      </p>

      <h1 className="mt-4 font-display text-3xl uppercase tracking-wide text-(--color-bone) sm:text-5xl">
        The Vault
      </h1>

      <p className="mt-6 max-w-md text-(--color-muted-bone)">
        You&apos;re holding the crown before the coronation. This is the title
        track of the debut album — the world hears it July 31. You hear it now.
      </p>

      <div className="mt-10 w-full max-w-md rounded-sm border border-(--color-tarnished-gold)/30 bg-(--color-charcoal) p-6">
        <p className="font-mono text-xs text-(--color-tarnished-gold)">
          13_throne_at_the_bottom.mp3
        </p>
        <p className="mt-1 font-display text-lg text-(--color-bone)">
          Throne At The Bottom
        </p>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio
          controls
          preload="metadata"
          className="mt-4 w-full"
          src="/vault/transmission-13-e8b84b.mp3"
        />
        <p className="mt-3 text-xs uppercase tracking-widest text-(--color-crimson)/80">
          Tenants only — don&apos;t hand out your key
        </p>
      </div>

      <p className="mt-10 max-w-md text-sm text-(--color-muted-bone)">
        The rest of the fourteen stay locked until{" "}
        <span className="text-(--color-gild-glow)">July 31</span>. Turn this one
        up loud until then.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-5 text-xs uppercase tracking-widest text-(--color-muted-bone)">
        {socials.map((s) => (
          <a key={s.label} href={s.href} className="hover:text-(--color-gild-glow)">
            {s.label}
          </a>
        ))}
      </div>

      <Link
        href="/"
        className="mt-10 font-display text-xs uppercase tracking-widest text-(--color-tarnished-gold) hover:text-(--color-gild-glow)"
      >
        ← Back to the city
      </Link>

      <div className="crack-line absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 opacity-60" />
    </main>
  );
}
