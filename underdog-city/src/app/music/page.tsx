import type { Metadata } from "next";
import Nav from "@/components/Nav";
import EmailCapture from "@/components/EmailCapture";
import { musicMeta, transmissions, socials } from "@/content/music";

export const metadata: Metadata = {
  title: "The Music — Underdog City",
  description:
    "The first transmissions are incoming. Claim your key to hear them first.",
};

export default function MusicPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-2xl px-6 py-20">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-(--color-tarnished-gold)">
          The Transmissions
        </p>
        <h1 className="mt-4 font-display text-3xl uppercase tracking-wide text-(--color-bone) sm:text-5xl">
          The Music
        </h1>

        <div className="mt-6 space-y-3 text-(--color-muted-bone)">
          {musicMeta.intro.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        <ul className="mt-12 space-y-px overflow-hidden rounded-sm border border-(--color-tarnished-gold)/20 font-mono text-xs sm:text-sm">
          {transmissions.map((t) => (
            <li
              key={t.index}
              className="flex items-center gap-3 bg-(--color-charcoal) px-5 py-4"
            >
              <span className="flex-1 overflow-hidden whitespace-nowrap">
                <span className="text-(--color-tarnished-gold)">
                  {t.index}_
                </span>
                <span aria-hidden>
                  {Array.from(t.name).map((ch, i) =>
                    ch === "█" ? (
                      <span key={i} className="text-(--color-muted-bone)/35">
                        {ch}
                      </span>
                    ) : ch === "_" ? (
                      <span key={i} className="text-(--color-muted-bone)/50">
                        _
                      </span>
                    ) : (
                      <span
                        key={i}
                        className="text-(--color-gild-glow)"
                        style={{ textShadow: "0 0 8px rgba(232,184,75,0.55)" }}
                      >
                        {ch}
                      </span>
                    )
                  )}
                </span>
                <span className="text-(--color-muted-bone)">.{t.ext}</span>
                <span className="sr-only">
                  Track {t.index} — locked, title hidden
                </span>
              </span>
              <span className="shrink-0 text-xs uppercase tracking-widest text-(--color-crimson)/80">
                [ Locked ]
              </span>
            </li>
          ))}
        </ul>

        <div className="crack-line my-12 h-px w-full opacity-50" />

        <p className="font-display text-xs uppercase tracking-[0.3em] text-(--color-tarnished-gold)">
          The Destination
        </p>
        <h2 className="mt-3 font-display text-2xl text-(--color-bone) sm:text-3xl">
          {musicMeta.destination.album}
        </h2>
        <p className="mt-1 font-display text-sm uppercase tracking-widest text-(--color-gild-glow)">
          Out {musicMeta.destination.date}
        </p>
        <p className="mt-3 text-(--color-muted-bone)">
          {musicMeta.destination.note}
        </p>
        <a
          href="https://distrokid.com/hyperfollow/underdogcity/throne-at-the-bottom/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block rounded-sm border border-(--color-antique-gold) px-5 py-2.5 font-display text-xs uppercase tracking-widest text-(--color-gild-glow) transition hover:bg-(--color-antique-gold)/15"
        >
          Pre-save the album →
        </a>

        <div className="mt-16 flex flex-col items-center gap-6 text-center">
          <h2 className="font-display text-xl uppercase tracking-wide text-(--color-bone)">
            Hear them first
          </h2>
          <p className="max-w-md text-sm text-(--color-muted-bone)">
            🔑 Tenants get the title track{" "}
            <span className="text-(--color-gild-glow)">now</span> — the world
            waits until July 31.
          </p>
          <EmailCapture />
          <div className="mt-2 flex flex-wrap justify-center gap-5 text-xs uppercase tracking-widest text-(--color-muted-bone)">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="hover:text-(--color-gild-glow)"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
