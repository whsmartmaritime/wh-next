import {Link} from '@/i18n/navigation';
import {getTranslations} from 'next-intl/server';
import LanguageSwitcher from './LanguageSwitcher';

export default async function Header() {
  const t = await getTranslations('Nav');
  return (
    <header style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #eee'}}>
      <nav style={{display: 'flex', gap: 16}}>
        <Link href="/">{t('home')}</Link>
        <Link href="/blog">{t('blog')}</Link>
        <Link href="/about">{t('about')}</Link>
        <Link href="/contact">{t('contact')}</Link>
      </nav>
      <LanguageSwitcher />
    </header>
  );
}
