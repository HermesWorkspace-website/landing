"use client";

import { m } from "framer-motion";
import { Founder } from "../../types/founder";


interface ProgressBarProps {
  founders: Founder[];
  activeIndex: number;
  progress: number;
  onDotClick: (index: number) => void;
}

export function ProgressBar({ founders, activeIndex, progress, onDotClick }: ProgressBarProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 px-9 pb-5 z-20">
      <div className="flex items-center gap-4">
        {founders.map((founder, i) => (
          <button
            type="button"
            key={founder.id}
            onClick={() => onDotClick(i)}
            className="flex-1 group flex flex-col gap-1.5 cursor-pointer bg-transparent border-none p-0"
            aria-label={`Go to ${founder.firstName} ${founder.lastName}`}
          >
            {/* Name label */}
            <div className="flex items-center justify-between">
              <span
                className="text-[9px] tracking-[2px] uppercase transition-all duration-300"
                style={{
                  color: i === activeIndex ? founder.accentColor : "#9896A4",
                  fontWeight: i === activeIndex ? 500 : 400,
                }}
              >
                {founder.firstName} {founder.lastName}
              </span>
              {i === activeIndex && (
                <span
                  className="text-[9px] tracking-[1px]"
                  style={{ color: founder.accentColor }}
                >
                  {Math.round(progress)}%
                </span>
              )}
            </div>

            {/* Track */}
            <div
              className="h-[2px] w-full rounded-full overflow-hidden"
              style={{ background: "#E8E4DC" }}
            >
              {i === activeIndex ? (
                <m.div
                  className="h-full rounded-full origin-left"
                  style={{
                    background: founder.accentColor,
                    scaleX: progress / 100,
                    transformOrigin: "left",
                  }}
                  transition={{ duration: 0.05 }}
                />
              ) : i < activeIndex ? (
                <div
                  className="h-full w-full rounded-full"
                  style={{ background: founder.accentColor, opacity: 0.35 }}
                />
              ) : null}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
