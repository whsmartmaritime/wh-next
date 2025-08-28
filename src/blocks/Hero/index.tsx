import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { BackgroundGrid } from '../../components/BackgroundGrid'
import CTAButton from '@/components/Button'
import LogoShowcase, { LogoItem } from './LogoShowcase'

export default async function Hero() {
  const t = await getTranslations('Hero')



  return (
    <section data-theme="dark" className="container-gutter group relative overflow-visible min-h-[100vh] py-block text-white">
      {/* Backgrounds (behind content) */}
      <BackgroundGrid fadeTop={true} />
      
      {/* Content */}
    <div className="relative z-10 grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
      {/* Left: text (approx sample: 25% on desktop) */}
  <div className="flex flex-col gap-4 mt-6 lg:mt-32 lg:col-span-4 lg:order-1">
                <h1 className="text-white  font-semibold leading-tight tracking-tight">
                  {t('title')}
                </h1>
                <h2 className="text-white/80 ">{t('subtitle')}</h2>
                <div className="pt-2">
                  {/* Snap CTA to one ground grid "cell" = 4 columns */}
                  <div className="w-full lg:w-[calc(var(--column)*4)] max-w-full">
                    <CTAButton size="large" className="w-full justify-between" href="#contact">
                      {t('ctaPrimary')}
                    </CTAButton>
                  </div>
                </div>
              </div>

              {/* Right: stacked images (MediaStack-like sizing, image1 allowed to overflow right) */}
  <div className="relative flex justify-start mt-6 lg:mt-12 lg:col-span-8 lg:order-2 lg:col-start-6 lg:justify-end lg:ml-auto lg:pr-[var(--gutter-h)]">
          <div className="relative block w-[calc(var(--column)*14)] h-[calc(var(--column)*8)] lg:w-[calc(var(--column)*8)] lg:h-[calc(var(--column)*5)]">
            {/* Image 1 (top-right, above) - intentionally offset to overflow to the right like sample */}
            <div className="absolute top-0 right-0 lg:-right-[calc(var(--gutter-h)*1.2)] lg:translate-x-[calc(var(--gutter-h)*0.8)] lg:translate-y-[calc(var(--gutter-h)*0.45)] transform z-10 rounded-lg backdrop-blur-3xl shadow-[0_3rem_4rem_1rem_rgba(0,0,0,0.5)] overflow-hidden w-[calc(var(--column)*12)] lg:w-[calc(var(--column)*8)] h-[calc(var(--column)*6)] lg:h-[calc(var(--column)*5)] ring-1 ring-white/6 fade-in-1">
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

      {/* Logo showcase dưới hero content */}
      <div className="container-gutter relative z-10 mt-10">
         {/*  <LogoShowcase
            title="Trusted by"
            basePath="/images/logos"
            logos={[
            { src: 'vsat.svg', alt: 'VSAT' },
            { src: 'vsat.svg', alt: 'VSAT' },
            { src: 'vsat.svg', alt: 'VSAT' },
            { src: 'vsat.svg', alt: 'VSAT' },
            { src: 'vsat.svg', alt: 'VSAT' },
            { src: 'vsat.svg', alt: 'VSAT' },
            
          ]}
        /> */}
      </div>
    </section>
  )
}
