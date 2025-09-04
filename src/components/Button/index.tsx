"use client";
import * as React from 'react';
import ArrowIcon from '../icons/ArrowIcon';

export type SvgCTAProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  className?: string;
  arrowRotation?: number;
  theme?: 'light' | 'dark' | 'auto';
};

// Full container width button with flip hover effect like sample
export const SvgCTA: React.FC<SvgCTAProps> = ({ children, href, onClick, className, arrowRotation = 0, theme = 'auto' }) => {
  
  // Theme-based color classes
  const getThemeClasses = () => {
    switch (theme) {
      case 'light':
        return {
          border: 'border-t border-b border-black/20',
          focus: 'focus:ring-black',
          defaultText: 'text-black',
          defaultArrow: 'text-black',
          hoverBg: 'bg-black',
          hoverText: 'text-white',
          hoverArrow: 'text-white',
        };
      case 'dark':
        return {
          border: 'border-t border-b border-white/20',
          focus: 'focus:ring-white',
          defaultText: 'text-white',
          defaultArrow: 'text-white',
          hoverBg: 'bg-white',
          hoverText: 'text-black',
          hoverArrow: 'text-black',
        };
      default: // 'auto' - detect theme từ parent section
        return {
          border: 'border-t border-b border-black/20 [.theme-dark_&]:border-white/20 [.theme-dark-transparent_&]:border-white/20',
          focus: 'focus:ring-black [.theme-dark_&]:focus:ring-white [.theme-dark-transparent_&]:focus:ring-white',
          defaultText: 'text-black [.theme-dark_&]:text-white [.theme-dark-transparent_&]:text-white',
          defaultArrow: 'text-black [.theme-dark_&]:text-white [.theme-dark-transparent_&]:text-white',
          hoverBg: 'bg-black [.theme-dark_&]:bg-white [.theme-dark-transparent_&]:bg-white',
          hoverText: 'text-white [.theme-dark_&]:text-black [.theme-dark-transparent_&]:text-black',
          hoverArrow: 'text-white [.theme-dark_&]:text-black [.theme-dark-transparent_&]:text-black',
        };
    }
  };

  const themeClasses = getThemeClasses();
  // Base: full width, responsive height, border, overflow hidden for flip effect
  const base = [
    'group relative inline-flex w-full overflow-hidden',
    themeClasses.border,
    'transition-all duration-450 ease-[cubic-bezier(0.165,0.84,0.44,1)]',
    'h-16 md:h-16 lg:h-16 ', // responsive height
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    themeClasses.focus,
  ].join(' ');

  const classes = [base, className].filter(Boolean).join(' ');

  // Default label (visible by default, slides up on hover)
  const defaultLabel = (
    <div className="absolute inset-0 flex items-center justify-between px-4 md:px-6 lg:px-8 transition-transform duration-450 ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:-translate-y-full">
      <span className={`font-medium text-xl transition-transform duration-450 delay-150 ease-[cubic-bezier(0.165,0.84,0.44,1)] transform-origin-bottom-left group-hover:-rotate-3 ${themeClasses.defaultText}`}>
        {children}
      </span>
      <ArrowIcon
        className={`shrink-0 transition-transform duration-200 ease-out ${themeClasses.defaultArrow}`}
        rotation={arrowRotation}
      />
    </div>
  );

  // Hover label (hidden by default, slides down on hover) 
  const hoverLabel = (
    <div className={`absolute inset-0 flex items-center justify-between px-4 md:px-6 lg:px-8 ${themeClasses.hoverBg} ${themeClasses.hoverText} translate-y-full transition-transform duration-450 ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:translate-y-0`}>
      <span className={`font-medium text-xl rotate-3 transition-transform duration-450 delay-150 ease-[cubic-bezier(0.165,0.84,0.44,1)] transform-origin-bottom-left group-hover:rotate-0 ${themeClasses.hoverText}`}>
        {children}
      </span>
      <ArrowIcon
        className={`shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1 ${themeClasses.hoverArrow}`}
        rotation={arrowRotation}
      />
    </div>
  );

  const content = (
    <>
      {defaultLabel}
      {hoverLabel}
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