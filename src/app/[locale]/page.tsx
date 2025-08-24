import Hero from '@/components/Hero/Hero';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export async function generateMetadata(
  props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'MetaDataHome' });

  const base = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000');
  const url = new URL(`/${locale}`, base);
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, new URL(`/${l}`, base)])
  );

  const title = t('title');
  const description = t('description');

  return {
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: title }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-image.jpg']
    }
  };
}

export default function HomePage() {
  return <Hero />;
}
