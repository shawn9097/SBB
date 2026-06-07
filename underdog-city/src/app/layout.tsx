import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-cinzel",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Underdog City",
  description: "Now Accepting Tenants in Underdog City. We all rule down here.",
  openGraph: {
    title: "Underdog City",
    description: "Now Accepting Tenants in Underdog City. We all rule down here.",
    images: ["/og-image.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Underdog City",
    description: "Now Accepting Tenants in Underdog City. We all rule down here.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable}`}>
      <body className="bg-[#0A0A0B] text-[#E3DCCB] antialiased">
        {children}
      </body>
    </html>
  );
}
