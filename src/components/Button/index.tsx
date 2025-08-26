"use client";
import * as React from 'react';
import ArrowIcon from '../icons/ArrowIcon';

export type SvgCTAProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  className?: string;
  arrowRotation?: number;
  size?: 'default' | 'large';
};

// Content-based sizing like sample Button: fixed height with padding
// Transparent by default. Hover: light -> black bg with white text; dark -> white bg with black text
export const SvgCTA: React.FC<SvgCTAProps> = ({ children, href, onClick, className, arrowRotation = 0, size = 'default' }) => {
  // Height/padding like sample: default ~2.5rem, large ~3rem
  const sizeClasses =
    size === 'large'
      // Mobile ~44px, md ~48px, lg ~56px. Padding scales up for roomy hero feel
      ? 'h-11 px-5 md:h-12 md:px-6 lg:h-14 lg:px-8'
      // Default: base 40px, md 44px
      : 'h-10 px-4 md:h-11 md:px-5';

  // Base: subtle border, smooth color/border/transform transitions, no radius
  const base = [
  'group relative inline-flex items-center justify-center rounded-none bg-transparent',
    'text-current',
    'border border-black/20 dark:border-white/20 group-data-[theme=dark]:border-white/20',
    'transition-[color,background-color,border-color,transform] duration-200 ease-out will-change-transform',
    sizeClasses,
  ].join(' ');

  // Hover: invert colors, strengthen border, and add a tiny lift
  const hover = [
    'hover:bg-black hover:text-white hover:border-black',
    'dark:hover:bg-white dark:hover:text-black dark:hover:border-white',
    'group-data-[theme=dark]:hover:bg-white group-data-[theme=dark]:hover:text-black group-data-[theme=dark]:hover:border-white',
    'hover:-translate-y-0.5 active:translate-y-0',
  ].join(' ');

  const focus = 'focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-black dark:focus:ring-white group-data-[theme=dark]:focus:ring-white';

  const classes = [base, hover, focus, className].filter(Boolean).join(' ');

  const paddingRight =
    size === 'large'
      ? 'pr-12 md:pr-12 lg:pr-16'
      : 'pr-10 md:pr-12';
  const arrowRight =
    size === 'large'
      ? 'right-2 md:right-3 lg:right-4'
      : 'right-2 md:right-3';

  const content = (
    <>
      <span className={["font-medium leading-none", paddingRight].join(' ')}>{children}</span>
      <span className={["pointer-events-none absolute inset-y-0 flex items-center", arrowRight].join(' ')}>
        <ArrowIcon
          className="shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1.5"
          size={size === 'large' ? 'large' : 'medium'}
          rotation={arrowRotation}
        />
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {content}
    </button>
  );
};

export default SvgCTA;
