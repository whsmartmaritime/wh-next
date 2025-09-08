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

  const themeMap = {
    light: [
      'border-t border-b border-black/20',
      'focus:ring-black',
      'text-black',
      'hover:bg-black hover:text-white',
      'group-hover:text-white',
      'group-hover:bg-black',
      'dark:text-black',
    ].join(' '),
    dark: [
      'border-t border-b border-white/20',
      'focus:ring-white',
      'text-white',
      'hover:bg-white hover:text-black',
      'group-hover:text-black',
      'group-hover:bg-white',
      'dark:text-white',
    ].join(' '),
    auto: [
      'border-t border-b border-border',
      'focus:ring-primary',
      'text-foreground',
      'hover:bg-primary hover:text-primary-foreground',
      'group-hover:text-primary-foreground',
      'group-hover:bg-primary',
    ].join(' '),
  };
  const themeClasses = themeMap[theme] || themeMap.auto;


  const base = `group relative overflow-hidden cursor-pointer transition-all duration-450 ease-[cubic-bezier(0.165,0.84,0.44,1)] focus:outline-none focus:ring-2 focus:ring-offset-0 ${themeClasses}`;
  const classes = [base, className].filter(Boolean).join(' ');

  const labelClass = 'font-medium text-lg md:text-xl transition-transform duration-450 delay-150 ease-[cubic-bezier(0.165,0.84,0.44,1)] transform-origin-bottom-left';
  const iconClass = 'w-5 h-5 transition-all duration-450 delay-75 ease-[cubic-bezier(0.165,0.84,0.44,1)] transform-origin-center';

  const content = (
    <>
      <div className="absolute inset-0 flex items-center justify-between px-4 md:px-6 lg:px-8 transition-transform duration-450 ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:-translate-y-full">
        <span className={`${labelClass} group-hover:-rotate-3`}>{children}</span>
        <ArrowIcon className={iconClass} rotation={arrowRotation} />
      </div>
      <div className="absolute inset-0 flex items-center justify-between px-4 md:px-6 lg:px-8 transition-all duration-450 ease-[cubic-bezier(0.165,0.84,0.44,1)] translate-y-full group-hover:translate-y-0">
        <span className={`${labelClass} group-hover:rotate-3`}>{children}</span>
        <ArrowIcon className={`${iconClass} group-hover:translate-x-1`} rotation={arrowRotation} />
      </div>
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