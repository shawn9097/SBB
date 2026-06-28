import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import { chapters } from "@/content/novel";

export function generateStaticParams() {
  return chapters.filter((c) => c.available).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chapter = chapters.find((c) => c.slug === slug);
  if (!chapter) return { title: "Underdog City" };
  return {
    title: `${chapter.label}: ${chapter.title} — Underdog City`,
    description: chapter.body?.[0],
  };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = chapters.findIndex((c) => c.slug === slug);
  const chapter = chapters[index];

  if (!chapter || !chapter.available || !chapter.body) notFound();

  const next = chapters.slice(index + 1).find((c) => c.available);

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-2xl px-6 py-20">
        <Link
          href="/story"
          className="font-display text-xs uppercase tracking-widest text-(--color-muted-bone) hover:text-(--color-gild-glow)"
        >
          ← All chapters
        </Link>

        <p className="mt-10 font-display text-xs uppercase tracking-[0.3em] text-(--color-tarnished-gold)">
          {chapter.label}
        </p>
        <h1 className="mt-3 font-display text-3xl uppercase tracking-wide text-(--color-bone) sm:text-4xl">
          {chapter.title}
        </h1>

        <div className="crack-line my-10 h-px w-1/2 opacity-50" />

        <article className="space-y-6 text-lg leading-relaxed text-(--color-bone)">
          {chapter.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </article>

        <div className="crack-line my-12 h-px w-full opacity-50" />

        <div className="flex items-center justify-between gap-4">
          {next ? (
            <Link
              href={`/story/${next.slug}`}
              className="font-display text-sm uppercase tracking-widest text-(--color-gild-glow) hover:underline"
            >
              {next.label} →
            </Link>
          ) : (
            <p className="font-display text-sm uppercase tracking-widest text-(--color-muted-bone)">
              The next chapter is incoming.
            </p>
          )}
          <Link
            href="/#join"
            className="font-display text-xs uppercase tracking-widest text-(--color-tarnished-gold) hover:text-(--color-gild-glow)"
          >
            Claim Your Key
          </Link>
        </div>
      </main>
    </>
  );
}
