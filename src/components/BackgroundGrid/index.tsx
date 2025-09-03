import React from 'react'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
  ignoreGutter?: boolean
  gradient?: boolean // Gradient effect cho Hero
}

export const BackgroundGrid: React.FC<Props> = ({
  className,
  ignoreGutter = false,
  gradient = false
}: Props) => {
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
    >
      {gridLines.map((line) => (
        <div
          key={line.key}
          className={cn(
            'absolute top-0 bottom-0 w-px',
            // Responsive visibility for mobile
            line.responsive && 'hidden md:block',
            // Color - gradient hoặc solid
            gradient 
              ? 'bg-gradient-to-b from-transparent via-white/20 to-white/20'
              : 'bg-white/20'
          )}
          style={{ left: line.left }}
        />
      ))}
    </div>
  )
}

export default BackgroundGrid
