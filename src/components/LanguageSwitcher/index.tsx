"use client";
import { useRouter, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as 'en' | 'vi';
  const [isLoading, setIsLoading] = useState(false);

  // Inline utility functions - đơn giản và rõ ràng
  const isBlogPost = (path: string) => path.startsWith('/blog/') && path !== '/blog';
  
  const getBlogSlug = (path: string) => {
    const match = path.match(/^\/blog\/(.+)$/);
    return match ? match[1] : null;
  };

  const fetchBlogTranslation = async (slug: string, fromLocale: 'en' | 'vi', toLocale: 'en' | 'vi') => {
    try {
      const response = await fetch(`/api/blog/translations?slug=${slug}&from=${fromLocale}&to=${toLocale}`);
      if (response.ok) {
        const data = await response.json();
        return data.slug || null;
      }
    } catch (error) {
      console.error('Blog translation error:', error);
    }
    return null;
  };

  const handleLanguageSwitch = async (targetLocale: 'en' | 'vi') => {
    if (locale === targetLocale || isLoading) return;
    
    setIsLoading(true);
    
    try {
      if (isBlogPost(pathname)) {
        // Handle blog posts
        const currentSlug = getBlogSlug(pathname);
        if (currentSlug) {
          const translatedSlug = await fetchBlogTranslation(currentSlug, locale, targetLocale);
          if (translatedSlug) {
            // Sử dụng window.location cho blog posts vì đơn giản hơn
            window.location.href = `/${targetLocale}/blog/${translatedSlug}`;
            return;
          }
        }
        // Fallback to blog homepage
        router.push('/blog', { locale: targetLocale });
      } else {
        // Handle regular pages - dùng window.location cho đơn giản
        window.location.href = `/${targetLocale}${pathname}`;
      }
    } catch (error) {
      console.error('Language switch error:', error);
      // Fallback to homepage
      router.replace('/', { locale: targetLocale });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-end">
      <button
        onClick={() => handleLanguageSwitch('vi')}
        disabled={isLoading}
        className={` px-1 py-1 text-md transition-opacity ${
          locale === 'vi' ? 'font-bold opacity-100' : 'font-normal opacity-70 hover:opacity-100'
        } ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
        type="button"
      >
        🇻🇳
      </button>
      <button
        onClick={() => handleLanguageSwitch('en')}
        disabled={isLoading}
        className={`px-1 py-1 text-md transition-opacity ${
          locale === 'en' ? 'font-bold opacity-100' : 'font-normal opacity-70 hover:opacity-100'
        } ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
        type="button"
      >
        🇺🇸
      </button>
    </div>
  );
}
