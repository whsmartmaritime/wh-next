import Image from "next/image";
import Button from "@/components/Button";
import { ReactNode } from "react";

interface HeroPageProps {
  title: ReactNode;
  subtitle: ReactNode;
  images: {
    back: {
      src: string;
      alt: string;
    };
    fore?: {
      src: string;
      alt: string;
    };
  };
  ctas?: {
    label: string;
    href: string;
  }[];
  className?: string;
}
export default function HeroPage({
  title,
  subtitle,
  images,
  ctas = [],
  className = "",
}: HeroPageProps) {
  return (
    <div className={`relative grid grid-cols-12 items-center ${className}`}>
      <div className="col-span-12 lg:col-span-3 flex flex-col gap-8">
        <div className="text-3xl lg:text-5xl xl:text-7xl font-semibold leading-tight tracking-tight text-balance w-full lg:w-[150%]">
          {title}
        </div>
        <div className="text-xl lg:text-2xl font-medium text-muted-foreground">
          {subtitle}
        </div>
        {ctas.length > 0 && (
          <div className="relative flex flex-col sm:flex-row lg:flex-col">
            {ctas.map((cta, i) => (
              <Button
                key={i}
                href={cta.href}
                className={
                  "w-full min-h-20  border-t border-b border-neutral-500/20 focus:ring-white text-black hover:bg-black hover:text-white"
                }
              >
                {cta.label}
              </Button>
            ))}
          </div>
        )}
      </div>

      <div className="relative col-span-12 lg:col-span-7 lg:col-start-6">
        <div className="relative w-full lg:w-[calc(var(--column)*10)] h-auto ">
          <Image
            src={images.back.src}
            alt={images.back.alt}
            width={1920}
            height={1080}
            sizes="(min-width:1280px) 75vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
