import Link from "next/link";
import Image from "next/image";
import EmailCapture from "@/components/EmailCapture";
import Countdown from "@/components/Countdown";
import Nav from "@/components/Nav";
import { socials } from "@/content/music";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative flex flex-col overflow-hidden bg-(--color-void)">
        {/* Hero / Portal */}
        <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 text-center">
          <div
            aria-hidden
            className="gild-glow pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(168,119,46,0.12),transparent_60%)]"
          />
          <div className="crack-line absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 opacity-60" />

          <Image
            src="/hero-mask.webp"
            alt="The masked king of Underdog City"
            width={480}
            height={480}
            priority
            className="mb-8 w-[280px] sm:w-[440px]"
            style={{
              WebkitMaskImage:
                "radial-gradient(circle, black 55%, transparent 100%)",
              maskImage: "radial-gradient(circle, black 55%, transparent 100%)",
            }}
          />

          <p className="font-display text-xs uppercase tracking-[0.3em] text-(--color-tarnished-gold)">
            Now Accepting Tenants
          </p>

          <h1 className="mt-6 font-display text-4xl font-900 uppercase tracking-wide text-(--color-bone) sm:text-6xl">
            Underdog City
          </h1>

          <p className="mt-6 max-w-xl text-base text-(--color-muted-bone) sm:text-lg">
            We All Rule Down Here 👑
            <br />
            There&apos;s only one rule in Underdog City: Turn that shit up
            loud.
          </p>

          <div className="mt-10">
            <EmailCapture />
          </div>
          <p className="mt-4 max-w-md text-sm text-(--color-muted-bone)">
            🔑 Your key opens the vault — the album&apos;s title track,{" "}
            <span className="text-(--color-gild-glow)">
              before the world hears it.
            </span>
          </p>

          <div className="crack-line absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 opacity-60" />
        </section>

        {/* The Music door */}
        <section className="border-t border-(--color-tarnished-gold)/20 px-6 py-24">
          <div className="mx-auto max-w-md">
            <Link
              href="/music"
              className="group block rounded-sm border border-(--color-tarnished-gold)/25 bg-(--color-charcoal) p-8 text-center transition hover:border-(--color-gild-glow)/60"
            >
              <p className="font-display text-xs uppercase tracking-[0.3em] text-(--color-tarnished-gold)">
                The Transmissions
              </p>
              <h2 className="mt-3 font-display text-2xl text-(--color-bone) group-hover:text-(--color-gild-glow)">
                The Music
              </h2>
              <p className="mt-3 text-sm text-(--color-muted-bone)">
                The first anthems are clawing up through the static. Tenants
                hear them before the world does.
              </p>
              <span className="mt-5 inline-block font-display text-xs uppercase tracking-widest text-(--color-gild-glow)">
                Listen in →
              </span>
            </Link>
          </div>
        </section>

        {/* First Transmission */}
        <section className="border-t border-(--color-tarnished-gold)/20 px-6 py-24">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-(--color-tarnished-gold)">
              First Transmission
            </p>
            <h2 className="mt-4 font-display text-2xl text-(--color-bone) sm:text-3xl">
              The gates open soon.
            </h2>
            <div className="mt-8">
              <Countdown
              targetDate={
                process.env.NEXT_PUBLIC_LAUNCH_DATE ?? "2026-07-31T00:00:00"
              }
            />
            </div>
          </div>
        </section>

        {/* Join CTA */}
        <section
          id="join"
          className="scroll-mt-20 border-t border-(--color-tarnished-gold)/20 px-6 py-24"
        >
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <h2 className="font-display text-2xl uppercase tracking-wide text-(--color-bone) sm:text-3xl">
              Join The Underdogs
            </h2>
            <EmailCapture cta="Move In" />
            <div className="mt-2 flex flex-wrap justify-center gap-5 text-sm uppercase tracking-widest text-(--color-muted-bone)">
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
        </section>

        {/* Footer */}
        <footer className="border-t border-(--color-tarnished-gold)/20 px-6 py-10 text-center">
          <p className="text-xs text-(--color-muted-bone)">
            © {new Date().getFullYear()} Underdog City. We all rule down here.
          </p>
        </footer>
      </main>
    </>
  );
}
