"use client";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/socials";
import { MobileSocialsPage } from "@/components/socials/Mobilepage";

const EcosystemSection = dynamic(() => import("@/components/socials").then(m => ({ default: m.EcosystemSection })), { ssr: false });
const TrustSection = dynamic(() => import("@/components/socials").then(m => ({ default: m.TrustSection })), { ssr: false });
const InstitutionalPulse = dynamic(() => import("@/components/socials").then(m => ({ default: m.InstitutionalPulse })), { ssr: false });
const StatsSection = dynamic(() => import("@/components/socials").then(m => ({ default: m.StatsSection })), { ssr: false });
const CtaSection = dynamic(() => import("@/components/socials").then(m => ({ default: m.CtaSection })), { ssr: false });

export default function SocialsClient() {
  return (
    <>
      <div className="md:hidden">
        <MobileSocialsPage />
      </div>
      <div className="hidden md:block min-h-screen">
        <HeroSection />
        <EcosystemSection />
        <TrustSection />
        <InstitutionalPulse />
        <StatsSection />
        <CtaSection />
      </div>
    </>
  );
}
