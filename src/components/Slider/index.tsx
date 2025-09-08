import React from 'react'
import Image from 'next/image'

export type SliderImage = {
  src: string
  alt: string
}

interface SliderProps {
  images: {
    src: string
    alt: string
  }[]
  intervalSeconds?: number
  aspectRatio?: string
  className?: string
}

export default function Slider({ 
  images, 
  intervalSeconds = 4,
  aspectRatio = "25/10",
  className = ""
}: SliderProps) {
  return (
    <div 
      className={`relative w-full overflow-hidden bg-gray-100 ${className}`}
      style={{ aspectRatio: aspectRatio }}
    >
      
      {/* Images */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0"
            style={{
              opacity: index === 0 ? 1 : 0,
              animation: `slideShow ${images.length * intervalSeconds}s infinite`,
              animationDelay: `${index * intervalSeconds}s`
            }}
          >
            <Image 
              src={image.src} 
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className="w-3 h-3 rounded-full bg-white/50"
            style={{
              opacity: index === 0 ? 1 : 0.5,
              animation: `dotShow ${images.length * intervalSeconds}s infinite`,
              animationDelay: `${index * intervalSeconds}s`
            }}
          />
        ))}
      </div>
      
      {/* Inline styles for keyframes */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slideShow {
            0%, ${(100 / images.length) * 0.8}% { opacity: 1; }
            ${100 / images.length}%, 100% { opacity: 0; }
          }
          
          @keyframes dotShow {
            0%, ${(100 / images.length) * 0.8}% { opacity: 1; transform: scale(1.2); }
            ${100 / images.length}%, 100% { opacity: 0.5; transform: scale(1); }
          }
        `
      }} />
    </div>
  )
}