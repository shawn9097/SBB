import EmailCapture from "@/components/EmailCapture";
import Countdown from "@/components/Countdown";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-(--color-void)">
      {/* Hero / Portal */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(168,119,46,0.12),transparent_60%)]"
        />
        <div className="crack-line absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 opacity-60" />

        <p className="font-display text-xs uppercase tracking-[0.3em] text-(--color-tarnished-gold)">
          Now Accepting Tenants
        </p>

        <h1 className="mt-6 font-display text-4xl font-900 uppercase tracking-wide text-(--color-bone) sm:text-6xl">
          Underdog City
        </h1>

        <p className="mt-6 max-w-xl text-base text-(--color-muted-bone) sm:text-lg">
          Every wound here has a price, and every price buys power. We all
          rule down here.
        </p>

        <div className="mt-10">
          <EmailCapture />
        </div>

        <div className="crack-line absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 opacity-60" />
      </section>

      {/* Lore Tease */}
      <section className="border-t border-(--color-tarnished-gold)/20 px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-(--color-undercity-magenta)">
            From The Underground
          </p>
          <p className="mt-6 font-display text-xl leading-relaxed text-(--color-bone) sm:text-2xl">
            “They tell you healing leaves no mark. They&apos;re lying. Down
            here, the mark is the point — gild the wound, and it shines
            brighter than the skin ever did.”
          </p>
          <p className="mt-4 text-sm text-(--color-muted-bone)">
            — fragment recovered from the Undercity broadcast
          </p>
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
            <Countdown targetDate={process.env.NEXT_PUBLIC_LAUNCH_DATE} />
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="border-t border-(--color-tarnished-gold)/20 px-6 py-24">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h2 className="font-display text-2xl uppercase tracking-wide text-(--color-bone) sm:text-3xl">
            Join The Underdogs
          </h2>
          <EmailCapture cta="Move In" />
          <div className="mt-2 flex gap-6 text-sm uppercase tracking-widest text-(--color-muted-bone)">
            <a href="#" className="hover:text-(--color-gild-glow)">
              Instagram
            </a>
            <a href="#" className="hover:text-(--color-gild-glow)">
              TikTok
            </a>
            <a href="#" className="hover:text-(--color-gild-glow)">
              Spotify
            </a>
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
  );
}
