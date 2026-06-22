export default function Home() {
  return (
    <main className="min-h-screen bg-[#EFE6D0] text-[#0F1417]">
      {/* Nav */}
      <nav className="border-b border-[#E0D3B2] bg-[#F4ECD9] px-6 py-4 flex justify-between items-center">
        <span className="font-serif text-xl font-bold tracking-tight">
          Warmside<span className="text-[#C8923A]">.</span>
        </span>
        <a
          href="/signup"
          className="bg-[#28394B] text-[#EFE6D0] px-5 py-2 rounded text-sm font-medium hover:bg-[#1A2530] transition-colors"
        >
          Start your 30 days
        </a>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <p className="font-mono text-xs tracking-widest uppercase text-[#6B7178] mb-6">
          For residential contractors
        </p>
        <h1 className="font-serif text-5xl md:text-6xl font-semibold leading-tight mb-6 tracking-tight">
          Where good deals{" "}
          <em className="text-[#A57628]">come home.</em>
        </h1>
        <p className="text-lg text-[#3A4148] max-w-xl mx-auto mb-10 leading-relaxed">
          You sent the estimate. Then life happened. Warmside follows up for
          you — in your voice, on your schedule — so the jobs you earned don't
          go to the guy who remembered to call back.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/signup"
            className="bg-[#28394B] text-[#EFE6D0] px-8 py-4 rounded text-base font-medium hover:bg-[#1A2530] transition-colors"
          >
            Start your 30 days — $129/mo
          </a>
          <a
            href="#how-it-works"
            className="border border-[#E0D3B2] text-[#3A4148] px-8 py-4 rounded text-base font-medium hover:border-[#C8923A] transition-colors"
          >
            See how it works
          </a>
        </div>
        <p className="mt-4 text-sm text-[#6B7178] font-mono">
          30-day money-back guarantee · No setup fees · Cancel anytime
        </p>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-[#F4ECD9] border-y border-[#E0D3B2] py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="font-mono text-xs tracking-widest uppercase text-[#6B7178] mb-4 text-center">
            How it works
          </p>
          <h2 className="font-serif text-4xl font-semibold text-center mb-16 tracking-tight">
            Three steps. Then let it run.
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "BCC your estimate",
                body: "When you send an estimate to a prospect, BCC your unique Warmside address. That's it.",
              },
              {
                step: "02",
                title: "We follow up in your voice",
                body: "Warmside sends a 5-touch sequence over 21 days — alternating SMS and email — tuned to sound exactly like you wrote it.",
              },
              {
                step: "03",
                title: "You close the job",
                body: "The moment your prospect replies, we stop and forward the message to your phone. You take it from there.",
              },
            ].map(({ step, title, body }) => (
              <div key={step} className="text-center">
                <div className="font-mono text-sm text-[#C8923A] mb-3">{step}</div>
                <h3 className="font-serif text-xl font-semibold mb-3">{title}</h3>
                <p className="text-[#3A4148] text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <p className="font-mono text-xs tracking-widest uppercase text-[#6B7178] mb-4 text-center">
          Pricing
        </p>
        <h2 className="font-serif text-4xl font-semibold text-center mb-4 tracking-tight">
          Two tiers. No surprises.
        </h2>
        <p className="text-center text-[#3A4148] mb-12">
          If Warmside can&apos;t prove it recovered a job you would have lost, you
          don&apos;t pay for that month.
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {[
            {
              name: "Standard",
              price: "$129",
              limit: "Up to 100 estimates/mo",
              features: ["All 6 trade sequences", "Voice Twin personalisation", "SMS + email follow-up", "Real-time reply forwarding", "ROI dashboard"],
              cta: "Start Standard",
            },
            {
              name: "Volume",
              price: "$249",
              limit: "Unlimited estimates",
              features: ["Everything in Standard", "Unlimited estimates", "Quarterly performance calls", "Priority support"],
              cta: "Start Volume",
            },
          ].map(({ name, price, limit, features, cta }) => (
            <div
              key={name}
              className="border border-[#E0D3B2] rounded-lg p-8 bg-[#F4ECD9]"
            >
              <div className="font-mono text-xs tracking-widest uppercase text-[#6B7178] mb-2">
                {name}
              </div>
              <div className="font-serif text-4xl font-semibold mb-1">
                {price}<span className="text-lg font-normal text-[#6B7178]">/mo</span>
              </div>
              <div className="text-sm text-[#6B7178] mb-6">{limit}</div>
              <ul className="space-y-2 mb-8">
                {features.map((f) => (
                  <li key={f} className="text-sm text-[#3A4148] flex items-start gap-2">
                    <span className="text-[#C8923A] mt-0.5">·</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="/signup"
                className="block text-center bg-[#28394B] text-[#EFE6D0] px-6 py-3 rounded text-sm font-medium hover:bg-[#1A2530] transition-colors"
              >
                {cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A2530] text-[#E0D3B2] py-10 text-center">
        <p className="font-serif italic text-lg text-[#E5B25A] mb-2">
          Where good deals come home.
        </p>
        <p className="font-mono text-xs text-[#6B7178]">
          Warmside · Tom Walker LLC · Tennessee
        </p>
      </footer>
    </main>
  );
}
