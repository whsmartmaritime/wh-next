"use client";
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function MobileMenu() {
  const t = useTranslations('navigation');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const menuItems = t.raw('menuItems') as any[];
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const toggle = () => setIsOpen(!isOpen);
  const toggleExpanded = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  return (
    <>
      {/* Toggle Button */}
      <button 
        onClick={toggle}
        className="p-2" 
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-black z-50 shadow-xl overflow-y-auto">
            <div className="p-6">
              {/* Close Button */}
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Menu List */}
              <nav className="mt-12">
                <ul className="flex flex-col">
                  {menuItems.map((item, index) => (
                    <li key={index} className="border-b border-neutral-200 dark:border-neutral-700">
                      {item?.hasDropdown ? (
                        // Items with dropdown - click to expand
                        <>
                          <button
                            onClick={() => toggleExpanded(index)}
                            className="w-full flex items-center justify-between p-4 text-lg font-medium text-left hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
                          >
                            <span>{item?.title}</span>
                            <svg 
                              className={`w-5 h-5 text-neutral-400 transition-transform ${expandedItem === index ? 'rotate-90' : ''}`} 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                          
                          {/* Expanded submenu */}
                          {expandedItem === index && (
                            <div className="bg-neutral-50 dark:bg-neutral-900">
                              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                              {item?.dropdownContent?.columns?.map((column: any, colIndex: number) => (
                                <div key={colIndex} className="px-4 py-2">
                                  <div className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
                                    {column?.title}
                                  </div>
                                  <ul className="space-y-1">
                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                    {column?.links?.map((link: any, linkIndex: number) => (
                                      <li key={linkIndex}>
                                        <Link
                                          href={link?.href}
                                          onClick={() => setIsOpen(false)}
                                          className="block py-2 px-2 text-base no-underline hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
                                        >
                                          {link?.title}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                              {/* CTA link */}
                              {item?.ctaContent && (
                                <div className="px-4 py-3 border-t border-neutral-200 dark:border-neutral-700">
                                  <Link
                                    href={item?.ctaContent?.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-2 text-base font-bold no-underline hover:opacity-70 transition-opacity"
                                  >
                                    {item?.ctaContent?.title}
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </Link>
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      ) : (
                        // Regular items - direct link
                        <Link 
                          href={item?.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between p-4 text-lg font-medium no-underline hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
                        >
                          <span>{item?.title}</span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
}
