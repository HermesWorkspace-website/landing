"use client";
import React, { useEffect, useState } from "react";
import Hero from "./contacthero";
import Features from "./Features";
import Inquiry from "./Inquiry";
import Realtime from "./Realtime";
import FAQ from "./FAQ";
import CTA from "./CTA";
import { MobileContactPage } from "./Mobilecontactpage";

export default function ContactPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(true);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Only run GSAP on desktop
  useEffect(() => {
    if (!ready || isMobile) return;
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
  }, [ready, isMobile]);

  if (!ready) return null;
  if (isMobile) return <MobileContactPage />;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden contact-page">
      <Hero />
      <Features />
      <Inquiry />
      <Realtime />
      <FAQ />
      <CTA />
    </div>
  );
}