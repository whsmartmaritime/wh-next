import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export async function generateMetadata(
  props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await props.params;
  
  // Parallel translation loading for better performance
  const translations = await Promise.all(
    routing.locales.map(l => 
      getTranslations({ locale: l, namespace: 'solutions' })
    )
  );
  
  const currentIndex = routing.locales.indexOf(locale as 'en' | 'vi');
  const t = translations[currentIndex];
  
  const title = t('meta.title');
  const description = t('meta.seoDescription');
  const ogImage = t('meta.ogImage');
  const canonical = t('meta.canonical');
  
  const base = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000');
  const url = new URL(canonical, base);
  
  // Create alternate language URLs from pre-defined canonicals
  const languages = Object.fromEntries(
    routing.locales.map((l, index) => [
      l, 
      new URL(translations[index]('meta.canonical'), base)
    ])
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

export default async function SolutionsPage(
  props: { params: Promise<{ locale: string }> }
) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'solutions' });
  
  return (
    <div className="container-gutter py-block">
      <h1 className="text-3xl font-bold">{t('hero.title')}</h1>
      <p className="text-lg mt-4">{t('hero.subtitle')}</p>
      <p className="mt-4">{t('hero.description')}</p>
    </div>
  );
}
