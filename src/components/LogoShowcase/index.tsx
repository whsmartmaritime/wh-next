'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { BackgroundScanline } from '@/components/BackgroundScanline'
import { CrosshairIcon } from '@/components/icons/CrosshairIcon'

interface LogoItem {
  id: string
  src: string
  name?: string
  alt?: string
}

interface LogoState {
  logo: LogoItem
  isVisible: boolean
  showScanline: boolean
}

interface LogoShowcaseProps {
  logos: LogoItem[]
  className?: string
}

export const LogoShowcase: React.FC<LogoShowcaseProps> = ({ logos, className = '' }) => {
  const [logoStates, setLogoStates] = useState<LogoState[]>([])
  const [remainingLogos, setRemainingLogos] = useState<LogoItem[]>([])

  // Khởi tạo 6 logo đầu tiên
  useEffect(() => {
    if (logos && logos.length > 0) {
      const initialLogos = logos.slice(0, 6)
      const remaining = logos.slice(6)
      
      setLogoStates(
        initialLogos.map(logo => ({
          logo,
          isVisible: true,
          showScanline: false
        }))
      )
      setRemainingLogos(remaining)
    }
  }, [logos])

  // Logic animation thay đổi logo
  useEffect(() => {
    if (!logoStates.length || remainingLogos.length === 0) return

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * 6)
      
      // Bước 1: Làm mờ logo hiện tại
      setLogoStates(prev => 
        prev.map((state, index) => 
          index === randomIndex 
            ? { ...state, isVisible: false }
            : state
        )
      )

      // Bước 2: Hiển thị scanline sau 800ms
      setTimeout(() => {
        setLogoStates(prev => 
          prev.map((state, index) => 
            index === randomIndex 
              ? { ...state, showScanline: true }
              : state
          )
        )
      }, 800)

      // Bước 3: Thay đổi logo và ẩn scanline sau 400ms nữa
      setTimeout(() => {
        const oldLogo = logoStates[randomIndex].logo
        const newLogo = remainingLogos[0]
        
        setLogoStates(prev => {
          const newStates = [...prev]
          
          // Cập nhật state
          newStates[randomIndex] = {
            logo: newLogo,
            isVisible: true,
            showScanline: false
          }
          
          return newStates
        })

        // Cập nhật danh sách logo còn lại
        setRemainingLogos(prev => {
          const newRemaining = [...prev.slice(1)]
          newRemaining.push(oldLogo)
          return newRemaining
        })
      }, 1200)

    }, 3000) // Interval 3 giây

    return () => clearInterval(interval)
  }, [logoStates, remainingLogos])

  if (!logoStates.length) return null

  return (
    <div className={`relative ${className}`}>
      {/* Grid container */}
      <div className="relative">
        {/* Mobile layout: 2 hàng x 3 cột, mỗi ô 3 cột theo hệ --column */}
        <div className="lg:hidden">
          {/* Hàng trên: 3 ô sát bên phải */}
          <div className="flex justify-end mb-0">
            <div className="grid grid-cols-3 gap-0">
              {logoStates.slice(0, 3).map((state, index) => (
                <LogoCell
                  key={`mobile-top-${index}`}
                  state={state}
                  className={`w-[calc(var(--column)*3)] aspect-square ${
                    // Viền trên cho hàng đầu
                    'border-t border-white/10 dark:border-white/10 ' +
                    // Viền dưới cho tất cả
                    'border-b border-white/10 dark:border-white/10 ' +
                    // Viền trái chỉ cho ô đầu tiên
                    (index === 0 ? 'border-l border-white/10 dark:border-white/10 ' : '') +
                    // Viền phải cho tất cả
                    'border-r border-white/10 dark:border-white/10'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Hàng dưới: 3 ô sát bên trái và sát với hàng trên */}
          <div className="flex justify-start">
            <div className="grid grid-cols-3 gap-0">
              {logoStates.slice(3, 6).map((state, index) => (
                <LogoCell
                  key={`mobile-bottom-${index}`}
                  state={state}
                  className={`w-[calc(var(--column)*3)] aspect-square ${
                    // Viền dưới cho hàng cuối
                    'border-b border-white/10 dark:border-white/10 ' +
                    // Viền trái cho tất cả
                    'border-l border-white/10 dark:border-white/10 ' +
                    // Viền phải chỉ cho ô cuối cùng
                    (index === 2 ? 'border-r border-white/10 dark:border-white/10 ' : '')
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop layout: 1 hàng x 6 cột, mỗi ô 1.5 cột theo hệ --column */}
        <div className="hidden lg:flex justify-center">
          <div className="grid grid-cols-6 gap-0">
            {logoStates.map((state, index) => (
              <LogoCell
                key={`desktop-${index}`}
                state={state}
                className={`w-[calc(var(--column)*1.5)] aspect-square ${
                  // Viền trên và dưới cho tất cả
                  'border-t border-b border-white/10 dark:border-white/10 ' +
                  // Viền trái chỉ cho ô đầu tiên
                  (index === 0 ? 'border-l border-white/10 dark:border-white/10 ' : '') +
                  // Viền phải cho tất cả
                  'border-r border-white/10 dark:border-white/10'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Crosshair icons với vị trí chính xác */}
      {/* Mobile: góc trên trái ô 1 và góc dưới phải ô 6 */}
      <CrosshairIcon className="lg:hidden absolute top-0 right-[calc(var(--column)*9)] w-4 h-4 text-white/40 -translate-y-2 -translate-x-2" />
      <CrosshairIcon className="lg:hidden absolute bottom-0 left-[calc(var(--column)*3)] w-4 h-4 text-white/40 translate-y-2 translate-x-2" />
      
      {/* Desktop: góc trên phải ô 1 và góc dưới trái ô 6 */}
      <CrosshairIcon className="hidden lg:block absolute top-0 left-[calc(var(--column)*1.5)] w-4 h-4 text-white/40 -translate-y-2 translate-x-2" />
      <CrosshairIcon className="hidden lg:block absolute bottom-0 right-[calc(var(--column)*1.5)] w-4 h-4 text-white/40 translate-y-2 -translate-x-2" />
    </div>
  )
}

interface LogoCellProps {
  state: LogoState
  className?: string
}

const LogoCell: React.FC<LogoCellProps> = ({ state, className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center p-4 ${className}`}>
      {/* Logo image */}
      <div className={`relative w-full h-full transition-all duration-800 ${
        state.isVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-md'
      }`}>
        <Image
          src={state.logo.src}
          alt={state.logo.alt || state.logo.name || 'Partner logo'}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 25vw, 12.5vw"
        />
      </div>

      {/* Scanline overlay */}
      {state.showScanline && (
        <div className="absolute inset-0">
          <BackgroundScanline 
            className="w-full h-full"
            scanlineImage="/images/scanline-dark.png"
          />
        </div>
      )}
    </div>
  )
}

export default LogoShowcase
