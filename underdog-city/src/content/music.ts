export type Transmission = {
  index: string;
  redact: string; // corrupted/hidden filename — block glyphs of varying length
  ext: string;
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

// Corrupted, redacted filenames — imply the tracks exist and are locked, without
// leaking a single title. Varying lengths read like real hidden names.
const REDACTIONS = [
  "████████",
  "█████",
  "██████████",
  "███████",
  "██████",
  "████████████",
  "█████",
  "█████████",
  "███████",
  "██████",
  "███████████",
  "█████",
  "████████",
  "█████████",
];
const EXTS = [
  "wav",
  "mp3",
  "wav",
  "wav",
  "mp3",
  "wav",
  "mp3",
  "wav",
  "wav",
  "mp3",
  "wav",
  "wav",
  "mp3",
  "wav",
];

export const transmissions: Transmission[] = Array.from(
  { length: 14 },
  (_, i) => ({
    index: String(i + 1).padStart(2, "0"),
    redact: REDACTIONS[i],
    ext: EXTS[i],
  })
);

// Only real, live accounts — no dead links. Add Spotify at launch, X when it exists.
export const socials = [
  { label: "YouTube", href: "https://www.youtube.com/@UnderdogCity" },
  { label: "TikTok", href: "https://www.tiktok.com/@underdog.city" },
  { label: "Instagram", href: "https://www.instagram.com/underdogcitymusic" },
  { label: "Facebook", href: "https://www.facebook.com/share/1DYr48bxnd/" },
];
