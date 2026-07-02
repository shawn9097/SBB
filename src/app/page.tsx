import Link from "next/link";

const SEQUENCE = [
  {
    day: "D0",
    when: "Same day · SMS",
    title: "The friendly confirmation",
    body: "A quick text making sure the estimate landed. Warm, human, zero pressure — just like you'd send yourself if you had the time.",
  },
  {
    day: "D3",
    when: "Three days later · SMS",
    title: "The empathy check-in",
    body: "Acknowledges the estimate is a lot to take in and offers to walk through anything. Opens the door without pushing.",
  },
  {
    day: "D7",
    when: "One week later · Email",
    title: "The value reinforcement",
    body: "Reminds them what's included, the warranty, the timeline. Surfaces financing options. Frames the decision without pressure.",
  },
  {
    day: "D14",
    when: "Two weeks later · SMS",
    title: "The timing check",
    body: "\"Is timing the issue, or do you need to talk through any of the numbers? Happy to adjust scope. No pressure.\"",
  },
  {
    day: "D21",
    when: "Three weeks later · Email",
    title: "The close-out",
    body: "\"Closing this estimate out. If timing isn't right, no worries. If you ever want to revisit, just hit reply.\" Touches 4 and 5 alone account for 35% of all bookings.",
  },
];

const FEATURES = [
  {
    n: "01",
    title: "Mobile-first, every screen",
    body: "Your business runs from the truck. Your dashboard should too. Built phone-first, with desktop as the secondary view. Read your wins between job sites.",
  },
  {
    n: "02",
    title: "Works with your existing tools",
    body: "Keep Jobber. Keep AccuLynx. Keep your Google Sheets. Warmside slots in alongside whatever you already use — never asks you to switch.",
  },
  {
    n: "03",
    title: "The Touchstone Receipt",
    body: "Every recovered job comes with a one-page report: what we sent, when they responded, when they closed. Pure transparency. You'll know exactly what you're paying for.",
  },
  {
    n: "04",
    title: "Your voice, not ours",
    body: "Forward us 10 of your actual past texts to customers. Warmside learns how you talk and follows up the same way. Your prospects think you're following up personally. You essentially are.",
  },
  {
    n: "05",
    title: "The Family of Trade",
    body: "Private community for Warmside contractors. Share follow-up scripts, war stories, wins. The kind of people who'd help you patch a roof if asked.",
  },
  {
    n: "06",
    title: "The Bad Month failsafe",
    body: "If we don't recover anything for you in a month, we call you personally. Not a help-desk ticket. A real human looking at why, and adjusting. That's the deal.",
  },
];

const NEVER = [
  "Lock you into a contract",
  "Charge a setup fee",
  "Hide cancellation behind a phone call",
  "Sell your customer data to anybody",
  "Use sleazy tactics on your customers",
  "Pretend to be a person we're not",
  "Raise your price without telling you",
  "Make you sit through a sales call to sign up",
  "Send you marketing email after you cancel",
  "Treat you like a customer ID",
];

const STANDARD_FEATURES = [
  "Up to 100 estimates per month",
  "Full 5-touch sequence (SMS + email)",
  "Voice Twin personalization",
  "Mobile dashboard with The Win Wall",
  "The Touchstone Receipt for every win",
  "Two-way reply handling",
  "Family of Trade community access",
  "Optional Front Porch onboarding call",
  "Email + text support, founder-direct",
];

const VOLUME_FEATURES = [
  "Unlimited estimates per month",
  "Everything in Standard, no caps",
  "Priority Voice Twin retraining quarterly",
  "Priority support response (under 4hrs)",
  "Custom sequence variants per crew",
  "Quarterly performance review call",
];

const FAQS = [
  {
    q: "What if I don't have a CRM?",
    a: "You don't need one. Warmside works for anyone sending estimates — whether through Jobber, JobNimbus, AccuLynx, plain Gmail, a Google Doc, or a notepad in your truck. Forward us the email, or text us the details. We handle the rest.",
  },
  {
    q: "Isn't automated follow-up just spam?",
    a: "Not the way we do it. Warmside learns your actual voice from your past messages, spaces touches days apart, and stops the instant someone replies. It reads like you personally remembered to follow up — because, in effect, you did.",
  },
  {
    q: "What happens when a prospect replies?",
    a: "We stop the sequence immediately and forward their message straight to you. No prospect ever gets a follow-up after they've answered. You take the conversation from there.",
  },
  {
    q: "Can I really cancel anytime?",
    a: "One click, no phone call, no exit interview. And if Warmside doesn't recover at least one job for you in your first 30 days, we refund every cent and part as friends.",
  },
];

const eyebrow = "font-mono text-xs tracking-[0.2em] uppercase text-[#6B7178]";

export default function Home() {
  return (
    <main className="bg-[#EFE6D0] text-[#0F1417]">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-[#E0D3B2] bg-[#EFE6D0]/90 backdrop-blur px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <span className="font-serif text-2xl font-bold tracking-tight">
            Warmside<span className="text-[#C8923A]">.</span>
          </span>
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-8 text-sm text-[#3A4148]">
              <a href="#how-it-works" className="hover:text-[#A57628]">How it works</a>
              <a href="#pricing" className="hover:text-[#A57628]">Pricing</a>
              <a href="#faq" className="hover:text-[#A57628]">FAQ</a>
            </div>
            <Link
              href="/signup"
              className="bg-[#28394B] text-[#EFE6D0] px-5 py-2.5 rounded text-sm font-medium hover:bg-[#1A2530] transition-colors"
            >
              Start your 30 days
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-24 md:pt-28">
        <p className={`${eyebrow} mb-6`}>For residential service contractors</p>
        <h1 className="font-serif text-5xl md:text-7xl font-semibold leading-[1.05] tracking-tight max-w-3xl">
          Where good deals{" "}
          <em className="not-italic md:italic text-[#A57628]">come home.</em>
        </h1>
        <p className="text-lg md:text-xl text-[#3A4148] max-w-2xl mt-8 leading-relaxed">
          The follow-up that brings half-lost estimates back to life. Built for
          the contractor who&apos;d rather be on the roof than at the keyboard.
          We do one thing — close the deals you already earned.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <Link
            href="/signup"
            className="bg-[#28394B] text-[#EFE6D0] px-8 py-4 rounded text-base font-medium hover:bg-[#1A2530] transition-colors text-center"
          >
            Try Warmside for 30 days
          </Link>
          <a
            href="#how-it-works"
            className="px-8 py-4 text-base font-medium text-[#3A4148] underline decoration-[#C8923A] underline-offset-4 hover:text-[#0F1417] text-center"
          >
            See how it works →
          </a>
        </div>
        <p className="mt-8 font-serif italic text-lg text-[#B25B44] max-w-xl">
          — If we don&apos;t recover at least one job, full refund and we walk
          away as friends.
        </p>
      </section>

      {/* Stats */}
      <section className="border-y border-[#E0D3B2] bg-[#F4ECD9] py-20">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <div className="font-serif text-7xl font-semibold text-[#C8923A] mb-4">48%</div>
            <p className="text-lg text-[#3A4148] leading-relaxed max-w-md">
              of contractors never follow up on an estimate. Another 44% give up
              after one attempt. The 8% who keep going close{" "}
              <strong className="text-[#0F1417]">2× more jobs</strong>.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-10">
            <Stat big="$8,400" label="average revenue left on the table per month for a 25-estimate roofer" />
            <div className="grid grid-cols-2 gap-8">
              <Stat big="5–7" label="touches needed to close most home-services deals" small />
              <Stat big="0–2" label="touches the average contractor actually sends before moving on" small />
            </div>
          </div>
        </div>
      </section>

      {/* How it works — the sequence */}
      <section id="how-it-works" className="max-w-3xl mx-auto px-6 py-24">
        <p className={`${eyebrow} mb-4`}>How it works</p>
        <h2 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight mb-4">
          Five touches over 21 days.{" "}
          <em className="text-[#A57628]">Then it stops the second they reply.</em>
        </h2>
        <p className="text-lg text-[#3A4148] mb-14 max-w-xl">
          A sequence tuned to how home-services deals actually close — alternating
          text and email, spaced to feel human, never pushy.
        </p>

        <div className="relative pl-4">
          <div className="absolute left-[27px] top-2 bottom-2 w-px bg-[#D8C9A6]" />
          <div className="space-y-12">
            {SEQUENCE.map((t) => (
              <div key={t.day} className="relative flex gap-6">
                <div className="shrink-0 w-12 h-12 rounded-full border-2 border-[#C8923A] bg-[#EFE6D0] flex items-center justify-center font-mono text-xs font-semibold text-[#A57628] z-10">
                  {t.day}
                </div>
                <div className="pt-1">
                  <p className={`${eyebrow} mb-1`}>{t.when}</p>
                  <h3 className="font-serif text-2xl font-semibold mb-2">{t.title}</h3>
                  <p className="text-[#3A4148] leading-relaxed">{t.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Setup / BCC pattern */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <p className={`${eyebrow} mb-4`}>Setup</p>
        <h2 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight mb-4">
          Sixty seconds.{" "}
          <em className="text-[#A57628]">No new app to learn.</em>
        </h2>
        <p className="text-lg text-[#3A4148] mb-10 leading-relaxed">
          You already send estimate emails. Just add Warmside as a hidden
          recipient. We do everything from there — parse the prospect&apos;s
          name, the amount, the job details, and start the sequence the moment
          you hit send.
        </p>
        <div className="bg-[#28394B] text-[#EFE6D0] rounded-xl p-8">
          <h3 className="font-serif text-2xl font-semibold mb-3">The BCC pattern</h3>
          <p className="text-[#C6CFD8] leading-relaxed mb-6">
            Whatever tool you currently use to send estimates — Jobber,
            AccuLynx, JobNimbus, a Google Doc, just plain Gmail — keep using it.
            Add one line to your contact list:
          </p>
          <div className="bg-[#1A2530] rounded-lg px-4 py-4">
            <p className="font-mono text-xs tracking-widest uppercase text-[#7C8B9A] mb-1">
              Hidden recipient
            </p>
            <p className="font-mono text-[#E5B25A] break-all">
              you@inbound.warmside.app
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard preview */}
      <section className="border-y border-[#E0D3B2] bg-[#F4ECD9] py-24">
        <div className="max-w-3xl mx-auto px-6">
          <p className={`${eyebrow} mb-4`}>What you see</p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            One number that matters.{" "}
            <em className="text-[#A57628]">Your money, back in your pocket.</em>
          </h2>
          <p className="text-lg text-[#3A4148] mb-10 leading-relaxed">
            No vanity dashboards. No graphs you&apos;ll never read. Just recovered
            revenue, recent wins, and what&apos;s in flight. Available on every
            phone in your truck.
          </p>

          <div className="bg-[#EFE6D0] border border-[#E0D3B2] rounded-xl overflow-hidden shadow-sm">
            <div className="bg-[#28394B] px-5 py-3 flex items-center gap-3">
              <span className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4A5A6B]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#4A5A6B]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#4A5A6B]" />
              </span>
              <span className="font-mono text-xs text-[#9DAAB8]">
                warmside.app / your dashboard
              </span>
            </div>
            <div className="p-6">
              <p className="text-[#6B7178] mb-4">Hi, Mike.</p>
              <div className="font-serif text-5xl font-semibold text-[#C8923A]">$14,750</div>
              <p className="text-[#3A4148] mt-2 mb-8">
                recovered this month · 3 jobs back in your pocket
              </p>

              <p className={`${eyebrow} mb-4`}>Recent wins</p>
              <div className="divide-y divide-[#E0D3B2]">
                {[
                  ["Jameson roof repair", "closed 11 days after estimate", "$4,200"],
                  ["Patel HVAC replacement", "closed 14 days after estimate", "$7,850"],
                  ["Garcia paint job", "closed 8 days after estimate", "$2,700"],
                ].map(([name, sub, amt]) => (
                  <div key={name} className="flex justify-between items-start py-3 gap-4">
                    <div>
                      <div className="font-medium">{name}</div>
                      <div className="font-mono text-xs text-[#6B7178] mt-0.5">{sub}</div>
                    </div>
                    <div className="font-serif text-lg font-semibold text-[#A57628] shrink-0">{amt}</div>
                  </div>
                ))}
              </div>

              <p className={`${eyebrow} mt-8 mb-4`}>In flight · 12 estimates</p>
              <div className="divide-y divide-[#E0D3B2]">
                {[
                  ["Smith fence install", "touch 4 of 5 · sent yesterday", "$4,800"],
                  ["Johnson roof", "touch 2 of 5 · sent today", "$11,200"],
                ].map(([name, sub, amt]) => (
                  <div key={name} className="flex justify-between items-start py-3 gap-4">
                    <div>
                      <div className="font-medium">{name}</div>
                      <div className="font-mono text-xs text-[#6B7178] mt-0.5">{sub}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[#3A4148]">{amt}</div>
                      <div className="font-mono text-xs text-[#6B7178]">pending</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing band */}
      <section className="bg-[#28394B] text-[#EFE6D0] py-24">
        <div className="max-w-3xl mx-auto px-6">
          <p className="font-serif text-3xl md:text-4xl leading-snug text-[#E0D3B2]">
            The estimates that were going to slip through the cracks instead{" "}
            <em className="text-[#E5B25A]">find their way home.</em>
          </p>
          <p className="text-lg text-[#C6CFD8] mt-8 leading-relaxed">
            Try us for 30 days. If you don&apos;t recover at least one job, we
            refund every cent and we walk away as friends.{" "}
            <strong className="text-[#EFE6D0]">
              We&apos;re not here to win you. We&apos;re here to win for you.
            </strong>
          </p>
        </div>
      </section>

      {/* What you get */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <p className={`${eyebrow} mb-4`}>What you get</p>
        <h2 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight mb-4 max-w-2xl">
          Built for one thing.{" "}
          <em className="text-[#A57628]">Done in a way no one else does.</em>
        </h2>
        <p className="text-lg text-[#3A4148] mb-14 max-w-2xl leading-relaxed">
          The other tools want to be your everything — your CRM, your dispatch,
          your accounting, your financing. Warmside wants to be the best one
          piece. The part that nobody else makes work right.
        </p>
        <div className="grid md:grid-cols-2 gap-5">
          {FEATURES.map((f) => (
            <div key={f.n} className="border border-[#E0D3B2] rounded-xl p-7 bg-[#F4ECD9]">
              <div className="font-mono text-sm text-[#C8923A] mb-3">{f.n}</div>
              <h3 className="font-serif text-2xl font-semibold mb-3">{f.title}</h3>
              <p className="text-[#3A4148] leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What we'll never do */}
      <section className="border-t border-[#E0D3B2] bg-[#F4ECD9] py-24">
        <div className="max-w-5xl mx-auto px-6">
          <p className={`${eyebrow} mb-4`}>The fine print, made plain</p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            What we&apos;ll <em className="text-[#A57628]">never</em> do.
          </h2>
          <p className="text-lg text-[#3A4148] mb-12 max-w-xl leading-relaxed">
            Most software companies write a 6,000-word terms of service to hide
            what they&apos;re up to. Here&apos;s our list. It&apos;s short on purpose.
          </p>
          <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-4">
            {NEVER.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[#3A4148]">
                <span className="text-[#B25B44] mt-0.5 shrink-0">✕</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-5xl mx-auto px-6 py-24">
        <p className={`${eyebrow} mb-4`}>Pricing</p>
        <h2 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight mb-4">
          One number, all in.{" "}
          <em className="text-[#A57628]">No setup, no surprises.</em>
        </h2>
        <p className="text-lg text-[#3A4148] mb-12 max-w-xl leading-relaxed">
          Pick the one that fits your volume. Both come with the same features.
          Both come with the same promise.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Standard */}
          <div className="relative border-2 border-[#C8923A] rounded-2xl p-8 bg-[#F4ECD9]">
            <span className="absolute -top-3 left-8 bg-[#C8923A] text-[#28394B] font-mono text-xs font-bold tracking-wider uppercase px-3 py-1 rounded">
              Where 95% of contractors fit
            </span>
            <h3 className="font-serif text-2xl font-semibold mt-2">Warmside Standard</h3>
            <p className="text-[#6B7178] mt-1 mb-6">For solo operators and small teams</p>
            <div className="font-serif text-6xl font-semibold mb-6">
              $129<span className="text-lg font-normal text-[#6B7178] font-sans">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              {STANDARD_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[#3A4148]">
                  <span className="text-[#C8923A] shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className="block text-center bg-[#C8923A] text-[#1A2530] px-6 py-4 rounded-lg font-semibold hover:bg-[#B8822E] transition-colors"
            >
              Start your 30 days
            </Link>
          </div>

          {/* Volume */}
          <div className="border border-[#E0D3B2] rounded-2xl p-8 bg-[#F4ECD9]">
            <h3 className="font-serif text-2xl font-semibold mt-2">Warmside Volume</h3>
            <p className="text-[#6B7178] mt-1 mb-6">For high-volume operations</p>
            <div className="font-serif text-6xl font-semibold mb-6">
              $249<span className="text-lg font-normal text-[#6B7178] font-sans">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              {VOLUME_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[#3A4148]">
                  <span className="text-[#C8923A] shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className="block text-center bg-[#28394B] text-[#EFE6D0] px-6 py-4 rounded-lg font-semibold hover:bg-[#1A2530] transition-colors"
            >
              Start your 30 days
            </Link>
          </div>
        </div>

        <div className="border border-[#E0D3B2] rounded-xl p-8 mt-6 text-center bg-[#F4ECD9]">
          <p className="font-serif italic text-lg text-[#3A4148] max-w-2xl mx-auto leading-relaxed">
            <span className="text-[#B25B44]">Try us for 30 days.</span> If Warmside
            doesn&apos;t recover at least one job for you, full refund — one click,
            no exit interview, no questions asked. We send a handwritten note
            saying we&apos;re sorry it didn&apos;t work, and we wish you well.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-[#E0D3B2] bg-[#F4ECD9] py-24">
        <div className="max-w-3xl mx-auto px-6">
          <p className={`${eyebrow} mb-4`}>Honest answers</p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight mb-12">
            Things contractors actually ask.
          </h2>
          <div className="divide-y divide-[#E0D3B2]">
            {FAQS.map((f) => (
              <div key={f.q} className="py-6">
                <h3 className="font-serif text-xl font-semibold mb-2">{f.q}</h3>
                <p className="text-[#3A4148] leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + Footer */}
      <section className="bg-[#28394B] text-[#EFE6D0]">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            The next estimate you send could be the one you almost lost.
          </h2>
          <Link
            href="/signup"
            className="inline-block bg-[#C8923A] text-[#1A2530] px-10 py-4 rounded-lg text-lg font-semibold hover:bg-[#B8822E] transition-colors"
          >
            Start your 30 days — $129/mo
          </Link>
          <p className="mt-4 font-mono text-xs text-[#9DAAB8]">
            30-day money-back guarantee · No setup fees · Cancel anytime
          </p>
        </div>
        <footer className="border-t border-[#3A4A5B] py-10 text-center">
          <p className="font-serif italic text-lg text-[#E5B25A] mb-2">
            Where good deals come home.
          </p>
          <p className="font-mono text-xs text-[#6B7178]">
            Warmside · Tom Walker LLC · Tennessee
          </p>
        </footer>
      </section>
    </main>
  );
}

function Stat({
  big,
  label,
  small,
}: {
  big: string;
  label: string;
  small?: boolean;
}) {
  return (
    <div>
      <div
        className={`font-serif font-semibold text-[#28394B] ${
          small ? "text-4xl" : "text-6xl"
        }`}
      >
        {big}
      </div>
      <p className="text-sm text-[#6B7178] mt-2 leading-relaxed">{label}</p>
    </div>
  );
}
