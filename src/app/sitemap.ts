import { MetadataRoute } from "next";
import { routing } from "../i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const entries: MetadataRoute.Sitemap = [];

  for (const [routeKey, localePaths] of Object.entries(routing.pathnames)) {
    for (const currentLocale of routing.locales) {
      const currentPath =
        localePaths[currentLocale as keyof typeof localePaths];

      if (typeof currentPath === "string") {
        const url =
          routeKey === "/"
            ? `${siteUrl}/${currentLocale}`
            : `${siteUrl}/${currentLocale}${currentPath}`;
        const alternates: Record<string, string> = {};
        for (const altLocale of routing.locales) {
          const altPath = localePaths[altLocale as keyof typeof localePaths];
          if (typeof altPath === "string") {
            alternates[altLocale] =
              routeKey === "/"
                ? `${siteUrl}/${altLocale}`
                : `${siteUrl}/${altLocale}${altPath}`;
          }
        }

        const depth =
          routeKey === "/" ? 0 : currentPath.split("/").filter(Boolean).length;
        const priority = Math.max(0.5, 1 - depth * 0.1);

        entries.push({
          url,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority,
          alternates: { languages: alternates },
        });
      }
    }
  }

  return entries;
}
