import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import BackgroundGradient from '../BackgroundGradient'
import { BackgroundGrid } from '../BackgroundGrid'
import { BackgroundScanline } from '../BackgroundScanline'
import classes from './index.module.scss'

export default async function Hero() {
  const t = await getTranslations('Hero')

  return (
    <section className={classes.heroSection}>
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
      <div className={[classes.heroContentWrapper, 'relative z-10'].join(' ')}>
        {/* Left: text */}
        <div className={classes.heroContent}>
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

        {/* Right: stacked images */}
        <div className={classes.graphicWrapper}>
          <div className={classes.stack}>
            {/* Image 1 (top-right, above) */}
            <div className={classes.mediaOne}>
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
            <div className={classes.mediaTwo}>
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
