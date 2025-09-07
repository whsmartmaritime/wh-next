import {Link} from '@/i18n/navigation';
import MainMenu from '../MainMenu';
import MobileMenu from '../MobileMenu';
import { getTranslations } from 'next-intl/server';

export default async function Header() {
  const t = await getTranslations('navigation');
  return (
    <header className="sticky top-0 z-50 w-full py-0 bg-white dark:bg-black overflow-visible border-b border-neutral-800/20 dark:border-neutral-100/20 has-[.group:hover]:border-b-0">
      <nav className="container-gutter grid grid-cols-12 items-center gap-x-6 h-[66px] sm:h-[76px] xl:h-[90px] text-black dark:text-white overflow-visible">
        {/* Logo */}
        <Link href="/" className="col-span-9 lg:col-span-3 flex items-center" aria-label="Wheelhouse logo">
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

        {/* Mobile toggle button */}
        <div className="col-span-3 lg:hidden ml-auto flex items-center justify-end">
          <MobileMenu />
        </div>

        {/* Main nav / Main menu */}
        <div className="hidden lg:block lg:col-span-7 static">
          <MainMenu />
        </div>

        {/* Right utilities */}
        <Link
          href="/"
          className="hidden lg:inline-flex lg:col-span-2 ml-auto items-center justify-end gap-2 text-inherit font-medium hover:opacity-80 transition-opacity"
        >
          {t('home')}
          <svg
            className="w-3 h-3 text-current"
            viewBox="0 0 14 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
          >
            <path d="M2.20117 0.5L12.7615 0.5V11.06" />
            <path d="M0.759766 12.5L12.7601 0.5" />
          </svg>
        </Link>

      </nav>
    </header>
  );
}
