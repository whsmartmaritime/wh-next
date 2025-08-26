import React from 'react'

import classes from './index.module.scss'

type GridLineStyles = {
  [index: number]: React.CSSProperties
}

type Props = {
  className?: string
  gridLineStyles?: GridLineStyles
  ignoreGutter?: boolean
  style?: React.CSSProperties
  wideGrid?: boolean
  zIndex?: number
  columns?: number // ép số cột (mặc định 12)
}

export const BackgroundGrid: React.FC<Props> = ({
  className,
  gridLineStyles = {},
  ignoreGutter,
  style,
  wideGrid = false,
  zIndex = 0,
  columns = 12, // dùng 12 cột
}: Props) => {
  // 4 segment trên 12 cột => mỗi segment span 3 track
  const segments = 4
  const cellSpan = Math.floor(columns / segments) // 12/4 = 3

  return (
    <div
      aria-hidden="true"
      className={[
        classes.backgroundGrid,
        'grid',
        'background-grid',
        ignoreGutter && classes.ignoreGutter,
        className,
        // wideGrid của sample dành cho 16-col, bỏ qua để tránh lệch
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        ...style,
        zIndex,
        // ép grid 12 cột, ghi đè SCSS
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: segments }).map((_, index) => (
        <div
          key={index}
          className={classes.column}
          // mỗi “ô” chiếm 3 track để đặt vạch ở 0,3,6,9
          style={{ gridColumn: `span ${cellSpan} / span ${cellSpan}`, ...(gridLineStyles[index] || {}) }}
        />
      ))}

      {/* vẽ vạch biên phải (cột 12) để luôn thấy vạch cuối */}
      <span
        className="absolute right-0 top-0 h-full w-px bg-[rgba(0,0,0,0.08)] dark:bg-[rgba(255,255,255,0.18)]"
        style={gridLineStyles[segments] || {}}
      />
    </div>
  )
}

export default BackgroundGrid
