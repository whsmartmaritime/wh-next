import React from 'react'
import HoverHighlightsServer from './HoverHighlightsServer'
import type { ConfigurableHighlight } from './HoverHighlightsServer'

// Easy-to-use wrapper với presets phổ biến
export interface HoverHighlightsProps {
  variant?: 'solutions' | 'services' | 'products' | 'custom'
  className?: string
  hideBackground?: boolean
  namespace?: string
  customHighlights?: ConfigurableHighlight[]
  customTexts?: {
    beforeTextKey?: string
    afterTextKey?: string
    buttonLabelKey?: string
    buttonHref?: string
  }
}

const variantConfigs = {
  solutions: {
    namespace: 'HoverHighlights',
    highlights: [
      {
        id: 'fleet-management',
        textKey: 'highlight1Text', 
        descKey: 'highlight1Desc',
        href: '/solution#fleet',
        mediaFolder: 'solutions/fleet',
        mediaFiles: { top: 'fleet-system.jpg', bottom: 'fleet-dashboard.jpg' }
      },
      {
        id: 'smart-navigation',
        textKey: 'highlight2Text',
        descKey: 'highlight2Desc', 
        href: '/solution#navigation',
        mediaFolder: 'solutions/navigation',
        mediaFiles: { top: 'nav-system.jpg', bottom: 'nav-interface.jpg' }
      },
      {
        id: 'safety-protocols',
        textKey: 'highlight3Text',
        descKey: 'highlight3Desc',
        href: '/solution#safety', 
        mediaFolder: 'solutions/safety',
        mediaFiles: { top: 'safety-system.jpg', bottom: 'safety-dashboard.jpg' }
      },
      {
        id: 'digital-transformation',
        textKey: 'highlight4Text',
        descKey: 'highlight4Desc',
        href: '/solution#digital',
        mediaFolder: 'solutions/digital',
        mediaFiles: { top: 'digital-platform.jpg', bottom: 'digital-interface.jpg' }
      }
    ]
  },
  
  services: {
    namespace: 'Services',
    highlights: [
      {
        id: 'consulting',
        textKey: 'consultingText',
        descKey: 'consultingDesc',
        href: '/services#consulting',
        mediaFolder: 'services/consulting'
      },
      {
        id: 'implementation',
        textKey: 'implementationText', 
        descKey: 'implementationDesc',
        href: '/services#implementation',
        mediaFolder: 'services/implementation'
      },
      {
        id: 'support',
        textKey: 'supportText',
        descKey: 'supportDesc', 
        href: '/services#support',
        mediaFolder: 'services/support'
      }
    ]
  },

  products: {
    namespace: 'Products',
    highlights: [
      {
        id: 'hardware', 
        textKey: 'hardwareText',
        descKey: 'hardwareDesc',
        href: '/products#hardware',
        mediaFolder: 'products/hardware'
      },
      {
        id: 'software',
        textKey: 'softwareText',
        descKey: 'softwareDesc',
        href: '/products#software', 
        mediaFolder: 'products/software'
      }
    ]
  }
}

export default function HoverHighlights({
  variant = 'solutions',
  className,
  hideBackground,
  namespace,
  customHighlights,
  customTexts
}: HoverHighlightsProps) {
  // Use variant config or custom config
  const config = variant === 'custom' ? {
    namespace: namespace || 'HoverHighlights',
    highlights: customHighlights || []
  } : variantConfigs[variant]

  return (
    <HoverHighlightsServer
      className={className}
      hideBackground={hideBackground}
      namespace={config.namespace}
      highlights={config.highlights as ConfigurableHighlight[]}
      beforeTextKey={customTexts?.beforeTextKey}
      afterTextKey={customTexts?.afterTextKey}
      buttonLabelKey={customTexts?.buttonLabelKey}
      buttonHref={customTexts?.buttonHref}
    />
  )
}
