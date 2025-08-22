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
    <div ref={containerRef} style={{position: 'relative'}} onMouseLeave={() => setOpenKey(null)}>
      <div style={{display: 'flex', gap: 16}}>
        {items.map((item) => (
          <div
            key={item.key}
            onMouseEnter={() => setOpenKey(item.panel ? item.key : null)}
            onFocus={() => setOpenKey(item.panel ? item.key : null)}
            tabIndex={0}
            style={{position: 'relative'}}
          >
            <Link href={item.href ?? '#'} style={{padding: '6px 4px', display: 'inline-block'}}>
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
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: '100%',
              background: 'white',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
              borderTop: '1px solid #eee',
              padding: visible ? 16 : 0,
              display: visible ? 'block' : 'none',
              zIndex: 50
            }}
            onMouseEnter={() => setOpenKey(item.key)}
          >
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16}}>
              {item.panel.map((p) => (
                <Link key={p.href} href={p.href} style={{padding: 8, borderRadius: 8, display: 'block'}}>
                  <div style={{fontWeight: 600, marginBottom: 4}}>{t(p.titleKey as never)}</div>
                  {p.descKey ? (
                    <div style={{color: '#666', fontSize: 14}}>{t(p.descKey as never)}</div>
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
