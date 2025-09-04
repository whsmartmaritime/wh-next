'use client'

import React, { useState, Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ArrowIcon from '@/components/icons/ArrowIcon'

// Types
export interface HoverHighlightMedia {
  id?: string
  src: string
  alt?: string
  width?: number
  height?: number
}

export interface HoverHighlightItem {
  id?: string
  text: string
  description?: string
  link?: {
    href?: string
    label?: string
    type?: 'link' | 'custom'
    newTab?: boolean
  }
  media?: {
    top?: HoverHighlightMedia
    bottom?: HoverHighlightMedia
  }
}

export interface HoverHighlightsProps {
  beforeHighlights?: string
  afterHighlights?: string
  highlights: HoverHighlightItem[]
  button?: {
    label: string
    href?: string
    newTab?: boolean
  }
  className?: string
}

// Pure HoverHighlights Component - just text/image interactions
export const HoverHighlightsClient: React.FC<HoverHighlightsProps> = ({
  beforeHighlights,
  afterHighlights,
  highlights,
  button,
  className = ''
}) => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-0 h-full min-h-[80vh] relative ${className}`}>
      
      {/* Content Area - Left side */}
      <div className="col-span-1 lg:col-span-6 flex flex-col justify-center gap-8 z-10 h-full">
        {beforeHighlights && (
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-none">
            {beforeHighlights}
          </p>
        )}
        
        <div className="flex flex-col gap-6">
          {highlights.map((highlight, index) => (
            <Link
              key={highlight.id || index}
              href={highlight.link?.href || '#'}
              target={highlight.link?.newTab ? '_blank' : undefined}
              rel={highlight.link?.newTab ? 'noopener noreferrer' : undefined}
              className={`
                group flex items-center gap-4 text-2xl lg:text-3xl xl:text-4xl font-bold 
                transition-all duration-700 ease-out no-underline
                ${index < activeIndex ? 'opacity-30 text-muted-foreground' : ''}
                ${index === activeIndex ? 'opacity-100 text-foreground' : ''}
                ${index > activeIndex ? 'opacity-50 text-muted-foreground' : ''}
                hover:text-primary
              `}
              onMouseEnter={() => setActiveIndex(index)}
            >
              {highlight.text}
              <ArrowIcon className={`
                w-6 h-6 lg:w-8 lg:h-8 transition-all duration-600 delay-100
                ${index === activeIndex ? 'opacity-50 group-hover:opacity-100' : 'opacity-0'}
                group-hover:translate-x-1
              `} />
            </Link>
          ))}
        </div>

        {afterHighlights && (
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-none">
            {afterHighlights}
          </p>
        )}

        {button && (
          <div className="mt-8">
            <Link
              href={button.href || '#'}
              target={button.newTab ? '_blank' : undefined}
              rel={button.newTab ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-4 px-6 py-3 text-lg font-medium text-foreground bg-primary/10 border border-border hover:bg-primary hover:text-primary-foreground transition-all duration-300 group rounded-lg"
            >
              {button.label}
              <ArrowIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>

      {/* Media Area - Right side */}
      <div className="hidden lg:block col-span-6 relative">
        {highlights.map((highlight, index) => {
          const { media } = highlight
          
          return (
            <Fragment key={`media-${highlight.id || index}`}>
              {/* Background Media (Top Layer) */}
              {media?.top && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
                  <Image
                    src={media.top.src}
                    alt={media.top.alt || ''}
                    width={media.top.width || 600}
                    height={media.top.height || 400}
                    className={`
                      w-full h-auto max-w-full object-contain
                      transition-all duration-900 ease-out will-change-transform
                      ${index < activeIndex ? 'opacity-0 -translate-y-24' : ''}
                      ${index === activeIndex ? 'opacity-100 translate-y-0' : ''}
                      ${index > activeIndex ? 'opacity-0 translate-y-24' : ''}
                    `}
                    priority={index === 0}
                  />
                </div>
              )}

              {/* Foreground Media (Bottom Layer) */}
              {media?.bottom && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[2]">
                  <Image
                    src={media.bottom.src}
                    alt={media.bottom.alt || ''}
                    width={media.bottom.width || 600}
                    height={media.bottom.height || 400}
                    className={`
                      w-full h-auto max-w-full object-contain
                      transition-all duration-900 ease-out will-change-transform
                      ${index < activeIndex ? 'opacity-0 -translate-y-16' : ''}
                      ${index === activeIndex ? 'opacity-100 translate-y-0' : ''}
                      ${index > activeIndex ? 'opacity-0 translate-y-16' : ''}
                    `}
                    priority={index === 0}
                  />
                </div>
              )}
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}

// Export as default and named export
export default HoverHighlightsClient
