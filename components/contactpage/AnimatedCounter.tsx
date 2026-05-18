"use client";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  decimals?: number;
  delay?: number;
}

export default function AnimatedCounter({ target, suffix = "", decimals = 0, delay = 0 }: AnimatedCounterProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => {
      let start = 0;
      const steps = 60;
      const inc = target / steps;
      const timer = setInterval(() => {
        start += inc;
        if (start >= target) {
          setValue(target);
          clearInterval(timer);
        } else {
          setValue(start);
        }
      }, 20);
    }, delay);
    return () => clearTimeout(timeout);
  }, [inView, target, delay]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toFixed(decimals)}{suffix}
    </span>
  );
}
