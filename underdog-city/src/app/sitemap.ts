import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://theunderdogcity.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ["", "/music"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
  }));
}
