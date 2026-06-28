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

        <ul className="mt-12 space-y-px overflow-hidden rounded-sm border border-(--color-tarnished-gold)/20">
          {transmissions.map((t) => (
            <li
              key={t.index}
              className={`flex items-center gap-5 bg-(--color-charcoal) px-5 py-5 ${
                t.status === "locked" ? "opacity-45" : ""
              }`}
            >
              <span className="font-display text-lg text-(--color-tarnished-gold)">
                {t.index}
              </span>
              <span className="flex-1">
                <span
                  className={`block font-display text-lg ${
                    t.status === "incoming"
                      ? "text-(--color-bone)"
                      : "tracking-[0.3em] text-(--color-muted-bone)"
                  }`}
                >
                  {t.title}
                </span>
                {t.hint && (
                  <span className="mt-1 block text-sm text-(--color-muted-bone)">
                    {t.hint}
                  </span>
                )}
              </span>
              <span className="font-display text-xs uppercase tracking-widest text-(--color-muted-bone)">
                {t.status === "incoming" ? "Incoming" : "Locked"}
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
        <p className="mt-3 text-(--color-muted-bone)">
          {musicMeta.destination.note}
        </p>

        <div className="mt-16 flex flex-col items-center gap-6 text-center">
          <h2 className="font-display text-xl uppercase tracking-wide text-(--color-bone)">
            Hear them first
          </h2>
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
