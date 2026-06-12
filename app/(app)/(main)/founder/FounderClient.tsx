"use client";
import dynamic from "next/dynamic";
import HeroSection from "@/components/founders/founderHero";
import MobilePage from "@/components/founders/Mobile";

const FoundersShowcase = dynamic(() => import("@/components/founders").then(m => ({ default: m.FoundersShowcase })), { ssr: false });
const MissionSection = dynamic(() => import("@/components/founders/mission"), { ssr: false });
const FAQItem = dynamic(() => import("@/components/founders/FAQ"), { ssr: false });
const CTASection = dynamic(() => import("@/components/founders/CTA"), { ssr: false });

export default function FounderClient() {
  return (
    <>
      <div className="md:hidden">
        <MobilePage />
      </div>
      <div className="hidden md:block min-h-screen">
        <HeroSection />
        <FoundersShowcase />
        <MissionSection />
        <FAQItem />
        <CTASection />
      </div>
    </>
  );
}
