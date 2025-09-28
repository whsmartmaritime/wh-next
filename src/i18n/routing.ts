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
    "/solutions/navigation": {
      en: "/solutions/navigation",
      vi: "/giai-phap/nghi-khi-hang-hai",
    },
    "/solutions/gmdss": {
      en: "/solutions/gmdss",
      vi: "/giai-phap/gmdss",
    },
    "/solutions/connectivity": {
      en: "/solutions/connectivity",
      vi: "/giai-phap/thong-tin-ve-tinh",
    },
    "/solutions/e-navigation": {
      en: "/solutions/e-navigation",
      vi: "/giai-phap/hai-do-an-pham-dien-tu",
    },
  },
});
