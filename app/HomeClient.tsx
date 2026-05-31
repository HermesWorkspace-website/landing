"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/Home_sections/homehero";
import Stats from "@/components/Home_sections/Stats";
import { useEffect, useState } from "react";

// Below-fold sections are lazy-loaded so they don't block the initial paint.
const Features = dynamic(() => import("@/components/Home_sections/Features"), {
  ssr: false,
  loading: () => <div className="py-section" />,
});
const WorkflowBento = dynamic(
  () => import("@/components/Home_sections/WorkflowBento"),
  { ssr: false, loading: () => <div className="py-section" /> }
);
const Pricing = dynamic(() => import("@/components/Home_sections/Pricing"), {
  ssr: false,
  loading: () => <div className="py-section" />,
});
const FAQ = dynamic(() => import("@/components/Home_sections/FAQ"), {
  ssr: false,
  loading: () => <div className="py-section" />,
});
const CTA = dynamic(() => import("@/components/Home_sections/CTA"), {
  ssr: false,
  loading: () => <div className="py-section" />,
});
const MobilePage = dynamic(
  () => import("@/components/Home_sections/Mobile"),
  { ssr: false }
);

export default function HomeClient() {
  const [isMobile, setIsMobile] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    setReady(true);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!ready) return null;

  if (isMobile) {
    return (
      <main className="relative overflow-x-hidden">
        <MobilePage />
      </main>
    );
  }

  return (
    <main className="relative overflow-x-hidden">
      <Hero />
      <Stats />
      <Features />
      <WorkflowBento />
      <Pricing />
      <FAQ />
      <CTA />
    </main>
  );
}
