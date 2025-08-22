import {Link} from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import MegaMenu from './MegaMenu';

export default async function Header() {
  return (
    <header className="flex items-center justify-between py-3 px-4 border-b border-gray-200">
      <nav className="flex items-center gap-6">
        <Link href="/" className="font-semibold">WH</Link>
        <MegaMenu />
      </nav>
      <LanguageSwitcher />
    </header>
  );
}
