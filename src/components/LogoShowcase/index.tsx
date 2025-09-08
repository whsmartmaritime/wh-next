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
  if (!logos.length) return null

  // Chia logos thành 2 sets: hiển thị (6 đầu) và ẩn (6 sau)
  const visibleLogos = logos.slice(0, 6)
  const hiddenLogos = logos.slice(6, 12)
  
  // Tạo animation cycle: mỗi ô sẽ cycle giữa visible và hidden logo
  const createLogoCell = (visibleLogo: LogoItem, hiddenLogo: LogoItem | undefined, slotIndex: number) => {
    const animationDelay = slotIndex * 15 // Mỗi ô delay 15s
    const showCrosshair = slotIndex === 0 || slotIndex === 5
    const crosshairClass = slotIndex === 0 
      ? "absolute w-3 h-3 text-white/40 top-0 right-0 -translate-y-1/2 translate-x-1/2 z-10"
      : "absolute w-3 h-3 text-white/40 bottom-0 left-0 translate-y-1/2 -translate-x-1/2 z-10"

    return (
      <div key={`slot-${slotIndex}`} className="relative">
        <div className="relative aspect-square border border-white/10 flex items-center justify-center p-4 md:p-8 overflow-hidden group hover:bg-white/5 transition-colors duration-500">
          
          {/* Visible logo - hiển thị đầu tiên */}
          <div 
            className="absolute inset-0 flex items-center justify-center p-4 md:p-8"
            style={{
              animation: hiddenLogo ? `logo-swap 180s infinite ${animationDelay}s` : undefined,
              animationFillMode: 'both'
            }}
          >
            <div className="relative w-full h-full group-hover:scale-95 transition-transform duration-1000">
              <Image
                src={visibleLogo.src}
                alt={visibleLogo.alt || visibleLogo.name || 'Partner logo'}
                fill
                className="object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
            </div>
          </div>

          {/* Hidden logo - hiển thị sau 90s */}
          {hiddenLogo && (
            <div 
              className="absolute inset-0 flex items-center justify-center p-4 md:p-8 opacity-0"
              style={{
                animation: `logo-swap-alt 180s infinite ${animationDelay}s`,
                animationFillMode: 'both'
              }}
            >
              <div className="relative w-full h-full group-hover:scale-95 transition-transform duration-1000">
                <Image
                  src={hiddenLogo.src}
                  alt={hiddenLogo.alt || hiddenLogo.name || 'Partner logo'}
                  fill
                  className="object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
              </div>
            </div>
          )}

          {/* Scanline effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
        </div>
        
        {/* Crosshair */}
        {showCrosshair && <CrosshairIcon className={crosshairClass} />}
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <style jsx>{`
        @keyframes logo-swap {
          0%, 45% { opacity: 1; }
          50%, 95% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes logo-swap-alt {
          0%, 45% { opacity: 0; }
          50%, 95% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
      
      <div className="grid grid-cols-4 lg:grid-cols-8 gap-0 mx-auto">
        {/* Empty slot */}
        <div className="aspect-square invisible" />
        
        {/* 6 logo slots với rotation */}
        {visibleLogos.map((visibleLogo, index) => 
          createLogoCell(visibleLogo, hiddenLogos[index], index)
        )}
        
        {/* Empty slot */}
        <div className="aspect-square invisible" />
      </div>
    </div>
  )
}

export default LogoShowcase
