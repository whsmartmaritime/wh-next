import React from 'react'
import { getTranslations } from 'next-intl/server'
import HoverHighlightsClient from './HoverHighlights'
import type { HoverHighlightsProps } from './HoverHighlights'

interface HoverHighlightsServerProps {
  className?: string
  hideBackground?: boolean
}

// Server Component - SEO Optimized
export default async function HoverHighlights({ 
  className,
  hideBackground 
}: HoverHighlightsServerProps) {
  // Get translations from server
  const t = await getTranslations('HoverHighlights')
  
  // Build the data structure from individual translation keys
  const highlightsData: HoverHighlightsProps = {
    beforeHighlights: t('beforeHighlights'),
    afterHighlights: t('afterHighlights'),
    highlights: [
      {
        id: 'fleet-management',
        text: t('highlight1Text'),
        description: t('highlight1Desc'),
        link: { href: t('highlight1Href'), newTab: false },
        media: {
          top: { src: '/images/fleet-management.jpg', alt: `${t('highlight1Text')} System`, width: 600, height: 400 },
          bottom: { src: '/images/fleet-overlay.jpg', alt: `${t('highlight1Text')} Interface`, width: 600, height: 400 }
        }
      },
      {
        id: 'smart-navigation',
        text: t('highlight2Text'),
        description: t('highlight2Desc'),
        link: { href: t('highlight2Href'), newTab: false },
        media: {
          top: { src: '/images/navigation-system.jpg', alt: `${t('highlight2Text')} System`, width: 600, height: 400 },
          bottom: { src: '/images/navigation-overlay.jpg', alt: `${t('highlight2Text')} Interface`, width: 600, height: 400 }
        }
      },
      {
        id: 'safety-protocols',
        text: t('highlight3Text'),
        description: t('highlight3Desc'),
        link: { href: t('highlight3Href'), newTab: false },
        media: {
          top: { src: '/images/safety-protocols.jpg', alt: `${t('highlight3Text')} System`, width: 600, height: 400 },
          bottom: { src: '/images/safety-overlay.jpg', alt: `${t('highlight3Text')} Interface`, width: 600, height: 400 }
        }
      },
      {
        id: 'digital-transformation',
        text: t('highlight4Text'),
        description: t('highlight4Desc'),
        link: { href: t('highlight4Href'), newTab: false },
        media: {
          top: { src: '/images/digital-transformation.jpg', alt: `${t('highlight4Text')} Solutions`, width: 600, height: 400 },
          bottom: { src: '/images/digital-overlay.jpg', alt: `${t('highlight4Text')} Interface`, width: 600, height: 400 }
        }
      }
    ],
    button: {
      label: t('buttonLabel'),
      href: t('buttonHref'),
      newTab: false
    },
    className,
    hideBackground
  }

  return <HoverHighlightsClient {...highlightsData} />
}
