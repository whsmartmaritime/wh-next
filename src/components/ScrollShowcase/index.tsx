"use client";
import Image from "next/image";
import { useEffect, useState, useRef, ReactNode } from "react";
import BackgroundScanline from "@/components/BackgroundScanline";

interface ScrollShowcaseProps {
  items: {
    title: ReactNode;
    description: ReactNode;
    image: { src: string; alt: string };
  }[];
  className?: string;
}

export default function ScrollShowcase({
  items,
  className,
}: ScrollShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = textRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(index);
            }
          });
        },
        {
          threshold: 0.5, // Trigger when 50% of the text section is visible
          rootMargin: "-10% 0px -10% 0px", // Small margin to prevent flickering
        }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [items.length]);

  return (
    <div className={`relative grid grid-cols-12 ${className}`}>
      <div className="col-span-4">
        {items.map((item, index) => (
          <div
            key={index}
            ref={(el) => {
              textRefs.current[index] = el;
            }}
            className="h-screen flex items-center justify-center"
          >
            <div className="">
              <div className="text-4xl font-bold mb-4">{item.title}</div>
              {item.description}
            </div>
          </div>
        ))}
      </div>

      {/* Pinned Image Container */}
      <div className="sticky top-0 h-screen col-span-7 col-start-6 flex items-center justify-end relative">
        <BackgroundScanline
          opacity={0.1}
          className="inset-auto w-6/7 h-full"
          crosshairs="all"
        />
        <div className="relative w-full aspect-[4/3] max-h-full">
          {items.map((item, index) => (
            <Image
              key={index}
              src={item.image.src}
              alt={item.image.alt}
              fill
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-opacity duration-300"
              style={{
                opacity: activeIndex === index ? 1 : 0,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
