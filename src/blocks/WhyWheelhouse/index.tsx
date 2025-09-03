import { getTranslations } from 'next-intl/server';
import Slider, { type SliderImage } from '@/components/Slider';
import { BackgroundGrid } from '@/components/BackgroundGrid';
import Button from '@/components/Button';
export default async function WhyWheelhouse() {
  const t = await getTranslations('WhyWheelhouse');
  // Use existing images from public/images and localized alt from missionTitle
  const sliderImages: SliderImage[] = [
    { src: '/images/mission1.svg', alt: `${t('missionTitle')} 1` },
    { src: '/images/mission2.svg', alt: `${t('missionTitle')} 2` },
    { src: '/images/mission3.svg', alt: `${t('missionTitle')} 3` },
  ];

  return (
    <section className="relative theme-light container-gutter py-block">
      {/* Background Grid */}
      <BackgroundGrid />
      
      {/* Content */}
      <div className="relative z-30 space-y-12">
        {/* Mission Section */}
        <div className="grid grid-cols-12">
          {/* Title + Desc */}
          <div className="col-span-12 md:col-span-6 md:pr-8 ">
            <h2 className=" font-bold mb-4">{t('missionTitle')}</h2>
            <p className="whitespace-pre-line  mb-4">{t('missionIntro')}</p>
          </div>
          
          {/* Slider */}
          <div className="col-span-12 md:col-span-6 flex justify-center items-center">
            <div className="w-full">
              <Slider images={sliderImages} aspectRatio="16/10" />
            </div>
          </div>
        </div>

        {/* Why Wheelhouse Section */}
        <div>
          <div className="max-w-prose mb-8">
            <h2 className="font-bold mb-4">{t('whyTitle')}</h2>
            <p className="whitespace-pre-line">{t('whyIntro')}</p>
          </div>
          
          <div className="grid grid-cols-12 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className=" col-span-12 md:col-span-6 lg:col-span-3 border border-border/30 rounded-lg p-6 hover:border-border/60 hover:shadow-lg hover:transform hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="font-medium mb-3 uppercase text-center hover:text-blue-500 transition-colors duration-300">
                  {t(`item${i}Title`)}
                </h3>
                <p className="leading-relaxed">
                  {t(`item${i}Desc`)}
                </p>
              </div>
            ))}
          </div>
          
          {/* CTA moved to bottom */}

            <Button className="mb-8" href="/about">
              {t('ctaPrimary')}
            </Button>
          
        </div>
      </div>
    </section>
  );
}