import React from 'react'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
  ignoreGutter?: boolean
  style?: React.CSSProperties
  zLevel?: 'far' | 'mid' | 'near' // Semantic z-index levels
  fadeTop?: boolean // Simple fade effect như sample hero
}

export const BackgroundGrid: React.FC<Props> = ({
  className,
  ignoreGutter,
  style,
  zLevel = 'mid', // Default to z-background-mid level
  fadeTop = false,
}: Props) => {
  // Z-index class mapping
  const zIndexClass = `z-background-${zLevel}`

  // Generate vertical grid lines (like sample)
  // Sample: 5 lines at positions 1/1, 1/5, 1/9, 1/13, 1/17 (16-col grid)
  // Convert to 12-col: 1/1, 1/4, 1/7, 1/10, 1/13 (approximately same positions)
  const gridLines = [
    { gridArea: '1/1/1/1' }, // Left edge
    { gridArea: '1/4/1/4' }, // ~25%
    { gridArea: '1/7/1/7' }, // ~50%  
    { gridArea: '1/10/1/10' }, // ~75%
    { gridArea: '1/13/1/13' }, // Right edge
  ];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute top-0 h-full pointer-events-none select-none grid grid-cols-12",
        ignoreGutter ? "left-0 w-full" : "left-gutter w-[calc(100%-var(--gutter-h)*2)]",
        zIndexClass, // Use semantic z-index class
        className
      )}
      style={style}
    >
      {gridLines.map((line, index) => (
        <div
          key={index}
          className={cn(
            "w-px bg-[var(--theme-border-color)]",
            // Responsive visibility like sample
            index === 1 ? "hidden lg:block" : undefined, // 2nd line hidden on small
            index === 2 ? "hidden md:block" : undefined, // 3rd line hidden on mobile  
            index === 3 ? "hidden lg:block" : undefined, // 4th line hidden on small
            // Fade effect
            fadeTop ? "[mask:linear-gradient(to_bottom,transparent_0px,black_50vh)] [-webkit-mask:linear-gradient(to_bottom,transparent_0px,black_50vh)]" : undefined
          )}
          style={{ gridArea: line.gridArea }}
        />
      ))}
    </div>
  )
}

export default BackgroundGrid
