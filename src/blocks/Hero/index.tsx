import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Button from "@/components/Button";
import { BackgroundAnimation } from "@/components/BackgroundAnimation";
import { BackgroundGrid } from "@/components/BackgroundGrid";
import { BackgroundScanline } from "@/components/BackgroundScanline";
import { LogoShowcase } from "@/components/LogoShowcase";

export default async function Hero() {
  const t = await getTranslations("home.hero");

  const partnerLogos = [
    { id: "1", src: "/images/logos/partnerLogo1.png" },
    { id: "2", src: "/images/logos/partnerLogo2.png" },
    { id: "3", src: "/images/logos/partnerLogo3.png" },
    { id: "4", src: "/images/logos/partnerLogo4.png" },
    { id: "5", src: "/images/logos/partnerLogo5.png" },
    { id: "6", src: "/images/logos/partnerLogo6.png" },
    { id: "7", src: "/images/logos/partnerLogo7.png" },
    { id: "8", src: "/images/logos/partnerLogo8.png" },
  ];

  return (
    <section className="relative container-gutter overflow-visible pt-16 lg:pt-16 pb-16 lg:pb-16 min-h-screen bg-gradient-to-br from-neutral-900 via-slate-900 to-blue-950 text-white">
      {/* Layer 1: Video Background */}
      <BackgroundAnimation />

      {/* Layer 2: Grid với gradient */}
      <BackgroundGrid gradient={true} />

      {/* Layer 3: Scanline Effects */}
      <BackgroundScanline />

      {/* Content Layer (z-30) */}
      <div className="relative z-30">
        {/* Content Grid */}
        <div className="grid grid-cols-1  lg:grid-cols-12 items-center">
          {/* Left: text content - cols-3 (25% like sample's cols-4/16) */}
          <div className="flex flex-col lg:col-span-3 lg:order-1 ">
            <h1 className="text-3xl lg:text-5xl xl:text-7xl font-semibold leading-tight tracking-tight text-balance w-full lg:w-[150%] mb-8">
              <span className="text-sky-700">{t("brand")} </span>
              <span>{t("title")}</span>
            </h1>
            <h2 className="text-xl lg:text-2xl font-medium text-muted-foreground mb-6">
              {t("subtitle")}
            </h2>

            <Button
              href="/contact"
              className="w-full h-16 mb-4 text-white hover:bg-white hover:text-black border-t border-b border-white/20 focus:ring-white"
            >
              {t("ctaPrimary")}
            </Button>
          </div>

          {/* Right: images container - 10 cols wide, starts at col 6, height 6 cols */}
          <div className="relative lg:col-span-8 lg:col-start-6 lg:order-2">
            <div className="relative w-full lg:w-[calc(var(--column)*10)] h-[calc(var(--column)*7)] lg:h-[calc(var(--column)*6)]">
              {/* Image 1 (top-right) - 8 cols wide, positioned at right of container */}
              <div className="absolute top-0 right-0 z-10 w-[calc(var(--column)*10)] lg:w-[calc(var(--column)*8.5)] h-auto  bg-white/10 border border-white/5 rounded-lg backdrop-blur-2xl shadow-[0px_3rem_4rem_1rem_rgba(0,0,0,0.5)] overflow-hidden">
                <div className="w-full h-full rounded-md border border-white/5 bg-gray-900 shadow-[0px_0rem_0.25rem_0rem_rgba(0,0,0,0.5)] overflow-hidden aspect-[16/10]">
                  <Image
                    src="/images/Picture1.png"
                    alt={t("heroImage1Alt")}
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
                    src="/images/Picture2.png"
                    alt={t("heroImage2Alt")}
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

        {/* Logo showcase dưới hero content */}
        <div className="relative z-30 mt-16">
          <div className="text-center mb-8">
            <p className="text-sm text-white/60 uppercase tracking-widest font-medium">
              {t("partnerShowcase", { defaultValue: "Partners and Customers" })}
            </p>
          </div>
          <LogoShowcase logos={partnerLogos} />
        </div>
      </div>
    </section>
  );
}
