import type { TouchChannel, TradeNiche } from "@/types";

export interface SequenceTouch {
  index: number;
  dayOffset: number; // days after campaign start to send this touch
  channel: TouchChannel;
  label: string;
  subject?: string; // email only
  body: string;     // uses {{variable}} placeholders
}

export interface Sequence {
  niche: TradeNiche;
  displayName: string;
  avgJob: string;
  cycleLabel: string;
  touches: SequenceTouch[];
}

// ─── Variable reference ─────────────────────────────────────────────────────
// {{first_name}}         prospect first name
// {{contractor_first}}   contractor first name
// {{contractor_full}}    contractor full name
// {{company}}            company name
// {{contractor_phone}}   contractor phone number
// {{trade_value_1}}      contractor's primary differentiator (configured at onboarding)
// {{lead_time_weeks}}    typical lead time in weeks (default: "2–4")
// {{warranty_years}}     warranty length
// {{financing_option}}   financing partner name (omitted if blank)
// {{room}}               room being remodeled (K&B)
// {{unit_type}}          HVAC unit type
// {{material}}           material specified
// {{scope_summary}}      one-line scope summary
// {{install_days}}       days from sign to complete
// {{install_window}}     season-appropriate install window
// {{season_change}}      next major seasonal shift
// {{compliance_doc}}     HOA/permit doc type
// {{linear_feet}}        fence linear feet
// {{lifespan}}           material lifespan in years
// {{paint_type}}         paint type specified
// {{plant_type}}         plant type specified
// {{weather_window}}     painting weather window
// {{specific_material}}  specific K&B material (e.g. "the tile")
// {{weeks}}              lead time in weeks
// {{months}}             financing months
// {{financing_partner}}  financing partner name (K&B)

export const SEQUENCES: Record<TradeNiche, Sequence> = {
  roofing: {
    niche: "roofing",
    displayName: "Roofing",
    avgJob: "$11,500",
    cycleLabel: "5–21 days",
    touches: [
      {
        index: 0,
        dayOffset: 0,
        channel: "sms",
        label: "Friendly confirmation",
        body: "Hi {{first_name}}, this is {{contractor_first}} from {{company}}. Just making sure the roof estimate landed in your inbox earlier. Let me know if anything looks off — happy to walk through it.",
      },
      {
        index: 1,
        dayOffset: 0,
        channel: "email",
        label: "Email landing",
        subject: "Your roof estimate from {{company}}",
        body: `Hi {{first_name}},

Sent over your roof estimate earlier today — wanted to make sure it landed safely. Whenever you've got a few minutes to look it over, just let me know what questions come up.

If you need anything clarified — pricing, materials, timeline, warranty — just hit reply.

Talk soon,
{{contractor_full}}
{{company}}
{{contractor_phone}}`,
      },
      {
        index: 2,
        dayOffset: 3,
        channel: "sms",
        label: "Empathy check-in",
        body: "Hey {{first_name}}, {{contractor_first}} again. Any thoughts on the roof estimate? The materials breakdown can be a lot to take in — happy to talk through any of it.",
      },
      {
        index: 3,
        dayOffset: 7,
        channel: "email",
        label: "Value reinforcement",
        subject: "A few things worth knowing about your roof project",
        body: `Hi {{first_name}},

Wanted to share a few things that might help as you think about the project:

· The estimate includes {{trade_value_1}} — that's what separates our work from a quick patch job
· We can typically start within {{lead_time_weeks}} weeks of signing
· Most homeowners are surprised by financing options — happy to walk you through them

If any of this is worth talking through on a quick call, just reply with a time that works.

{{contractor_full}}`,
      },
      {
        index: 4,
        dayOffset: 14,
        channel: "sms",
        label: "Honest ask",
        body: "Hi {{first_name}} — one more nudge from {{contractor_first}}. Is timing the issue, or do you need to walk through the numbers? Happy to adjust scope if that helps. No pressure either way.",
      },
      {
        index: 5,
        dayOffset: 21,
        channel: "email",
        label: "Graceful exit",
        subject: "Closing out the roof estimate",
        body: `Hi {{first_name}},

Closing out the roof estimate from a few weeks back — keeping my pipeline clean. If timing isn't right or you went a different direction, no worries at all.

If you ever want to revisit it, just hit reply and I'll dust it off.

Take care,
{{contractor_full}}`,
      },
    ],
  },

  hvac: {
    niche: "hvac",
    displayName: "HVAC Replacement",
    avgJob: "$3,200–$9,500",
    cycleLabel: "1–7 days",
    touches: [
      {
        index: 0,
        dayOffset: 0,
        channel: "sms",
        label: "Friendly confirmation",
        body: "Hi {{first_name}}, {{contractor_first}} from {{company}}. Just making sure the HVAC quote landed earlier — let me know if anything looks unclear about the system specs.",
      },
      {
        index: 1,
        dayOffset: 0,
        channel: "email",
        label: "Email landing",
        subject: "Your HVAC quote from {{company}}",
        body: `Hi {{first_name}},

Sent the HVAC quote over earlier — wanted to make sure it got through. The breakdown shows {{unit_type}} sized for your home, with the efficiency rating we talked about.

Anything you want walked through — system specs, financing, install timeline — just hit reply.

Talk soon,
{{contractor_full}}`,
      },
      {
        index: 2,
        dayOffset: 3,
        channel: "sms",
        label: "Empathy check-in",
        body: "Hey {{first_name}}, {{contractor_first}} again. Any thoughts on the HVAC quote? The SEER ratings and warranty details can be a lot to compare — happy to talk through any of it.",
      },
      {
        index: 3,
        dayOffset: 7,
        channel: "email",
        label: "Value reinforcement",
        subject: "A few things to know about your HVAC project",
        body: `Hi {{first_name}},

Quick thoughts as you think about the system replacement:

· The unit we spec'd has {{warranty_years}} on parts and labor — not standard at this price point
· Most installs run {{install_days}} days from signing
· {{financing_option}} can split the cost into monthly payments comparable to what you'd pay in utility savings

If you want to talk through any of this, just reply with a time.

{{contractor_full}}`,
      },
      {
        index: 4,
        dayOffset: 14,
        channel: "sms",
        label: "Honest ask",
        body: "Hi {{first_name}} — one more nudge from {{contractor_first}}. Is it timing or the budget? We've got financing options that might help. Happy to adjust scope. No pressure either way.",
      },
      {
        index: 5,
        dayOffset: 21,
        channel: "email",
        label: "Graceful exit",
        subject: "Closing out the HVAC quote",
        body: `Hi {{first_name}},

Closing out the HVAC quote from a few weeks back — keeping things tidy. If timing's not right or you went a different direction, no worries.

System won't get any younger though — if you ever want to revisit, just hit reply.

{{contractor_full}}`,
      },
    ],
  },

  painting: {
    niche: "painting",
    displayName: "Painters",
    avgJob: "$2,500–$6,500",
    cycleLabel: "3–14 days",
    touches: [
      {
        index: 0,
        dayOffset: 0,
        channel: "sms",
        label: "Friendly confirmation",
        body: "Hi {{first_name}}, {{contractor_first}} from {{company}}. Just confirming the painting estimate landed. Let me know if any questions on the color or finish — that's where most homeowners want a second look.",
      },
      {
        index: 1,
        dayOffset: 0,
        channel: "email",
        label: "Email landing",
        subject: "Your painting estimate from {{company}}",
        body: `Hi {{first_name}},

Sent the painting estimate over earlier — wanted to confirm it landed. Covers {{scope_summary}}, with {{paint_type}} as we discussed.

If you want to talk through colors, prep, timeline, or warranty — just hit reply. Color especially is where it pays to take a beat.

Talk soon,
{{contractor_full}}`,
      },
      {
        index: 2,
        dayOffset: 3,
        channel: "sms",
        label: "Empathy check-in",
        body: "Hey {{first_name}}, {{contractor_first}} again. Any thoughts on the painting estimate? Happy to drop by with samples if color's the holdup.",
      },
      {
        index: 3,
        dayOffset: 7,
        channel: "email",
        label: "Value reinforcement",
        subject: "Couple things worth knowing about your project",
        body: `Hi {{first_name}},

Quick thoughts:

· Our prep work is what makes the finish last 7–10 years not 2–3 — that's the line item that matters most
· {{weather_window}} is when we can start, weather permitting
· Samples are free if you want to swatch a wall before committing

If any of that helps, just reply.

{{contractor_full}}`,
      },
      {
        index: 4,
        dayOffset: 14,
        channel: "sms",
        label: "Honest ask",
        body: "Hi {{first_name}} — one more nudge. Is it timing, or are you still deciding on colors? Happy to bring samples by. No pressure either way.",
      },
      {
        index: 5,
        dayOffset: 21,
        channel: "email",
        label: "Graceful exit",
        subject: "Closing out the painting estimate",
        body: `Hi {{first_name}},

Closing out the painting estimate from a few weeks back. If you went another direction or timing's off, no worries.

Walls don't paint themselves though — if you want to revisit, just hit reply.

{{contractor_full}}`,
      },
    ],
  },

  kitchen_bath: {
    niche: "kitchen_bath",
    displayName: "Kitchen & Bath Remodelers",
    avgJob: "$13,000–$55,000",
    cycleLabel: "21–90 days",
    touches: [
      {
        index: 0,
        dayOffset: 0,
        channel: "sms",
        label: "Friendly confirmation",
        body: "Hi {{first_name}}, {{contractor_first}} from {{company}}. Just confirming the {{room}} remodel estimate landed. Big project — happy to walk through anything as you think about it.",
      },
      {
        index: 1,
        dayOffset: 0,
        channel: "email",
        label: "Email landing",
        subject: "Your {{room}} remodel estimate from {{company}}",
        body: `Hi {{first_name}},

Sent over the {{room}} remodel estimate earlier — wanted to confirm. It's a meaningful project, and most homeowners want time to sit with the design and the budget before making a call. Totally normal.

When you're ready to talk through anything — design tweaks, materials, financing, timeline — just hit reply.

Talk soon,
{{contractor_full}}`,
      },
      {
        index: 2,
        dayOffset: 5,
        channel: "sms",
        label: "Early thoughts",
        body: "Hey {{first_name}}, {{contractor_first}}. Any early thoughts on the {{room}} estimate? Happy to send revised design options if anything in there isn't quite landing.",
      },
      {
        index: 3,
        dayOffset: 14,
        channel: "email",
        label: "Value reinforcement",
        subject: "A few things worth thinking about for the {{room}} project",
        body: `Hi {{first_name}},

Wanted to share a couple thoughts as you sit with the project:

· Lead time on {{specific_material}} is {{weeks}} weeks — the sooner we lock in, the sooner we start
· Financing through {{financing_partner}} can spread the cost over {{months}} months
· We can phase the project if budget's a concern — one room now, another later

No pressure. Just things to know.

{{contractor_full}}`,
      },
      {
        index: 4,
        dayOffset: 30,
        channel: "sms",
        label: "One month check-in",
        body: "Hi {{first_name}} — a month in. Where are you landing on the {{room}} project? Happy to talk scope, timing, or financing if any of those are the holdup.",
      },
      {
        index: 5,
        dayOffset: 45,
        channel: "email",
        label: "Where you're landing",
        subject: "Where you're landing on the {{room}}",
        body: `Hi {{first_name}},

Six weeks since we got you the estimate. Wanted to ask where you're landing — without pressure either way.

If you've decided to wait, no problem — let me know roughly when you're thinking, and I'll come back then.

If you went a different direction, also no problem — just want to keep things clean on my end.

{{contractor_full}}`,
      },
      {
        index: 6,
        dayOffset: 90,
        channel: "email",
        label: "Final close-out",
        subject: "Closing out the {{room}} remodel estimate",
        body: `Hi {{first_name}},

Closing out the {{room}} estimate after 90 days. If you ever want to revisit, just hit reply and we'll dust it off — pricing might shift slightly with materials, but we'll honor what we can.

Take care,
{{contractor_full}}`,
      },
    ],
  },

  landscaping: {
    niche: "landscaping",
    displayName: "Landscapers",
    avgJob: "$8,000–$25,000",
    cycleLabel: "7–21 days",
    touches: [
      {
        index: 0,
        dayOffset: 0,
        channel: "sms",
        label: "Friendly confirmation",
        body: "Hi {{first_name}}, {{contractor_first}} from {{company}}. Confirming the landscape estimate landed earlier. Happy to walk through plant choices or the phasing plan whenever.",
      },
      {
        index: 1,
        dayOffset: 0,
        channel: "email",
        label: "Email landing",
        subject: "Your landscape design from {{company}}",
        body: `Hi {{first_name}},

Sent the landscape estimate over earlier. Covers {{scope_summary}}. If you want to talk plants, timeline, irrigation, or warranty — just hit reply.

Talk soon,
{{contractor_full}}`,
      },
      {
        index: 2,
        dayOffset: 3,
        channel: "sms",
        label: "Empathy check-in",
        body: "Hey {{first_name}}, {{contractor_first}}. Any thoughts on the landscape design? Happy to swap plant options if the picks aren't sitting right.",
      },
      {
        index: 3,
        dayOffset: 7,
        channel: "email",
        label: "Value reinforcement",
        subject: "A couple things worth knowing about your landscape project",
        body: `Hi {{first_name}},

Quick thoughts:

· {{plant_type}} we spec'd carries our 1-year warranty — if anything doesn't root, we replace it
· {{install_window}} is the sweet spot to plant — gives roots time before {{season_change}}
· We can phase the design if you want to spread cost across two seasons

If any of that's worth a talk, just reply.

{{contractor_full}}`,
      },
      {
        index: 4,
        dayOffset: 14,
        channel: "sms",
        label: "Honest ask",
        body: "Hi {{first_name}} — one more nudge. Is timing the holdup, or any plant choices you'd want to revise? Happy to adjust.",
      },
      {
        index: 5,
        dayOffset: 21,
        channel: "email",
        label: "Graceful exit",
        subject: "Closing out the landscape estimate",
        body: `Hi {{first_name}},

Closing out the landscape estimate. Seasons matter for plants though — if you want to revisit before {{season_change}}, just hit reply.

{{contractor_full}}`,
      },
    ],
  },

  fencing: {
    niche: "fencing",
    displayName: "Fence Builders",
    avgJob: "$4,200",
    cycleLabel: "3–10 days",
    touches: [
      {
        index: 0,
        dayOffset: 0,
        channel: "sms",
        label: "Friendly confirmation",
        body: "Hi {{first_name}}, {{contractor_first}} from {{company}}. Confirming the fence estimate landed. Let me know if any questions on the material — wood vs. vinyl is the most common one.",
      },
      {
        index: 1,
        dayOffset: 0,
        channel: "email",
        label: "Email landing",
        subject: "Your fence estimate from {{company}}",
        body: `Hi {{first_name}},

Sent the fence estimate earlier — confirming it got through. Covers {{linear_feet}} of {{material}} fencing as we discussed. If you have questions on material, height, gate placement, or timeline — just hit reply.

Talk soon,
{{contractor_full}}`,
      },
      {
        index: 2,
        dayOffset: 3,
        channel: "sms",
        label: "Empathy check-in",
        body: "Hey {{first_name}}, {{contractor_first}}. Any thoughts on the fence estimate? Happy to swap to a different material if pricing's tight on this option.",
      },
      {
        index: 3,
        dayOffset: 7,
        channel: "email",
        label: "Value reinforcement",
        subject: "A couple things worth knowing about your fence project",
        body: `Hi {{first_name}},

Quick thoughts:

· {{material}} typically lasts {{lifespan}} years with proper installation
· If you're in an HOA, we handle the {{compliance_doc}} — no extra step for you
· Install timeline is {{install_days}} days, weather permitting

If any of that's worth a talk, just reply.

{{contractor_full}}`,
      },
      {
        index: 4,
        dayOffset: 14,
        channel: "sms",
        label: "Honest ask",
        body: "Hi {{first_name}} — one more nudge. Timing, material, or budget the holdup? Happy to adjust.",
      },
      {
        index: 5,
        dayOffset: 21,
        channel: "email",
        label: "Graceful exit",
        subject: "Closing out the fence estimate",
        body: `Hi {{first_name}},

Closing out the fence estimate from a few weeks back. If you want to revisit, just hit reply.

{{contractor_full}}`,
      },
    ],
  },
};

// ─── Variable substitution ───────────────────────────────────────────────────
export function applyVariables(
  template: string,
  vars: Record<string, string | number | null | undefined>
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    const val = vars[key];
    if (val == null || val === "") return match; // leave placeholder visible if missing
    return String(val);
  });
}

// ─── Niche auto-selector ─────────────────────────────────────────────────────
const NICHE_KEYWORDS: Record<TradeNiche, string[]> = {
  roofing: ["roof", "shingle", "gutter", "soffit", "fascia", "flashing"],
  hvac: ["hvac", "ac", "air condition", "heat pump", "furnace", "ductwork", "seer"],
  painting: ["paint", "stain", "primer", "coat", "finish", "color", "drywall"],
  kitchen_bath: ["kitchen", "bath", "cabinet", "countertop", "tile", "remodel", "renovation"],
  landscaping: ["landscape", "plant", "sod", "irrigation", "lawn", "garden", "tree"],
  fencing: ["fence", "fencing", "vinyl", "wood fence", "chain link", "gate", "picket"],
};

const NICHE_AMOUNT_RANGES: Array<[TradeNiche, number, number]> = [
  ["painting", 2500, 6500],
  ["fencing", 2000, 6000],
  ["hvac", 3000, 10000],
  ["landscaping", 7000, 26000],
  ["roofing", 6000, 25000],
  ["kitchen_bath", 12000, 60000],
];

export function detectNicheFromText(
  subject: string,
  body: string,
  amount?: number | null
): { niche: TradeNiche; confidence: number } {
  const text = `${subject} ${body}`.toLowerCase();

  // Pass 1: keyword scan
  for (const [niche, keywords] of Object.entries(NICHE_KEYWORDS) as [TradeNiche, string[]][]) {
    if (keywords.some((kw) => text.includes(kw))) {
      return { niche, confidence: 0.9 };
    }
  }

  // Pass 2: dollar amount range
  if (amount != null) {
    for (const [niche, min, max] of NICHE_AMOUNT_RANGES) {
      if (amount >= min && amount <= max) {
        return { niche, confidence: 0.6 };
      }
    }
  }

  // Fallback — caller should trigger AI scan or contractor override
  return { niche: "roofing", confidence: 0.2 };
}
