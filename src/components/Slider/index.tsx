'use client';

import Image from 'next/image';
import { useState } from 'react';

const sliderImages = [
  { src: '/images/mission1.jpg', alt: 'Mission 1' },
  { src: '/images/mission2.jpg', alt: 'Mission 2' },
  { src: '/images/mission3.jpg', alt: 'Mission 3' },
];

export default function SliderImages() {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((c) => (c + 1) % sliderImages.length);
  const prev = () => setCurrent((c) => (c - 1 + sliderImages.length) % sliderImages.length);

  return (
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
        <button className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600" onClick={prev} aria-label="Previous" type="button">&#8592;</button>
        <button className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600" onClick={next} aria-label="Next" type="button">&#8594;</button>
      </div>
      <div className="flex gap-1 mt-2">
        {sliderImages.map((img, idx) => (
          <span key={img.src} className={`inline-block w-2 h-2 rounded-full ${idx === current ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
        ))}
      </div>
    </div>
  );
}