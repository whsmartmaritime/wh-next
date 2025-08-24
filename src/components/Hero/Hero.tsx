import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import BackgroundGradient from '../BackgroundGradient';
import { BackgroundGrid } from '../BackgroundGrid';
import { BackgroundScanline } from '../BackgroundScanline';

export default async function Hero() {
  const t = await getTranslations('Hero');

  return (
    <section className="relative w-full overflow-hidden min-h-[75vh]">
      {/* Backgrounds (behind content) */}
      <BackgroundScanline className="pointer-events-none absolute inset-0 z-0" />
      <BackgroundGrid
        gridLineStyles={[
          { background: 'linear-gradient(to bottom, transparent 80px, var(--theme-border-color) 240px)' },
          { background: 'linear-gradient(to bottom, transparent 160px, var(--theme-border-color) 240px)' },
          { background: 'linear-gradient(to bottom, transparent 200px, var(--theme-border-color) 240px)' },
          { background: 'linear-gradient(to bottom, transparent 160px, var(--theme-border-color) 240px)' },
          { background: 'linear-gradient(to bottom, transparent 80px, var(--theme-border-color) 240px)' },
        ]}
        zIndex={-2}
      />
      <BackgroundGradient className="pointer-events-none absolute inset-0 -z-10" />

      {/* Container: modern gutter via responsive padding, not fixed width */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 xl:px-32 py-12 md:py-16">
        {/* Layout: text smaller, images larger (like sample) */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] items-center gap-8">
          {/* Left: text */}
          <div className="space-y-4">
            <h1 className="text-white text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
              {t('title')}
            </h1>
            {'subtitle' in (t as any) && (
              <p className="text-white/80 text-base md:text-lg">{t('subtitle')}</p>
            )}
            <div className="flex gap-3 pt-2">
              {'ctaPrimary' in (t as any) && (
                <a
                  href="#contact"
                  className="inline-flex items-center rounded-md bg-black text-white px-4 py-2 shadow-sm hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 transition-colors"
                >
                  {t('ctaPrimary')}
                </a>
              )}
              {'ctaSecondary' in (t as any) && (
                <a
                  href="#learn-more"
                  className="inline-flex items-center rounded-md border border-white/20 text-white px-4 py-2 hover:bg-white/10 transition-colors"
                >
                  {t('ctaSecondary')}
                </a>
              )}
            </div>
          </div>

          {/* Right: stacked images (no fixed container width; responsive via aspect-ratio and percentages) */}
          <div className="relative w-full flex justify-center">
            {/* Stack container scales with page, capped by max-w not a fixed width */}
            <div className="relative w-full max-w-[min(64rem,62vw)] aspect-[26/17]">
              {/* Image 1 (top-right, above) */}
              <div className="absolute top-0 right-0 z-20 w-[76%] aspect-[20/12] rounded-xl ring-1 ring-white/20 dark:ring-neutral-800 bg-white/5 dark:bg-neutral-900/40 backdrop-blur-sm shadow-2xl overflow-hidden">
                <Image
                  src="/images/Picture1.png"
                  alt={t('heroImage1Alt')}
                  fill
                  sizes="(min-width:1280px) 750px, (min-width:1024px) 600px, 70vw"
                  className="object-cover"
                  priority
                />
              </div>
              {/* Image 2 (bottom-left, behind) */}
              <div className="absolute left-[6%] bottom-[-6%] z-10 w-[54%] aspect-[14/9] rounded-xl ring-1 ring-white/20 dark:ring-neutral-800 bg-white/5 dark:bg-neutral-900/40 backdrop-blur-sm shadow-2xl overflow-hidden">
                <Image
                  src="/images/Picture2.png"
                  alt={t('heroImage2Alt')}
                  fill
                  sizes="(min-width:1280px) 520px, (min-width:1024px) 420px, 60vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
