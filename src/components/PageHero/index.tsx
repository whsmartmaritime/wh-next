import React from "react";
import Image from "next/image";
import { BackgroundGrid } from "../BackgroundGrid";
import Button from "@/components/Button";
interface PageHeroProps {
  title: string;
  subtitle: string;
  imgSrc?: string;
  imgAlt?: string;
  className?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  imgSrc,
  imgAlt = "Hero visual",
  className = "",
  ctaPrimary = "Start Working With Us",
  ctaSecondary = "Want to Chat First?",
}) => (
  <div
    className={`relative  grid grid-cols-1 lg:grid-cols-12 items-center w-full ${className}`}
  >
    <BackgroundGrid gradient={true} />
    {/* Left: Content */}
    <div className="lg:col-span-3 py-8">
      <h1 className="text-2xl lg:text-3xl xl:text-5xl  font-semibold mb-4 lg:mb-8 w-full lg:w-3/2 ">
        {title}
      </h1>
      <h2 className="text-xl lg:text-2xl font-medium text-muted-foreground w-full lg:w-3/2 mb-4 lg:mb-8">
        {subtitle}
      </h2>
      <div className="flex flex-col md:flex-row lg:flex-col  w-full">
        <Button
          href="/contact"
          className="w-full md:w-1/2 lg:w-full min-h-20 text-white hover:bg-white hover:text-black border-t border-b border-white/20 focus:ring-white"
        >
          {ctaPrimary}
        </Button>
        <Button
          href="/contact"
          className="w-full md:w-1/2 lg:w-full min-h-20 text-white hover:bg-white hover:text-black border-t border-b border-white/20 focus:ring-white"
        >
          {ctaSecondary}
        </Button>
      </div>
    </div>
    {/* Right: Image */}
    {imgSrc && (
      <div className="lg:col-span-6 lg:col-start-7 flex justify-center items-center aspect-[16/9] my-8 lg:my-16 w-full">
        <Image
          src={imgSrc}
          alt={imgAlt}
          width={800}
          height={320}
          className="object-cover w-full h-full transition-transform duration-300 ease-in-out "
          priority={true}
        />
      </div>
    )}
  </div>
);
