import React from 'react'
import Image from 'next/image'
import { CrosshairIcon } from '@/components/icons/CrosshairIcon'

interface LogoItem {
  id: string
  src: string
  name?: string
  alt?: string
}

interface LogoShowcaseProps {
  logos: LogoItem[]
  className?: string
}

export const LogoShowcase: React.FC<LogoShowcaseProps> = ({ logos, className = '' }) => {
  const displayLogos = logos.slice(0, 6)
  if (!displayLogos.length) return null

  const LogoCell = ({ logo, index }: { logo: LogoItem; index: number }) => {
    const crosshairClass = 
      index === 0 ? "absolute w-3 h-3 text-white/40 top-0 right-0 -translate-y-1/2 translate-x-1/2 z-10" :
      index === 5 ? "absolute w-3 h-3 text-white/40 bottom-0 left-0 translate-y-1/2 -translate-x-1/2 z-10" : ""

    return (
      <div className="relative">
        <div className="relative aspect-square border border-white/10 flex items-center justify-center p-4 md:p-8 overflow-hidden group hover:bg-white/5 transition-colors duration-500">
          <div className="relative w-full h-full group-hover:scale-95 transition-transform duration-1000">
            <Image
              src={logo.src}
              alt={logo.alt || logo.name || 'Partner logo'}
              fill
              className="object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
        </div>
        {crosshairClass && <CrosshairIcon className={crosshairClass} />}
      </div>
    )
  }

  // Tạo array 8 items: [empty, logo1, logo2, logo3, logo4, logo5, logo6, empty]
  const gridItems = [null, ...displayLogos, null]

  return (
    <div className={`relative ${className}`}>
      <div className="grid grid-cols-4 lg:grid-cols-8 gap-0 mx-auto">
        {gridItems.map((logo, index) => 
          logo ? (
            <LogoCell key={logo.id} logo={logo} index={displayLogos.indexOf(logo)} />
          ) : (
            <div key={`empty-${index}`} className="aspect-square invisible" />
          )
        )}
      </div>
    </div>
  )
}

export default LogoShowcase
