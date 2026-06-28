import type { MetadataRoute } from "next";
import { chapters } from "@/content/novel";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://theunderdogcity.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = ["", "/story", "/music"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
  }));
  const chapterPages = chapters
    .filter((c) => c.available)
    .map((c) => ({
      url: `${siteUrl}/story/${c.slug}`,
      lastModified: now,
    }));
  return [...base, ...chapterPages];
}
