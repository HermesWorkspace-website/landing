"use client";

import dynamic from "next/dynamic";
import Stats from "@/components/Home_sections/Stats";

const Hero = dynamic(() => import("@/components/Home_sections/homehero"), {
  ssr: false,
  loading: () => <div className="min-h-screen" />,
});
const MobilePage = dynamic(() => import("@/components/Home_sections/Mobile"), {
<<<<<<< HEAD
  loading: () => <div className="h-screen w-full" />,
=======
  loading: () => <div id="features" className="h-screen w-full" />,
>>>>>>> 23d55c2ba47066dd01e8acf95020645a81280769
});
const Features = dynamic(() => import("@/components/Home_sections/Features"), {
  ssr: false,
  loading: () => <div id="features" className="py-section" />,
});
const WorkflowBento = dynamic(
  () => import("@/components/Home_sections/WorkflowBento"),
  { ssr: false, loading: () => <div className="py-section" /> }
);
const Pricing = dynamic(() => import("@/components/Home_sections/Pricing"), {
  ssr: false,
  loading: () => <div className="py-section" />,
});
const FAQ = dynamic(() => import("@/components/Home_sections/FAQ"), {
  ssr: false,
  loading: () => <div className="py-section" />,
});
const CTA = dynamic(() => import("@/components/Home_sections/CTA"), {
  ssr: false,
  loading: () => <div className="py-section" />,
});

export default function HomeClient() {
  return (
    <>
      <div className="md:hidden">
        <MobilePage />
      </div>
      <main className="hidden md:block relative overflow-x-hidden min-h-screen">
        <Hero />
        <Stats />
        <Features />
        <WorkflowBento />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
    </>
  );
}