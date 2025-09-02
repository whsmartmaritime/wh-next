import React, { Suspense } from 'react'
import { cn } from '@/lib/utils'

type BackgroundGradientProps = {
  className?: string
}

export default function BackgroundGradient({ className }: BackgroundGradientProps) {
  return (
    <div 
      className={cn(
        // Base layout - positioned within parent container only
        "absolute inset-0 z-background-far pointer-events-none bg-black",
        // Before pseudo-element: CRT texture overlay
        "before:absolute before:inset-0 before:z-[1]",
        "before:bg-repeat before:bg-center before:bg-[url('/images/crt.gif')]", 
        "before:bg-[length:256px] before:mix-blend-multiply before:opacity-30",
        // After pseudo-element: Inner shadow vignette
        "after:absolute after:inset-0 after:z-[2]", 
        "after:shadow-[inset_0_100px_120px_100px_black]",
        className
      )}
    >
      <Suspense>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          src="/images/glass-animation.mp4"
          className={cn(
            "w-full h-full object-cover",
            "opacity-0 animate-[fadeIn_2s_ease-in-out_forwards]"
          )}
        />
      </Suspense>
    </div>
  )
}
