import { getTranslations } from 'next-intl/server';
import Slider, { SliderImage } from '@/components/Slider/Slider';

const sliderImages: SliderImage[] = [
  { src: '/images/mission1.jpg', alt: 'Mission 1' },
  { src: '/images/mission2.jpg', alt: 'Mission 2' },
  { src: '/images/mission3.jpg', alt: 'Mission 3' },
];

export default async function OurMission({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'OurMission' });
  const tWhy = await getTranslations({ locale, namespace: 'WhyWheelhouse' });

  return (
    <section className="container-gutter py-block space-y-12">
      {/* Phần trên */}
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
}'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

const sliderImages = [
  { src: '/images/mission1.jpg', alt: 'Mission 1' },
  { src: '/images/mission2.jpg', alt: 'Mission 2' },
  { src: '/images/mission3.jpg', alt: 'Mission 3' },
];

export default function OurMission() {
  const t = useTranslations('OurMission');
  const tWhy = useTranslations('WhyWheelhouse');
  const [current, setCurrent] = useState(0);

  // Simple slider logic
  const next = () => setCurrent((c) => (c + 1) % sliderImages.length);
  const prev = () => setCurrent((c) => (c - 1 + sliderImages.length) % sliderImages.length);

  return (
    <section className="container-gutter py-block space-y-12">
      {/* Phần trên */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Title + Desc */}
        <div>
          <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">{t('desc')}</p>
        </div>
        {/* Slider */}
        <div className="relative flex flex-col items-center">
          <div className="w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
            <Image
              src={sliderImages[current].src}
              alt={sliderImages[current].alt}
              fill
              className="object-cover transition-all duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button
              className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              onClick={prev}
              aria-label="Previous"
              type="button"
            >
              &#8592;
            </button>
            <button
              className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              onClick={next}
              aria-label="Next"
              type="button"
            >
              &#8594;
            </button>
          </div>
          <div className="flex gap-1 mt-2">
            {sliderImages.map((img, idx) => (
              <span
                key={img.src}
                className={`inline-block w-2 h-2 rounded-full ${idx === current ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
              />
            ))}
          </div>
        </div>
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