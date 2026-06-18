"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollProgress
 *
 * - Zero React re-renders on scroll: progress written directly via DOM ref.
 * - rAF-throttled scroll listener (one update per animation frame).
 * - transform: scaleX() — GPU composited, no layout/paint cost.
 * - Resets to 0 on route change via usePathname.
 * - `top` is measured dynamically from the real <header> height via
 *   ResizeObserver, so it automatically adjusts whether the secondary
 *   nav bar is present (e.g. /founder, /product) or absent (e.g. /blog).
 */
export default function ScrollProgress() {
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pathname = usePathname();

  // Reset fill to 0 on route change
  useEffect(() => {
    const bar = barRef.current;
    if (bar) bar.style.transform = "scaleX(0)";
  }, [pathname]);

  // Scroll progress logic
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    function update() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      const clamped = Math.min(Math.max(progress, 0), 1);
      if (bar) bar.style.transform = `scaleX(${clamped})`;
      rafRef.current = null;
    }

    function onScroll() {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(update);
      }
    }

    update(); // seed on mount (handles back-navigation restoring scroll pos)
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  // Dynamically track navbar height via ResizeObserver.
  // This handles pages with/without the secondary sub-nav automatically —
  // no hardcoded top values, no breakpoint guessing.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const header = document.querySelector("header");
    if (!header) return;

    function syncTop() {
      if (track) track.style.top = `${header!.getBoundingClientRect().bottom}px`;
    }

    syncTop(); // initial

    const ro = new ResizeObserver(syncTop);
    ro.observe(header);
    return () => ro.disconnect();
  }, [pathname]); // re-sync on route change (secondary nav may appear/disappear)

  return (
    <div
      ref={trackRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0, // overwritten immediately by ResizeObserver above
        left: 0,
        right: 0,
        height: "2px",
        zIndex: 49,
        background: "color-mix(in srgb, var(--brand) 10%, transparent)",
        pointerEvents: "none",
      }}
    >
      <div
        ref={barRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--brand)",
          transformOrigin: "left center",
          transform: "scaleX(0)",
          transition: "transform 120ms linear",
          willChange: "transform",
        }}
      />
    </div>
  );
}
