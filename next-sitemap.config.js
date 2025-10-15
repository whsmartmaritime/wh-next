/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  generateRobotsTxt: false,
  alternateRefs: [
    { href: "https://wheelhousemaris.com/en", hreflang: "en" },
    { href: "https://wheelhousemaris.com/vi", hreflang: "vi" },
  ],
  // Ensure sitemap contains all localized routes gathered during prebuild
  additionalPaths: async () => {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const file = path.join(process.cwd(), "sitemap.paths.json");
    try {
      const raw = await fs.readFile(file, "utf8");
      const paths = JSON.parse(raw);
      return paths.map((p) => ({ loc: p }));
    } catch {
      // Fallback: no extra paths
      return [];
    }
  },
};
