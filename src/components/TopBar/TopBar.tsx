import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
export default function Topbar() {
  const t = useTranslations('TopBar'); 
  return (
  <div className="w-full bg-[#EBF5F9] dark:bg-[#00131A] backdrop-blur border-b border-gray-200 dark:border-neutral-700 text-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-1.5">
        <div className="hidden md:flex items-center gap-3">
          <a href="mailto:info@wheelhouse.vn" className="tracking-tight text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-400 transition-colors" >Email: info@wheelhouse.vn</a>
          <a href="tel:0123456789" className="tracking-tight text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-400 transition-colors">Hotline: 84-865716079</a>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <Link href="/home" className="tracking-tight text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-400 text-base transition-colors">
            {t('home')}
          </Link>
          <svg className="w-3 h-3" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#0B6187">
            <path d="M2.20117 0.5L12.7615 0.5V11.06" stroke="#0B6187"/>
            <path d="M0.759766 12.5L12.7601 0.5" stroke="#0B6187"/>
          </svg>
          <LanguageSwitcher />
        </div>
      </div>
     </div>
  );
}
