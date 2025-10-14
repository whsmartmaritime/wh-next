import Image from "next/image";

interface SliderProps {
  images: [{ src: string; alt: string }];
  intervalSeconds?: number; // thời gian hiển thị mỗi ảnh
  transitionSeconds?: number; // thời gian trượt
  aspectRatio?: string;
  className?: string;
}

export default function Slider({
  images,
  intervalSeconds = 3,
  transitionSeconds = 0.5,
  aspectRatio = "16:9",
  className = "",
}: SliderProps) {
  const total = images.length;
  const totalDuration = (intervalSeconds + transitionSeconds) * total;

  const pausePercent =
    (intervalSeconds / (intervalSeconds + transitionSeconds)) * (100 / total);
  const movePercent =
    (transitionSeconds / (intervalSeconds + transitionSeconds)) * (100 / total);

  // tạo keyframes có cả opacity
  let keyframes = `@keyframes slide {`;
  for (let i = 0; i < total; i++) {
    const start =
      (i * (intervalSeconds + transitionSeconds) * 100) / totalDuration;
    const mid = start + pausePercent;
    const fade = mid - movePercent * 0.3; // bắt đầu mờ trước khi trượt
    const end = mid + movePercent;
    const x = -(i * 100);
    const nextX = -((i + 1) * 100);

    keyframes += `
      ${start.toFixed(2)}% { transform: translateX(${x}%); opacity: 1; }
      ${fade.toFixed(2)}% { transform: translateX(${x}%); opacity: 0.7; }
      ${mid.toFixed(2)}% { transform: translateX(${x}%); opacity: 0.7; }
      ${end.toFixed(2)}% { transform: translateX(${nextX}%); opacity: 1; }
    `;
  }
  keyframes += `
    100% { transform: translateX(-${total * 100}%); opacity: 1; }
  }`;

  return (
    <div
      className={`relative w-full overflow-hidden bg-gray-100 ${className}`}
      style={{ aspectRatio }}
    >
      <div
        className="flex w-full h-full"
        style={{
          animation: `slide ${totalDuration}s infinite ease-in-out`,
        }}
      >
        {images.concat(images[0]).map((img, i) => (
          <div key={i} className="flex-shrink-0 w-full h-full relative">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
    </div>
  );
}
