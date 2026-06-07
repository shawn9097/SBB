import EmailForm from "@/components/EmailForm";

function KintsugiBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none animate-gold-pulse"
      viewBox="0 0 1440 900"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Primary fracture network */}
      <path
        d="M180 80 Q300 180 420 360 Q405 510 385 720 Q445 810 520 900"
        stroke="#A8772E" strokeWidth="1.8" fill="none" strokeLinecap="round"
      />
      <path
        d="M420 360 Q630 285 900 415 Q1100 475 1390 345"
        stroke="#A8772E" strokeWidth="1.2" fill="none" strokeLinecap="round"
      />
      <path
        d="M420 360 Q355 555 305 720 Q278 820 255 900"
        stroke="#A8772E" strokeWidth="0.9" fill="none" strokeLinecap="round"
      />
      <path
        d="M900 415 Q1055 195 1285 55"
        stroke="#A8772E" strokeWidth="0.7" fill="none" strokeLinecap="round"
      />
      <path
        d="M385 720 Q525 775 685 900"
        stroke="#A8772E" strokeWidth="0.8" fill="none" strokeLinecap="round"
      />
      {/* Detail micro-cracks */}
      <path
        d="M320 195 Q380 270 420 360"
        stroke="#C9A227" strokeWidth="0.5" fill="none" strokeLinecap="round" opacity="0.7"
      />
      <path
        d="M900 415 Q960 525 1025 660 Q1065 760 1110 900"
        stroke="#A8772E" strokeWidth="0.6" fill="none" strokeLinecap="round"
      />
      <path
        d="M640 285 Q690 175 765 55"
        stroke="#A8772E" strokeWidth="0.5" fill="none" strokeLinecap="round" opacity="0.5"
      />
      {/* Cold neon rim traces — sparse */}
      <path
        d="M0 460 Q90 400 180 80"
        stroke="#23456E" strokeWidth="0.4" fill="none" strokeLinecap="round" opacity="0.35"
      />
      <path
        d="M1440 550 Q1380 480 1390 345"
        stroke="#8B2D5C" strokeWidth="0.4" fill="none" strokeLinecap="round" opacity="0.3"
      />
    </svg>
  );
}

function MCAvatarPlaceholder() {
  return (
    <div className="relative w-44 h-44 md:w-56 md:h-56">
      {/* Cold neon rim glow */}
      <div
        className="absolute inset-[-8px] rounded-full pointer-events-none"
        style={{
          boxShadow:
            "0 0 30px 4px rgba(35,69,110,0.35), 0 0 60px 8px rgba(139,45,92,0.2)",
        }}
      />
      <svg
        viewBox="0 0 200 220"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        role="img"
        aria-label="Underdog City — masked figure"
      >
        {/* Hood / silhouette */}
        <path
          d="M20 120 Q20 30 100 18 Q180 30 180 120 Q180 175 155 195 Q135 210 100 212 Q65 210 45 195 Q20 175 20 120Z"
          fill="#0D0C0B"
        />
        {/* Mask face oval */}
        <ellipse cx="100" cy="108" rx="50" ry="58" fill="#111009" />
        {/* Eye sockets */}
        <ellipse cx="82" cy="98" rx="10" ry="11" fill="#080808" />
        <ellipse cx="118" cy="98" rx="10" ry="11" fill="#080808" />
        {/* Gold pinprick eyes */}
        <circle cx="82" cy="98" r="3" fill="#E8B84B" opacity="0.95" />
        <circle cx="118" cy="98" r="3" fill="#E8B84B" opacity="0.95" />
        {/* Eye ambient glow */}
        <circle cx="82" cy="98" r="6" fill="#E8B84B" opacity="0.12" />
        <circle cx="118" cy="98" r="6" fill="#E8B84B" opacity="0.12" />
        {/* Primary kintsugi crack — runs through center of mask */}
        <path
          d="M86 62 Q95 80 100 108 Q105 128 112 155"
          stroke="#C9A227" strokeWidth="2" fill="none" strokeLinecap="round"
        />
        {/* Secondary cracks branching left and right */}
        <path
          d="M100 108 Q86 116 68 118 Q54 118 46 122"
          stroke="#C9A227" strokeWidth="1.3" fill="none" strokeLinecap="round"
        />
        <path
          d="M100 108 Q116 112 132 104 Q144 98 153 102"
          stroke="#A8772E" strokeWidth="0.9" fill="none" strokeLinecap="round"
        />
        <path
          d="M86 62 Q74 58 62 50"
          stroke="#A8772E" strokeWidth="0.7" fill="none" strokeLinecap="round"
        />
        {/* Glow bloom on primary crack */}
        <path
          d="M86 62 Q95 80 100 108 Q105 128 112 155"
          stroke="#E8B84B" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.1"
        />
        {/* Broken crown — jagged asymmetric peaks */}
        <path
          d="M58 60 L66 40 L74 52 L82 36 L90 48 L100 30 L110 46 L118 38 L128 54 L136 42 L144 58"
          stroke="#C9A227" strokeWidth="2.5" fill="none"
          strokeLinecap="round" strokeLinejoin="round"
        />
        {/* Crown base */}
        <rect x="56" y="60" width="88" height="6" rx="1.5" fill="#A8772E" opacity="0.75" />
        {/* Break/gap in the crown (asymmetric) */}
        <rect x="87" y="56" width="8" height="10" fill="#111009" />
        {/* Gold vein through the break — kintsugi repair */}
        <path
          d="M88 60 Q91 65 95 62"
          stroke="#E8B84B" strokeWidth="1.2" fill="none" strokeLinecap="round"
        />
        {/* Outer rim light — faint gold halo */}
        <ellipse
          cx="100" cy="108" rx="52" ry="60"
          fill="none" stroke="#A8772E" strokeWidth="0.5" opacity="0.25"
        />
      </svg>
    </div>
  );
}

function GoldRule() {
  return (
    <div className="flex items-center gap-4 w-full max-w-xs">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#A8772E] opacity-50" />
      <div className="w-1.5 h-1.5 bg-[#A8772E] rotate-45 opacity-70 shrink-0" />
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#A8772E] opacity-50" />
    </div>
  );
}

const SOCIALS = [
  { name: "Spotify", href: "#" },
  { name: "YouTube", href: "#" },
  { name: "TikTok", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "X", href: "#" },
];

function SocialLinks() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
      {SOCIALS.map((s) => (
        <a
          key={s.name}
          href={s.href}
          className="text-[#A9A192] hover:text-[#E8B84B] text-xs tracking-[0.2em] uppercase transition-colors duration-200"
          style={{ fontFamily: "var(--font-cinzel)" }}
          aria-label={s.name}
        >
          {s.name}
        </a>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0B]">

      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 42%, #151310 0%, #0A0A0B 65%)",
        }}
      >
        <KintsugiBackground />

        {/* Gold ambient bloom behind avatar */}
        <div
          className="absolute w-72 h-72 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(168,119,46,0.07) 0%, transparent 70%)",
            filter: "blur(28px)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center max-w-xl">
          <MCAvatarPlaceholder />

          <div className="mt-8 mb-5 w-20 h-px bg-gradient-to-r from-transparent via-[#A8772E] to-transparent opacity-70" />

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[0.12em] text-[#C9A227] uppercase leading-tight mb-5 animate-flicker"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            We all rule
            <br />
            down here.
          </h1>

          <p className="text-[#E3DCCB] text-base md:text-lg mb-10 tracking-wider max-w-sm">
            Now Accepting Tenants in Underdog City.
          </p>

          <EmailForm />
        </div>

        {/* Bottom vignette to blend into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0A0A0B] to-transparent pointer-events-none" />
      </section>

      {/* ── THE WORLD ── */}
      <section className="bg-[#151310] py-28 px-6">
        <div className="max-w-xl mx-auto flex flex-col items-center text-center gap-10">
          <GoldRule />
          <div className="space-y-5">
            <p
              className="text-[#A8772E] text-[0.65rem] tracking-[0.35em] uppercase mb-2"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              The World
            </p>
            <p className="text-[#A9A192] text-lg md:text-xl leading-relaxed">
              High above, the Halo decides who has worth.
            </p>
            <p className="text-[#E3DCCB] text-lg md:text-xl leading-relaxed">
              Everyone else falls.
            </p>
            <p
              className="text-[#C9A227] text-xl md:text-2xl leading-relaxed font-semibold pt-2"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Down here, the broken are the only ones left standing.
            </p>
          </div>
          <GoldRule />
        </div>
      </section>

      {/* ── FIRST TRANSMISSION ── */}
      <section className="bg-[#0A0A0B] py-28 px-6">
        <div className="max-w-xl mx-auto flex flex-col items-center text-center gap-8">
          <span
            className="text-[#A8772E] text-[0.6rem] tracking-[0.45em] uppercase border border-[#A8772E]/30 px-5 py-2.5"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Transmission 001
          </span>

          <h2
            className="text-3xl md:text-4xl text-[#C9A227] tracking-wide leading-snug"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            First anthem incoming.
          </h2>

          <p className="text-[#A9A192] text-base md:text-lg max-w-sm leading-relaxed">
            {"When you hear it, you'll know."}
          </p>

          {/* Countdown slot — uncomment and implement <Countdown> when Single 1 date is set */}
          {/*
          <Countdown targetDate="2025-01-01T00:00:00Z" />
          */}

          <div className="flex items-center gap-3 mt-2">
            <div
              className="w-2 h-2 rounded-full bg-[#E8B84B]"
              style={{ animation: "pulse 2s ease-in-out infinite" }}
            />
            <span
              className="text-[#A9A192] text-[0.65rem] tracking-[0.25em] uppercase"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Claim your key to hear it first
            </span>
          </div>
        </div>
      </section>

      {/* ── JOIN THE UNDERDOGS ── */}
      <section className="bg-[#151310] py-28 px-6">
        <div className="max-w-xl mx-auto flex flex-col items-center text-center gap-10">
          <GoldRule />
          <div className="space-y-3">
            <h2
              className="text-3xl md:text-4xl text-[#C9A227] tracking-wide"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Join The Underdogs.
            </h2>
            <p className="text-[#A9A192] text-base max-w-sm mx-auto leading-relaxed">
              First access. Lore drops. Inner-circle transmissions.
            </p>
          </div>
          <EmailForm variant="secondary" />
          <div className="space-y-4 w-full">
            <p
              className="text-[#A9A192] text-[0.6rem] tracking-[0.35em] uppercase"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Find Us
            </p>
            <SocialLinks />
          </div>
          <GoldRule />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0A0A0B] border-t border-[#A8772E]/10 py-10 px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 text-[#A9A192] text-[0.65rem] tracking-widest">
          <span style={{ fontFamily: "var(--font-cinzel)" }}>
            © Underdog City
          </span>
          <SocialLinks />
          <span>AI-assisted production.</span>
        </div>
      </footer>

    </main>
  );
}
