"use client";

import dynamic from "next/dynamic";
import { FounderHero } from "@/components/founders";

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

export default function FounderClient() {
  return (
    <>
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
      </div>
    </>
  );
}