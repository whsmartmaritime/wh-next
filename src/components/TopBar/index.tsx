import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
 import LanguageSwitcher from '../LanguageSwitcher';
export default async function Topbar() {
  const t = await getTranslations('TopBar');
  return (
  <div className="relative z-50 w-full bg-[#EBF5F9] dark:bg-[#00131A] backdrop-blur border-b border-gray-200 dark:border-neutral-700 text-sm">
      <div className="container-gutter flex items-center justify-between py-1.5">
        <div className="hidden md:flex items-center gap-4">
          <a href="mailto:info@wheelhouse.vn" className="tracking-tight text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-400 transition-colors" >{t('email')}</a>
          <a href="tel:0123456789" className="tracking-tight text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-400 transition-colors">{t('hotline')}</a>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <Link href="/" className="tracking-tight text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-400 text-base transition-colors">
            {t('home')}
          </Link>
          <svg className="w-3 h-3 text-sky-800 dark:text-sky-400" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
            <path d="M2.20117 0.5L12.7615 0.5V11.06" />
            <path d="M0.759766 12.5L12.7601 0.5" />
          </svg>
          <LanguageSwitcher />
        </div>
      </div>
     </div>
  );
}
