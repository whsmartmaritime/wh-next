"use client";
import {useState, useRef, useEffect} from 'react';
import {Link} from '@/i18n/navigation';
import {useTranslations} from 'next-intl';

type PanelItem = {href: string; titleKey: string; descKey?: string};
type TopItem = {key: string; href?: string; panel?: PanelItem[]};

export default function MegaMenu() {
  const t = useTranslations('Nav');
  const [openKey, setOpenKey] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Close on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenKey(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const items: TopItem[] = [
    {
      key: 'solutions',
      href: '/solution',
      panel: [
        {href: '/solution/feature-a', titleKey: 'solutions.items.a.title', descKey: 'solutions.items.a.desc'},
        {href: '/solution/feature-b', titleKey: 'solutions.items.b.title', descKey: 'solutions.items.b.desc'},
        {href: '/solution/feature-c', titleKey: 'solutions.items.c.title', descKey: 'solutions.items.c.desc'}
      ]
    },
    {
      key: 'services',
      href: '/service',
      panel: [
        {href: '/service/consulting', titleKey: 'services.items.consulting.title', descKey: 'services.items.consulting.desc'},
        {href: '/service/implementation', titleKey: 'services.items.implementation.title', descKey: 'services.items.implementation.desc'},
        {href: '/service/support', titleKey: 'services.items.support.title', descKey: 'services.items.support.desc'}
      ]
    },
    {
      key: 'resources',
      href: '/blog',
      panel: [
        {href: '/blog', titleKey: 'resources.items.blog.title', descKey: 'resources.items.blog.desc'},
        {href: '/docs', titleKey: 'resources.items.docs.title', descKey: 'resources.items.docs.desc'},
        {href: '/changelog', titleKey: 'resources.items.changelog.title', descKey: 'resources.items.changelog.desc'}
      ]
    },
    {key: 'company', href: '/about'}
  ];

  return (
    <div ref={containerRef} className="relative" onMouseLeave={() => setOpenKey(null)}>
      <div className="flex gap-4">
        {items.map((item) => (
          <div
            key={item.key}
            onMouseEnter={() => setOpenKey(item.panel ? item.key : null)}
            onFocus={() => setOpenKey(item.panel ? item.key : null)}
            tabIndex={0}
            className="relative"
          >
            <Link href={item.href ?? '#'} className="inline-block py-1.5 px-1 hover:text-black/80">
              {t(`${item.key}.title`)}
            </Link>
          </div>
        ))}
      </div>

      {items.map((item) => {
        if (!item.panel) return null;
        const visible = openKey === item.key;
        return (
          <div
            key={`${item.key}-panel`}
            role="region"
            aria-hidden={!visible}
            className={
              `fixed left-0 right-0 top-[calc(var(--header-height,56px)+1px)] w-screen bg-white shadow-xl border-t border-gray-200 z-50 ` +
              `${visible ? 'opacity-100 translate-y-0 pointer-events-auto py-4' : 'opacity-0 -translate-y-1 pointer-events-none py-0'} ` +
              `transition-all duration-150`
            }
            onMouseEnter={() => setOpenKey(item.key)}
          >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
              {item.panel.map((p) => (
                <Link key={p.href} href={p.href} className="block p-2 rounded-lg hover:bg-gray-50">
                  <div className="font-semibold mb-1">{t(p.titleKey as never)}</div>
                  {p.descKey ? (
                    <div className="text-gray-600 text-sm">{t(p.descKey as never)}</div>
                  ) : null}
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
