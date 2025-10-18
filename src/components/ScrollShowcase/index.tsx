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
    <article
      className={`relative grid grid-cols-1 lg:grid-cols-12 ${className}`}
    >
      <div className="lg:col-span-4 order-1">
        {items.map((item, index) => (
          <div
            key={index}
            ref={(el) => {
              textRefs.current[index] = el;
            }}
            className="lg:h-screen flex items-center justify-center"
          >
            <div className="flex flex-col gap-4 lg:gap-8">
              <div className="text-3xl lg:text-4xl font-bold">{item.title}</div>
              <div className="flex flex-col text-sm sm:text-lg lg:text-2xl text-justify gap-4">
                {item.description}
              </div>
              <div className="relative w-full aspect-[16/9] lg:hidden">
                <BackgroundScanline />
                <Image
                  key={index}
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`object-cover transition-opacity duration-1000 ease-out p-8 ${
                    activeIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pinned Image Container */}
      <div className="sticky top-0 h-screen lg:col-span-7 lg:col-start-6  items-center justify-end relative order-2 hidden lg:flex">
        <BackgroundScanline
          opacity={0.1}
          className="inset-auto w-6/7 h-full"
          crosshairs="all"
        />
        <div className="relative w-full aspect-[4/3] ">
          {items.map((item, index) => (
            <Image
              key={index}
              src={item.image.src}
              alt={item.image.alt}
              fill
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`object-cover transition-all duration-1000 ease-out ${
                activeIndex === index
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-[-30px]"
              }`}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
