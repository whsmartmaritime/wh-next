import React from 'react'
import './styles.css'

type GridLineStyles = { [index: number]: React.CSSProperties }

type Props = {
  className?: string
  gridLineStyles?: GridLineStyles
  ignoreGutter?: boolean
  style?: React.CSSProperties
  wideGrid?: boolean
  zIndex?: number
  fadeTop?: boolean // Simple fade effect như sample hero
}

const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ')

export const BackgroundGrid: React.FC<Props> = ({
  className,
  gridLineStyles = {},
  ignoreGutter,
  style,
  wideGrid = false,
  zIndex = -1,
  fadeTop = false,
}: Props) => {
  // Grid lines: 5 normal, 4 wide (adapt sample to 12-col)
  const lines = wideGrid ? 4 : 5
  
  // 12-col positions equivalent to sample 16-col percentages
  const positions = wideGrid 
    ? ['1/1', '1/3', '1/11', '1/13']           // 0%, ~17%, ~83%, 100%
    : ['1/1', '1/4', '1/7', '1/10', '1/13']   // 0%, 25%, 50%, 75%, 100%
  
  const visibility = wideGrid
    ? ['', 'lg:block hidden', 'lg:block hidden', '']                    // wide
    : ['', 'lg:block hidden', 'md:block hidden', 'lg:block hidden', ''] // normal

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute top-0 h-full pointer-events-none select-none grid background-grid",
        ignoreGutter ? "left-0 w-full" : "left-gutter w-[calc(100%-var(--gutter-h)*2)]",
        fadeTop ? "fade-top" : undefined, // Thêm class cho fade effect
        className
      )}
      style={{ ...style, zIndex }}
    >
      {Array.from({ length: lines }, (_, i) => (
        <div
          key={i}
          className={cn(
            "w-px bg-[var(--theme-border-color)] grid-line", // Luôn có background
            visibility[i]
          )}
          style={{ gridArea: positions[i], ...(gridLineStyles[i] || {}) }}
        />
      ))}
    </div>
  )
}

export default BackgroundGrid
