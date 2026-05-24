import {
  
  HeroSection,
  EcosystemSection,
  TrustSection,
  InstitutionalPulse,
  StatsSection,
  ImageGallery,
  CtaSection,
} from "@/components/socials";

export default function HomePage() {
  return (
    <main className="relative">
      <HeroSection />
      <EcosystemSection />
      <TrustSection />
      <InstitutionalPulse />
      <StatsSection />
      <ImageGallery />
      <CtaSection />
    </main>
  );
}
