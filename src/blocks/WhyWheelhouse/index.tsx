import { getTranslations } from 'next-intl/server';
import Slider, { type SliderImage } from '@/components/Slider';

export default async function WhyWheelhouse() {
  const t = await getTranslations('WhyWheelhouse');
  // Use existing images from public/images and localized alt from missionTitle
  const sliderImages: SliderImage[] = [
    { src: '/images/mission1.svg', alt: `${t('missionTitle')} 1` },
    { src: '/images/mission2.svg', alt: `${t('missionTitle')} 2` },
    { src: '/images/mission3.svg', alt: `${t('missionTitle')} 3` },
  ];

  return (
    <section className="container-gutter py-block space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Title + Desc */}
        <div>
          <h2 className="text-2xl font-bold mb-4">{t('missionTitle')}</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">{t('missionIntro')}</p>
        </div>
  {/* Slider */}
  <Slider images={sliderImages} aspectRatio="16/10" />
      </div>
      {/* Phần dưới: Why Wheelhouse */}
      <div>
        <h2 className="text-2xl font-bold mb-4">{t('whyTitle')}</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">{t('whyIntro')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white dark:bg-neutral-900 rounded-lg shadow p-6 flex flex-col items-start">
              <h3 className="text-lg font-medium mb-2">{t(`item${i}Title`)}</h3>
              <div className="text-gray-600 dark:text-gray-300">{t(`item${i}Desc`)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}