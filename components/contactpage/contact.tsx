"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useIsMobile } from "@/lib/useIsMobile";
import Hero from "./contacthero";
import { MobileContactPage } from "./Mobilecontactpage";

const Features = dynamic(() => import("./Features"), { ssr: false });
const Inquiry = dynamic(() => import("./Inquiry"), { ssr: false });
const Realtime = dynamic(() => import("./Realtime"), { ssr: false });
const FAQSection = dynamic(() => import("./FAQ"), { ssr: false });
const CTASection = dynamic(() => import("./CTA"), { ssr: false });

export default function ContactPage() {
  const isMobile = useIsMobile();

  // Only run GSAP on desktop
  useEffect(() => {
    if (isMobile) return;
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
  }, [isMobile]);

  return (
    <>
      <div className="md:hidden">
        <MobileContactPage />
      </div>
      <div className="hidden md:block min-h-screen bg-white overflow-x-hidden contact-page">
        <Hero />
        <Features />
        <Inquiry />
        <Realtime />
        <FAQSection />
        <CTASection />
      </div>
    </>
  );
}