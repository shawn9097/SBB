import { NextRequest, NextResponse } from "next/server";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function subscribeBeehiiv(email: string): Promise<void> {
  const res = await fetch(
    `https://api.beehiiv.com/v2/publications/${process.env.BEEHIIV_PUB_ID}/subscriptions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.BEEHIIV_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: true,
      }),
    }
  );
  if (!res.ok) throw new Error(`Beehiiv error: ${res.status}`);
}

async function subscribeConvertKit(email: string): Promise<void> {
  const res = await fetch(
    `https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: process.env.CONVERTKIT_API_KEY,
        email,
      }),
    }
  );
  if (!res.ok) throw new Error(`ConvertKit error: ${res.status}`);
}

async function subscribeMailchimp(email: string): Promise<void> {
  const credentials = Buffer.from(
    `anystring:${process.env.MAILCHIMP_API_KEY}`
  ).toString("base64");
  const res = await fetch(
    `https://${process.env.MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify({ email_address: email, status: "pending" }),
    }
  );
  if (!res.ok) throw new Error(`Mailchimp error: ${res.status}`);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { email?: unknown };
    const email =
      typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Valid email required." },
        { status: 400 }
      );
    }

    switch (process.env.ESP_PROVIDER) {
      case "beehiiv":
        await subscribeBeehiiv(email);
        break;
      case "convertkit":
        await subscribeConvertKit(email);
        break;
      case "mailchimp":
        await subscribeMailchimp(email);
        break;
      default:
        console.log(`[subscribe] New signup: ${email}`);
        break;
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[subscribe] Error:", err);
    return NextResponse.json(
      { error: "Signup failed. Please try again." },
      { status: 500 }
    );
  }
}
