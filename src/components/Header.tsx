"use client";
import {Link, useRouter, usePathname} from '@/i18n/navigation';
import {useTranslations} from 'next-intl';

export default function Header() {
  const t = useTranslations('Nav');
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #eee'}}>
      <nav style={{display: 'flex', gap: 16}}>
        <Link href="/">{t('home')}</Link>
        <Link href="/blog">{t('blog')}</Link>
        <Link href="/about">{t('about')}</Link>
        <Link href="/contact">{t('contact')}</Link>
      </nav>
      <div style={{display: 'flex', gap: 8}}>
        <button onClick={() => router.replace(pathname, {locale: 'vi'})} aria-label="Tiếng Việt">VI</button>
        <button onClick={() => router.replace(pathname, {locale: 'en'})} aria-label="English">EN</button>
      </div>
    </header>
  );
}
