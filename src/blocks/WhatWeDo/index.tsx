import React from 'react'
import { getTranslations } from 'next-intl/server'
import HoverHighlights from '@/components/HoverHighlights'
import CTAButton from '@/components/Button'
import { BackgroundGrid } from '@/components/BackgroundGrid'
import BackgroundScanline from '@/components/BackgroundScanline'
import type { HoverHighlightsProps } from '@/components/HoverHighlights'

// Maritime solutions images (all in /images/whatwedo/)
const MARITIME_IMAGES = [
  ['navigation-gmdss.jpg', 'navigation-gmdss2.jpg'],
  ['connectivity.jpg', 'connectivity2.jpg'],
  ['repair-maintenance.jpg', 'repair-maintenance2.jpg'],
  ['e-navigation.jpg', 'e-navigation2.jpg'],
  ['annual-survey.jpg', 'annual-survey2.jpg']
] as const

interface WhatWeDoProps {
  className?: string
}

export default async function WhatWeDo({ className }: WhatWeDoProps) {
  // Handle translations at this level
  const t = await getTranslations('WhatWeDo')
  
  // Build clean data for HoverHighlights
  const highlightsData: HoverHighlightsProps = {
    beforeHighlights: t('beforeHighlights'),
    afterHighlights: t('afterHighlights'),
    highlights: MARITIME_IMAGES.map((images, index) => ({
      id: `highlight-${index}`, // Simple ID for React key
      text: <h3 className='text-2xl lg:text-3xl xl:text-5xl font-bold m-0 leading-tight'>{t(`highlight${index + 1}Text`)}</h3>,
      description: t(`highlight${index + 1}Desc`),
      href: t(`highlight${index + 1}Href`), // From JSON - supports i18n
      newTab: false,
      images: [
        {
          src: `/images/whatwedo/${images[0]}`,
          alt: `${t(`highlight${index + 1}Text`)} System`,
          width: 600,
          height: 400
        },
        {
          src: `/images/whatwedo/${images[1]}`,
          alt: `${t(`highlight${index + 1}Text`)} Interface`,
          width: 600,
          height: 400
        }
      ]
    }))
    // Remove cta from here - will handle in WhatWeDo component directly
  }

  return (
    <section className={`theme-dark relative min-h-screen py-32 overflow-hidden bg-background ${className || ''}`}>
      {/* Background Effects */}
      <BackgroundGrid />
      <BackgroundScanline />
      
      {/* Right margin scanline */}
      <div className="hidden lg:block absolute top-0 right-0 w-[25%] h-full">
        <div className="absolute inset-y-0 right-16 w-px bg-gradient-to-b from-transparent via-border to-transparent opacity-30" />
      </div>

      {/* Container */}
      <div className="container-gutter mx-auto px-4 lg:px-8 h-full">
        <h2 className="text-2xl lg:text-3xl font-semibold mb-6 text-center lg:text-left">{t('title')}</h2>
        <HoverHighlights {...highlightsData} />
        
        {/* CTA Button */}
        <div className="mt-8 flex justify-center lg:justify-start">
          <CTAButton
            href={t('buttonHref')}
            theme="light"
          >
            {t('buttonLabel')}
          </CTAButton>
        </div>
      </div>
    </section>
  )
}
