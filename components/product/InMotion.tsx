"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
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
    <section ref={sectionRef} id="inmotion" className="bg-[#060E1A] py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <p className="text-[11px] font-bold text-[#6366f1] tracking-widest uppercase mb-3">HermesWorkspace Preview</p>
          <h2 className="text-[1.8rem] sm:text-[2.4rem] font-bold text-white tracking-tight leading-tight">
            See HermesWorkspace<br />in action.
          </h2>
        </motion.div>

        {/* Video container */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: wrapY }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Glow */}
          <div
            className="absolute inset-0 rounded-3xl blur-3xl scale-105"
            style={{ backgroundColor: "rgba(99,102,241,0.08)" }}
          />

          {/* Shell */}
          <div
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border"
            style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "#0D1E35" }}
          >
            {/* Browser chrome */}
            <div
              className="flex items-center gap-3 px-4 py-3 border-b"
              style={{ backgroundColor: "#071221", borderColor: "rgba(255,255,255,0.05)" }}
            >
              <div className="flex gap-1.5">
                <div className="size-2.5 rounded-full bg-red-400/50" />
                <div className="size-2.5 rounded-full bg-yellow-400/50" />
                <div className="size-2.5 rounded-full" style={{ backgroundColor: "rgba(99,102,241,0.5)" }} />
              </div>
              <div
                className="flex-1 h-5 rounded-md mx-4"
                style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              />
            </div>

            {/* Video */}
            <div className="relative aspect-video bg-[#060E1A]">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                playsInline
                preload="metadata"
                onEnded={() => setPlaying(false)}
                onPause={() => setPlaying(false)}
                onPlay={() => setPlaying(true)}
                src="/hermes-launch.mp4"
              />

              {/* Overlay with play button — fades away when playing */}
              <motion.div
                animate={{ opacity: playing ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  backgroundColor: "rgba(6,14,26,0.45)",
                  pointerEvents: playing ? "none" : "auto",
                  cursor: "pointer",
                }}
                onClick={handlePlay}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.94 }}
                  className="size-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-2xl"
                >
                  <Play size={20} className="ml-1" style={{ color: "#0A1628" }} />
                </motion.div>
              </motion.div>

              {/* Pause — corner badge, visible only while playing */}
              {playing && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={handlePlay}
                  className="absolute top-3 right-3 size-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
                >
                  <Pause size={13} className="text-white" />
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center text-[12px] mt-6"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          Communication, classes, notices, meetings, and coordination — all through one connected platform.
        </motion.p>

      </div>
    </section>
  );
}