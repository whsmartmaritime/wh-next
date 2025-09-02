import React from 'react'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
  style?: React.CSSProperties
  ignoreGutter?: boolean
  lineColor?: string
  opacity?: number
  debug?: boolean // Debug mode với màu rõ ràng
}

export const BackgroundGrid: React.FC<Props> = ({
  className,
  style,
  ignoreGutter = false,
  lineColor = 'white',
  opacity = 0.2,
  debug = false
}: Props) => {
  // Debug mode override
  const finalColor = debug ? 'red' : lineColor
  const finalOpacity = debug ? 1 : opacity
  // Grid lines cho hệ 12 cột - 5 đường kẻ dọc
  // Chia đều: 0%, 25%, 50%, 75%, 100%
  const gridLines = [
    { left: '0%', key: 'col-0', responsive: false },      // Cột 0 (bên trái)
    { left: '25%', key: 'col-3', responsive: true },      // Cột 3 (1/4)
    { left: '50%', key: 'col-6', responsive: false },     // Cột 6 (center)
    { left: '75%', key: 'col-9', responsive: true },      // Cột 9 (3/4)
    { left: '100%', key: 'col-12', responsive: false }    // Cột 12 (bên phải)
  ]

  return (
    <div
      aria-hidden="true"
      className={cn(
        'absolute top-0 h-full pointer-events-none select-none',
        'z-10', // Grid layer - above video, below scanline
        ignoreGutter 
          ? 'left-0 w-full' 
          : 'left-[var(--gutter-h)] w-[calc(100%-var(--gutter-h)*2)]',
        className
      )}
      style={style}
    >
      {gridLines.map((line) => (
        <div
          key={line.key}
          className={cn(
            'absolute top-0 bottom-0 w-px',
            // Responsive visibility for mobile
            line.responsive && 'hidden md:block'
          )}
          style={{ 
            left: line.left,
            backgroundColor: finalColor,
            opacity: finalOpacity
          }}
        />
      ))}
    </div>
  )
}

export default BackgroundGrid
