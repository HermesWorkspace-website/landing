"use client";
import { useEffect, useRef } from "react";
import { useIsMobile } from "@/lib/useIsMobile";

type LenisInstance = InstanceType<typeof import("lenis").default>;

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisInstance | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;

    let lenisInstance: LenisInstance | null = null;
    let destroyed = false;

    const init = async () => {
      const Lenis = (await import("lenis")).default;
      if (destroyed) return;

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 1.5,
        infinite: false,
      });

      lenisInstance = lenis;
      lenisRef.current = lenis;

      try {
        const gsapMod = (await import("gsap")).default;
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsapMod.registerPlugin(ScrollTrigger);

        lenis.on("scroll", ScrollTrigger.update);

        gsapMod.ticker.add((time: number) => {
          lenis.raf(time * 1000);
        });

        gsapMod.ticker.lagSmoothing(0);

        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });

        window.addEventListener("load", () => {
          setTimeout(() => ScrollTrigger.refresh(), 100);
        });
      } catch {
        const raf = (time: number) => {
          lenis.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      }

      const onScrollTo = (event: Event) => {
        const { top, behavior } = (event as CustomEvent<{ top: number; behavior?: ScrollBehavior }>).detail;
        if (behavior === "auto") {
          lenis.scrollTo(top, { immediate: true });
        } else {
          lenis.scrollTo(top);
        }
      };

      window.addEventListener("hermes:scroll-to", onScrollTo);
    };

    init();

    return () => {
      destroyed = true;
      lenisInstance?.destroy();
    };
  }, [isMobile]);

  return <>{children}</>;
}
