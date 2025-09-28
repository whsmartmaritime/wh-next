import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "vi"],

  // Used when no locale matches
  defaultLocale: "en",

  // Localized pathnames - only define routes with different URLs between locales
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
  },
});
