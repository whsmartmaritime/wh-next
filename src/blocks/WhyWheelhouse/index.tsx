import { getTranslations } from 'next-intl/server';
import Slider, { type SliderImage } from '@/components/Slider';
import BackgroundGrid from '@/components/BackgroundGrid';
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
    <section className="theme-dark relative container-gutter py-block space-y-12">
      {/* Background layer */}
      <div className="absolute inset-0 bg-white z-0"></div>
      {/* Grid layer */}
      <BackgroundGrid />
      {/* Content layer */}
      <div className="relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
        {/* Title + Desc */}
        <div>
          <h2 className=" text-2xl font-bold mb-4">{t('missionTitle')}</h2>
          <p className="max-w-prose text-lg ">{t('missionIntro')}</p>
        </div>
        {/* Slider */}
        <div className="flex justify-center">
          <div className='w-full max-w-md'>
            <Slider images={sliderImages} aspectRatio="16/10" />
          </div>
        </div>
                         
                            <Button theme="dark" href="/about">
                              {t('ctaPrimary')}
                            </Button>
                         
      </div>
      {/* Phần dưới: Why Wheelhouse */}
      <div>
        <div className="max-w-prose mb-8">
          <h2 className=" text-2xl font-bold mb-4">{t('whyTitle')}</h2>
          <p className="text-lg ">{t('whyIntro')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-lg shadow-sm border border-white/30 p-6 flex flex-col items-start">
              <h3 className="mx-auto  text-xl font-medium mb-2 uppercase">{t(`item${i}Title`)}</h3>
              {t(`item${i}Desc`)}
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}