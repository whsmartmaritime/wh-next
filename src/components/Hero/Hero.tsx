import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import BackgroundGradient from '../BackgroundGradient'
import { BackgroundGrid } from '../BackgroundGrid'
import { BackgroundScanline } from '../BackgroundScanline'

export default async function Hero() {
  const t = await getTranslations('Hero')

  return (
    <section className="relative overflow-visible min-h-[75vh] py-block">
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

      {/* Content */}
    <div className="container-gutter relative z-10 grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
      {/* Left: text (approx sample: 25% on desktop) */}
        <div className="flex flex-col gap-4 lg:col-span-4 lg:order-1">
                <h1 className="text-white text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
                  {t('title')}
                </h1>
                <p className="text-white/80 text-base md:text-lg">{t('subtitle')}</p>
                <div className="flex gap-3 pt-2">
                  <a
                    href="#contact"
                    className="inline-flex items-center rounded-md bg-black text-white px-4 py-2 shadow-sm hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 transition-colors"
                  >
                    {t('ctaPrimary')}
                  </a>
                </div>
              </div>

              {/* Right: stacked images (MediaStack-like sizing, image1 allowed to overflow right) */}
        <div className="relative flex justify-start lg:col-span-8 lg:order-2 lg:col-start-6 lg:justify-end lg:ml-auto lg:pr-[var(--gutter-h)]">
          <div className="relative block w-[calc(var(--column)*14)] h-[calc(var(--column)*8)] lg:w-[calc(var(--column)*8)] lg:h-[calc(var(--column)*5)]">
            {/* Image 1 (top-right, above) - intentionally offset to overflow to the right like sample */}
            <div className="absolute top-0 right-0 lg:-right-[var(--gutter-h)] lg:translate-x-[calc(var(--gutter-h)*0.5)] lg:translate-y-[calc(var(--gutter-h)*0.1)] transform z-10 rounded-lg backdrop-blur-3xl shadow-[0_3rem_4rem_1rem_rgba(0,0,0,0.5)] overflow-hidden w-[calc(var(--column)*12)] lg:w-[calc(var(--column)*8)] h-[calc(var(--column)*6)] lg:h-[calc(var(--column)*5)] ring-1 ring-white/6 fade-in-1">
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
            <div className="absolute left-0 bottom-0 z-5 rounded-lg backdrop-blur-3xl shadow-[0_3rem_4rem_1rem_rgba(0,0,0,0.5)] overflow-hidden w-[calc(var(--column)*11)] lg:w-[calc(var(--column)*7)] h-[calc(var(--column)*5)] lg:h-[calc(var(--column)*4)] ring-1 ring-white/6 fade-in-2">
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
    </section>
  )
}
