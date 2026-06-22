import { NextRequest, NextResponse } from "next/server";

const ESP_API_URL = process.env.ESP_SUBSCRIBE_URL;
const ESP_API_KEY = process.env.ESP_API_KEY;

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  if (!ESP_API_URL || !ESP_API_KEY) {
    console.error("ESP_SUBSCRIBE_URL / ESP_API_KEY not configured");
    return NextResponse.json({ error: "Subscriptions not configured" }, { status: 503 });
  }

  const espRes = await fetch(ESP_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ESP_API_KEY}`,
    },
    body: JSON.stringify({ email, double_opt_in: true }),
  });

  if (!espRes.ok) {
    return NextResponse.json({ error: "Subscription failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
