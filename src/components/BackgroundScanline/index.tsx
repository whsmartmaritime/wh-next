import { CrosshairIcon } from '@/components/icons/CrosshairIcon/index'
import React from 'react'
import { cn } from '@/lib/utils'

type CrosshairPosition = 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right'

interface Props {
  className?: string
  crosshairs?: 'all' | CrosshairPosition[]
  enableBorders?: boolean
  style?: React.CSSProperties
}

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
        className={cn(
          "absolute inset-[1px] w-[calc(100%-2px)] h-[calc(100%-2px)] bg-repeat box-border",
          // Theme-responsive scanline background
          "bg-[url('/images/scanline-dark.png')] opacity-[0.08]",
          "[data-theme='dark']_&:bg-[url('/images/scanline-light.png')] [data-theme='dark']_&:opacity-[0.1]"
        )}
      />
      
      {/* Crosshairs */}
      {crosshairs && (
        <>
          {(crosshairs === 'all' || crosshairs.includes('top-left')) && (
            <CrosshairIcon
              className={cn(
                "absolute w-4 h-auto opacity-50 z-[1] -top-2 -left-2",
                // Theme-responsive colors
                "text-[var(--theme-elevation-1000)]",
                "[data-theme='light']_&:text-[var(--theme-elevation-400)]"
              )}
            />
          )}

          {(crosshairs === 'all' || crosshairs.includes('bottom-left')) && (
            <CrosshairIcon
              className={cn(
                "absolute w-4 h-auto opacity-50 z-[1] -bottom-2 -left-2",
                // Theme-responsive colors
                "text-[var(--theme-elevation-1000)]",
                "[data-theme='light']_&:text-[var(--theme-elevation-400)]"
              )}
            />
          )}

          {(crosshairs === 'all' || crosshairs.includes('top-right')) && (
            <CrosshairIcon
              className={cn(
                "absolute w-4 h-auto opacity-50 z-[1] -top-2 -right-2",
                // Theme-responsive colors
                "text-[var(--theme-elevation-1000)]",
                "[data-theme='light']_&:text-[var(--theme-elevation-400)]"
              )}
            />
          )}

          {(crosshairs === 'all' || crosshairs.includes('bottom-right')) && (
            <CrosshairIcon
              className={cn(
                "absolute w-4 h-auto opacity-50 z-[1] -bottom-2 -right-2",
                // Theme-responsive colors
                "text-[var(--theme-elevation-1000)]",
                "[data-theme='light']_&:text-[var(--theme-elevation-400)]"
              )}
            />
          )}
        </>
      )}
    </div>
  )
}
