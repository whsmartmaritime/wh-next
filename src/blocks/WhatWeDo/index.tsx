import React from 'react'
import { getTranslations } from 'next-intl/server'
import HoverHighlights from '@/components/HoverHighlights'
import { BackgroundGrid } from '@/components/BackgroundGrid'
import BackgroundScanline from '@/components/BackgroundScanline'
import type { HoverHighlightsProps } from '@/components/HoverHighlights'

// Simplified configuration - just images (hardcoded)
const MARITIME_IMAGES = [
  ['fleet-monitoring.jpg', 'fleet-dashboard.jpg'],
  ['navigation-system.jpg', 'safety-protocols.jpg'], 
  ['satellite-comm.jpg', 'comm-interface.jpg'],
  ['digital-platform.jpg', 'connected-vessel.jpg']
] as const

// Folder names for image paths  
const IMAGE_FOLDERS = [
  'fleet-management',
  'navigation-safety',
  'communication', 
  'digital-transformation'
] as const

interface WhatWeDoProps {
  className?: string
}

export default async function WhatWeDo({ className }: WhatWeDoProps) {
  // Handle translations at this level
  const t = await getTranslations('WhatWeDo')
  
  // Build clean data for HoverHighlights
  const highlightsData: HoverHighlightsProps = {
    title: t('beforeHighlights'),
    subtitle: t('afterHighlights'),
    highlights: MARITIME_IMAGES.map((images, index) => ({
      id: `highlight-${index}`, // Simple ID for React key
      text: t(`highlight${index + 1}Text`),
      description: t(`highlight${index + 1}Desc`),
      href: t(`highlight${index + 1}Href`), // From JSON - supports i18n
      newTab: false,
      images: [
        {
          src: `/images/whatwedo/${IMAGE_FOLDERS[index]}/${images[0]}`,
          alt: `${t(`highlight${index + 1}Text`)} System`,
          width: 600,
          height: 400
        },
        {
          src: `/images/whatwedo/${IMAGE_FOLDERS[index]}/${images[1]}`,
          alt: `${t(`highlight${index + 1}Text`)} Interface`,
          width: 600,
          height: 400
        }
      ]
    })),
    cta: {
      label: t('buttonLabel'),
      href: t('buttonHref'),
      newTab: false
    }
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
        <h2 className="font-semibold mb-6 text-center lg:text-left">{t('title')}</h2>
        <HoverHighlights {...highlightsData} />
      </div>
    </section>
  )
}
