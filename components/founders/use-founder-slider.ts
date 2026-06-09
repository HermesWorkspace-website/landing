"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { FOUNDERS } from "./founders-data";

const SLIDE_DURATION = 6000; // ms

export function useFounderSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [startTime, setStartTime] = useState(() => Date.now());

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning || index === activeIndex) return;
      setIsTransitioning(true);
      setPrevIndex(activeIndex);
      setActiveIndex(index);
      setProgress(0);
      setStartTime(Date.now());
      setTimeout(() => {
        setIsTransitioning(false);
        setPrevIndex(null);
      }, 900);
    },
    [activeIndex, isTransitioning]
  );

  const goNext = useCallback(() => {
    goTo((activeIndex + 1) % FOUNDERS.length);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo((activeIndex - 1 + FOUNDERS.length) % FOUNDERS.length);
  }, [activeIndex, goTo]);

  // Auto-advance
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      goNext();
    }, SLIDE_DURATION);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [goNext]);

  // Progress ticker
  useEffect(() => {
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min((elapsed / SLIDE_DURATION) * 100, 100));
    }, 50);
    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [activeIndex]);

  return {
    founders: FOUNDERS,
    activeIndex,
    prevIndex,
    isTransitioning,
    progress,
    goTo,
    goNext,
    goPrev,
  };
}
