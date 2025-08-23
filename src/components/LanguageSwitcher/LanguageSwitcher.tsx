"use client";
import {useRouter, usePathname} from '@/i18n/navigation';
import {useLocale} from 'next-intl';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <div style={{display: 'flex', gap: 8}}>
      <button
        onClick={() => router.replace(pathname, {locale: 'vi'})}
        aria-label="Tiếng Việt"
        style={{fontWeight: locale === 'vi' ? 700 : 400, fontSize: 15}}
      >
        <span role="img" aria-label="Vietnam flag">🇻🇳</span>
      </button>
      <button
        onClick={() => router.replace(pathname, {locale: 'en'})}
        aria-label="English"
        style={{fontWeight: locale === 'en' ? 700 : 400, fontSize: 15}}
      >
        <span role="img" aria-label="US flag">🇺🇸</span>
      </button>
    </div>
  );
}
