/** @type {import('next-sitemap').IConfig} */
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: "*", disallow: "/" }],
  },
  alternateRefs: [
    { href: "https://wheelhousemaris.com", hreflang: "en" },
    { href: "https://wheelhousemaris.com/vi", hreflang: "vi" },
  ],
};
