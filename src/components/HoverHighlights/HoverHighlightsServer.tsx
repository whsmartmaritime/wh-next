import React from 'react'
import { getTranslations } from 'next-intl/server'
import HoverHighlightsClient from './HoverHighlights'
import type { HoverHighlightsProps } from './HoverHighlights'

// Configurable highlight item for reusability
export interface ConfigurableHighlight {
  id: string
  textKey: string // Translation key for text
  descKey: string // Translation key for description  
  href: string
  mediaFolder: string // Folder name for images like 'fleet-management'
  mediaFiles?: {
    top?: string // Custom top image filename
    bottom?: string // Custom bottom image filename
  }
}

interface HoverHighlightsServerProps {
  className?: string
  hideBackground?: boolean
  namespace?: string // Translation namespace, default: 'HoverHighlights'
  highlights?: ConfigurableHighlight[] // Custom highlights configuration
  beforeTextKey?: string // Translation key for before text
  afterTextKey?: string // Translation key for after text  
  buttonLabelKey?: string // Translation key for button label
  buttonHref?: string // Button href
}

// Server Component - SEO Optimized
export default async function HoverHighlights({ 
  className,
  hideBackground,
  namespace = 'HoverHighlights',
  highlights,
  beforeTextKey = 'beforeHighlights',
  afterTextKey = 'afterHighlights', 
  buttonLabelKey = 'buttonLabel',
  buttonHref = '/solution'
}: HoverHighlightsServerProps) {
  // Get translations from server
  const t = await getTranslations(namespace)
  
  // Default highlights configuration if not provided
  const defaultHighlights: ConfigurableHighlight[] = [
    {
      id: 'fleet-management',
      textKey: 'highlight1Text',
      descKey: 'highlight1Desc', 
      href: '/solution#fleet',
      mediaFolder: 'fleet-management',
      mediaFiles: { top: 'fleet-management.jpg', bottom: 'fleet-overlay.jpg' }
    },
    {
      id: 'smart-navigation',
      textKey: 'highlight2Text',
      descKey: 'highlight2Desc',
      href: '/solution#navigation', 
      mediaFolder: 'navigation',
      mediaFiles: { top: 'navigation-system.jpg', bottom: 'navigation-overlay.jpg' }
    },
    {
      id: 'safety-protocols', 
      textKey: 'highlight3Text',
      descKey: 'highlight3Desc',
      href: '/solution#safety',
      mediaFolder: 'safety',
      mediaFiles: { top: 'safety-protocols.jpg', bottom: 'safety-overlay.jpg' }
    },
    {
      id: 'digital-transformation',
      textKey: 'highlight4Text', 
      descKey: 'highlight4Desc',
      href: '/solution#digital',
      mediaFolder: 'digital',
      mediaFiles: { top: 'digital-transformation.jpg', bottom: 'digital-overlay.jpg' }
    }
  ]

  // Use custom highlights or default
  const highlightsConfig = highlights || defaultHighlights
  
  // Build the data structure from configurable highlights
  const highlightsData: HoverHighlightsProps = {
    beforeHighlights: t(beforeTextKey),
    afterHighlights: t(afterTextKey),
    highlights: highlightsConfig.map((config) => ({
      id: config.id,
      text: t(config.textKey),
      description: t(config.descKey),
      link: { href: config.href, newTab: false },
      media: {
        top: { 
          src: `/images/${config.mediaFiles?.top || `${config.mediaFolder}.jpg`}`, 
          alt: `${t(config.textKey)} System`, 
          width: 600, 
          height: 400 
        },
        bottom: { 
          src: `/images/${config.mediaFiles?.bottom || `${config.mediaFolder}-overlay.jpg`}`, 
          alt: `${t(config.textKey)} Interface`, 
          width: 600, 
          height: 400 
        }
      }
    })),
    button: {
      label: t(buttonLabelKey),
      href: buttonHref,
      newTab: false
    },
    className,
    hideBackground
  }

  return <HoverHighlightsClient {...highlightsData} />
}
