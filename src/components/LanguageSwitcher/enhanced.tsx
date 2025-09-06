"use client";
import { useRouter as useNextRouter } from 'next/navigation';
import { usePathname } from '@/i18n/navigation';
import { useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

// Client-side translation mapping for blog posts
async function getTranslationSlug(currentSlug: string, currentLocale: 'en' | 'vi', targetLocale: 'en' | 'vi'): Promise<string | null> {
  try {
    const response = await fetch(`/api/blog/translations?slug=${currentSlug}&from=${currentLocale}&to=${targetLocale}`);
    if (response.ok) {
      const data = await response.json();
      return data.slug || null;
    }
  } catch (error) {
    console.error('Error fetching translation:', error);
  }
  return null;
}

export default function EnhancedLanguageSwitcher() {
  const router = useRouter();
  const nextRouter = useNextRouter();
  const pathname = usePathname();
  const locale = useLocale() as 'en' | 'vi';
  const [translationSlug, setTranslationSlug] = useState<string | null>(null);
  
  // Check if we're on a blog post page
  const isBlogPost = pathname.includes('/blog/') && pathname.split('/').length === 3;
  const currentSlug = isBlogPost ? pathname.split('/').pop() : null;
  
  useEffect(() => {
    if (isBlogPost && currentSlug) {
      const targetLocale = locale === 'en' ? 'vi' : 'en';
      getTranslationSlug(currentSlug, locale, targetLocale)
        .then(setTranslationSlug);
    }
  }, [pathname, locale, isBlogPost, currentSlug]);

  const handleLanguageSwitch = (targetLocale: 'en' | 'vi') => {
    if (isBlogPost && translationSlug && targetLocale !== locale) {
      // Navigate to translated blog post using Next.js router
      nextRouter.push(`/${targetLocale}/blog/${translationSlug}`);
    } else {
      // Use next-intl routing for regular pages
      if (pathname === '/blog/[slug]') {
        router.replace('/blog', { locale: targetLocale });
      } else {
        const validPaths = ['/', '/about', '/services', '/solutions', '/contact', '/blog'] as const;
        const targetPath = validPaths.includes(pathname as typeof validPaths[number]) ? pathname : '/';
        router.replace(targetPath, { locale: targetLocale });
      }
    }
  };

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <button
        onClick={() => handleLanguageSwitch('vi')}
        aria-label="Tiếng Việt"
        style={{ fontWeight: locale === 'vi' ? 700 : 400, fontSize: 15 }}
      >
        <span role="img" aria-label="Vietnam flag">VI</span>
      </button>
      <button
        onClick={() => handleLanguageSwitch('en')}
        aria-label="English"
        style={{ fontWeight: locale === 'en' ? 700 : 400, fontSize: 15 }}
      >
        <span role="img" aria-label="US flag">EN</span>
      </button>
    </div>
  );
}
