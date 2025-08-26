"use client";
import * as React from 'react';
import ArrowIcon from '../../icons/ArrowIcon';

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
  const sizeClasses =
    size === 'large'
      ? 'h-14 px-6 text-[2rem]'
      : 'h-10 px-4 text-base'; // 2.5rem height, 1rem horizontal padding
  const base = `inline-flex items-center justify-center gap-3 rounded-md bg-transparent transition-colors duration-200 ease-out text-current ${sizeClasses}`;
  const hover = `hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black`;
  const focus = `focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-black dark:focus:ring-white`;
  const classes = [base, hover, focus, className].filter(Boolean).join(' ');

  const content = (
    <>
      <span className="font-medium">{children}</span>
      <ArrowIcon className="shrink-0" size={size === 'large' ? 'large' : 'medium'} rotation={arrowRotation} />
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
