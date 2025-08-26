import {Link} from '@/i18n/navigation';
import MegaMenu from '../MainMenu/MegaMenu';
import LanguageSwitcher from '../LanguageSwitcher';
import { getTranslations } from 'next-intl/server';

export default async function Header() {
  const t = await getTranslations('Nav');
  return (
    <>
     
      <header className="sticky top-0 z-50 w-full py-0 bg-white dark:bg-black">
        <nav className="container-gutter grid grid-cols-12 items-center gap-x-6 h-[66px] sm:h-[76px] xl:h-[90px] text-black dark:text-white">
          {/* Logo */}
          <Link href="/" className="col-span-5 sm:col-span-4 md:col-span-3 xl:col-span-3 flex items-center" aria-label="Wheelhouse Maritime logo">
            <svg
              viewBox="0 0 100 25"
              width="200"
              height="50"
              role="img"
              aria-label="Wheelhouse Maritime logo"
              aria-labelledby="logoTitle logoDesc"
              xmlns="http://www.w3.org/2000/svg"
              className="text-current"
            >
              <title id="logoTitle">Wheelhouse Maris logo</title>
              <desc id="logoDesc">Logo của Wheelhouse, gồm chữ Wheelhouse, MARIS và các thanh ngang cách điệu, dùng cho nhận diện thương hiệu.</desc>
              <text x="0.29" y="14.97" fontSize="16.95" fontFamily="Helvetica, Arial, sans-serif" fontWeight="700" fill="currentColor">Wheelhouse</text>
              <text x="69.46" y="24.66" fontSize="6.96" fontFamily="Helvetica, Arial, sans-serif" fontWeight="700" fill="currentColor" letterSpacing="2">MARIS</text>
              <rect x="0.29" y="19.82" width="21.19" height="4.84" fill="currentColor" />
              <rect x="23.53" y="19.82" width="12.71" height="4.84" fill="currentColor" />
              <rect x="40.48" y="19.82" width="7.87" height="4.84" fill="currentColor" />
              <rect x="52.77" y="19.82" width="4.84" height="4.84" fill="currentColor" />
              <rect x="63.43" y="19.82" width="3.03" height="4.84" fill="currentColor" />
            </svg>
          </Link>

          {/* Main nav / Mega menu */}
          <div className="hidden sm:flex sm:col-span-8 md:col-span-7 xl:col-span-7 items-center">
            <MegaMenu />
          </div>

          {/* Right utilities */}
          <div className="col-span-7 sm:col-span-4 md:col-span-2 xl:col-span-2 ml-auto flex items-center justify-end gap-4">
            <Link href="/" className="text-inherit font-medium hover:opacity-80 transition-opacity">
              {t('home')}
            </Link>
            <svg className="w-3 h-3 text-current" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
              <path d="M2.20117 0.5L12.7615 0.5V11.06" />
              <path d="M0.759766 12.5L12.7601 0.5" />
            </svg>
            <LanguageSwitcher />
          </div>
        </nav>
      </header>
    </>
  );
}
