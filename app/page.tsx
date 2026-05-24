"use client";

import Hero from "@/components/Home_sections/Hero";
import Stats from "@/components/Home_sections/Stats";
import Features from "@/components/Home_sections/Features";
import WorkflowBento from "@/components/Home_sections/WorkflowBento";
import Pricing from "@/components/Home_sections/Pricing";
import FAQ from "@/components/Home_sections/FAQ";
import CTA from "@/components/Home_sections/CTA";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const scrollParam = urlParams.get("scroll");

    if (scrollParam === "pricing") {
      setTimeout(() => {
        const pricingSection = document.getElementById("pricing");

        if (pricingSection) {
          const headerOffset = 60;
          const elementPosition = pricingSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });

          // clean URL
          window.history.replaceState({}, "", "/");
        }
      }, 500);
    }
  }, []);

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
