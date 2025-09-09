/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  generateRobotsTxt: true,
  alternateRefs: [
    { href: "https://wheelhousemaris.com", hreflang: "en" },
    { href: "https://wheelhousemaris.com/vi", hreflang: "vi" },
  ],
};
