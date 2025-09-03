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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Title + Desc */}
          <div>
            <h2 className="text-2xl font-bold mb-4">{t('missionTitle')}</h2>
            <p className="text-lg mb-6">{t('missionIntro')}</p>
            <Button href="/about">
              {t('ctaPrimary')}
            </Button>
          </div>
          
          {/* Slider */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <Slider images={sliderImages} aspectRatio="16/10" />
            </div>
          </div>
        </div>

        {/* Why Wheelhouse Section */}
        <div>
          <div className="max-w-prose mb-8">
            <h2 className="text-2xl font-bold mb-4">{t('whyTitle')}</h2>
            <p className="text-lg">{t('whyIntro')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="border border-border/30 rounded-lg p-6"
              >
                <h3 className="text-xl font-medium mb-3 uppercase text-center">
                  {t(`item${i}Title`)}
                </h3>
                <p className="text-sm leading-relaxed">
                  {t(`item${i}Desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}