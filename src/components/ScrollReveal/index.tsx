"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import "@/styles/animations.css";

interface ScrollSection {
  text: string;
  image: string;
}

interface ScrollRevealImagePinnedProps {
  sections: ScrollSection[];
}

export default function ScrollRevealImagePinned({
  sections,
}: ScrollRevealImagePinnedProps) {
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
  }, [sections.length]);

  return (
    <div className="relative flex min-h-screen">
      <div className="w-1/2">
        {sections.map((section, index) => (
          <div
            key={index}
            ref={(el) => {
              textRefs.current[index] = el;
            }}
            className="h-screen flex items-center justify-center p-8"
          >
            <div className="max-w-md">
              <h2 className="text-4xl font-bold mb-4">{section.text}</h2>
              <p className="text-lg"></p>
            </div>
          </div>
        ))}
      </div>

      {/* Pinned Image Container */}
      <div className="sticky top-0 h-screen w-1/2 flex items-center justify-center bg-gray-100">
        <div className="relative w-full h-full">
          {sections.map((section, index) => (
            <Image
              key={index}
              src={section.image}
              alt={`Image for ${section.text}`}
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
