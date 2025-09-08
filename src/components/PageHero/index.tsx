import React from "react";
import Image from "next/image";

interface PageHeroProps {
  imageSrc?: string;
  title: string;
  intro: string;
  className?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  imageSrc,
  title,
  intro,
  className,
}) => (
  <div className={`text-center max-w-3xl mx-auto mb-16 ${className ?? ""}`}>
    {imageSrc && (
      <div className="flex justify-center mb-6">
        <Image
          src={imageSrc}
          alt="Hero image"
          width={112}
          height={112}
          className="w-28 h-28 object-cover rounded-full shadow-lg border-4 border-blue-500 bg-slate-800"
          priority={false}
        />
      </div>
    )}
    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
      {title}
    </h1>
    <p className="text-lg md:text-2xl text-slate-300 font-medium">{intro}</p>
  </div>
);
