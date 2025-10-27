"use client";

import React, { useEffect, useRef, useState } from "react";

export const LogoEffect: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let intersectionObserver: IntersectionObserver;
    let scheduledAnimationFrame = false;

    const updateMousePosition = (e: MouseEvent) => {
      if (containerRef.current) {
        const boundingRect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - boundingRect.left;
        const y = e.clientY - boundingRect.top;

        setMousePosition({ x, y });
      }
      scheduledAnimationFrame = false;
    };

    const handleMouseMovement = (e: MouseEvent) => {
      if (scheduledAnimationFrame) {
        return;
      }

      scheduledAnimationFrame = true;
      requestAnimationFrame(() => {
        updateMousePosition(e);
      });
    };

    if (containerRef.current) {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              window.addEventListener("mousemove", handleMouseMovement);
            } else {
              setIsVisible(false);
              window.removeEventListener("mousemove", handleMouseMovement);
            }
          });
        },
        {
          rootMargin: "0px",
        }
      );

      intersectionObserver.observe(containerRef.current);
    }

    return () => {
      if (intersectionObserver) {
        intersectionObserver.disconnect();
      }
      window.removeEventListener("mousemove", handleMouseMovement);
    };
  }, []);

  return (
    <div className="relative z-20 container-gutter  -mb-40 -mt-60">
      <div
        ref={containerRef}
        className="w-full h-80 relative" // Tăng chiều cao từ aspect-[16/4] lên h-80
      >
        {/* Logo mask với gradient effect */}
        <div
          className="w-full h-full relative overflow-hidden"
          style={{
            background: "black",
            maskImage: "url('/images/whlogo.svg')",
            maskSize: "cover", // Thay đổi từ 'contain' thành 'cover' để logo lớn hơn
            maskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskImage: "url('/images/whlogo.svg')",
            WebkitMaskSize: "cover",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
          }}
        >
          {/* Classic CRT noise effect với mouse tracking */}
          <div
            className="absolute w-[70rem] h-[70rem] opacity-40 transition-opacity duration-1000"
            style={{
              transform: `translate3d(${mousePosition.x - 560}px, ${
                mousePosition.y - 560
              }px, 0px)`,
              opacity: isVisible ? 0.5 : 0.2,
              backgroundImage: `
                radial-gradient(circle at center, 
                  rgba(255, 255, 255, 0.3) 0%, 
                  rgba(255, 255, 255, 0.15) 30%, 
                  rgba(255, 255, 255, 0.05) 70%
                ),
                url('/images/decorative/noise.png')
              `,
              backgroundSize: "300px, 150px",
              backgroundRepeat: "repeat",
              filter: "contrast(2) brightness(1.8)",
              mixBlendMode: "screen",
            }}
          />

          {/* Secondary noise layer for depth */}
          <div
            className="absolute w-96 h-96 opacity-30"
            style={{
              transform: `translate3d(${mousePosition.x - 192}px, ${
                mousePosition.y - 192
              }px, 0px)`,
              backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  rgba(255, 255, 255, 0.15) 2px,
                  rgba(255, 255, 255, 0.15) 4px
                ),
                url('/images/decorative/noise.png')
              `,
              backgroundSize: "100px, 80px",
              backgroundRepeat: "repeat",
              filter: "contrast(2.5) brightness(1.5)",
              mixBlendMode: "overlay",
            }}
          />

          {/* Static noise texture overlay */}
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: `
                url('/images/decorative/noise.png'),
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 1px,
                  rgba(255, 255, 255, 0.08) 1px,
                  rgba(255, 255, 255, 0.08) 2px
                )
              `,
              backgroundSize: "120px, 3px",
              backgroundRepeat: "repeat",
              filter: "contrast(2.5) brightness(1.6)",
              mixBlendMode: "hard-light",
              animation: "noise-flicker 0.5s infinite alternate",
            }}
          />
        </div>
      </div>
    </div>
  );
};
