import {Link} from '@/i18n/navigation';
import TopBar from '../TopBar/TopBar';
import MegaMenu from '../MegaMenu/MegaMenu';

export default async function Header() {
  return (
    <>
      <TopBar />
      <header className="sticky top-0 z-50 flex items-center justify-between py-3 px-4 border-b border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 bg-opacity-90 dark:bg-opacity-90 backdrop-blur">
        <nav className="flex items-center gap-6">
          <Link href="/" className="font-semibold">
            <svg
              viewBox="0 0 100 25"
              width="100"
              height="25"
              role="img"
              aria-label="Wheelhouse Maritime logo"
              xmlns="http://www.w3.org/2000/svg"
              className="text-black dark:text-white"
            >
              <title>Wheelhouse Maritime logo</title>
              <text
                x="0.29"
                y="14.97"
                fontSize="16.95"
                fontFamily="Helvetica, Arial, sans-serif"
                fontWeight="700"
                fill="currentColor"
              >Wheelhouse</text>
              <text
                x="69.46"
                y="24.66"
                fontSize="6.96"
                fontFamily="Helvetica, Arial, sans-serif"
                fontWeight="700"
                fill="currentColor"
                letterSpacing="2"
              >MARIS</text>
              <rect x="0.29" y="19.82" width="21.19" height="4.84" fill="currentColor" />
              <rect x="23.53" y="19.82" width="12.71" height="4.84" fill="currentColor" />
              <rect x="40.48" y="19.82" width="7.87" height="4.84" fill="currentColor" />
              <rect x="52.77" y="19.82" width="4.84" height="4.84" fill="currentColor" />
              <rect x="63.43" y="19.82" width="3.03" height="4.84" fill="currentColor" />
            </svg>
          </Link>
          <MegaMenu />
        </nav>
        
      </header>
    </>
  );
}
