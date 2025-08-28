import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { BackgroundGrid } from '../../components/BackgroundGrid'
import CTAButton from '@/components/Button'

export default async function Hero() {
  const t = await getTranslations('Hero')

  return (
    <section data-theme="dark" className="container-gutter group relative overflow-visible min-h-[75vh] lg:min-h-[100vh] pt-16 lg:pt-16 pb-16 lg:pb-16 text-white">
      {/* Backgrounds (behind content) */}
      <BackgroundGrid fadeTop={true} />
      
      {/* Content - 12-col grid matching sample proportions */}
      <div className="relative z-10 grid grid-cols-1 gap-6 lg:grid-cols-12 items-center">
        
        {/* Left: text content - cols-3 (25% like sample's cols-4/16) */}
        <div className="flex flex-col gap-4 lg:col-span-3 lg:order-1">
          <h1 className="text-white font-semibold leading-tight tracking-tight text-balance w-full lg:w-[150%]">
            {t('title')}
          </h1>
          <h2 className="text-white/80">{t('subtitle')}</h2>
          <div className="pt-2">
            <CTAButton size="large" className="w-full justify-between" href="#contact">
              {t('ctaPrimary')}
            </CTAButton>
          </div>
        </div>

        {/* Right: images container - 10 cols wide, starts at col 6, height 6 cols */}
        <div className="relative lg:col-span-8 lg:col-start-6 lg:order-2">
          <div className="relative w-[calc(var(--column)*10)] h-[calc(var(--column)*6)]">
            
            {/* Image 1 (top-right) - 8 cols wide, positioned at right of container */}
            <div className="absolute top-0 right-0 z-10 w-[calc(var(--column)*8)] h-auto  bg-white/10 border border-white/5 rounded-lg backdrop-blur-2xl shadow-[0px_3rem_4rem_1rem_rgba(0,0,0,0.5)] overflow-hidden">
              <div className="w-full h-full rounded-md border border-white/5 bg-gray-900 shadow-[0px_0rem_0.25rem_0rem_rgba(0,0,0,0.5)] overflow-hidden aspect-[16/10]">
                <Image
                  src="/images/Picture1.png"
                  alt={t('heroImage1Alt')}
                  fill
                  sizes="(min-width:1280px) 750px, (min-width:1024px) 600px, 70vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Image 2 (bottom-left) - 8 cols wide, positioned at left of container */}
            <div className="absolute bottom-0 left-0 z-0 w-[calc(var(--column)*8)] h-auto bg-white/10 border border-white/5 rounded-lg backdrop-blur-2xl shadow-[0px_3rem_4rem_1rem_rgba(0,0,0,0.5)] overflow-hidden ">
              <div className="w-full h-full rounded-md border border-white/5 bg-gray-900 shadow-[0px_0rem_0.25rem_0rem_rgba(0,0,0,0.5)] overflow-hidden aspect-[16/10]">
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