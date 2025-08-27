import { getTranslations } from 'next-intl/server';
import Slider, { type SliderImage } from '@/components/Slider';
import BackgroundGrid from '@/components/BackgroundGrid';
import Button from '@/components/Button';
export default async function WhyWheelhouse() {
  const t = await getTranslations('WhyWheelhouse');
  const sliderImages: SliderImage[] = [
    { src: '/images/mission1.svg', alt: `${t('missionTitle')} 1` },
    { src: '/images/mission2.svg', alt: `${t('missionTitle')} 2` },
    { src: '/images/mission3.svg', alt: `${t('missionTitle')} 3` },
  ];

  return (
    <section
      data-theme="light"
      className="relative container-gutter py-block space-y-12"
    >
      {/* Grid section-level: bám container và mờ nhẹ */}
      <BackgroundGrid className="pointer-events-none absolute inset-0 opacity-50" />

      {/* Glass lighten overlay: nâng độ sáng nền phía sau */}
      <div className="pointer-events-none absolute inset-0 mix-blend-screen bg-white/10 md:bg-white/15 backdrop-blur-[2px]" />

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Title + Desc */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
            {t('missionTitle')}
          </h2>
          <p className="max-w-prose text-lg text-neutral-700 dark:text-neutral-200">
            {t('missionIntro')}
          </p>
        </div>

        {/* Slider */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <Slider images={sliderImages} aspectRatio="16/10" />
          </div>
        </div>

        {/* CTA (chiếm full hàng ở dưới trên mobile) */}
        <div className="md:col-span-2 w-full lg:w-[calc(var(--column)*4)] max-w-full">
          <Button
            size="large"
            className="w-full justify-between text-neutral-900 dark:text-white border border-black/10 dark:border-white/20 bg-white/40 hover:bg-white/50 backdrop-blur-md"
            href="#about"
          >
            {t('ctaPrimary')}
          </Button>
        </div>
      </div>

      {/* Why cards (light theme styles) */}
      <div className="relative">
        <div className="max-w-prose mb-8">
          <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
            {t('whyTitle')}
          </h2>
            <p className="text-lg text-neutral-700 dark:text-neutral-200">
            {t('whyIntro')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-lg border border-black/10 dark:border-white/20 bg-white/40 dark:bg-white/10 backdrop-blur-md shadow-sm p-6 flex flex-col items-start"
            >
              <h3 className="text-xl font-medium mb-2 uppercase text-neutral-900 dark:text-white">
                {t(`item${i}Title`)}
              </h3>
              <div className="text-neutral-700 dark:text-neutral-200">
                {t(`item${i}Desc`)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}