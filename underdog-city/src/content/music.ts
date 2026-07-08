export type Transmission = {
  index: string;
  redactWidth: string;
};

export const musicMeta = {
  intro: [
    "Fourteen transmissions from the bottom of the world.",
    "No names yet. The signal only gets louder — and tenants hear them first.",
  ],
  destination: {
    album: "Throne at the Bottom",
    date: "July 31",
    note: "The debut album. Fourteen tracks from the bottom of the world. Get on the list to hear it before the world does.",
  },
};

// Varied redaction-bar widths so the censored tracklist reads like real hidden titles.
const REDACT_WIDTHS = [
  "w-40",
  "w-28",
  "w-36",
  "w-44",
  "w-32",
  "w-48",
  "w-28",
  "w-40",
  "w-36",
  "w-32",
  "w-44",
  "w-28",
  "w-40",
  "w-36",
];

export const transmissions: Transmission[] = Array.from(
  { length: 14 },
  (_, i) => ({
    index: String(i + 1).padStart(2, "0"),
    redactWidth: REDACT_WIDTHS[i],
  })
);

// Only real, live accounts — no dead links. Add Facebook once we have the URL,
// Spotify at launch, Instagram/X when the accounts exist.
export const socials = [
  { label: "YouTube", href: "https://www.youtube.com/@UnderdogCity" },
  { label: "TikTok", href: "https://www.tiktok.com/@underdog.city" },
];
