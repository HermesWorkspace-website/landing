
"use client";
import MobileAbout from "@/components/about/Mobileabout";
import Hero from "@/components/about/aboutHero";
import OurStory from "@/components/about/OurStory";
import Philosophy from "@/components/about/Philosophy";
import Ecosystem from "@/components/about/Ecosystem";
import LeadershipTeam from "@/components/about/LeadershipTeam";
import Stats from "@/components/about/Stats";
import FAQ from "@/components/about/FAQ";
import CTA from "@/components/about/CTA";
import { useEffect, useState } from "react";

export default function AboutPage() {
   const [isMobile, setIsMobile] = useState(false);
  const [ready, setReady] = useState(false);
 
  useEffect(() => {
    // Mobile detection
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    setReady(true);
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);
  if (!ready) return null;
 
  if (isMobile) return <MobileAbout />;
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
