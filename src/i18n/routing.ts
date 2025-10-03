import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: [
  "en",
  "vi"
],
  defaultLocale: "en",
  pathnames: {
  "/": {
    en: "/",
    vi: "/"
  },
  "/about": {
    en: "/about",
    vi: "/gioi-thieu"
  },
  "/services": {
    en: "/services",
    vi: "/dich-vu"
  },
  "/solutions": {
    en: "/solutions",
    vi: "/giai-phap"
  },
  "/solutions/connectivity": {
    en: "/solutions/connectivity",
    vi: "/giai-phap/thong-tin-ve-tinh"
  },
  "/solutions/e-navigation": {
    en: "/solutions/e-navigation",
    vi: "/giai-phap/hai-do-an-pham-dien-tu"
  },
  "/solutions/gmdss": {
    en: "/solutions/gmdss",
    vi: "/giai-phap/gmdss"
  },
  "/solutions/navigation": {
    en: "/solutions/navigation",
    vi: "/giai-phap/nghi-khi-hang-hai"
  },
  "/solutions/navigation/ais-introduction": {
    en: "/solutions/navigation/ais-introduction",
    vi: "/giai-phap/nghi-khi-hang-hai/gioi-thieu-ais"
  },
  "/solutions/navigation/anemometer-introduction": {
    en: "/solutions/navigation/anemometer-introduction",
    vi: "/giai-phap/nghi-khi-hang-hai/gioi-thieu-anemometer"
  },
  "/solutions/navigation/ecdis-introduction": {
    en: "/solutions/navigation/ecdis-introduction",
    vi: "/giai-phap/nghi-khi-hang-hai/gioi-thieu-ecdis"
  },
  "/solutions/navigation/echo-sounder-introduction": {
    en: "/solutions/navigation/echo-sounder-introduction",
    vi: "/giai-phap/nghi-khi-hang-hai/gioi-thieu-may-do-sau"
  },
  "/solutions/navigation/gnss-introduction": {
    en: "/solutions/navigation/gnss-introduction",
    vi: "/giai-phap/nghi-khi-hang-hai/gioi-thieu-he-thong-dinh-vi"
  },
  "/solutions/navigation/radar-introduction": {
    en: "/solutions/navigation/radar-introduction",
    vi: "/giai-phap/nghi-khi-hang-hai/gioi-thieu-radar"
  },
  "/solutions/navigation/speed-log-introduction": {
    en: "/solutions/navigation/speed-log-introduction",
    vi: "/giai-phap/nghi-khi-hang-hai/gioi-thieu-may-do-toc-do"
  },
  "/solutions/navigation/ssas-introduction": {
    en: "/solutions/navigation/ssas-introduction",
    vi: "/giai-phap/nghi-khi-hang-hai/gioi-thieu-ssas"
  }
}
});
