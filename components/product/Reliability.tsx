"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
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

function useCounter(end: number, duration: number, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / (duration * 1000), 1);
      setCount((1 - Math.pow(1 - p, 3)) * end);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger, end, duration]);
  return count;
}

function StatItem({ value, suffix, label, desc, index, isInView }: {
  value: number; suffix: string; label: string; desc: string; index: number; isInView: boolean;
}) {
  const count = useCounter(value, 1.6, isInView);
  const isDecimal = value % 1 !== 0;
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.15 }}
      className="flex flex-col gap-2 relative">
      {index < stats.length - 1 && <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-px bg-white/8" />}
      <div className="flex items-end gap-0.5">
        <span className="text-[2.8rem] sm:text-[3.2rem] font-black text-white leading-none tracking-tight tabular-nums">
          {isDecimal ? count.toFixed(2) : Math.floor(count)}
        </span>
        <span className="text-[1.5rem] font-black text-[#22C55E] leading-none mb-1">{suffix}</span>
      </div>
      <p className="text-[10px] font-bold text-white/50 tracking-widest uppercase">{label}</p>
      <p className="text-[12px] text-white/35 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

export default function Reliability() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="bg-[#0A1628] py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 border border-[#22C55E]/25 bg-[#22C55E]/8 rounded-full px-3 py-1.5 mb-5">
                <Shield size={12} className="text-[#22C55E]" />
                <span className="text-[10px] font-bold text-[#22C55E] tracking-widest uppercase">Why HermesWorkspace</span>
              </div>
              <h2 className="text-[2rem] sm:text-[2.6rem] font-bold text-white leading-tight tracking-tight mb-4">
                Reliable communication for modern institutions.
              </h2>
              <p className="text-[14px] text-white/50 leading-relaxed max-w-md">
                HermesWorkspace helps schools replace fragmented communication systems
                with one connected platform for classes, notices, meetings,
                academic updates, and institutional coordination.
              </p>
            </motion.div>

            {/* Compliance badges */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }} className="flex flex-wrap gap-2 mt-6">
            {[
  "Web & Mobile Access",
  "Structured Communication",
  "Integrated Online Classes",
].map((b) => (
  <span
    key={b}
    className="text-[10px] font-bold px-3 py-1.5 rounded-full border border-[#22C55E]/25 text-[#22C55E] bg-[#22C55E]/8 tracking-wider"
  >
    {b}
  </span>
))}
            </motion.div>
          </div>

          {/* Right — Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
            {stats.map((s, i) => (
              <StatItem key={s.label} {...s} index={i} isInView={isInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
