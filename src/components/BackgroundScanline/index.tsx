import React from 'react'

type CrosshairPosition = 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right'

interface Props {
  className?: string
  style?: React.CSSProperties
  crosshairs?: 'all' | CrosshairPosition[]
  enableBorders?: boolean
  scanlineImage?: string
}

export const BackgroundScanline: React.FC<Props> = ({
  className,
  style,
  crosshairs,
  enableBorders = false,
  scanlineImage = '/images/scanline-dark.png'
}: Props) => {
  const CrosshairIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0v16M0 8h16" stroke="currentColor" strokeWidth="1"/>
    </svg>
  )

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none z-20 ${enableBorders ? 'border-t border-b border-[var(--theme-border-color)]' : ''} ${className || ''}`}
      style={style}
    >
      {/* Scanline Background Texture - Like sample */}
      <div 
        className="absolute top-px left-px w-[calc(100%-2px)] h-[calc(100%-2px)] bg-repeat opacity-[0.08] box-border"
        style={{
          backgroundImage: `url('${scanlineImage}')`,
        }}
      />
      
      {/* Crosshairs - Like sample */}
      {crosshairs && (
        <>
          {(crosshairs === 'all' || crosshairs.includes('top-left')) && (
            <div className="absolute w-4 h-4 -top-2 -left-2 text-[var(--theme-elevation-1000)] opacity-50 z-10">
              <CrosshairIcon />
            </div>
          )}

          {(crosshairs === 'all' || crosshairs.includes('bottom-left')) && (
            <div className="absolute w-4 h-4 -bottom-2 -left-2 text-[var(--theme-elevation-1000)] opacity-50 z-10">
              <CrosshairIcon />
            </div>
          )}

          {(crosshairs === 'all' || crosshairs.includes('top-right')) && (
            <div className="absolute w-4 h-4 -top-2 -right-2 text-[var(--theme-elevation-1000)] opacity-50 z-10">
              <CrosshairIcon />
            </div>
          )}

          {(crosshairs === 'all' || crosshairs.includes('bottom-right')) && (
            <div className="absolute w-4 h-4 -bottom-2 -right-2 text-[var(--theme-elevation-1000)] opacity-50 z-10">
              <CrosshairIcon />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default BackgroundScanline
