import React from "react";
import Image from "next/image";
import { BackgroundGrid } from "../BackgroundGrid";
interface PageHeroProps {
  title: string;
  subtitle: string;
  rightImageSrc?: string;
  rightImageAlt?: string;
  className?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  rightImageSrc,
  rightImageAlt = "Hero visual",
  className,
}) => (
  <div
    className={`relative overflow-hidden w-full flex md:flex-row items-center justify-between ${
      className ?? ""
    }`}
  >
    <BackgroundGrid gradient={true} />

    {/* Left: Title & Desc */}
    <div className="flex-1 text-center md:text-left">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight ">
        {title}
      </h1>
      <p className="text-lg md:text-2xl text-slate-300 font-medium max-w-2xl">
        {subtitle}
      </p>
    </div>
    {/* Right: Image */}
    {rightImageSrc && (
      <div className="flex-shrink-0 w-1/2 aspect-[25/10]">
        <Image
          src={rightImageSrc}
          alt={rightImageAlt}
          width={224}
          height={224}
          className="object-cover w-full h-full transition-transform duration-300 ease-in-out hover:translate-y-4"
          priority={true}
        />
      </div>
    )}
  </div>
);
