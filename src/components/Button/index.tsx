"use client";
import * as React from 'react';
import ArrowIcon from '../icons/ArrowIcon';

export type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  className?: string;
  arrowRotation?: number;
  newTab?: boolean;  // Default false
  theme?: 'light' | 'dark' | 'auto'; // Thêm prop theme
};


// Button nhận theme qua prop, không tự detect nữa
const Button: React.FC<ButtonProps> = ({ 
  children, 
  href, 
  onClick, 
  className, 
  arrowRotation = 0, 
  newTab = false,
  theme = 'auto',
}) => {

  // Theme-based color classes
  const getThemeClasses = () => {
    switch (theme) {
      case 'light':
        return {
          border: 'border-t border-b border-black/20',
          focus: 'focus:ring-black',
          defaultText: 'text-black',
          defaultArrow: 'text-black',
          hoverText: 'text-white',
          hoverArrow: 'text-white',
          hoverBg: 'bg-black'
        };
      case 'dark':
        return {
          border: 'border-t border-b border-white/20',
          focus: 'focus:ring-white',
          defaultText: 'text-white',
          defaultArrow: 'text-white',
          hoverText: 'text-black',
          hoverArrow: 'text-black',
          hoverBg: 'bg-white'
        };
      case 'auto':
      default:
        return {
          border: 'border-t border-b border-border',
          focus: 'focus:ring-primary',
          defaultText: 'text-foreground',
          defaultArrow: 'text-foreground',
          hoverText: 'text-primary-foreground',
          hoverArrow: 'text-primary-foreground',
          hoverBg: 'bg-primary'
        };
    }
  };

  const themeClasses = getThemeClasses();

  // Base styling - let className control all sizing
  const base = [
    'group relative overflow-hidden cursor-pointer transition-all duration-450 ease-[cubic-bezier(0.165,0.84,0.44,1)]',
    themeClasses.border,
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    themeClasses.focus
  ].join(' ');

  // Combine base classes with custom className (className takes precedence for overrides)
  const classes = [base, className].filter(Boolean).join(' ');

  // Default label (visible by default, slides up on hover)
  const defaultLabel = (
    <div className="absolute inset-0 flex items-center justify-between px-4 md:px-6 lg:px-8 transition-transform duration-450 ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:-translate-y-full">
      <span className={`font-medium text-lg md:text-xl transition-transform duration-450 delay-150 ease-[cubic-bezier(0.165,0.84,0.44,1)] transform-origin-bottom-left group-hover:-rotate-3 ${themeClasses.defaultText}`}>
        {children}
      </span>
      <ArrowIcon 
        className={`w-5 h-5 transition-all duration-450 delay-75 ease-[cubic-bezier(0.165,0.84,0.44,1)] transform-origin-center ${themeClasses.defaultArrow}`}
        rotation={arrowRotation}
      />
    </div>
  );

  // Hover label (hidden by default, slides up from bottom on hover)
  const hoverLabel = (
    <div className={`absolute inset-0 flex items-center justify-between px-4 md:px-6 lg:px-8 transition-all duration-450 ease-[cubic-bezier(0.165,0.84,0.44,1)] translate-y-full group-hover:translate-y-0 ${themeClasses.hoverBg}`}>
      <span className={`font-medium text-lg md:text-xl transition-transform duration-450 delay-150 ease-[cubic-bezier(0.165,0.84,0.44,1)] transform-origin-bottom-left group-hover:rotate-3 ${themeClasses.hoverText}`}>
        {children}
      </span>
      <ArrowIcon 
        className={`w-5 h-5 transition-all duration-450 delay-75 ease-[cubic-bezier(0.165,0.84,0.44,1)] transform-origin-center group-hover:translate-x-1 ${themeClasses.hoverArrow}`}
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

  // If href is provided, render as a link
  if (href) {
    return (
      <a 
        href={href}
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noopener noreferrer' : undefined}
        className={classes}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {content}
      </a>
    );
  }

  // Otherwise render as button
  return (
    <button 
      type="button" 
      className={classes} 
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
    >
      {content}
    </button>
  );
};

export default Button;

// Legacy export for backward compatibility
export { Button as SvgCTA };