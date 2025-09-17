import React from "react";

interface Props {
  className?: string;
  gradient?: boolean;
}

export const BackgroundGrid: React.FC<Props> = ({
  className,
  gradient = false,
}: Props) => {
  const lineClass = gradient
    ? "bg-gradient-to-b from-transparent via-neutral-500/20 to-neutral-500/20"
    : "bg-neutral-500/20";

  return (
    <div
      aria-hidden="true"
      className={`absolute top-0 h-full pointer-events-none select-none left-[var(--gutter-h)] w-[calc(100%-var(--gutter-h)*2)] z-0 ${
        className || ""
      }`}
    >
      {/* Cột 0% và 100% - luôn hiển thị */}
      <div
        className={`absolute top-0 bottom-0 w-px ${lineClass}`}
        style={{ left: "0%" }}
      />
      <div
        className={`absolute top-0 bottom-0 w-px ${lineClass}`}
        style={{ left: "100%" }}
      />

      {/* Cột 50% - từ md trở lên */}
      <div
        className={`absolute top-0 bottom-0 w-px hidden md:block ${lineClass}`}
        style={{ left: "50%" }}
      />

      {/* Cột 25% và 75% - từ lg trở lên */}
      <div
        className={`absolute top-0 bottom-0 w-px hidden lg:block ${lineClass}`}
        style={{ left: "25%" }}
      />
      <div
        className={`absolute top-0 bottom-0 w-px hidden lg:block ${lineClass}`}
        style={{ left: "75%" }}
      />
    </div>
  );
};

export default BackgroundGrid;
