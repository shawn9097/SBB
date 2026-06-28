export type Transmission = {
  index: string;
  title: string;
  status: "incoming" | "locked";
  hint?: string;
};

export const musicMeta = {
  intro: [
    "Every song is a tenant. Every tenant has a story.",
    "The first transmissions are incoming. No dates. No promises. Only the signal getting louder.",
  ],
  destination: {
    album: "Throne at the Bottom",
    note: "The debut. It opens with a death and ends with a coronation.",
  },
};

// The locked four-single pre-release sequence. First teased, the rest redacted
// to hold the mystery until each one's window opens.
export const transmissions: Transmission[] = [
  {
    index: "01",
    title: "Stupid Little Bitch",
    status: "incoming",
    hint: "The first anthem. Turn it up loud.",
  },
  { index: "02", title: "— — — —", status: "locked" },
  { index: "03", title: "— — — —", status: "locked" },
  { index: "04", title: "— — — —", status: "locked" },
];

export const socials = [
  { label: "Spotify", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "X", href: "#" },
];
