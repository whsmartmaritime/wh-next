import React from 'react'
import HoverHighlightsClient from './HoverHighlightsClient'

// Re-export types and props from client component
export type { HoverHighlightsProps, HoverHighlightItem, HoverHighlightMedia } from './HoverHighlightsClient'

// Simple HoverHighlights - just displays data received from props
export default function HoverHighlights(props: React.ComponentProps<typeof HoverHighlightsClient>) {
  return <HoverHighlightsClient {...props} />
}
