"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function OurStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!lineRef.current) return;
    gsap.fromTo(
      lineRef.current,
      { scaleX: 0, transformOrigin: "left" },
      {
        scaleX: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section id="mission" ref={sectionRef} className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-semibold text-[#6B7280] tracking-widest uppercase mb-3"
          >
            The Foundation
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[2rem] lg:text-[2.4rem] font-bold text-[#0A1628] leading-tight tracking-tight"
          >
            Built for Clarity and Scale
          </motion.h2>
          <div ref={lineRef} className="mt-5 h-[2px] w-full bg-[#0A1628]/10 rounded-full" />
        </div>

        {/* Right */}
        <div className="flex flex-col gap-5">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[14px] text-[#4B5563] leading-relaxed"
          >
            Founded in 2026, HermesWorkspace was created after recognizing how fragmented institutional
            communication and academic coordination had become across modern educational
            environments. Most institutions still depend on disconnected tools for
            notices, meetings, communication, scheduling, and operational management &mdash;
            creating inefficiencies across administrators, teachers, students, and
            families.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="border-l-2 border-[#22C55E] pl-5"
          >
            <p className="text-[14px] font-semibold text-[#0A1628] leading-relaxed">
              Educational institutions deserve systems built for clarity, reliability, and scale. We didn't just build a dashboard; we built an institutional operating system that respects the complexities of the modern learning environment.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
