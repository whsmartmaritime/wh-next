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
    // Chỉ chạy animation nếu có ít nhất 7 logo (6 hiển thị + 1 để thay thế)
    if (!logoStates.length || logos.length <= 6) return

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
      }, 1000)

      // Bước 3: Thay đổi logo và ẩn scanline sau 400ms nữa
      setTimeout(() => {
        setLogoStates(prev => {
          const newStates = [...prev]
          const oldLogo = newStates[randomIndex].logo
          
          // Tìm logo thay thế: ưu tiên từ remainingLogos, nếu không có thì random từ tất cả logos
          const availableLogos = remainingLogos.length > 0 
            ? [remainingLogos[0]]
            : logos.filter(logo => logo.id !== oldLogo.id)
          
          const newLogo = availableLogos[Math.floor(Math.random() * availableLogos.length)]
          
          // Cập nhật logo mới
          newStates[randomIndex] = {
            logo: newLogo,
            isVisible: true,
            showScanline: false
          }
          
          return newStates
        })

        // Cập nhật remainingLogos queue
        setRemainingLogos(prev => {
          const currentOldLogo = logoStates[randomIndex]?.logo
          if (!currentOldLogo) return prev
          
          if (prev.length > 0) {
            // Xóa logo đã dùng và thêm logo cũ vào cuối
            return [...prev.slice(1), currentOldLogo]
          } else {
            // Reset queue với tất cả logos trừ những logo đang hiển thị
            return logos.filter(logo => 
              !logoStates.some(logoState => logoState.logo.id === logo.id) ||
              logo.id === currentOldLogo.id
            )
          }
        })
      }, 2000)

    }, 5000) // Interval 5 giây

    return () => clearInterval(interval)
  }, [logoStates, remainingLogos, logos])

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
                    // Viền trên cho ô đầu tiên của hàng dưới
                    (index === 0 ? 'border-t border-white/10 dark:border-white/10 ' : '') +
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
      {/* Mobile: góc trên trái của ô đầu tiên hàng trên (ở phía phải) và góc dưới phải của ô cuối cùng hàng dưới (ở phía trái) */}
      <div className="lg:hidden absolute w-3 h-3" 
        style={{
          top: '-12px',
          right: 'calc(var(--column) * 9)'
        }} 
      >
        <CrosshairIcon className="w-3 h-3 text-white/40" />
      </div>
      <div className="lg:hidden absolute w-3 h-3"
        style={{
          bottom: '0px', 
          right: 'calc(var(--column) * 3)'
        }}
      >
        <CrosshairIcon className="w-3 h-3 text-white/40" />
      </div>
      
      {/* Desktop: góc trên trái của ô đầu tiên và góc dưới phải của ô cuối cùng (grid centered) */}
      <div className="hidden lg:block absolute w-3 h-3"
        style={{
          top: '-12px',
          right: 'calc(var(--column) * 9)'
        }}
      >
        <CrosshairIcon className="w-3 h-3 text-white/40" />
      </div>
      <div className="hidden lg:block absolute w-3 h-3"
        style={{
          bottom: '0px',
          right: 'calc( var(--column) * 3)'
        }}
      >
        <CrosshairIcon className="w-3 h-3 text-white/40" />
      </div>
    </div>
  )
}

interface LogoCellProps {
  state: LogoState
  className?: string
}

const LogoCell: React.FC<LogoCellProps> = ({ state, className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center p-16 ${className}`}>
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

      {/* Scanline overlay - với hiệu ứng rõ ràng hơn */}
      {state.showScanline && (
        <div className="absolute inset-0 z-10">
          <BackgroundScanline 
            className="w-full h-full opacity-60"
            scanlineImage="/images/scanline-dark.png"
          />
          {/* Thêm lớp hiệu ứng scanline bổ sung */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-pulse" />
        </div>
      )}
    </div>
  )
}

export default LogoShowcase
