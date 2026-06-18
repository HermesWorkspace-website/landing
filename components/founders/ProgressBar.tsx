"use client";

import { Founder } from "@/types/founder";

interface ProgressBarProps {
  founders: Founder[];
  activeIndex: number;
  /** 0–100 */
  progress: number;
  onDotClick: (index: number) => void;
}

/**
 * ProgressBar
 *
 * - No framer-motion: CSS transitions only, GPU-composited transform
 * - scaleX on inner div (transform: origin left) → no width reflow
 * - Keyboard accessible: role="tablist" + arrow key support
 * - ARIA: aria-selected, aria-label per segment
 */
export function ProgressBar({
  founders,
  activeIndex,
  progress,
  onDotClick,
}: ProgressBarProps) {
  const handleKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowRight") onDotClick(Math.min(i + 1, founders.length - 1));
    if (e.key === "ArrowLeft") onDotClick(Math.max(i - 1, 0));
  };

  return (
    <div
      className="absolute bottom-0 left-0 right-0 px-8 pb-5 z-20"
      role="tablist"
      aria-label="Founder navigation"
    >
      <div className="flex items-center gap-4">
        {founders.map((founder, i) => {
          const isActive = i === activeIndex;
          const isPast = i < activeIndex;

          return (
            <button
              key={founder.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`${founder.firstName} ${founder.lastName}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onDotClick(i)}
              onKeyDown={(e) => handleKey(e, i)}
              className="
                flex-1 flex flex-col gap-1.5
                bg-transparent border-none p-0 cursor-pointer
                focus-visible:outline-none
              "
            >
              {/* Name + percentage */}
              <div className="flex items-center justify-between">
                <span
                  className="text-[9px] uppercase tracking-[2px]"
                  style={{
                    color: isActive ? founder.accentColor : "#9896A4",
                    fontWeight: isActive ? 500 : 400,
                    transition: "color 0.3s ease",
                  }}
                >
                  {founder.firstName} {founder.lastName}
                </span>
                {isActive && (
                  <span
                    className="text-[9px] tabular-nums tracking-[1px]"
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
                <div
                  className="h-full w-full rounded-full origin-left"
                  style={{
                    background: founder.accentColor,
                    opacity: isPast ? 0.32 : 1,
                    transform: isActive
                      ? `scaleX(${progress / 100})`
                      : isPast
                      ? "scaleX(1)"
                      : "scaleX(0)",
                    transformOrigin: "left",
                    // GPU-composited: no width animation, only transform
                    transition: isActive
                      ? "transform 0.06s linear"
                      : "transform 0.3s ease",
                    willChange: isActive ? "transform" : "auto",
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
