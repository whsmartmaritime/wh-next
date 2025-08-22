import {Link} from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import MegaMenu from './MegaMenu';

export default async function Header() {
  return (
    <header style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #eee'}}>
      <nav style={{display: 'flex', gap: 24, alignItems: 'center'}}>
        <Link href="/" style={{fontWeight: 600}}>WH</Link>
        <MegaMenu />
      </nav>
      <LanguageSwitcher />
    </header>
  );
}
