"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lock, Video } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    icon: Lock,
    label: "Institutional-Grade Communication Infrastructure",
  },
  {
    icon: Video,
    label: "Integrated Academic Coordination & Meetings",
  },
];

export default function Ecosystem() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const mockupY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  useEffect(() => {
    if (!mockupRef.current) return;
    gsap.fromTo(
      mockupRef.current,
      { opacity: 0, scale: 0.9, rotateY: 5 },
      {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mockupRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0A1628] py-20 px-6 overflow-hidden relative"
    >
      {/* Background particles/glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#22C55E]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#22C55E]/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left text */}
        <div>
     <motion.p
  initial={{ opacity: 0, y: 10 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.5 }}
  className="text-[11px] font-semibold tracking-widest uppercase text-[#6063EE] mb-4"
>
  Institutional Infrastructure
</motion.p>

<motion.h2
  initial={{ opacity: 0, y: 24 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.7, delay: 0.1 }}
  className="text-[2rem] lg:text-[2.8rem] font-bold text-white leading-[1.08] tracking-tight mb-6 max-w-xl"
>
  One operational system for modern educational institutions.
</motion.h2>

<motion.p
  initial={{ opacity: 0, y: 18 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="max-w-xl text-[15px] leading-relaxed text-white/55 mb-10"
>
  HermesWorkspace centralizes communication, academic coordination,
  meetings, notices, analytics, and institutional workflows into one
  connected platform designed for operational clarity, scalability,
  and long-term digital transformation.
</motion.p>
        </div>

        {/* Right — mockup */}
        <motion.div ref={mockupRef} style={{ y: mockupY }} className="opacity-0">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0D1E35]">
            {/* Fake dashboard header */}
            <div className="bg-[#071221] px-4 py-3 flex items-center gap-2 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]/60" />
              </div>
              <div className="mx-auto flex-1 mx-8 h-5 bg-white/5 rounded-md" />
            </div>

            {/* Fake dashboard body */}
            <div className="p-5 space-y-3">
              {/* Chart bars */}
              <div className="bg-[#071221] rounded-xl p-4 border border-white/5">
                <p className="text-[10px] text-gray-500 mb-3 font-medium uppercase tracking-wider">Operational Analytics</p>
                <div className="flex items-end gap-2 h-20">
                  {[45, 70, 55, 90, 65, 80, 72, 88, 60, 95].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={isInView ? { height: `${h}%` } : {}}
                      transition={{ delay: 0.8 + i * 0.06, duration: 0.5, ease: "easeOut" }}
                      className="flex-1 rounded-sm"
                      style={{
                        backgroundColor:
                          i === 9 ? "#22C55E" : i === 3 ? "#22C55E80" : "rgba(255,255,255,0.08)",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2">
                {[
  { label: "Communication Channels", val: "Centralized" },
  { label: "Academic Operations", val: "Connected" },
  { label: "Institutional Infrastructure", val: "Modernized" },
].map((s) => (
                  <div key={s.label} className="bg-[#071221] rounded-lg p-3 border border-white/5">
                    <p className="text-[9px] text-gray-500 mb-1">{s.label}</p>
                    <p className="text-[15px] font-bold text-white">{s.val}</p>
                  </div>
                ))}
              </div>

              {/* List rows */}
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-7 bg-[#071221] rounded-lg border border-white/5 flex items-center px-3 gap-2">
                  <div className="w-3 h-3 rounded-sm bg-[#22C55E]/30" />
                  <div className="flex-1 h-2 bg-white/5 rounded-full" />
                  <div className="w-10 h-2 bg-white/10 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
