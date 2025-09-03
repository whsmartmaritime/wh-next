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
  // Grid lines cho hệ 12 cột với responsive visibility
  const gridLines = [
    { left: '0%', key: 'col-0', responsive: 'always' },      // Cột 0 - luôn hiển thị
    { left: '25%', key: 'col-3', responsive: 'lg' },         // Cột 3 - từ lg trở lên
    { left: '50%', key: 'col-6', responsive: 'md' },         // Cột 6 - từ md trở lên
    { left: '75%', key: 'col-9', responsive: 'lg' },         // Cột 9 - từ lg trở lên  
    { left: '100%', key: 'col-12', responsive: 'always' }    // Cột 12 - luôn hiển thị
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
            // Responsive visibility
            line.responsive === 'always' && 'block',          // Luôn hiển thị (cột 0, 12)
            line.responsive === 'md' && 'hidden md:block',    // Từ md trở lên (cột 6)
            line.responsive === 'lg' && 'hidden lg:block',    // Từ lg trở lên (cột 3, 9)
            // Color - Tailwind standard dark mode classes
          gradient
            ? 'bg-gradient-to-b from-transparent via-neutral-200/20 to-neutral-200/20 dark:via-neutral-500/30 dark:to-neutral-500/30'
            : 'bg-neutral-200/20 dark:bg-neutral-500/30'
          )}
          style={{ left: line.left }}
        />
      ))}
    </div>
  )
}

export default BackgroundGrid
