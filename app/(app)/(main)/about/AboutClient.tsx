"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/about/aboutHero";
import MobileAbout from "@/components/about/Mobileabout";
<<<<<<< HEAD
const OurStory = dynamic(() => import("@/components/about/OurStory"), { ssr: false });
const Philosophy = dynamic(() => import("@/components/about/Philosophy"), { ssr: false });
const Ecosystem = dynamic(() => import("@/components/about/Ecosystem"), { ssr: false });
const LeadershipTeam = dynamic(() => import("@/components/about/LeadershipTeam"), { ssr: false });
=======
import { FounderShowcase } from "@/components/about/FounderShowcase";
const OurStory = dynamic(() => import("@/components/about/OurStory"), {
  ssr: false,
  loading: () => <div id="our-story" className="py-24" />,
});
const Philosophy = dynamic(() => import("@/components/about/Philosophy"), { ssr: false });
const Ecosystem = dynamic(() => import("@/components/about/Ecosystem"), { ssr: false });
>>>>>>> 23d55c2ba47066dd01e8acf95020645a81280769
const Stats = dynamic(() => import("@/components/about/Stats"), { ssr: false });
const FAQSection = dynamic(() => import("@/components/about/FAQ"), { ssr: false });
const CTASection = dynamic(() => import("@/components/about/CTA"), { ssr: false });

export default function AboutClient() {
  return (
    <>
      <div className="md:hidden">
        <MobileAbout />
      </div>
      <main className="hidden md:block overflow-x-hidden min-h-screen">
        <Hero />
        <OurStory />
        <Philosophy />
        <Ecosystem />
<<<<<<< HEAD
        <LeadershipTeam />
=======
        <FounderShowcase />
>>>>>>> 23d55c2ba47066dd01e8acf95020645a81280769
        <Stats />
        <FAQSection />
        <CTASection />
      </main>
    </>
  );
}
