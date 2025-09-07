"use client";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useState } from 'react';

interface MobileNavProps {
  onLinkClick?: () => void;
}

export default function MobileNav({ onLinkClick }: MobileNavProps) {
  const t = useTranslations('navigation');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const menuItems = t.raw('menuItems') as any[];
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <nav className="text-neutral-800 dark:text-neutral-100">
      <ul className="flex flex-col">
        {menuItems.map((item, index) => (
          <li key={index} className="border border-neutral-200/30 dark:border-neutral-500/30">
            {item?.hasDropdown ? (
              <>
                <button
                  onClick={() => toggleDropdown(index)}
                  className="w-full flex items-center justify-between p-4 text-lg font-medium text-left hover:bg-neutral-50 dark:hover:bg-neutral-900"
                >
                  <span>{item?.title}</span>
                  <svg className={`w-5 h-5 transition-transform ${openDropdown === index ? 'rotate-90' : ''}`} 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {openDropdown === index && (
                  <div className=" p-4 border-t border-neutral-200/30">
                                       
                    {/* 2 columns layout */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {item?.dropdownContent?.columns?.map((column: any, colIndex: number) => (
                        <div key={colIndex} className="space-y-2">
                          <span className="uppercase tracking-[0.25em] text-xs opacity-95 mb-4 font-semibold block">
                            {column?.title}
                          </span>
                          <div className="space-y-1">
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {column?.links?.map((link: any, linkIndex: number) => (
                              <Link key={linkIndex} href={link?.href} onClick={onLinkClick}
                                    className="block no-underline p-1 text-md">
                                {link?.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Link href={item?.href} onClick={onLinkClick}
                    className="block p-4 text-lg font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900">
                {item?.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
