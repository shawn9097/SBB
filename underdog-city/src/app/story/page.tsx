import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import { chapters, novelMeta } from "@/content/novel";

export const metadata: Metadata = {
  title: "The Story — Underdog City",
  description: novelMeta.logline,
};

export default function StoryIndex() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-2xl px-6 py-20">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-(--color-tarnished-gold)">
          The Web Serial
        </p>
        <h1 className="mt-4 font-display text-3xl uppercase tracking-wide text-(--color-bone) sm:text-5xl">
          {novelMeta.title}
        </h1>
        <p className="mt-6 font-display text-lg leading-relaxed text-(--color-antique-gold) italic">
          {novelMeta.logline}
        </p>

        <div className="mt-8 space-y-4 text-(--color-muted-bone)">
          {novelMeta.blurb.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        <div className="crack-line my-12 h-px w-full opacity-50" />

        <p className="font-display text-xs uppercase tracking-[0.3em] text-(--color-tarnished-gold)">
          Chapters
        </p>
        <ul className="mt-6 divide-y divide-(--color-tarnished-gold)/15">
          {chapters.map((ch) =>
            ch.available ? (
              <li key={ch.slug}>
                <Link
                  href={`/story/${ch.slug}`}
                  className="group flex items-baseline justify-between gap-4 py-4"
                >
                  <span>
                    <span className="font-display text-xs uppercase tracking-widest text-(--color-tarnished-gold)">
                      {ch.label}
                    </span>
                    <span className="mt-1 block font-display text-lg text-(--color-bone) group-hover:text-(--color-gild-glow)">
                      {ch.title}
                    </span>
                  </span>
                  <span className="font-display text-xs uppercase tracking-widest text-(--color-muted-bone) group-hover:text-(--color-gild-glow)">
                    Read →
                  </span>
                </Link>
              </li>
            ) : (
              <li
                key={ch.slug}
                className="flex items-baseline justify-between gap-4 py-4 opacity-50"
              >
                <span>
                  <span className="font-display text-xs uppercase tracking-widest text-(--color-tarnished-gold)">
                    {ch.label}
                  </span>
                  <span className="mt-1 block font-display text-lg text-(--color-muted-bone)">
                    {ch.title}
                  </span>
                </span>
                <span className="font-display text-xs uppercase tracking-widest text-(--color-muted-bone)">
                  Incoming
                </span>
              </li>
            )
          )}
        </ul>
      </main>
    </>
  );
}
