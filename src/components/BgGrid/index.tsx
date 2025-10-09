import React from "react";

interface Props {
  className?: string;
}

export const BackgroundGrid: React.FC<Props> = ({ className = "" }: Props) => {
  return (
    <div
      aria-hidden="true"
      className={
        "absolute inset-0 container-gutter grid grid-cols-16 h-full pointer-events-none select-none " +
        className
      }
    >
      <div className="col-start-1 border-l border-neutral-500/20 h-full" />
      <div className="col-start-5 border-l border-neutral-500/20 h-full hidden lg:block" />
      <div className="col-start-9 border-l border-neutral-500/20 h-full hidden md:block" />
      <div className="col-start-13 border-l border-neutral-500/20 h-full hidden lg:block" />
      <div className="col-start-16 border-r border-neutral-500/20 h-full" />
    </div>
  );
};

export default BackgroundGrid;
