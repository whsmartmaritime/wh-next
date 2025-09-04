'use client'

import React, { useState, Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ArrowIcon from '@/components/icons/ArrowIcon'

// Simplified Types
export interface HoverHighlightMedia {
  src: string
  alt: string
  width?: number
  height?: number
}

export interface HoverHighlightItem {
  id: string
  text: string
  description?: string  // Optional - can be used for tooltips/subtitles later
  href: string
  newTab?: boolean
  images: [HoverHighlightMedia, HoverHighlightMedia] // Always exactly 2 images [background, foreground]
}

export interface HoverHighlightsProps {
  title?: string
  subtitle?: string
  highlights: HoverHighlightItem[]
  cta?: {
    label: string
    href: string
    newTab?: boolean
  }
  className?: string
}

// Pure HoverHighlights Component - just text/image interactions
export const HoverHighlightsClient: React.FC<HoverHighlightsProps> = ({
  title,
  subtitle,
  highlights,
  cta,
  className = ''
}) => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-0 h-full min-h-[80vh] relative ${className}`}>
      
      {/* Content Area - Left side */}
      <div className="col-span-1 lg:col-span-6 flex flex-col justify-center gap-8 z-10 h-full">
        {title && (
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-none">
            {title}
          </p>
        )}
        
        <div className="flex flex-col gap-6">
          {highlights.map((highlight, index) => (
            <Link
              key={highlight.id}
              href={highlight.href}
              target={highlight.newTab ? '_blank' : undefined}
              rel={highlight.newTab ? 'noopener noreferrer' : undefined}
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

        {subtitle && (
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-none">
            {subtitle}
          </p>
        )}

        {cta && (
          <div className="mt-8">
            <Link
              href={cta.href}
              target={cta.newTab ? '_blank' : undefined}
              rel={cta.newTab ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-4 px-6 py-3 text-lg font-medium text-foreground bg-primary/10 border border-border hover:bg-primary hover:text-primary-foreground transition-all duration-300 group rounded-lg"
            >
              {cta.label}
              <ArrowIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>

      {/* Media Area - Right side */}
      <div className="hidden lg:block col-span-6 relative">
        {highlights.map((highlight, index) => {
          const [backgroundImage, foregroundImage] = highlight.images
          
          return (
            <Fragment key={`media-${highlight.id}`}>
              {/* Background Image */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
                <Image
                  src={backgroundImage.src}
                  alt={backgroundImage.alt}
                  width={backgroundImage.width || 600}
                  height={backgroundImage.height || 400}
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

              {/* Foreground Image */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[2]">
                <Image
                  src={foregroundImage.src}
                  alt={foregroundImage.alt}
                  width={foregroundImage.width || 600}
                  height={foregroundImage.height || 400}
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
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}

// Export as default and named export
export default HoverHighlightsClient
