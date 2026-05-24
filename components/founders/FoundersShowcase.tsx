"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useFounderSlider } from "./use-founder-slider";
import { LeftPanel } from "./LeftPanel";
import { CenterPortrait } from "./CenterPortrait";
import { RightPanel } from "./RightPanel";
import { ProgressBar } from "./ProgressBar";
import MobileFoundersShowcase from "./mobileFounderShowcase";

export function FoundersShowcase() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const {
    founders,
    activeIndex,
    progress,
    goTo,
    goNext,
    goPrev,
  } = useFounderSlider();

  const activeFounder = founders[activeIndex];
  const nextFounder = founders[(activeIndex + 1) % founders.length];

  return (
   <section id="founders">
     <div
      className="relative w-full h-screen overflow-hidden select-none"
      style={{ background: "#ffffffff", fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Main editorial grid */}
      <div className="absolute inset-0 grid pt-16 pb-14" style={{ gridTemplateColumns: "1fr 300px 1fr" }}>
        {/* Left */}
        <div className="overflow-hidden">
          <LeftPanel founder={activeFounder} />
        </div>

        {/* Center portrait */}
        <CenterPortrait founder={activeFounder} />

        {/* Right */}
        <div className="overflow-hidden">
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
