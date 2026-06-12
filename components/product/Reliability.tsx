"use client";

import { useRef, useEffect, useState } from "react";
import { m, useInView } from "framer-motion";
import { Shield } from "lucide-react";

const stats = [
  {
    value: 1,
    suffix: "",
    label: "CONNECTED PLATFORM",
    desc: "Classes, communication, notices, meetings, and coordination unified in one system.",
  },

  {
    value: 3,
    suffix: "+",
    label: "INSTITUTIONAL ROLES",
    desc: "Built for administrators, teachers, students, and connected parent visibility.",
  },

  {
    value: 24,
    suffix: "/7",
    label: "ACCESSIBILITY",
    desc: "Accessible across web and mobile for continuous institutional communication.",
  },
];

import { animate } from "framer-motion";

function useCounter(end: number, duration: number) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || started) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0, rootMargin: "0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const controls = animate(0, end, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setCount(v),
    });
    return controls.stop;
  }, [started, end, duration]);

  return { count, ref };
}

function StatItem({ value, suffix, label, desc, index }: {
  value: number; suffix: string; label: string; desc: string; index: number;
}) {
  const { count, ref } = useCounter(value, 1.6);
  const isDecimal = value % 1 !== 0;
  return (
    <m.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.15 }}
      className="flex flex-col gap-2 relative">
      {index < stats.length - 1 && <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-px bg-white/8" />}
      <div className="flex items-end gap-0.5">
        <span className="text-[2.8rem] sm:text-[3.2rem] font-black text-white leading-none tracking-tight tabular-nums" ref={ref}>
          {isDecimal ? count.toFixed(2) : Math.floor(count)}
        </span>
        <span className="text-[1.5rem] font-black text-[#6063EE] leading-none mb-1">{suffix}</span>
      </div>
      <p className="text-[10px] font-bold text-white/50 tracking-widest uppercase">{label}</p>
      <p className="text-[12px] text-white/35 leading-relaxed">{desc}</p>
    </m.div>
  );
}

export default function Reliability() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="bg-[#12141D] py-16 sm:py-24">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <div>
            <m.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 border border-[#6063EE]/25 bg-[#6063EE]/8 rounded-full px-3 py-1.5 mb-5">
                <Shield size={12} className="text-[#6063EE]" />
                <span className="text-[10px] font-bold text-[#6063EE] tracking-widest uppercase">Why HermesWorkspace</span>
              </div>
              <h2 className="text-[2rem] sm:text-[2.6rem] font-bold text-white leading-tight tracking-tight mb-4">
                Reliable communication for modern institutions.
              </h2>
              <p className="text-[14px] text-white/50 leading-relaxed max-w-md">
                HermesWorkspace helps schools replace fragmented communication systems
                with one connected platform for classes, notices, meetings,
                academic updates, and institutional coordination.
              </p>
            </m.div>

            {/* Compliance badges */}
            <m.div initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }} className="flex flex-wrap gap-2 mt-6">
            {[
  "Web & Mobile Access",
  "Structured Communication",
  "Integrated Online Classes",
].map((b) => (
  <span
    key={b}
    className="text-[10px] font-bold px-3 py-1.5 rounded-full border border-[#6063EE]/25 text-[#6063EE] bg-[#6063EE]/8 tracking-wider"
  >
    {b}
  </span>
))}
            </m.div>
          </div>

          {/* Right — Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
            {stats.map((s, i) => (
              <StatItem key={s.label} {...s} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
