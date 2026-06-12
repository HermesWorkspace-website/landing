"use client";
import React, { useState, useEffect } from "react";
import { useIsMobile } from "@/lib/useIsMobile";
import { useFounderSlider } from "./use-founder-slider";
import { LeftPanel } from "./LeftPanel";
import { CenterPortrait } from "./CenterPortrait";
import { RightPanel } from "./RightPanel";
import { ProgressBar } from "./ProgressBar";
import MobileFoundersShowcase from "./mobileFounderShowcase";

export function FoundersShowcase() {
  const isMobile = useIsMobile();

  const { founders, activeIndex, progress, goTo, goNext, goPrev } =
    useFounderSlider();

  const activeFounder = founders[activeIndex];
  const nextFounder = founders[(activeIndex + 1) % founders.length];

  if (isMobile) {
    return <MobileFoundersShowcase />;
  }

  return (
    <section id="founders">
      <div
        className="relative w-full h-screen overflow-hidden select-none font-body" style={{ background: "#ffffff" }}
      >
        {/* Main editorial grid */}
        <div
          className="absolute inset-0 grid pt-16 pb-14"
          style={{ gridTemplateColumns: "1fr 300px 1fr" }}
        >
          {/* Left */}
          <div className="min-h-0 overflow-x-hidden overflow-y-auto">
            <LeftPanel founder={activeFounder} />
          </div>

          {/* Center portrait */}
          <CenterPortrait founder={activeFounder} />

          {/* Right */}
          <div className="min-h-0 overflow-x-hidden overflow-y-auto">
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