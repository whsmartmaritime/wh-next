import { CrosshairIcon } from '@/components/icons/CrosshairIcon/index'
import React from 'react'
import './styles.css'

type CrosshairPosition = 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right'

interface Props {
  className?: string
  crosshairs?: 'all' | CrosshairPosition[]
  enableBorders?: boolean
  style?: React.CSSProperties
}

const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ')

export const BackgroundScanline: React.FC<Props> = ({
  className,
  crosshairs,
  enableBorders,
  style,
}: Props) => {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 w-full h-full pointer-events-none",
        enableBorders ? "border-t border-b border-[var(--theme-border-color)]" : undefined,
        className
      )}
      style={style}
    >
      {/* Scanline background */}
      <div 
        className="absolute inset-[1px] w-[calc(100%-2px)] h-[calc(100%-2px)] bg-repeat box-border scanline-bg"
      />
      
      {/* Crosshairs */}
      {crosshairs && (
        <>
          {(crosshairs === 'all' || crosshairs.includes('top-left')) && (
            <CrosshairIcon
              className="absolute w-4 h-auto opacity-50 z-[1] -top-2 -left-2 crosshair-icon"
            />
          )}

          {(crosshairs === 'all' || crosshairs.includes('bottom-left')) && (
            <CrosshairIcon
              className="absolute w-4 h-auto opacity-50 z-[1] -bottom-2 -left-2 crosshair-icon"
            />
          )}

          {(crosshairs === 'all' || crosshairs.includes('top-right')) && (
            <CrosshairIcon
              className="absolute w-4 h-auto opacity-50 z-[1] -top-2 -right-2 crosshair-icon"
            />
          )}

          {(crosshairs === 'all' || crosshairs.includes('bottom-right')) && (
            <CrosshairIcon
              className="absolute w-4 h-auto opacity-50 z-[1] -bottom-2 -right-2 crosshair-icon"
            />
          )}
        </>
      )}
    </div>
  )
}
