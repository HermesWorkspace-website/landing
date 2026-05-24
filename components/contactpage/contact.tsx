"use client";
import React, { useEffect } from "react";
import Hero from "./Hero";
import Features from "./Features";
import Inquiry from "./Inquiry";
import Realtime from "./Realtime";
import FAQ from "./FAQ";
import CTA from "./CTA";

export default function ContactPage() {
  useEffect(() => {
    (async () => {
      try {
        const gsap = (await import("gsap")).default;
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        document.querySelectorAll<HTMLElement>(".gsap-reveal").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            }
          );
        });

        // Horizontal parallax for section headings
        document.querySelectorAll<HTMLElement>(".gsap-parallax").forEach((el) => {
          gsap.to(el, {
            x: -40,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
          });
        });
      } catch {
        // GSAP not available
      }
    })();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-white overflow-x-hidden contact-page">
        
        <Hero />
        <Features />
        <Inquiry />
        <Realtime />
        <FAQ />
        <CTA />
      </div>
    </>
  );
}
