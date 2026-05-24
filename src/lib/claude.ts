import Anthropic from "@anthropic-ai/sdk";
import type { TradeNiche, VoiceDNA } from "@/types";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─── Voice Twin ──────────────────────────────────────────────────────────────
export async function buildVoiceDNA({
  texts,
  emails,
  tradeNotes,
  neverSay,
}: {
  texts: string[];
  emails: string[];
  tradeNotes: string;
  neverSay: string;
}): Promise<VoiceDNA> {
  const prompt = `You are analyzing a contractor's writing style to create a Voice DNA profile.

Here are ${texts.length} real texts they've sent to customers:
${texts.map((t, i) => `[Text ${i + 1}]: ${t}`).join("\n")}

Here are ${emails.length} emails they've sent that closed deals:
${emails.map((e, i) => `[Email ${i + 1}]: ${e}`).join("\n")}

Trade/regional notes: ${tradeNotes || "none"}
Things they'd never say: ${neverSay || "none"}

Extract their Voice DNA. Return ONLY a valid JSON object matching this shape exactly:
{
  "greeting_style": "the greeting pattern they use, e.g. 'Hey {{name}},' or 'Hi {{name}} —'",
  "signoff_style": "their sign-off, e.g. 'Talk soon,' or 'Take care,'",
  "punctuation_notes": "brief description of their punctuation habits",
  "pet_phrases": ["array", "of", "phrases", "they", "use"],
  "question_framing": "direct" | "soft",
  "never_say": ["things", "to", "avoid"]
}`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Claude did not return valid JSON for Voice DNA");

  return JSON.parse(jsonMatch[0]) as VoiceDNA;
}

// Apply a contractor's Voice DNA to a template message
export async function applyVoiceTwin(
  template: string,
  voiceDNA: VoiceDNA
): Promise<string> {
  const prompt = `You are rewriting a follow-up message so it sounds like the contractor wrote it personally.

Contractor's Voice DNA profile:
- Greeting style: ${voiceDNA.greeting_style}
- Sign-off style: ${voiceDNA.signoff_style}
- Punctuation habits: ${voiceDNA.punctuation_notes}
- Pet phrases they use: ${voiceDNA.pet_phrases.join(", ") || "none"}
- Question framing: ${voiceDNA.question_framing}
- Never say: ${voiceDNA.never_say.join(", ") || "none"}

Original template:
${template}

Rules:
- Preserve ALL {{variable}} placeholders exactly as written
- Keep the same meaning and structure
- Do NOT add any explanation — return only the rewritten message
- Do NOT make it longer — keep it the same length or shorter
- Apply the contractor's voice naturally`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 512,
    messages: [{ role: "user", content: prompt }],
  });

  return message.content[0].type === "text" ? message.content[0].text.trim() : template;
}

// ─── Niche detection via AI (used when keyword + amount heuristics fail) ─────
export async function detectNicheWithAI(
  subject: string,
  body: string
): Promise<{ niche: TradeNiche; confidence: number }> {
  const niches: TradeNiche[] = [
    "roofing", "hvac", "painting", "kitchen_bath", "landscaping", "fencing",
  ];

  const prompt = `Classify this contractor estimate into one of these trade niches: ${niches.join(", ")}.

Subject: ${subject}
Body excerpt: ${body.slice(0, 500)}

Return ONLY valid JSON: {"niche": "<one of the niche values>", "confidence": <0.0–1.0>}`;

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 64,
    messages: [{ role: "user", content: prompt }],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";
  const jsonMatch = text.match(/\{[^}]+\}/);
  if (!jsonMatch) return { niche: "roofing", confidence: 0.2 };

  const parsed = JSON.parse(jsonMatch[0]) as { niche: string; confidence: number };
  if (!niches.includes(parsed.niche as TradeNiche)) return { niche: "roofing", confidence: 0.2 };

  return { niche: parsed.niche as TradeNiche, confidence: parsed.confidence };
}

// ─── Reply intent classification ─────────────────────────────────────────────
export type ReplyIntent =
  | "interested"
  | "question"
  | "not_now"
  | "polite_no"
  | "stop";

export async function classifyReplyIntent(replyText: string): Promise<ReplyIntent> {
  const prompt = `Classify this reply from a contractor's prospect into one intent category.

Reply: "${replyText}"

Categories:
- interested: ready to move forward, asking what's next
- question: asking a specific question about the estimate/project
- not_now: wants to wait (next month, after holidays, etc.)
- polite_no: went a different direction, decided not to proceed
- stop: wants no further contact (STOP, wrong number, unsubscribe)

Return ONLY one word from the categories list.`;

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 16,
    messages: [{ role: "user", content: prompt }],
  });

  const text = (
    message.content[0].type === "text" ? message.content[0].text : ""
  ).trim().toLowerCase();

  const valid: ReplyIntent[] = ["interested", "question", "not_now", "polite_no", "stop"];
  return valid.includes(text as ReplyIntent) ? (text as ReplyIntent) : "question";
}
