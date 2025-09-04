import React from 'react'
import HoverHighlightsServer from './HoverHighlightsServer'
import type { ConfigurableHighlight } from './HoverHighlightsServer'

// Simplified HoverHighlights with custom-only configuration
export interface HoverHighlightsProps {
  className?: string
  hideBackground?: boolean
  namespace: string
  highlights: ConfigurableHighlight[]
  customTexts?: {
    beforeTextKey?: string
    afterTextKey?: string
    buttonLabelKey?: string
    buttonHref?: string
  }
}

export default function HoverHighlights({
  className,
  hideBackground,
  namespace,
  highlights,
  customTexts
}: HoverHighlightsProps) {
  return (
    <HoverHighlightsServer
      className={className}
      hideBackground={hideBackground}
      namespace={namespace}
      highlights={highlights}
      beforeTextKey={customTexts?.beforeTextKey}
      afterTextKey={customTexts?.afterTextKey}
      buttonLabelKey={customTexts?.buttonLabelKey}
      buttonHref={customTexts?.buttonHref}
    />
  )
}
