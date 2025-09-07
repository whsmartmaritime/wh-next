"use client";
import { useState, useEffect } from 'react';
import MobileNav from '@/components/MobileNav';
import BackgroundScanline from '../BackgroundScanline';

export default function MobileNavToggle() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  // Lock/unlock body scroll when menu opens/closes
  useEffect(() => {
    if (isOpen) {
      // Lock scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      // Unlock scroll
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Toggle Button - Transform in place */}
      <button
        onClick={toggle}
        className="relative p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors z-50"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        {/* Hamburger Icon */}
        <svg 
          className={`w-6 h-6 transition-opacity duration-200 ${isOpen ? 'opacity-0 absolute' : 'opacity-100'}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        
        {/* X Icon */}
        <svg 
          className={`w-6 h-6 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 absolute'}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Full Screen Container - Below Header với group class cho hover effect */}
      {isOpen && (
        <div className="fixed top-[120px] left-0 w-full h-[calc(100vh-120px)] z-40 bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-700 group">
          {/* BackgroundScanline với hiệu ứng giống sample */}
          <BackgroundScanline 
            className="absolute inset-0"
            opacity={0.8}
            hoverOpacity={0.1}
          />
          <div className="relative h-full overflow-y-auto">
            <div className="container-gutter py-6">
              <MobileNav />
            </div>
          </div>
        </div>
      )}
    </>
  );
}