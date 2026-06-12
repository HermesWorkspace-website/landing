"use client";

import { useRef, useEffect, useState } from "react";
import { m } from "framer-motion";

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
  const { count, ref } = useCounter(value, 1.8);
  const isDecimal = value % 1 !== 0;

  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="flex flex-col gap-3 relative"
    >
      {index < stats.length - 1 && (
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-gray-100" />
      )}
      <div className="flex items-end gap-0">
        <m.span
          ref={ref}
          className="text-[3.2rem] font-black text-[#1A1D26] leading-none tracking-tight tabular-nums"
        >
          {isDecimal ? count.toFixed(2) : Math.floor(count)}
        </m.span>
        <span className="text-[2rem] font-black text-[#6063EE] leading-none mb-1">{suffix}</span>
      </div>
      <p className="text-[10px] font-bold text-[#6B7280] tracking-widest uppercase">{label}</p>
      <p className="text-[12px] text-[#9CA3AF] leading-relaxed max-w-xs">{desc}</p>
    </m.div>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="bg-white py-20 px-6 border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        {stats.map((s, i) => (
          <StatItem key={s.label} {...s} index={i} />
        ))}
      </div>
    </section>
  );
}
