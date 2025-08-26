import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BackgroundGrid } from '@/components/BackgroundGrid'
export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
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
      <BackgroundGrid className='pointer-events-none absolute inset-0 -z-20' />
      <NextIntlClientProvider locale={activeLocale} messages={messages}>
        <TopBar />
        <Header />
        {children}
        <Footer />
      </NextIntlClientProvider>
    </>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ),
  title: { default: 'Wheelhouse', template: '%s | Wheelhouse' },
  openGraph: {
    siteName: 'Wheelhouse',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [
      { rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'alternate icon', url: '/favicon.ico' },
    ],
  },
};

