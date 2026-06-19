"use client";
import { useFounderSlider } from "./use-founder-slider";
import { LeftPanel } from "./LeftPanel";
import { CenterPortrait } from "./CenterPortrait";
import { RightPanel } from "./RightPanel";
import { ProgressBar } from "@/components/founders/ProgressBar";

export function FounderShowcase() {
  const { founders, activeIndex, progress, goTo, goNext, goPrev } =
    useFounderSlider();

  const activeFounder = founders[activeIndex];
  const nextFounder = founders[(activeIndex + 1) % founders.length];

  return (
    <section id="our-founders">
      <div
        className="relative w-full overflow-hidden select-none font-body pb-16"
        style={{ background: "#ffffff" }}
      >
        {/* Constrained container — content-driven height, no viewport lock */}
        <div
          className="mx-auto w-full py-14 lg:py-20"
          style={{
            maxWidth: "1440px",
            paddingInline: "clamp(24px, 4vw, 64px)",
          }}
        >
          {/* Main editorial grid — height driven by portrait */}
          <div
            className="grid"
            style={{ gridTemplateColumns: "1fr clamp(260px,22vw,420px) 1fr" }}
          >
            {/* Left */}
            <LeftPanel founder={activeFounder} />

            {/* Center portrait */}
            <CenterPortrait founder={activeFounder} />

            {/* Right */}
            <RightPanel
              founder={activeFounder}
              nextFounder={nextFounder}
              onNext={goNext}
              onPrev={goPrev}
            />
          </div>
        </div>

        {/* Progress bar */}
        <ProgressBar
          founders={founders}
          activeIndex={activeIndex}
          progress={progress}
          onDotClick={goTo}
        />
      </div>
    </section>
  );
}
