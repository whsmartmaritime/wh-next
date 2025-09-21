import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import { BackgroundGrid } from "@/components/BackgroundGrid";
import { LogoEffect } from "./LogoEffect";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default async function footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();
  return (
    <footer className="relative theme-dark-transparent text-white overflow-hidden pt-32 pb-24">
      {/* Black background layer */}
      <div className="absolute inset-0 bg-black z-0"></div>

      <BackgroundGrid />
      {/* Main Footer Content */}
      <div className="relative z-30 container-gutter">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Link href="/" className="inline-block">
                <Image
                  src="/images/whlogo.svg"
                  alt="Wheelhouse Logo"
                  width={160}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
            </div>
            <p className="text-white/60 mb-6 leading-relaxed">
              {t("description")}
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                aria-label="YouTube"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="uppercase tracking-[0.25em] !text-xs opacity-95 mb-16">
              {t("quickLinks", { defaultValue: "Quick Links" })}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {t("about", { defaultValue: "About Us" })}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {t("services", { defaultValue: "Services" })}
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {t("solutions", { defaultValue: "Solutions" })}
                </Link>
              </li>

              <li>
                <Link
                  href="/news"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {t("news", { defaultValue: "News & Updates" })}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {t("contact", { defaultValue: "Contact" })}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="uppercase tracking-[0.25em] !text-xs opacity-95 mb-16">
              {t("ssTitle", { defaultValue: "Services" })}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services/repair"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {t("repairMaintenance", {
                    defaultValue: "Repair & Maintenance",
                  })}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/survey"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {t("periodicalSurvey", { defaultValue: "Periodical Survey" })}
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/navigation"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {t("navigation", { defaultValue: "Navigation Systems" })}
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/gmdss"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {t("gmdss", { defaultValue: "GMDSS" })}
                </Link>
              </li>

              <li>
                <Link
                  href="/solutions/connectivity"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {t("connectivity", {
                    defaultValue: "Connectivity Solutions",
                  })}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="uppercase tracking-[0.25em] !text-xs opacity-95 mb-16">
              {t("contactInfo", { defaultValue: "Contact Info" })}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 text-nature-500 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                <p className="text-white/60">
                  21 An Loc Street
                  <br />
                  An Hai, Hai Phong City, Vietnam
                  <br />
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-nature-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <p className="text-white/60">+84 (0) 865716079</p>
              </div>

              <div className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-nature-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-white/60">info@wheelhouse.vn</p>
              </div>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="relative z-30 border-t border-white/10 container-gutter py-6">
        <div className="md:flex md:items-center md:justify-between text-sm text-white/60">
          <div className="mb-4 md:mb-0">
            <p>© {year} Wheelhouse Co.,Ltd. All rights reserved.</p>
          </div>
          {/* <div className="flex flex-wrap gap-6">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                {t('privacyPolicy', { defaultValue: 'Privacy Policy' })}
              </Link>
              <Link href="/terms-of-service" className="hover:text-white transition-colors">
                {t('termsOfService', { defaultValue: 'Terms of Service' })}
              </Link>
              <Link href="/cookie-policy" className="hover:text-white transition-colors">
                {t('cookiePolicy', { defaultValue: 'Cookie Policy' })}
              </Link>
              <Link href="/sitemap" className="hover:text-white transition-colors">
                {t('sitemap', { defaultValue: 'Sitemap' })}
              </Link>
            </div> */}
        </div>
      </div>

      <LogoEffect />
    </footer>
  );
}
