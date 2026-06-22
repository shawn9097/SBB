import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { buildVoiceDNA } from "@/lib/claude";
import {
  generateInboundAddress,
  isTradeNiche,
  parseEntries,
} from "@/lib/voice-twin";
import type { VoiceDNA } from "@/types";

interface OnboardingBody {
  first_name?: string;
  last_name?: string;
  company_name?: string;
  email?: string;
  phone?: string;
  trade_niche?: string;
  trade_value_1?: string;
  lead_time_weeks?: string;
  sample_texts?: string;
  sample_emails?: string;
  trade_notes?: string;
  never_say?: string;
}

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

const PG_UNIQUE_VIOLATION = "23505";

// Creates a contractor from the onboarding form: validates input, builds the Voice DNA
// profile from their writing samples, provisions a unique BCC address, and persists the record.
export async function POST(req: NextRequest) {
  let body: OnboardingBody;
  try {
    body = (await req.json()) as OnboardingBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const first_name = clean(body.first_name);
  const last_name = clean(body.last_name);
  const company_name = clean(body.company_name);
  const email = clean(body.email).toLowerCase();
  const phone = clean(body.phone);
  const trade_niche = clean(body.trade_niche);
  const trade_value_1 = clean(body.trade_value_1);
  const lead_time_weeks = clean(body.lead_time_weeks);

  const missing = Object.entries({
    first_name,
    last_name,
    company_name,
    email,
    phone,
  })
    .filter(([, v]) => !v)
    .map(([k]) => k);

  if (missing.length) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  if (!isTradeNiche(trade_niche)) {
    return NextResponse.json({ error: "Invalid trade niche" }, { status: 400 });
  }

  const db = supabaseAdmin();

  // Don't let the same email onboard twice.
  const { data: existing } = await db
    .from("contractors")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existing) {
    return NextResponse.json(
      { error: "An account already exists for this email" },
      { status: 409 }
    );
  }

  // Build the Voice DNA profile from their samples. If Claude is unavailable or the samples
  // are too thin, fall back to null — sequences still send as plain templates.
  let voice_dna: VoiceDNA | null = null;
  const texts = parseEntries(clean(body.sample_texts));
  const emails = parseEntries(clean(body.sample_emails));
  if (texts.length || emails.length) {
    try {
      voice_dna = await buildVoiceDNA({
        texts,
        emails,
        tradeNotes: clean(body.trade_notes),
        neverSay: clean(body.never_say),
      });
    } catch (e) {
      console.error("Voice DNA build failed, continuing without it:", e);
    }
  }

  const contractorBase = {
    first_name,
    last_name,
    company_name,
    email,
    phone,
    trade_niche,
    voice_dna,
    trade_value_1: trade_value_1 || null,
    lead_time_weeks: lead_time_weeks || null,
  };

  // Provision a unique BCC address, retrying on the rare slug collision.
  let inserted = null;
  let lastError: unknown = null;
  for (let attempt = 0; attempt < 5; attempt++) {
    const inbound_email_address = generateInboundAddress(company_name);
    const { data, error } = await db
      .from("contractors")
      .insert({ ...contractorBase, inbound_email_address })
      .select("id, inbound_email_address, voice_dna")
      .single();

    if (!error && data) {
      inserted = data;
      break;
    }
    lastError = error;
    if (error?.code !== PG_UNIQUE_VIOLATION) break;
  }

  if (!inserted) {
    console.error("Failed to create contractor:", lastError);
    return NextResponse.json(
      { error: "Could not create your account. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    contractor_id: inserted.id,
    inbound_email_address: inserted.inbound_email_address,
    voice_twin_ready: Boolean(inserted.voice_dna),
  });
}
