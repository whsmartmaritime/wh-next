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
    <section className="theme-light relative overflow-hidden container-gutter grid grid-cols-12">
      <BackgroundGrid />
      
      <h2 className="col-span-12 text-2xl lg:text-3xl xl:text-4xl font-bold my-8">
        {t('missionTitle')}
      </h2>
      
      <p className="col-span-12 md:col-span-6 md:pr-18 text-md xl:text-xl text-muted-foreground text-justify whitespace-pre-line leading-loose">
        {t('missionIntro')}
      </p>
      
      <Slider 
        images={sliderImages} 
        aspectRatio="25/10" 
        className="col-span-12 md:col-span-6"
      />
    </section>
  )
}

// Why Wheelhouse Section Component
async function WhySection() {
  const t = await getTranslations('home.whyWheelhouse');

  return (
    <section className="theme-light relative overflow-hidden">
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
          className="col-span-12 md:col-span-6 lg:col-span-3 border border-border/30 p-6 hover:border-border/60 transition-colors duration-300  m-3"
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