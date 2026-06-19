"use client";
<<<<<<< HEAD
import dynamic from "next/dynamic";
import HeroSection from "@/components/founders/founderHero";
import MobilePage from "@/components/founders/Mobile";
=======

import dynamic from "next/dynamic";
import { FounderHero } from "@/components/founders/FounderHero";

/**
 * FoundersShowcase — desktop only, lazy-loaded (JS code-split, SSR renders HTML).
 * IntersectionObserver APIs run inside useEffect — safe for server render.
 */
const FoundersShowcase = dynamic(
  () =>
    import("@/components/founders/FoundersShowcase").then((m) => ({
      default: m.FoundersShowcase,
    }))
);

/**
 * MobileFoundersShowcase — mobile only, lazy-loaded (JS code-split, SSR renders HTML).
 */
const MobileFoundersShowcase = dynamic(
  () => import("@/components/founders/MobileFoundersShowcase")
);
>>>>>>> 23d55c2ba47066dd01e8acf95020645a81280769

const FoundersShowcase = dynamic(() => import("@/components/founders").then(m => ({ default: m.FoundersShowcase })), { ssr: false });
const MissionSection = dynamic(() => import("@/components/founders/mission"), { ssr: false });
const FAQItem = dynamic(() => import("@/components/founders/FAQ"), { ssr: false });
const CTASection = dynamic(() => import("@/components/founders/CTA"), { ssr: false });

export default function FounderClient() {
  return (
    <>
<<<<<<< HEAD
      <div className="md:hidden">
        <MobilePage />
      </div>
      <div className="hidden md:block min-h-screen">
        <HeroSection />
        <FoundersShowcase />
        <MissionSection />
        <FAQItem />
        <CTASection />
=======
      {/* Hero is pure HTML/CSS — safe to SSR, contributes to LCP */}
      <FounderHero />

      {/*
        Responsive split:
        - Below md (< 768px) → MobileFoundersShowcase
        - md and above (≥ 768px) → FoundersShowcase

        Both are rendered in the DOM but hidden via Tailwind.
        This avoids a JS-gated hydration mismatch that would cause
        a flicker or layout shift on first paint.

        If bundle size is a concern, swap to a useMediaQuery hook
        and render only one — but that delays paint on mobile.
      */}
      <div className="md:hidden">
        <MobileFoundersShowcase />
      </div>

      <div className="hidden md:block">
        <FoundersShowcase />
>>>>>>> 23d55c2ba47066dd01e8acf95020645a81280769
      </div>
    </>
  );
}