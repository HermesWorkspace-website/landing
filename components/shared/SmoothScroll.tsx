"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Integrate with GSAP ScrollTrigger
    const initGSAP = async () => {
      try {
        const gsapMod = (await import("gsap")).default;
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsapMod.registerPlugin(ScrollTrigger);

        // Connect Lenis scroll events to ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        // Drive Lenis from GSAP ticker for frame-perfect sync
        gsapMod.ticker.add((time: number) => {
          lenis.raf(time * 1000);
        });

        gsapMod.ticker.lagSmoothing(0);

        // Refresh ScrollTrigger after Lenis is ready and DOM has settled.
        // This ensures all trigger positions are calculated with Lenis active.
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });

        // Also refresh after all images/fonts finish loading
        window.addEventListener("load", () => {
          setTimeout(() => ScrollTrigger.refresh(), 100);
        });
      } catch {
        // Fallback: use rAF loop if GSAP not available
        const raf = (time: number) => {
          lenis.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      }
    };

    initGSAP();

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
