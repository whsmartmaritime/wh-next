"use client";
import {useRouter, usePathname} from '@/i18n/navigation';
import {useLocale} from 'next-intl';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as 'en' | 'vi';
  const [isLoading, setIsLoading] = useState(false);

  // Kiểm tra xem có phải trang blog post không
  const isBlogPost = pathname.match(/^\/blog\/[^\/]+$/);

  const handleLanguageSwitch = async (targetLocale: 'en' | 'vi') => {
    if (locale === targetLocale) return;
    
    setIsLoading(true);
    
    try {
      if (isBlogPost) {
        // Xử lý riêng cho blog posts - vì cần translation mapping
        const currentSlug = pathname.replace('/blog/', '');
        
        const response = await fetch(
          `/api/blog/translations?slug=${currentSlug}&from=${locale}&to=${targetLocale}`
        );
        
        if (response.ok) {
          const data = await response.json();
          
          if (data.slug) {
            // Có bài dịch, chuyển đến bài dịch
            window.location.href = `/${targetLocale}/blog/${data.slug}`;
          } else {
            // Không có bài dịch, chuyển về trang blog chính
            window.location.href = `/${targetLocale}/blog`;
          }
        } else {
          // API lỗi, fallback về trang blog
          window.location.href = `/${targetLocale}/blog`;
        }
      } else {
        // Tất cả trang khác: sử dụng router mặc định của next-intl
        router.replace(pathname, { locale: targetLocale });
      }
    } catch (error) {
      console.error('Language switch error:', error);
      // Fallback về navigation mặc định
      router.replace(pathname, { locale: targetLocale });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{display: 'flex', gap: 8}}>
      <button
        onClick={() => handleLanguageSwitch('vi')}
        aria-label="Tiếng Việt"
        style={{
          fontWeight: locale === 'vi' ? 700 : 400, 
          fontSize: 15,
          opacity: isLoading ? 0.6 : 1,
          cursor: isLoading ? 'wait' : 'pointer'
        }}
        disabled={isLoading}
      >
        <span role="img" aria-label="Vietnam flag">VI</span>
      </button>
      <button
        onClick={() => handleLanguageSwitch('en')}
        aria-label="English"
        style={{
          fontWeight: locale === 'en' ? 700 : 400, 
          fontSize: 15,
          opacity: isLoading ? 0.6 : 1,
          cursor: isLoading ? 'wait' : 'pointer'
        }}
        disabled={isLoading}
      >
        <span role="img" aria-label="US flag">EN</span>
      </button>
    </div>
  );
}
