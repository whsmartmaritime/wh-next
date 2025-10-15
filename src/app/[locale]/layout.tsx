import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
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

// No metadata export here; defaults are centralized in root layout
