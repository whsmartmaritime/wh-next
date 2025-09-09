import Image from "next/image";
import Button from "@/components/Button";

interface HeroProps {
  brand?: string;
  title: string;
  subtitle: string;
  ctaText?: string;
  heroImage1Alt?: string;
  heroImage2Alt?: string;
  heroImage1Src: string;
  heroImage2Src: string;
  className?: string;
}
export default function Hero({
  brand = "",
  title,
  subtitle,
  ctaText = "Contact",
  heroImage1Alt = "Hero image 1",
  heroImage2Alt = "Hero image 2",
  heroImage1Src,
  heroImage2Src,
  className = "",
}: HeroProps) {
  return (
    <div className={`relative  ${className}`}>
      {/* Content Grid */}
      <div className="grid grid-cols-1  lg:grid-cols-12 items-center">
        {/* Left: text content - cols-3 (25% like sample's cols-4/16) */}
        <div className="flex flex-col lg:col-span-3 lg:order-1 ">
          <h1 className="text-3xl lg:text-5xl xl:text-7xl font-semibold leading-tight tracking-tight text-balance w-full lg:w-[150%] mb-8">
            <span className="text-sky-700">{brand} </span>
            <span>{title}</span>
          </h1>
          <h2 className="text-xl lg:text-2xl font-medium text-muted-foreground mb-8">
            {subtitle}
          </h2>

          <Button
            href="/contact"
            className="w-full min-h-20 mb-8 text-white hover:bg-white hover:text-black border-t border-b border-white/20 focus:ring-white"
          >
            {ctaText}
          </Button>
        </div>

        {/* Right: images container - 10 cols wide, starts at col 6, height 6 cols */}
        <div className="relative lg:col-span-8 lg:col-start-6 lg:order-2">
          <div className="relative w-full lg:w-[calc(var(--column)*10)] h-[calc(var(--column)*7)] lg:h-[calc(var(--column)*6)]">
            {/* Image 1 (top-right) - 8 cols wide, positioned at right of container */}
            <div className="absolute top-0 right-0 z-10 w-[calc(var(--column)*10)] lg:w-[calc(var(--column)*8.5)] h-auto  bg-white/10 border border-white/5 rounded-lg backdrop-blur-2xl shadow-[0px_3rem_4rem_1rem_rgba(0,0,0,0.5)] overflow-hidden">
              <div className="w-full h-full rounded-md border border-white/5 bg-gray-900 shadow-[0px_0rem_0.25rem_0rem_rgba(0,0,0,0.5)] overflow-hidden aspect-[16/10]">
                <Image
                  src={heroImage1Src}
                  alt={heroImage1Alt}
                  fill
                  sizes="(min-width:1280px) 750px, (min-width:1024px) 600px, 70vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Image 2 (bottom-left) - 8 cols wide, positioned at left of container */}
            <div className="absolute bottom-0 left-0 z-0 w-[calc(var(--column)*10)] lg:w-[calc(var(--column)*8.5)] h-auto bg-white/10 border border-white/5 rounded-lg backdrop-blur-2xl shadow-[0px_3rem_4rem_1rem_rgba(0,0,0,0.5)] overflow-hidden ">
              <div className="w-full h-full rounded-md border border-white/5 bg-gray-900 shadow-[0px_0rem_0.25rem_0rem_rgba(0,0,0,0.5)] overflow-hidden aspect-[16/10]">
                <Image
                  src={heroImage2Src}
                  alt={heroImage2Alt}
                  fill
                  sizes="(min-width:1280px) 520px, (min-width:1024px) 420px, 60vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
