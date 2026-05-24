"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  {
    value: 8,
    suffix: "+",
    label: "CORE INSTITUTIONAL MODULES",
    desc: "Communication, meetings, notices, academic coordination, analytics, and operational systems unified into one platform.",
  },

  {
    value: 24,
    suffix: "+",
    label: "CONNECTED WORKFLOWS",
    desc: "Designed to streamline institutional coordination across administrators, teachers, students, and academic operations.",
  },

  {
    value: 100,
    suffix: "%",
    label: "FOCUSED ON EDUCATION",
    desc: "Built specifically for educational institutions rather than adapting generic workplace software into academic environments.",
  },
];

function useCounter(end: number, duration: number, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * end);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger, end, duration]);
  return count;
}

function StatItem({ value, suffix, label, desc, index, isInView }: {
  value: number; suffix: string; label: string; desc: string; index: number; isInView: boolean;
}) {
  const count = useCounter(value, 1.8, isInView);
  const isDecimal = value % 1 !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="flex flex-col gap-3 relative"
    >
      {index < stats.length - 1 && (
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-gray-100" />
      )}
      <div className="flex items-end gap-0">
        <motion.span
          className="text-[3.2rem] font-black text-[#0A1628] leading-none tracking-tight tabular-nums"
        >
          {isDecimal ? count.toFixed(2) : Math.floor(count)}
        </motion.span>
        <span className="text-[2rem] font-black text-[#22C55E] leading-none mb-1">{suffix}</span>
      </div>
      <p className="text-[10px] font-bold text-[#6B7280] tracking-widest uppercase">{label}</p>
      <p className="text-[12px] text-[#9CA3AF] leading-relaxed max-w-xs">{desc}</p>
    </motion.div>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="bg-white py-20 px-6 border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        {stats.map((s, i) => (
          <StatItem key={s.label} {...s} index={i} isInView={isInView} />
        ))}
      </div>
    </section>
  );
}
