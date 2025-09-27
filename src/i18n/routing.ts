import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "vi"],

  // Used when no locale matches
  defaultLocale: "en",

  // Localized pathnames
  pathnames: {
    "/": {
      en: "/",
      vi: "/",
    },
    "/about": {
      en: "/about",
      vi: "/gioi-thieu",
    },
    "/services": {
      en: "/services",
      vi: "/dich-vu",
    },
    "/solutions": {
      en: "/solutions",
      vi: "/giai-phap",
    },
    "/solutions/[solution]": {
      en: "/solutions/[solution]",
      vi: "/giai-phap/[solution]",
    },
    "/solutions/navigation": {
      en: "/solutions/navigation",
      vi: "/giai-phap/nghi-khi-hang-hai",
    },
    "/solutions/gmdss": {
      en: "/solutions/gmdss",
      vi: "/giai-phap/gmdss",
    },
    "/contact": {
      en: "/contact",
      vi: "/lien-he",
    },
    "/blog": {
      en: "/blog",
      vi: "/blog",
    },
    "/blog/[slug]": {
      en: "/blog/[slug]",
      vi: "/blog/[slug]",
    },
    "/solutions/[solution]/[slug]": {
      en: "/solutions/[solution]/[slug]",
      vi: "/giai-phap/[solution]/[slug]",
    },
  },
});
