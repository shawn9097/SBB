import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Warmside — Where good deals come home",
  description:
    "Automated estimate follow-up for residential contractors. $129/mo. 30-day guarantee.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
