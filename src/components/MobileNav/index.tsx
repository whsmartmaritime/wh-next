import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function MobileNav() {
  const t = useTranslations('navigation');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const menuItems = t.raw('menuItems') as any[];

  return (
    <nav className="text-neutral-600 dark:text-neutral-300">
      <ul className="flex flex-col">
        {menuItems.map((item, index) => (
          <li key={index} className="group relative border-b border-neutral-200 dark:border-neutral-700">
            <Link 
              href={item?.href}
              className="flex items-center justify-between p-4 text-lg font-medium no-underline hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
            >
              <span>{item?.title}</span>
              {item?.hasDropdown && (
                <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
