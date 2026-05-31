"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useInView(options: UseInViewOptions = {}) {
  const { threshold = 0.15, rootMargin = "0px", once = true } = options;
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  const thresholdRef = useRef(threshold);
  const rootMarginRef = useRef(rootMargin);
  const onceRef = useRef(once);

  useEffect(() => {
    thresholdRef.current = threshold;
    rootMarginRef.current = rootMargin;
    onceRef.current = once;
  }, [threshold, rootMargin, once]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (onceRef.current) observer.unobserve(el);
        } else if (!onceRef.current) {
          setInView(false);
        }
      },
      { threshold: thresholdRef.current, rootMargin: rootMarginRef.current }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}
