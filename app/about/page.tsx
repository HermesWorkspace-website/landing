
import Hero from "@/components/about/Hero";
import OurStory from "@/components/about/OurStory";
import Philosophy from "@/components/about/Philosophy";
import Ecosystem from "@/components/about/Ecosystem";
import LeadershipTeam from "@/components/about/LeadershipTeam";
import Stats from "@/components/about/Stats";
import FAQ from "@/components/about/FAQ";
import CTA from "@/components/about/CTA";

export default function AboutPage() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <OurStory />
      <Philosophy />
      <Ecosystem />
      <LeadershipTeam />
      <Stats />
      <FAQ />
      <CTA />
    </main>
  );
}
