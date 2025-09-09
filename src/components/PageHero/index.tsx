import React from "react";
import Image from "next/image";
import { BackgroundGrid } from "../BackgroundGrid";
import Button from "@/components/Button";
interface PageHeroProps {
  title: string;
  subtitle: string;
  rightImageSrc?: string;
  rightImageAlt?: string;
  className?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  rightImageSrc,
  rightImageAlt = "Hero visual",
  className = "",
  ctaPrimary = "Start Working With Us",
  ctaSecondary = "Want to Chat First?",
}) => (
  <div
    className={`relative grid grid-cols-1  md:grid-cols-2 lg:grid-cols-12 items-center overflow-hidden w-full  justify-between ${className}`}
  >
    <BackgroundGrid gradient={true} />

    <div className="col-span-3 flex flex-col text-left text-justify ">
      <h1 className="text-3xl lg:text-5xl xl:text-7xl font-semibold text-balance w-full lg:w-[150%] mb-8">
        {title}
      </h1>
      <p className="text-xl lg:text-2xl font-medium text-muted-foreground mb-8">
        {subtitle}
      </p>
      <Button
        href="/contact"
        className="w-full min-h-20 text-white hover:bg-white hover:text-black border-t border-b border-white/20 focus:ring-white"
      >
        {ctaPrimary}
      </Button>
      <Button
        href="/contact"
        className="w-full min-h-20 mb-8 text-white hover:bg-white hover:text-black border-t border-b border-white/20 focus:ring-white"
      >
        {ctaSecondary}
      </Button>
    </div>
    {rightImageSrc && (
      <div className="hidden md:block col-span-9 col-start-5 aspect-[25/10] my-8 lg:my-16">
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
