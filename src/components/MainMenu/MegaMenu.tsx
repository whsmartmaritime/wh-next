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

  // underline state
  const underlineRef = useRef<HTMLDivElement | null>(null);
  const [underline, setUnderline] = useState<{ left: number; width: number; visible: boolean }>({ left: 0, width: 0, visible: false });
  const tabsRowRef = useRef<HTMLDivElement | null>(null);
  const [underlineYOffset, setUnderlineYOffset] = useState<number>(0);

  const computeUnderlineYOffset = () => {
    if (!tabsRowRef.current) return;
    const headerEl = tabsRowRef.current.closest('header');
    if (!headerEl) return;
    const headerRect = headerEl.getBoundingClientRect();
    const rowRect = tabsRowRef.current.getBoundingClientRect();
    const delta = Math.max(0, headerRect.bottom - rowRect.bottom);
    setUnderlineYOffset(delta);
  };

  // Track panel top to sit exactly under header (accounts for TopBar + header, and scroll position)
  const [panelTop, setPanelTop] = useState<number>(0);
  const updatePanelTop = () => {
    if (!containerRef.current) return;
    // Find the nearest header (sticky) element to align under it
    const headerEl = containerRef.current.closest('header');
    if (headerEl) {
      const rect = headerEl.getBoundingClientRect();
      // For position: fixed, top uses viewport coordinates
      setPanelTop(rect.bottom);
    } else {
      // Fallback to CSS vars if header not found
      const root = getComputedStyle(document.documentElement);
      const headerH = parseFloat(root.getPropertyValue('--header-height')) || 56;
      const topbarH = parseFloat(root.getPropertyValue('--top-bar-height')) || 0;
      setPanelTop(headerH + topbarH);
    }
  };

  // Update panelTop on mount, on window resize/scroll, and whenever the menu opens
  useEffect(() => {
    updatePanelTop();
    computeUnderlineYOffset();
    const onResize = () => { updatePanelTop(); computeUnderlineYOffset(); };
    const onScroll = () => {
      if (openKey) { updatePanelTop(); computeUnderlineYOffset(); }
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
    };
  }, [openKey]);

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

  // helper to position underline under hovered tab
  const positionUnderline = (el: HTMLElement | null) => {
    if (!containerRef.current || !el) return;
    const menuRect = containerRef.current.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    setUnderline({ left: rect.left - menuRect.left, width: rect.width, visible: true });
    computeUnderlineYOffset();
  };

  const clearUnderline = () => setUnderline((u) => ({ ...u, visible: false }));

  const closeTimeout = useRef<number | null>(null)
  const cancelClose = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current)
      closeTimeout.current = null
    }
  }
  const safeClose = () => {
    cancelClose();
    closeTimeout.current = window.setTimeout(() => {
      setOpenKey(null)
      clearUnderline()
    }, 350)
  }

  return (
    <div ref={containerRef} className="relative" onMouseLeave={safeClose} onMouseEnter={cancelClose}>
      <div ref={tabsRowRef} className="flex gap-6 items-center relative">
        {visibleItems.map((item) => (
          <div
            key={item.key}
            onMouseEnter={(e) => {
              cancelClose();
              const target = (e.currentTarget.querySelector('a') as HTMLElement) ?? null;
              positionUnderline(target);
              setOpenKey(item.columns ? item.key : null);
              setActiveCol(0);
              updatePanelTop();
            }}
            onFocus={(e) => {
              cancelClose();
              const target = (e.currentTarget.querySelector('a') as HTMLElement) ?? null;
              positionUnderline(target);
              setOpenKey(item.columns ? item.key : null);
              updatePanelTop();
            }}
            onMouseLeave={() => {
              if (!openKey) clearUnderline();
            }}
            tabIndex={0}
            className="relative"
          >
            <div className="flex items-center gap-2 h-full">
              <Link href={item.href ?? '#'} className="mainmenu-tab inline-flex py-2">
                {item.key && t(`${item.key}.title`) || item.href}
              </Link>
            </div>
          </div>
        ))}
        {/* underline */}
        <div
          ref={underlineRef}
          className="mm-underline pointer-events-none"
          style={{ left: underline.left, width: (underline.visible || openKey) ? underline.width : 0, opacity: (underline.visible || openKey) ? 1 : 0, transform: `translateY(${underlineYOffset}px)` }}
        >
          <div className="mm-underline-fill pointer-events-none" />
        </div>
      </div>

      {/* Hover bridge: small transparent strip right below header to keep menu open during mouse travel */}
      {openKey && (
        <div
          className="fixed left-0 right-0 z-40"
          style={{ top: Math.max(0, panelTop - 2), height: 6 }}
          onMouseEnter={cancelClose}
        />
      )}

      {/* Single persistent panel to avoid background flicker */}
      {(() => {
        const activeItem = visibleItems.find(i => i.key === openKey && i.columns);
        const isOpen = Boolean(activeItem);
        const cols = isOpen ? (activeItem!.columns!.filter(c => !c.hidden)) : [];
        return (
          <div
            key="mega-panel"
            role="region"
            aria-hidden={!isOpen}
            className={
              `fixed left-0 right-0 w-screen z-50 ` +
              `${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'} ` +
              `transition-opacity duration-150 shadow-xl border-t text-[var(--color-text)] bg-[var(--panel-bg)] border-[var(--panel-border)] mega-menu-panel`
            }
            style={{ top: panelTop, willChange: 'opacity, transform', backfaceVisibility: 'hidden', transform: 'translateZ(0)', contain: 'paint' }}
            onMouseEnter={cancelClose}
            onMouseLeave={safeClose}
          >
            {isOpen && (
              <div className="container-gutter grid grid-cols-12 gap-x-8 pt-6">
                {/* Column 1: description spans 4 cols like sample */}
                <div className="col-span-12 md:col-span-3 space-y-3">
                  <h3 className="font-semibold text-lg">{activeItem?.key ? t(`${activeItem.key}.title`) : ''}</h3>
                  <p className={`mainmenu-description text-[var(--color-muted)]`}>{activeItem?.descKey ? t(activeItem.descKey as never) : (activeItem?.key ? t(`${activeItem.key}.desc`) : '')}</p>
                </div>

                {/* Column 2: first nav group */}
                <div className="col-span-12 md:col-span-2 md:col-start-4 space-y-2" onMouseEnter={() => setActiveCol(0)} onFocus={() => setActiveCol(0)}>
                  {cols[0] ? (
                    <>
                      <div className="mainmenu-list-label mb-1">{t(cols[0].titleKey as never)}</div>
                      {cols[0].links.filter(l => !l.hidden).map((p) => (
                        <Link key={p.href} href={p.href} className={"block p-2 rounded-lg"}>
                          <div className="mainmenu-link">{t(p.titleKey as never)}</div>
                        </Link>
                      ))}
                    </>
                  ) : null}
                </div>

                {/* Column 3: second nav group */}
                <div className="col-span-12 md:col-span-2 md:col-start-6 space-y-2" onMouseEnter={() => setActiveCol(1)} onFocus={() => setActiveCol(1)}>
                  {cols[1] ? (
                    <>
                      <div className="mainmenu-list-label mb-1">{t(cols[1].titleKey as never)}</div>
                      {cols[1].links.filter(l => !l.hidden).map((p) => (
                        <Link key={p.href} href={p.href} className={"block p-2 rounded-lg"}>
                          <div className="mainmenu-link">{t(p.titleKey as never)}</div>
                        </Link>
                      ))}
                    </>
                  ) : null}
                </div>

                {/* Column 4: preview (wrap to next row on small) */}
                <div className="col-span-12 md:col-span-4 flex flex-col items-start justify-center space-y-3 md:col-start-9">
                  {(() => {
                    const index = activeCol ?? 0;
                    const previewCol = cols[index] ?? cols[0] ?? null;
                    let imageSrc: string | null = null;
                    if (previewCol) {
                      const key = String((isDark && previewCol.imageKeyDark) ? previewCol.imageKeyDark : previewCol.imageKey ?? '');
                      if (key.startsWith('/')) imageSrc = key;
                      else {
                        const resolved = String(t(key as never));
                        imageSrc = resolved.startsWith('/') ? resolved : '/' + resolved;
                      }
                    } else {
                      const m = String(meta('megaimage'));
                      imageSrc = m.startsWith('/') ? m : '/' + m;
                    }

                    return (
                      <>
                        {imageSrc ? (
                          <img src={imageSrc} alt={String(t((previewCol?.titleKey ?? `${activeItem?.key}.title`) as never))} width={420} height={260} className="rounded-md object-cover" />
                        ) : null}
                        <p className={`mainmenu-description text-[var(--color-muted)]`}>{previewCol ? t(previewCol.introKey as never) : t(activeItem?.descKey ?? `${activeItem?.key}.desc`)}</p>
                      </>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
}
