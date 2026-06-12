"use client";

import { useRef, useState } from "react";
import { m, useInView, useScroll, useTransform } from "framer-motion";
import { Play, Pause } from "lucide-react";

export default function InMotion() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const wrapY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  const handlePlay = async () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      try {
        await videoRef.current.play();
        setPlaying(true);
      } catch {
        // no src or interrupted — safe to ignore
      }
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <section ref={sectionRef} id="inmotion" className="bg-[#12141D] py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <p className="text-[11px] font-bold text-[#6063EE] tracking-widest uppercase mb-3">HermesWorkspace Preview</p>
          <h2 className="text-[1.8rem] sm:text-[2.4rem] font-bold text-white tracking-tight leading-tight">
            See HermesWorkspace<br />in action.
          </h2>
        </m.div>

        {/* Video container */}
        <m.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: wrapY }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Glow */}
          <div
            className="absolute inset-0 rounded-3xl blur-3xl scale-105"
            style={{ backgroundColor: "rgba(96,99,238,0.08)" }}
          />

          {/* Shell */}
          <div
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border"
            style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "#1A1D28" }}
          >
            {/* Browser chrome */}
            <div
              className="flex items-center gap-3 px-4 py-3 border-b"
              style={{ backgroundColor: "#12141D", borderColor: "rgba(255,255,255,0.05)" }}
            >
              <div className="flex gap-1.5">
                <div className="size-2.5 rounded-full bg-red-400/50" />
                <div className="size-2.5 rounded-full bg-yellow-400/50" />
                <div className="size-2.5 rounded-full" style={{ backgroundColor: "rgba(96,99,238,0.5)" }} />
              </div>
              <div
                className="flex-1 h-5 rounded-md mx-4"
                style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              />
            </div>

            {/* Video */}
            <div className="relative aspect-video bg-[#12141D]">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                playsInline
                preload="metadata"
                aria-label="Product demo video showcasing HermesWorkspace platform features"
                onEnded={() => setPlaying(false)}
                onPause={() => setPlaying(false)}
                onPlay={() => setPlaying(true)}
                src="https://ik.imagekit.io/hermesworkspace/Landing/assets/hermes-launch.mp4"
              />

              {/* Overlay with play button — fades away when playing */}
              <m.div
                animate={{ opacity: playing ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  backgroundColor: "rgba(18,20,29,0.5)",
                  pointerEvents: playing ? "none" : "auto",
                  cursor: "pointer",
                }}
                onClick={handlePlay}
              >
                <m.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.94 }}
                  className="size-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-2xl"
                >
                  <Play size={20} className="ml-1" style={{ color: "#1A1D26" }} />
                </m.div>
              </m.div>

              {/* Pause — corner badge, visible only while playing */}
              {playing && (
                <m.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={handlePlay}
                  className="absolute top-3 right-3 size-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
                >
                  <Pause size={13} className="text-white" />
                </m.button>
              )}
            </div>
          </div>
        </m.div>

        {/* Caption */}
        <m.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center text-[12px] mt-6"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          Communication, classes, notices, meetings, and coordination — all through one connected platform.
        </m.p>

      </div>
    </section>
  );
}