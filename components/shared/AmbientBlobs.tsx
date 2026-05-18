import React from "react";

export default function AmbientBlobs() {
  return (
    <>
      <div
        className="absolute pointer-events-none animate-blob-1"
        style={{
          width: 600, height: 600, top: "5%", left: "-10%",
          background: "radial-gradient(ellipse, rgba(90,95,232,0.07) 0%, transparent 70%)",
          borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%",
        }}
      />
      <div
        className="absolute pointer-events-none animate-blob-2"
        style={{
          width: 500, height: 500, bottom: "10%", right: "-5%",
          background: "radial-gradient(ellipse, rgba(168,85,247,0.06) 0%, transparent 70%)",
          borderRadius: "40% 60% 70% 30%/40% 50% 60% 50%",
          animationDelay: "3s",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 300, height: 300, top: "40%", left: "50%",
          background: "radial-gradient(ellipse, rgba(6,182,212,0.04) 0%, transparent 70%)",
          transform: "translateX(-50%)",
        }}
      />
    </>
  );
}
