"use client";
import { FoundersShowcase } from "@/components/founders";
import HeroSection from "@/components/founders/founderHero";
import MissionSection from "@/components/founders/mission";
import FAQItem from "@/components/founders/FAQ";
import CTASection from "@/components/founders/CTA";
import { useEffect, useState } from "react";
import MobilePage from "@/components/founders/Mobile";

export default function FounderClient() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    setMounted(true);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!mounted) return null;

  if (isMobile) return <MobilePage />;

  return (
    <>
      <HeroSection />
      <FoundersShowcase />
      <MissionSection />
      <FAQItem />
      <CTASection />
    </>
  );
}
