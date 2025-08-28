import React, { Suspense } from 'react'

type BackgroundGradientProps = {
  className?: string
}

// Simple className utility
const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ')

export default function BackgroundGradient({ className }: BackgroundGradientProps) {
  return (
    <div 
      className={cn(
        // Base layout
        "fixed inset-0 z-0 max-h-screen pointer-events-none bg-black",
        // Before pseudo-element: CRT texture overlay
        "before:absolute before:inset-0 before:z-10",
        "before:bg-repeat before:bg-center before:bg-[url('/images/crt.gif')]", 
        "before:bg-[length:256px] before:mix-blend-multiply",
        // After pseudo-element: Inner shadow vignette
        "after:absolute after:inset-0", 
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
