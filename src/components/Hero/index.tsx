import Image from "next/image";
import Button from "@/components/Button";
import { ReactNode } from "react";

interface HeroProps {
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
  isHome?: boolean;
  className?: string;
}
export default function Hero({
  title,
  subtitle,
  images,
  ctas = [],
  className = "",
  isHome = false,
}: HeroProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
        <div className="col-span-3 flex flex-col gap-8">
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
                    "w-full min-h-20  border-t border-b border-neutral-500/20 focus:ring-white" +
                    (isHome
                      ? " text-white hover:bg-white hover:text-black"
                      : " text-black hover:bg-black hover:text-white")
                  }
                >
                  {cta.label}
                </Button>
              ))}
            </div>
          )}
        </div>

        <div className="relative col-span-7 col-start-6 ">
          <div className="relative w-full lg:w-[calc(var(--column)*10)] aspect-[16/9] ">
            <div className="absolute top-0 right-0 z-10 w-[calc(var(--column)*10)] lg:w-[calc(var(--column)*8.5)] h-auto   border border-white/5 rounded-lg backdrop-blur-2xl shadow-[0px_3rem_4rem_1rem_rgba(0,0,0,0.5)] overflow-hidden">
              {images.fore && (
                <div className=" relative w-full rounded-md overflow-hidden aspect-[16/9]">
                  <Image
                    src={images.fore.src}
                    alt={images.fore.alt}
                    fill
                    sizes="(min-width:1280px) 750px, (min-width:1024px) 600px, 70vw"
                    className="object-cover"
                    priority
                  />
                </div>
              )}
            </div>
            {images.back && (
              <div className="absolute bottom-0 left-0 z-0 w-[calc(var(--column)*10)] lg:w-[calc(var(--column)*8.5)] h-auto border border-white/5 rounded-lg backdrop-blur-2xl shadow-[0px_3rem_4rem_1rem_rgba(0,0,0,0.5)] overflow-hidden ">
                <div className="relative w-full rounded-md border border-white/5 bg-gray-900 shadow-[0px_0rem_0.25rem_0rem_rgba(0,0,0,0.5)] overflow-hidden aspect-[16/9]">
                  <Image
                    src={images.back.src}
                    alt={images.back.alt}
                    fill
                    sizes="(min-width:1280px) 520px, (min-width:1024px) 420px, 60vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
