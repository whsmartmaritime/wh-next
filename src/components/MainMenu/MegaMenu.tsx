"use client";
import {useState, useRef, useEffect} from 'react';
import {Link} from '@/i18n/navigation';
import {useTranslations} from 'next-intl';
import { topItems } from '@/components/MainMenu/TopItems';
import type { TopItem } from '@/components/MainMenu/TopItems';
// use a plain <img> for SVG previews (avoids next/image optimization issues for svg)

export default function MegaMenu() {
  const t = useTranslations('Nav');
  const meta = useTranslations('MetaDataHome');
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
  const visibleItems = items.filter(i => !i.hidden);
  const [activeCol, setActiveCol] = useState<number | null>(0);
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => setIsDark(mq.matches);
    update();
    if (mq.addEventListener) mq.addEventListener('change', update);
    else mq.addListener(update);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', update);
      else mq.removeListener(update);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative" onMouseLeave={() => setOpenKey(null)}>
      <div className="flex gap-4">
  {visibleItems.map((item) => (
          <div
            key={item.key}
            onMouseEnter={() => {
              console.debug('MegaMenu: onMouseEnter', item.key);
        setOpenKey(item.columns ? item.key : null);
        setActiveCol(0);
            }}
            onFocus={() => {
              console.debug('MegaMenu: onFocus', item.key);
              setOpenKey(item.columns ? item.key : null);
            }}
            tabIndex={0}
            className="relative"
          >
              <div className="flex items-center gap-2">
              <Link href={item.href ?? '#'} className="inline-block py-1.5 px-1">
                {item.key && t(`${item.key}.title`) || item.href}
              </Link>
            </div>
          </div>
        ))}
      </div>

    {visibleItems.map((item) => {
  if (!item.columns) return null;
  const cols = item.columns.filter(c => !c.hidden);
  const visible = openKey === item.key;
  console.debug('MegaMenu: render panel', item.key, { visible });
        return (
          <div
            key={`${item.key}-panel`}
            role="region"
            aria-hidden={!visible}
            className={
              // base positioning + animation
              `fixed left-0 right-0 top-[calc(var(--header-height,56px)+1px)] w-screen z-50 ` +
              `${visible ? 'opacity-100 translate-y-0 pointer-events-auto py-4' : 'opacity-0 -translate-y-1 pointer-events-none py-0'} ` +
              `transition-all duration-150 ` +
              // use CSS variables for colors so globals.css controls light/dark
              `shadow-xl border-t text-[var(--color-text)] bg-[var(--panel-bg)] border-[var(--panel-border)] mega-menu-panel`
            }
            onMouseEnter={() => setOpenKey(item.key)}
          >
      <div className="container-gutter grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Column 1: description for the panel */}
              <div className="space-y-2">
    <h3 className="font-semibold text-lg">{item.key ? t(`${item.key}.title`) : ''}</h3>
  <p className={`text-[var(--color-muted)] text-sm`}>{item.descKey ? t(item.descKey as never) : (item.key ? t(`${item.key}.desc`) : '')}</p>
              </div>

              {/* Column 2: first column of links */}
              <div className="space-y-2" onMouseEnter={() => setActiveCol(0)} onFocus={() => setActiveCol(0)}>
                {cols[0] ? (
                  <>
                    <div className="font-medium mb-1">{t(cols[0].titleKey as never)}</div>
                    {cols[0].links.filter(l => !l.hidden).map((p) => (
                      <Link key={p.href} href={p.href} className={`block p-2 rounded-lg hover:bg-[var(--link-hover-bg)]`}>
                        <div className="font-semibold mb-1">{t(p.titleKey as never)}</div>
                      </Link>
                    ))}
                  </>
                ) : null}
              </div>

              {/* Column 3: second column of links */}
              <div className="space-y-2" onMouseEnter={() => setActiveCol(1)} onFocus={() => setActiveCol(1)}>
                {cols[1] ? (
                  <>
                    <div className="font-medium mb-1">{t(cols[1].titleKey as never)}</div>
                    {cols[1].links.filter(l => !l.hidden).map((p) => (
                      <Link key={p.href} href={p.href} className={`block p-2 rounded-lg hover:bg-[var(--link-hover-bg)]`}>
                        <div className="font-semibold mb-1">{t(p.titleKey as never)}</div>
                      </Link>
                    ))}
                  </>
                ) : null}
              </div>

              {/* Column 4: image + one intro line (preview changes when hover group) */}
              <div className="flex flex-col items-start justify-center space-y-3">
                {(() => {
                  const index = activeCol ?? 0;
                  const previewCol = cols[index] ?? cols[0] ?? null;
                  // resolve image source: prefer previewCol.imageKey; fall back to meta('megaimage')
                  let imageSrc: string | null = null;
                  if (previewCol) {
                    const key = String((isDark && previewCol.imageKeyDark) ? previewCol.imageKeyDark : previewCol.imageKey ?? '');
                    // imageKey may already be a public path (starts with '/') or an i18n key
                    if (key.startsWith('/')) imageSrc = key;
                    else {
                      const resolved = String(t(key as never));
                      imageSrc = resolved.startsWith('/') ? resolved : '/' + resolved;
                    }
                  } else {
                    const m = String(meta('megaimage'));
                    imageSrc = m.startsWith('/') ? m : '/' + m;
                  }

                  console.debug('MegaMenu: resolved imageSrc', imageSrc);
                  return (
                    <>
                      {imageSrc ? (
                        // use regular img so SVGs from /public render reliably
                        <img src={imageSrc} alt={String(t((previewCol?.titleKey ?? `${item.key}.title`) as never))} width={420} height={260} className="rounded-md object-cover" />
                      ) : null}
                      <p className={`text-[var(--color-muted)] text-sm`}>{previewCol ? t(previewCol.introKey as never) : t(item.descKey ?? `${item.key}.desc`)}</p>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
