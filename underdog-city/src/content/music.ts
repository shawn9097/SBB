export type Transmission = {
  index: string;
  // Filename body: real letters (in their true positions) glow through the
  // redaction — the music escaping — while █ stays hidden and _ is a separator.
  name: string;
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

// Each entry: [filename body, extension]. Real letters sit in their true
// positions (a breadcrumb fans can theorize over); █ is redacted, _ is a space.
// One or two letters per title bleed through — enough to spark, not to spoil.
const TRACKS: [string, string][] = [
  ["v██████", "wav"], // 01
  ["d███_████", "mp3"], // 02
  ["w██_██", "wav"], // 03
  ["c████", "wav"], // 04
  ["s█████_██████_█████", "mp3"], // 05
  ["██████_██_l██", "wav"], // 06
  ["██_s████", "mp3"], // 07
  ["██████_g█████", "wav"], // 08
  ["███_o██_████", "wav"], // 09
  ["███_t████", "mp3"], // 10
  ["█████████_l███", "wav"], // 11
  ["████_████_w████", "wav"], // 12
  ["██████_██_███_b█████", "mp3"], // 13
  ["a█████_██_█████", "wav"], // 14
];

export const transmissions: Transmission[] = TRACKS.map(([name, ext], i) => ({
  index: String(i + 1).padStart(2, "0"),
  name,
  ext,
}));

// Only real, live accounts — no dead links. Add Spotify at launch, X when it exists.
export const socials = [
  { label: "YouTube", href: "https://www.youtube.com/@UnderdogCity" },
  { label: "TikTok", href: "https://www.tiktok.com/@underdog.city" },
  { label: "Instagram", href: "https://www.instagram.com/underdogcitymusic" },
  { label: "Facebook", href: "https://www.facebook.com/share/1DYr48bxnd/" },
];
