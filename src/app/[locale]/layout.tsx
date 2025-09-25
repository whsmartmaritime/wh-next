import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const [activeLocale, messages] = await Promise.all([
    getLocale(),
    getMessages(),
  ]);

  // Nested layout: providers + chrome only (no <html>/<body>)
  return (
    <>
      <NextIntlClientProvider locale={activeLocale} messages={messages}>
        <Header />
        <main aria-label="Main content">{children}</main>
        <Footer />
      </NextIntlClientProvider>
    </>
  );
}

// Metadata for falling back
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "Wheelhouse",
    template: "%s | Wheelhouse",
  },
  description: "Wheelhouse - Maritime Electronic Services and Solutions.",
  openGraph: {
    siteName: "Wheelhouse",
    type: "website",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Wheelhouse",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@wheelhouse",
  },
  icons: {
    icon: [
      { rel: "icon", url: "/favicon.svg", type: "image/svg+xml" },
      { rel: "alternate icon", url: "/favicon.ico" },
    ],
  },
};
