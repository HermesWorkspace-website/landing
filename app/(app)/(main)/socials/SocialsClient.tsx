"use client";
import {
  HeroSection,
  EcosystemSection,
  TrustSection,
  InstitutionalPulse,
  StatsSection,
  // ImageGallery,
  CtaSection,
} from "@/components/socials";
import { MobileSocialsPage } from "@/components/socials/Mobilepage";

export default function SocialsClient() {
  return (
    <>
      <div className="hidden md:block">
        <HeroSection />
        <EcosystemSection />
        <TrustSection />
        <InstitutionalPulse />
        <StatsSection />
        {/* <ImageGallery /> */}
        <CtaSection />
      </div>
      <div className="block md:hidden">
        <MobileSocialsPage />
      </div>
    </>
  );
}
