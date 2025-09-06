import Hero from '@/blocks/Hero';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import WhyWheelhouse from '@/blocks/WhyWheelhouse';
import WhatWeDo from '@/blocks/WhatWeDo';
import LatestNews from '@/blocks/LatestNews';

export async function generateMetadata(
  props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'homePage' });
  
  const title = t('meta.title');
  const description = t('meta.seoDescription');
  const ogImage = t('meta.ogImage');
  
  const base = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000');
  const url = new URL(`/${locale}`, base);
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, new URL(`/${l}`, base)])
  );

  return {
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage]
    }
  };
}

export default async function HomePage() {
 
  return (
    <>
      <Hero />
      <WhyWheelhouse />
      <WhatWeDo />
      <LatestNews />
    </>
  );
}
