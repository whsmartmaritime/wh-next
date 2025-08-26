import Hero from '@/blocks/Hero';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import MediaContent from '@/blocks/MediaContent/MediaContent';
import BackgroundGradient from '@/components/BackgroundGradient'
import { BackgroundGrid } from '@/components/BackgroundGrid'
import { BackgroundScanline } from '@/components/BackgroundScanline'

export async function generateMetadata(
  props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await props.params;
  const tMeta = await getTranslations({ locale, namespace: 'MetaDataHome' });
  const base = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000');
  const url = new URL(`/${locale}`, base);
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, new URL(`/${l}`, base)])
  );

  const title = tMeta('title');
  const description = tMeta('description');

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

export default async function HomePage({ params }: { params: { locale: string } }) {
  const tOurMissionAtSea = await getTranslations({ locale: params.locale, namespace: 'OurMissionAtSea' });

  return (
    <>
      {/* Nền toàn trang */}
      <BackgroundScanline className="pointer-events-none absolute inset-0 z-0" />
      <BackgroundGradient className="pointer-events-none absolute inset-0 -z-10" />
      <BackgroundGrid className='pointer-events-none absolute inset-0 -z-20' />

      {/* Nội dung trang */}
      <div className='relative'>
        <Hero />
        
      </div>
    </>
  );
}
