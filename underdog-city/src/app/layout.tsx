import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "900"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const title = "Underdog City — Now Accepting Tenants";
const description =
  "We all rule down here. Underdog City is a dark-fantasy world told through music, story, and lore. Claim your key before the gates open.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: undefined,
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Underdog City",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
