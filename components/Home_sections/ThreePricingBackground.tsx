import React from "react";

// Replaced Three.js WebGL renderer with pure CSS animation.
// Previous implementation had a full WebGL context + mousemove listener running continuously.
export default function ThreePricingBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
      {/* Rotating geometric rings — pure CSS, zero JS overhead */}
      <div
        className="absolute w-[480px] h-[480px] rounded-[30%] border border-emerald-500/15 animate-[pricing-spin_24s_linear_infinite]"
      />
      <div
        className="absolute w-[340px] h-[340px] rounded-[20%] border border-emerald-500/10 animate-[pricing-spin_18s_linear_infinite_reverse]"
      />
      <div
        className="absolute w-[200px] h-[200px] border border-emerald-500/[0.07] animate-[pricing-spin_13s_linear_infinite]"
      />
      {/* Ambient radial glow */}
      <div
        className="absolute w-[560px] h-[560px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.05)_0%,transparent_70%)]"
      />
      <style>{`
        @keyframes pricing-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
