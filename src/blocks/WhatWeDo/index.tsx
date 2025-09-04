import React from 'react'
import { getTranslations } from 'next-intl/server'
import HoverHighlights from '@/components/HoverHighlights'
import { BackgroundGrid } from '@/components/BackgroundGrid'
import BackgroundScanline from '@/components/BackgroundScanline'
import type { HoverHighlightsProps } from '@/components/HoverHighlights'

// WhatWeDo-specific configuration for maritime solutions
const MARITIME_HIGHLIGHTS = [
  {
    id: 'fleet-management',
    textKey: 'highlight1Text',
    descKey: 'highlight1Desc',
    href: '/solution#fleet',
    mediaFiles: { 
      top: 'fleet-monitoring.jpg', 
      bottom: 'fleet-dashboard.jpg' 
    }
  },
  {
    id: 'navigation-safety',
    textKey: 'highlight2Text',
    descKey: 'highlight2Desc',
    href: '/solution#navigation',
    mediaFiles: { 
      top: 'navigation-system.jpg', 
      bottom: 'safety-protocols.jpg' 
    }
  },
  {
    id: 'communication',
    textKey: 'highlight3Text',
    descKey: 'highlight3Desc',
    href: '/solution#communication',
    mediaFiles: { 
      top: 'satellite-comm.jpg', 
      bottom: 'comm-interface.jpg' 
    }
  },
  {
    id: 'digital-transformation',
    textKey: 'highlight4Text',
    descKey: 'highlight4Desc',
    href: '/solution#digital',
    mediaFiles: { 
      top: 'digital-platform.jpg', 
      bottom: 'connected-vessel.jpg' 
    }
  }
]

interface WhatWeDoProps {
  className?: string
}

export default async function WhatWeDo({ className }: WhatWeDoProps) {
  // Handle translations at this level
  const t = await getTranslations('WhatWeDo')
  
  // Build fully processed data for HoverHighlights
  const highlightsData: HoverHighlightsProps = {
    beforeHighlights: t('beforeHighlights'),
    afterHighlights: t('afterHighlights'),
    highlights: MARITIME_HIGHLIGHTS.map((config) => ({
      id: config.id,
      text: t(config.textKey),
      description: t(config.descKey),
      link: { href: config.href, newTab: false },
      media: {
        top: { 
          src: `/images/whatwedo/${config.id}/${config.mediaFiles.top}`, 
          alt: `${t(config.textKey)} System`, 
          width: 600, 
          height: 400 
        },
        bottom: { 
          src: `/images/whatwedo/${config.id}/${config.mediaFiles.bottom}`, 
          alt: `${t(config.textKey)} Interface`, 
          width: 600, 
          height: 400 
        }
      }
    })),
    button: {
      label: t('buttonLabel'),
      href: '/solution',
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
      <div className="container-gutter mx-auto px-4 lg:px-16 h-full">
        <HoverHighlights {...highlightsData} />
      </div>
    </section>
  )
}
