import { getTranslations } from 'next-intl/server';
import Slider, { SliderImage } from '@/components/Slider';

const sliderImages: SliderImage[] = [
  { src: '/images/mission1.svg', alt: 'Mission 1' },
  { src: '/images/mission2.svg', alt: 'Mission 2' },
  { src: '/images/mission3.svg', alt: 'Mission 3' },
];

export default async function OurMission({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'OurMission' });
  const tWhy = await getTranslations({ locale, namespace: 'WhyWheelhouse' });

  return (
    <section className="container-gutter py-block space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Title + Desc */}
        <div>
          <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">{t('desc')}</p>
        </div>
        {/* Slider */}
        <Slider images={sliderImages} aspectRatio="4/3" />
      </div>
      {/* Phần dưới: Why Wheelhouse */}
      <div>
        <h3 className="text-2xl font-semibold mb-6">{tWhy('title')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white dark:bg-neutral-900 rounded-lg shadow p-6 flex flex-col items-start">
              <div className="text-lg font-medium mb-2">{tWhy(`item${i}Title`)}</div>
              <div className="text-gray-600 dark:text-gray-300">{tWhy(`item${i}Desc`)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}