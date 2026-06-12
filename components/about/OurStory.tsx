"use client";

import { useRef, useEffect } from "react";
import { m, useInView } from "framer-motion";
// gsap + ScrollTrigger dynamically imported inside useEffect

export default function OurStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!lineRef.current) return;
    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

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
    };
    init();
  }, []);

  return (
    <section id="mission" ref={sectionRef} className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <div>
          <m.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-semibold text-[#6B7280] tracking-widest uppercase mb-3"
          >
            The Foundation
          </m.p>
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[2rem] lg:text-[2.4rem] font-bold text-[#1A1D26] leading-tight tracking-tight"
          >
            Built for Clarity and Scale
          </m.h2>
          <div ref={lineRef} className="mt-5 h-[2px] w-full bg-[#1A1D26]/10 rounded-full" />
        </div>

        {/* Right */}
        <div className="flex flex-col gap-5">
          <m.p
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
          </m.p>

          <m.div
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="border-l-2 border-[#6063EE] pl-5"
          >
            <p className="text-[14px] font-semibold text-[#1A1D26] leading-relaxed">
              Educational institutions deserve systems built for clarity, reliability, and scale. We didn't just build a dashboard; we built an institutional operating system that respects the complexities of the modern learning environment.
            </p>
          </m.div>
        </div>
      </div>
    </section>
  );
}
