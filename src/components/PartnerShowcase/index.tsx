'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { CrosshairIcon } from '@/components/icons/CrosshairIcon'

interface LogoItem {
  id: string
  src: string
  name?: string
  alt?: string
}

interface PartnerShowcaseProps {
  logos: LogoItem[]
  rotationInterval?: number // milliseconds, default 30s
  className?: string
}

export const PartnerShowcase: React.FC<PartnerShowcaseProps> = ({ 
  logos, 
  rotationInterval = 30000,
  className = '' 
}) => {
  const [displayLogos, setDisplayLogos] = useState(() => logos.slice(0, 6))
  const [rotatingIndex, setRotatingIndex] = useState<number | null>(null)

  const rotateRandomLogo = useCallback(() => {
    const hiddenLogos = logos.filter(logo => !displayLogos.find(d => d.id === logo.id))
    if (hiddenLogos.length === 0) return

    const randomSlot = Math.floor(Math.random() * 6)
    const randomLogo = hiddenLogos[Math.floor(Math.random() * hiddenLogos.length)]

    // Start animation
    setRotatingIndex(randomSlot)

    // Swap logo after animation delay
    setTimeout(() => {
      setDisplayLogos(prev => {
        const updated = [...prev]
        updated[randomSlot] = randomLogo
        return updated
      })
      
      // Reset animation
      setTimeout(() => setRotatingIndex(null), 100)
    }, 400)
  }, [logos, displayLogos])

  useEffect(() => {
    if (logos.length <= 6) return // No rotation needed

    const interval = setInterval(rotateRandomLogo, rotationInterval)
    return () => clearInterval(interval)
  }, [rotateRandomLogo, rotationInterval, logos.length])

  if (!displayLogos.length) return null

  return (
    <div className={`relative ${className}`}>
      <div className="grid grid-cols-4 lg:grid-cols-8 gap-0 mx-auto">
        {/* Empty slot */}
        <div className="aspect-square invisible" />
        
        {/* Logo cells */}
        {displayLogos.map((logo, index) => {
          const isRotating = rotatingIndex === index
          const showCrosshair = index === 0 || index === 5
          const crosshairClass = index === 0 
            ? "absolute w-3 h-3 text-white/40 top-0 right-0 -translate-y-1/2 translate-x-1/2 z-10"
            : "absolute w-3 h-3 text-white/40 bottom-0 left-0 translate-y-1/2 -translate-x-1/2 z-10"

          return (
            <div key={`${logo.id}-${index}`} className="relative">
              <div className={`
                relative aspect-square border border-white/10 flex items-center justify-center p-4 md:p-8 overflow-hidden group hover:bg-white/5 
                transition-all duration-500 
                ${isRotating ? 'animate-pulse scale-95' : ''}
              `}>
                <div className={`
                  relative w-full h-full transition-all duration-500
                  ${isRotating ? 'scale-75 opacity-30' : 'scale-100 opacity-80 group-hover:scale-95 group-hover:opacity-100'}
                `}>
                  <Image
                    src={logo.src}
                    alt={logo.alt || logo.name || 'Partner logo'}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  />
                </div>
                
                {/* Scanline effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
              </div>
              
              {/* Crosshair */}
              {showCrosshair && <CrosshairIcon className={crosshairClass} />}
            </div>
          )
        })}
        
        {/* Empty slot */}
        <div className="aspect-square invisible" />
      </div>
    </div>
  )
}

export default PartnerShowcase
