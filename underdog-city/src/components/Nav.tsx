import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-(--color-tarnished-gold)/20 bg-(--color-void)/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="font-display text-sm uppercase tracking-[0.2em] text-(--color-bone) hover:text-(--color-gild-glow)"
        >
          Underdog City
        </Link>
        <div className="flex items-center gap-5 text-xs uppercase tracking-widest text-(--color-muted-bone)">
          <Link href="/music" className="hover:text-(--color-gild-glow)">
            The Music
          </Link>
          <Link
            href="/#join"
            className="hidden rounded-sm border border-(--color-antique-gold) px-3 py-1.5 text-(--color-gild-glow) hover:bg-(--color-antique-gold)/15 sm:inline-block"
          >
            Claim Your Key
          </Link>
        </div>
      </nav>
    </header>
  );
}
