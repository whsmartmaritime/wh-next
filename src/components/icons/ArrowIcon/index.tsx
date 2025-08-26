import * as React from 'react'

export type ArrowIconProps = {
  className?: string
  size?: 'small' | 'medium' | 'large' | number
  rotation?: number // degrees
}

const sizeToPx = (size: ArrowIconProps['size']) => {
  if (typeof size === 'number') return size
  switch (size) {
    case 'small':
      return 12
    case 'large':
      return 20
    case 'medium':
    default:
      return 16
  }
}

const ArrowIcon: React.FC<ArrowIconProps> = ({ className, size = 'medium', rotation = 0 }) => {
  const px = sizeToPx(size)
  return (
    <span style={{ display: 'inline-flex', transform: `rotate(${rotation}deg)` }}>
      <svg
        className={className}
        width={px}
        height={px}
        viewBox="0 0 14 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
      >
        <path d="M2.20117 0.5L12.7615 0.5V11.06" />
        <path d="M0.759766 12.5L12.7601 0.5" />
      </svg>
    </span>
  )
}

export default ArrowIcon
