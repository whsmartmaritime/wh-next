"use client";
import {useState, useRef, useEffect} from 'react';
import {Link} from '@/i18n/navigation';
import {useTranslations} from 'next-intl';
import { topItems } from '@/components/MainMenu/TopItems';
import type { TopItem, PanelItem } from '@/components/MainMenu/TopItems';

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

  const items: TopItem[] = topItems;

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
            <div className="container-gutter grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Column 1: description for the panel */}
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{t(`${item.key}.title`)}</h3>
                <p className="text-gray-600 text-sm">{t(`${item.key}.desc`)}</p>
              </div>

              {/* Columns 2-4: either from explicit columns or split old panel items */}
              <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {item.columns
                  ? item.columns.map((col, ci) => (
                      <div key={ci} className="space-y-2">
                        <div className="font-medium mb-1">{t(col.titleKey as never)}</div>
                        {col.links.map((p) => (
                          <Link key={p.href} href={p.href} className="block p-2 rounded-lg hover:bg-gray-50">
                            <div className="font-semibold mb-1">{t(p.titleKey as never)}</div>
                            {p.descKey ? <div className="text-gray-600 text-sm">{t(p.descKey as never)}</div> : null}
                          </Link>
                        ))}
                      </div>
                    ))
                  : (() => {
                      const cols: PanelItem[][] = [[], [], []];
                      item.panel!.forEach((p, i) => cols[i % 3].push(p));
                      return cols.map((col, ci) => (
                        <div key={ci} className="space-y-2">
                          {col.map((p) => (
                            <Link key={p.href} href={p.href} className="block p-2 rounded-lg hover:bg-gray-50">
                              <div className="font-semibold mb-1">{t(p.titleKey as never)}</div>
                              {p.descKey ? <div className="text-gray-600 text-sm">{t(p.descKey as never)}</div> : null}
                            </Link>
                          ))}
                        </div>
                      ));
                    })()
                }
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
