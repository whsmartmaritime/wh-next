"use client";
 
import Image from 'next/image'
import Link from 'next/link'
import { BackgroundScanline } from '@/components/BackgroundScanline'
import { CrosshairIcon } from '@/components/icons/CrosshairIcon/index'
import React, { useEffect, useState } from 'react'

import classes from './index.module.scss'

export type LogoItem = { src: string; alt?: string; href?: string }

type Props = {
  logos: Array<LogoItem | string>
  title?: string
  basePath?: string
  className?: string
}

export const LogoShowcase: React.FC<Props> = ({ logos, title, basePath, className }) => {
  const [activeLogos, setActiveLogos] = useState<LogoItem[]>([])
  const [animatingIndex, setAnimatingIndex] = useState<null | number>(null)
  const [inactiveLogos, setInactiveLogos] = useState<LogoItem[]>([])

  useEffect(() => {
    if (logos && logos.length) {
      const normalizeSrc = (src: string) => {
        if (!basePath) return src
        const isAbsolute = src.startsWith('http') || src.startsWith('/')
        if (isAbsolute) return src
        const prefix = basePath.replace(/\/$/, '')
        const suffix = src.replace(/^\//, '')
        return `${prefix}/${suffix}`
      }

      const normalized: LogoItem[] = logos.map((l) => {
        if (typeof l === 'string') return { src: normalizeSrc(l) }
        // l is LogoItem here
        return { src: normalizeSrc(l.src), alt: l.alt, href: l.href }
      })
      const active = normalized.slice(0, 6)
      const inactive = normalized.slice(6)
      setActiveLogos(active)
      setInactiveLogos(inactive)
    }
  }, [logos, basePath])

  useEffect(() => {
    if (!logos || logos.length === 0 || logos.length <= 6) {
      return
    }

    const interval = setInterval(() => {
      const nextIndex = Math.floor(Math.random() * 6)
      setAnimatingIndex(nextIndex)
      setTimeout(() => swapLogo(nextIndex), 1000)
      setTimeout(() => setAnimatingIndex(null), 1500)
    }, 3000)

    return () => clearInterval(interval)
  })

  const swapLogo = (index: number) => {
    const newActive = [...activeLogos]
    const newInactive = [...inactiveLogos]

    if (!newInactive.length) return

    const newLogo = newInactive.shift() as LogoItem
    newInactive.push(newActive[index])
    newActive[index] = newLogo

    setActiveLogos(newActive)
    setInactiveLogos(newInactive)
  }

  return (
    <div className={[classes.logoGrid, className].filter(Boolean).join(' ')}>
      {title && (
        <div className="sr-only">{title}</div>
      )}
      {activeLogos.map((logo, index) => (
        <Cell active={animatingIndex} index={index} key={index} logo={logo} />
      ))}
      <CrosshairIcon className={classes.crosshairTop} />
      <CrosshairIcon className={classes.crosshairBottom} />
    </div>
  )
}

export const Cell = ({
  active,
  index,
  logo,
}: {
  active: null | number
  index: number
  logo: LogoItem
}) => {
  const isActive = active === index
  return (
    <div className={[isActive && classes.active, classes.logoItem].filter(Boolean).join(' ')}>
      {logo.href ? (
        <Link href={logo.href} aria-label={logo.alt || 'logo'} target="_blank" rel="noopener noreferrer">
          <Image
            src={logo.src}
            alt={logo.alt || logo.src.split('/').pop() || 'logo'}
            width={160}
            height={160}
            className={classes.logo}
          />
        </Link>
      ) : (
        <Image
          src={logo.src}
          alt={logo.alt || logo.src.split('/').pop() || 'logo'}
          width={160}
          height={160}
          className={classes.logo}
        />
      )}
      <BackgroundScanline className={classes.scanline} />
    </div>
  )
}

export default LogoShowcase
