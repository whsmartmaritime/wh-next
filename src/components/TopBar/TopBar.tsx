import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
export default function Topbar() {
  const t = useTranslations('TopBar'); 
  return (
  <div className="w-full bg-[#EBF5F9] dark:bg-[#00131A] backdrop-blur border-b border-gray-200 dark:border-neutral-700 text-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-1.5">
        <div className="flex items-center gap-3 ">
          <a href="mailto:info@wheelhouse.vn" className="font-bold  tracking-tight text-gray-900 hover:text-black" >Email: info@wheelhouse.vn</a>
          <a href="tel:0123456789" className="font-bold  tracking-tight text-gray-900 hover:text-black">Hotline: 84-865716079</a>
        </div>
        {/* Social hoặc nút hành động */}
        <div className="flex items-center gap-3">
          <Link href="/home" className="font-bold tracking-tight text-gray-900 hover:text-black text-base">
            {t(`TopBar.home`)}
          </Link>
          <LanguageSwitcher /> 
        </div>
      </div>
     </div>
  );
}
