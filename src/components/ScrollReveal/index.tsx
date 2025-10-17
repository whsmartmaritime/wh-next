import Image from "next/image";
import "@/styles/animations.css";

interface ScrollSection {
  text: string;
  image: string;
}

interface ScrollRevealImagePinnedProps {
  sections: ScrollSection[];
}

export default function ScrollRevealImagePinned({
  sections,
}: ScrollRevealImagePinnedProps) {
  const sectionHeight = 100 / sections.length; // % per section

  return (
    <div
      className="relative flex min-h-screen"
      style={{
        scrollTimeline: "root block",
      }}
    >
      {/* Pinned Image Container */}
      <div className="sticky top-0 h-screen w-1/2 flex items-center justify-center bg-gray-100">
        <div className="relative w-full h-full">
          {sections.map((section, index) => (
            <Image
              key={index}
              src={section.image}
              alt={`Image for ${section.text}`}
              fill
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover scroll-image"
              style={{
                opacity: 0, // Initial opacity 0
                animationTimeline: "scroll(root block)",
                animationName: "fadeInOut",
                animationRange: `${index * sectionHeight}% ${
                  (index + 1) * sectionHeight
                }%`,
                animationFillMode: "forwards",
              }}
            />
          ))}
        </div>
      </div>

      <div className="w-1/2">
        {sections.map((section, index) => (
          <div
            key={index}
            className="h-screen flex items-center justify-center p-8"
            style={{
              viewTimelineName: `--text-${index}`,
              viewTimelineAxis: "block",
            }}
          >
            <div className="max-w-md">
              <h2
                className="text-4xl font-bold mb-4"
                style={{
                  animationTimeline: `scroll(--text-${index})`,
                  animationName: "reveal",
                  animationFillMode: "both",
                }}
              >
                {section.text}
              </h2>
              <p
                className="text-lg"
                style={{
                  animationTimeline: `scroll(--text-${index})`,
                  animationName: "reveal",
                  animationDelay: "0.2s",
                  animationFillMode: "both",
                }}
              ></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
