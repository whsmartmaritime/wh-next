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
  text: string | React.ReactNode
  description?: string  // Optional - can be used for tooltips/subtitles later
  href: string
  newTab?: boolean
  images: [HoverHighlightMedia, HoverHighlightMedia] // Always exactly 2 images [background, foreground]
}

export interface HoverHighlightsProps {
  beforeHighlights?: string
  afterHighlights?: string
  highlights: HoverHighlightItem[]
  className?: string
}

// Pure HoverHighlights Component - just text/image interactions
const HoverHighlightsClient: React.FC<HoverHighlightsProps> = ({
  beforeHighlights,
  afterHighlights,
  highlights,
  className = ''
}) => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className={`flex flex-col lg:flex-row h-full min-h-[50vh] relative ${className}`}>
      
      {/* Text Content Area */}
      <div className="flex-1 lg:max-w-[50%] flex flex-col justify-center lg:pr-16 z-10 relative">
        
        {beforeHighlights && (
          <p className="text-lg lg:text-xl text-muted-foreground mb-4 max-w-2xl">
            {beforeHighlights}
          </p>
        )}
        
        {/* Links with natural flow */}
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
              <ArrowIcon 
                className={`
                  w-6 h-6 lg:w-8 lg:h-8 transition-all duration-600 delay-100
                  ${index === activeIndex ? 'opacity-50 group-hover:opacity-100' : 'opacity-0'}
                  group-hover:translate-x-1
                `} 
              />
            </Link>
          ))}
        </div>

        {afterHighlights && (
          <p className="text-lg lg:text-xl text-muted-foreground mt-8 max-w-2xl">
            {afterHighlights}
          </p>
        )}
        
      </div>

      {/* Media Area */}
      <div className="flex-1 lg:max-w-[50%] hidden lg:block relative">
        
        {highlights.map((highlight, index) => {
          const isActive = index === activeIndex
          
          return (
            <Fragment key={highlight.id}>
              
              {/* Background Image */}
              <div 
                className={`
                  absolute inset-0 transition-all duration-700 ease-out
                  ${isActive ? 'opacity-60 scale-100' : 'opacity-0 scale-105'}
                `}
              >
                <Image
                  src={highlight.images[0].src}
                  alt={highlight.images[0].alt}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                />
              </div>
              
              {/* Foreground Image */}
              <div 
                className={`
                  absolute top-8 left-8 w-3/4 h-3/4 transition-all duration-700 delay-200 ease-out
                  ${isActive ? 'opacity-100 translate-y-0 translate-x-0' : 'opacity-0 translate-y-4 translate-x-4'}
                `}
              >
                <Image
                  src={highlight.images[1].src}
                  alt={highlight.images[1].alt}
                  fill
                  className="object-cover rounded-lg shadow-2xl"
                  sizes="(max-width: 768px) 100vw, 40vw"
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

export default HoverHighlightsClient
