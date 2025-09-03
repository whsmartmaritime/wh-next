import React, { Suspense } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
  style?: React.CSSProperties
  videoSrc?: string
  enableCrtEffect?: boolean
}

export const BackgroundAnimation: React.FC<Props> = ({
  className,
  style,
  videoSrc = "/images/glass-animation.mp4",
  enableCrtEffect = true
}: Props) => {
  return (
    <div
      className={cn(
        'absolute inset-0 pointer-events-none',
        'z-0 bg-black', // Background layer - lowest level  
        className
      )}
      style={style}
    >
      {/* Video Background */}
      <Suspense fallback={<div className="absolute inset-0 bg-black" />}>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          src={videoSrc}
          className="w-full h-full object-cover opacity-0 animate-[fadeIn_2s_ease-in-out_forwards]"
        />
      </Suspense>
      
      {/* CRT Effect Overlay */}
      {enableCrtEffect && (
        <div 
          className="absolute inset-0 z-10 bg-repeat bg-center mix-blend-multiply"
          style={{
            backgroundImage: "url('/images/crt.gif')",
            backgroundSize: '256px'
          }}
        />
      )}
      
      {/* Inner Shadow Vignette */}
      <div 
        className="absolute inset-0"
        style={{
          boxShadow: 'inset 0 100px 120px 100px black'
        }}
      />
    </div>
  )
}

export default BackgroundAnimation
