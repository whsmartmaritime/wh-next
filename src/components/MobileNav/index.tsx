import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

interface MenuColumn {
  title: string;
  links: Array<{ title: string; href: string }>;
}

interface MenuItem {
  title: string;
  href: string;
  hasDropdown?: boolean;
  dropdownContent?: {
    columns: MenuColumn[];
  };
}

export default function MobileNav() {
  const t = useTranslations('navigation');
  const menuItems = t.raw('menuItems') as MenuItem[];

  return (
    <nav className="text-neutral-800 dark:text-neutral-100">
      <ul className="flex flex-col">
        {menuItems.map((item, index) => (
          <li key={index} className="border border-neutral-200/30 dark:border-neutral-500/30">
            {item.hasDropdown ? (
              <details className="group">
                <summary className="flex items-center justify-between p-4 text-lg font-medium cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-900 list-none">
                  <span>{item.title}</span>
                  <svg className="w-5 h-5 transition-transform group-open:rotate-90" 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </summary>
                
                <div className="p-4 border-t border-neutral-200/30">
                  {/* 2 columns layout - khôi phục styling gốc */}
                  <div className="grid grid-cols-2 gap-4">
                    {item.dropdownContent?.columns.map((column, colIndex) => (
                      <div key={`column-${colIndex}`} className="space-y-2">
                        <span className="uppercase tracking-[0.25em] text-xs opacity-95 mb-4 font-semibold block">
                          {column.title}
                        </span>
                        <div className="space-y-1">
                          {column.links.map((link, linkIndex) => (
                            <Link 
                              key={`link-${linkIndex}`} 
                              // eslint-disable-next-line @typescript-eslint/no-explicit-any
                              href={link.href as any}
                              className="block no-underline p-1 text-md"
                            >
                              {link.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </details>
            ) : (
              <Link 
                href={item.href as any}
                className="block p-4 text-lg font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900"
              >
                {item.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
