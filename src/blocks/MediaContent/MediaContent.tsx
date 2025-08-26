import Image from 'next/image'
import * as React from 'react'

export type Media = {
  src: string
  alt: string
  description?: string
  priority?: boolean
  width?: number
  height?: number
}

export type MediaContentProps = {
  title: React.ReactNode
  body: React.ReactNode
  side?: 'media-left' | 'media-right'
  ratio?: '1-2' | '1-1' | '2-1'
  media: Media
  stretch?: 'left' | 'right' | 'none'
  showBackgroundGrid?: boolean
  className?: string
}

const ratioToSpans = (ratio: NonNullable<MediaContentProps['ratio']>, side: NonNullable<MediaContentProps['side']>) => {
  const map: Record<'1-2' | '1-1' | '2-1', { media: string; text: string }> = {
    '1-2': { media: 'lg:col-span-4', text: 'lg:col-span-8' },
    '1-1': { media: 'lg:col-span-6', text: 'lg:col-span-6' },
    '2-1': { media: 'lg:col-span-8', text: 'lg:col-span-4' },
  }
  const spans = map[ratio]
  // Ordering on desktop
  const mediaOrder = side === 'media-right' ? 'lg:order-2' : 'lg:order-1'
  const textOrder = side === 'media-right' ? 'lg:order-1' : 'lg:order-2'
  return {
    media: `${spans.media} ${mediaOrder}`,
    text: `${spans.text} ${textOrder}`,
  }
}

export const MediaContent: React.FC<MediaContentProps> = ({
  title,
  body,
  side = 'media-left',
  ratio = '1-1',
  media,
  stretch = 'none',
  showBackgroundGrid = false,
  className,
}) => {
  const spans = ratioToSpans(ratio, side)
  const isSVG = media.src?.toLowerCase().endsWith('.svg')

  // Stretch variants similar to sample (push media to edges)
  const stretchClass =
    stretch === 'left'
      ? 'lg:mr-[-var(--gutter-h)]'
      : stretch === 'right'
      ? 'lg:ml-[-var(--gutter-h)]'
      : ''

  return (
    <section className={["relative py-block", className].filter(Boolean).join(' ')}>
      {showBackgroundGrid && (
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
          {/* Simple background lines using gradient as a lightweight alternative */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0,transparent_calc(var(--gutter-h)),var(--theme-border-color)_calc(var(--gutter-h)),var(--theme-border-color)_calc(var(--gutter-h)+1px),transparent_calc(var(--gutter-h)+1px))] bg-[length:calc(var(--column)),1px]" />
        </div>
      )}

      <div className="container-gutter grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10">
        {/* Media */}
        <div className={["order-1", spans.media].join(' ')}>
          <div className={["w-full overflow-hidden rounded-lg ring-1 ring-[var(--theme-border-color)]", stretchClass].join(' ')}>
            {isSVG ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={media.src} alt={media.alt} className="block h-auto w-full" />
            ) : (
              <Image
                src={media.src}
                alt={media.alt}
                width={media.width ?? 1600}
                height={media.height ?? 900}
                className="h-auto w-full object-cover"
                priority={media.priority}
              />
            )}
          </div>
          {media.description && (
            <p className="mt-3 text-sm text-black/60 dark:text-white/70">{media.description}</p>
          )}
        </div>

        {/* Text */}
        <div className={["order-2", spans.text].join(' ')}>
          <div className="flex flex-col gap-3 lg:gap-4">
            <h3 className="font-semibold leading-tight tracking-tight">{title}</h3>
            <div className="text-base leading-relaxed text-black/80 dark:text-white/80">{body}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MediaContent
