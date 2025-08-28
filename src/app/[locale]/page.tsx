import Hero from '@/blocks/Hero';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import BackgroundGradient from '@/components/BackgroundGradient'
import { BackgroundScanline } from '@/components/BackgroundScanline'
import WhyWheelhouse from '@/blocks/WhyWheelhouse';

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

export default async function HomePage() {
  return (
    <>
      {/* Nội dung trang (nâng z-index để nổi lên trên nền) */}
      <div className="relative z-30">
        <Hero />
        <WhyWheelhouse />
      </div>

      {/* Nền toàn trang (cố định, không che Header/Topbar) */}
      <BackgroundGradient
        className="pointer-events-none fixed inset-0"
      />
      <BackgroundScanline
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: 2,
          opacity: 0.12,           // tùy chỉnh độ mạnh scanline
          mixBlendMode: 'soft-light',
        }}
      />
    </>
  );
}
