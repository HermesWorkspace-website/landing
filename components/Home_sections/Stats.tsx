"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / 60;
    const timer = setInterval(() => {
      start = Math.min(start + step, to);
      setVal(Math.round(start));
      if (start >= to) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {prefix}{val.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  {
    value: 1,
    suffix: " Platform",
    label: "Centralized Communication",
    sub: "Notices, classes, meetings, and coordination unified together",
  },
  {
    value: 24,
    suffix: "/7",
    label: "Institution Connectivity",
    sub: "Students, teachers, parents, and administration always connected",
  },
  {
    value: 100,
    suffix: "%",
    label: "Administrative Visibility",
    sub: "Centralized oversight across communication workflows",
  },
  {
    value: 0,
    suffix: " WhatsApp Chaos",
    label: "Structured Institutional Workflow",
    sub: "Replace fragmented communication with organized coordination",
  },
];

export default function Stats() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-16 border-y border-black/[0.05]">
      <div className="container-page">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-1"
            >
              <div className="font-display font-extrabold text-brand-ink leading-tight mb-2">
                <span className="text-[2.5rem] md:text-[3.25rem] tracking-tight">
                  {inView ? <Counter to={s.value} /> : "0"}
                </span>
                <span className="text-xl md:text-2xl font-bold tracking-tight text-brand-ink/80 whitespace-pre-wrap">
                  {s.suffix}
                </span>
              </div>
              <div className="text-[0.9375rem] font-semibold font-body text-brand-ink">{s.label}</div>
              <div className="text-xs text-brand-muted font-body">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
