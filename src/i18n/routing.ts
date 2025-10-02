import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "vi"],
  defaultLocale: "en",
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
    "/solutions/connectivity": {
      en: "/solutions/connectivity",
      vi: "/giai-phap/thong-tin-ve-tinh",
    },
    "/solutions/e-navigation": {
      en: "/solutions/e-navigation",
      vi: "/giai-phap/hai-do-an-pham-dien-tu",
    },
    "/solutions/gmdss": {
      en: "/solutions/gmdss",
      vi: "/giai-phap/gmdss",
    },
    "/solutions/navigation": {
      en: "/solutions/navigation",
      vi: "/giai-phap/nghi-khi-hang-hai",
    },
    "/solutions/navigation/ais-technical-analysis": {
      en: "/solutions/navigation/ais-technical-analysis",
      vi: "/solutions/navigation/ais-phan-tich-ky-thuat",
    },
    "/solutions/navigation/anemometer-true-relative-wind": {
      en: "/solutions/navigation/anemometer-true-relative-wind",
      vi: "/solutions/navigation/may-do-gio-phan-tich-ky-thuat",
    },
    "/solutions/navigation/ecdis-technical-analysis": {
      en: "/solutions/navigation/ecdis-technical-analysis",
      vi: "/solutions/navigation/ecdis-phan-tich-ky-thuat",
    },
    "/solutions/navigation/echosounder-technical-analysis": {
      en: "/solutions/navigation/echosounder-technical-analysis",
      vi: "/solutions/navigation/may-do-sau-phan-tich-ky-thuat",
    },
    "/solutions/navigation/gnss-navigation-systems": {
      en: "/solutions/navigation/gnss-navigation-systems",
      vi: "/solutions/navigation/he-thong-dinh-vi-gnss",
    },
    "/solutions/navigation/radar-technical-analysis": {
      en: "/solutions/navigation/radar-technical-analysis",
      vi: "/solutions/navigation/radar-phan-tich-ky-thuat",
    },
    "/solutions/navigation/speed-log-technical-analysis": {
      en: "/solutions/navigation/speed-log-technical-analysis",
      vi: "/solutions/navigation/may-do-toc-do-phan-tich-ky-thuat",
    },
    "/solutions/navigation/ssas-isps-technical-analysis": {
      en: "/solutions/navigation/ssas-isps-technical-analysis",
      vi: "/solutions/navigation/ssas-phan-tich-ky-thuat",
    },
  },
});
