"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const features = [
  "Structured communication channels for administrators, teachers, and students",
  
  "Centralized notices, announcements, and academic updates in one connected platform",

  "Integrated online classes, meetings, webinars, and institutional sessions",

  "Accessible across web and mobile for connected school communication",
];

export default function DesignedForClarity() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const phoneY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const phoneRotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  useEffect(() => {
    if (!phoneRef.current) return;
    gsap.fromTo(phoneRef.current, { opacity: 0, scale: 0.9, y: 30 }, {
      opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out",
      scrollTrigger: { trigger: phoneRef.current, start: "top 80%" },
    });
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#060E1A] py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Left — Phone */}
        <motion.div ref={phoneRef} style={{ y: phoneY, rotateZ: phoneRotate }} className="flex justify-center opacity-0">
          <ClarityPhoneMockup />
        </motion.div>

        {/* Right — Text */}
        <div className="flex flex-col gap-6">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-[11px] font-bold text-[#22C55E] tracking-widest uppercase">
            Designed for Educational Institutions
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }} className="text-[2rem] sm:text-[2.6rem] font-bold text-white leading-tight tracking-tight">
            Built Around Institutional Communication
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="text-[14px] text-white/55 leading-relaxed">
            HermesWorkspace is designed specifically for how schools communicate, coordinate,
            and operate daily — bringing classes, notices, meetings, and institutional
            updates into one structured digital environment.
          </motion.p>

          <div className="flex flex-col gap-3 mt-2">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-3 p-3.5 rounded-xl border border-white/6 bg-white/3 hover:bg-white/6 transition-colors cursor-default">
                <CheckCircle size={14} className="text-[#22C55E] flex-shrink-0 mt-0.5" />
                <span className="text-[13px] text-white/70 leading-relaxed">{f}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ClarityPhoneMockup() {
  const isInView = useInView(useRef(null), { once: true });
  return (
    <div className="relative w-[200px] sm:w-[240px]">
      <div className="absolute inset-0 bg-[#22C55E]/8 rounded-[36px] blur-3xl scale-110" />
      <div className="relative bg-[#0D1E35] border border-white/10 rounded-[28px] overflow-hidden shadow-2xl" style={{ aspectRatio: "9/19" }}>
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-4 bg-[#071221] rounded-full z-10" />
        <div className="absolute inset-0 p-3 pt-10 flex flex-col gap-2">
          {/* Header */}
          <div className="flex items-center justify-between mb-1">
            <div className="h-2 w-20 bg-white/20 rounded-full" />
            <div className="w-5 h-5 rounded-full bg-[#22C55E]/30" />
          </div>
          {/* Notice card */}
          <div className="bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-xl p-2.5">
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
              <div className="h-1.5 w-12 bg-[#22C55E]/60 rounded-full" />
            </div>
            <div className="space-y-1">
              <div className="h-1.5 w-full bg-white/15 rounded-full" />
              <div className="h-1.5 w-3/4 bg-white/10 rounded-full" />
            </div>
          </div>
          {/* Channel list */}
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/4">
              <div className="w-6 h-6 rounded-lg bg-white/10 flex-shrink-0" />
              <div className="flex-1">
                <div className="h-1.5 w-16 bg-white/20 rounded-full mb-1" />
                <div className="h-1 w-10 bg-white/10 rounded-full" />
              </div>
              <div className="w-4 h-4 rounded-full bg-[#22C55E]/30 flex-shrink-0" />
            </div>
          ))}
          {/* Bottom nav */}
          <div className="mt-auto flex justify-around pt-1 border-t border-white/5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className={`w-4 h-4 rounded-md ${i === 0 ? "bg-[#22C55E]/40" : "bg-white/10"}`} />
                <div className="w-3 h-1 bg-white/10 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
