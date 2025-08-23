import {Link} from '@/i18n/navigation';
import Topbar from './Topbar/Topbar';
import LanguageSwitcher from './LanguageSwitcher';
import MegaMenu from './MegaMenu';

export default async function Header() {
  return (
    <>
      <Topbar />
      <header className="sticky top-0 z-50 flex items-center justify-between py-3 px-4 border-b border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 bg-opacity-90 dark:bg-opacity-90 backdrop-blur">
        <nav className="flex items-center gap-6">
          <Link href="/" className="font-semibold">WH</Link>
          <MegaMenu />
        </nav>
        <LanguageSwitcher />
      </header>
    </>
  );
}
