import { MetadataRoute } from "next";
import fs from "node:fs/promises";
import path from "node:path";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Read paths from sitemap.paths.json
  const sitemapPaths: string[] = [];
  try {
    const filePath = path.join(process.cwd(), "sitemap.paths.json");
    const raw = await fs.readFile(filePath, "utf8");
    const paths = JSON.parse(raw);
    sitemapPaths.push(...paths);
  } catch (error) {
    console.warn("Could not read sitemap.paths.json:", error);
  }

  // Create sitemap entries with localization alternates
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const urlPath of sitemapPaths) {
    // Determine language from path
    const isEnglish = urlPath.startsWith("/en");
    const isVietnamese = urlPath.startsWith("/vi");

    if (isEnglish || isVietnamese) {
      const englishPath = urlPath.replace("/vi", "/en");
      const vietnamesePath = urlPath.replace("/en", "/vi");

      sitemapEntries.push({
        url: `${siteUrl}${urlPath}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: urlPath === "/en" || urlPath === "/vi" ? 1 : 0.8,
        alternates: {
          languages: {
            en: `${siteUrl}${englishPath}`,
            vi: `${siteUrl}${vietnamesePath}`,
          },
        },
      });
    } else {
      // Root path or other paths
      sitemapEntries.push({
        url: `${siteUrl}${urlPath}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 1,
      });
    }
  }

  return sitemapEntries;
}
