import React from "react";

// Replaced Three.js WebGL renderer with pure CSS animation.
// Previous implementation had a full WebGL context + mousemove listener running continuously.
export default function ThreePricingBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
      {/* Rotating geometric rings — pure CSS, zero JS overhead */}
      <div
        style={{
          position: "absolute",
          width: 480,
          height: 480,
          border: "1px solid rgba(16,185,129,0.14)",
          borderRadius: "30%",
          animation: "pricing-spin 24s linear infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 340,
          height: 340,
          border: "1px solid rgba(16,185,129,0.09)",
          borderRadius: "20%",
          animation: "pricing-spin 18s linear infinite reverse",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 200,
          height: 200,
          border: "1px solid rgba(16,185,129,0.07)",
          animation: "pricing-spin 13s linear infinite",
        }}
      />
      {/* Ambient radial glow */}
      <div
        style={{
          position: "absolute",
          width: 560,
          height: 560,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)",
        }}
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
