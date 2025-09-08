import { getTranslations } from 'next-intl/server';
import Slider, { type SliderImage } from '@/components/Slider';
import { BackgroundGrid } from '@/components/BackgroundGrid';
import Button from '@/components/Button';

// Mission Section Component
async function MissionSection() {
  const t = await getTranslations('home.whyWheelhouse');
  const sliderImages: SliderImage[] = [
    { src: '/images/whywh/wave_ship.webp', alt: `${t('missionTitle')} 1` },
    { src: '/images/whywh/se_ship_radar.webp', alt: `${t('missionTitle')} 2` },
    { src: '/images/whywh/se_ship_wheelhouse.webp', alt: `${t('missionTitle')} 3` },
  ];

  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950/30 relative overflow-hidden">
      <BackgroundGrid />
      <div className="container-gutter grid grid-cols-12">
        <div className="col-span-12 lg:col-span-6">
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold my-8">
            {t('missionTitle')}
          </h2>
          <p className="text-md xl:text-xl text-justify whitespace-pre-line my-8 max-w-3xl">
            {t('missionIntro')}
          </p>
        </div>
        <Slider 
          images={sliderImages} 
          className="col-span-12 lg:col-span-6 shadow-lg"
          interval={5000}
        />
      </div>
    </section>
  );
}

// Why Wheelhouse Section Component
async function WhySection() {
  const t = await getTranslations('home.whyWheelhouse');

  return (
    <section className="bg-gradient-to-bl from-neutral-50 via-slate-50 to-stone-100/50 dark:from-neutral-900 dark:via-slate-900 dark:to-stone-900/50 relative overflow-hidden">
      <BackgroundGrid />
      <div className='container-gutter grid grid-cols-12'>
    
      <h2 className="col-span-12 text-2xl lg:text-3xl xl:text-4xl font-bold my-8">
        {t('whyTitle')}
      </h2>
      
      <p className="col-span-12 text-md xl:text-xl text-muted-foreground text-justify whitespace-pre-line my-8 max-w-2xl">
        {t('whyIntro')}
      </p>

      {/* Feature Cards */}
      {[1, 2, 3, 4].map((i) => (
        <div 
          key={i} 
          className="col-span-12 md:col-span-6 lg:col-span-3 border border-border/30 p-6 hover:border-border/60 transition-colors duration-300 m-3 bg-white/60 dark:bg-black/20 backdrop-blur-sm"
        >
          <h3 className="text-sm lg:text-base font-semibold mb-3 uppercase text-center text-foreground">
            {t(`item${i}Title`)}
          </h3>
          <p className="text-sm lg:text-base text-muted-foreground leading-relaxed text-center my-8">
            {t(`item${i}Desc`)}
          </p>
        </div>
      ))}
      
      <Button 
        theme="dark"
        className="col-span-12 md:col-span-6 lg:col-span-3 col-start-1 h-16 my-8" 
        href="/about"
      >
        {t('ctaPrimary')}
      </Button>
      </div>
    </section>
  )
}

// Main Component
export default async function WhyWheelhouse() {
  return (
    <>
      <MissionSection />
      <WhySection />
    </>
  )
}