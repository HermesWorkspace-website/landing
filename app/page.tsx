
import Hero from "@/components/Home_sections/Hero";
import Stats from "@/components/Home_sections/Stats";
import Features from "@/components/Home_sections/Features";
import WorkflowBento from "@/components/Home_sections/WorkflowBento";
import Pricing from "@/components/Home_sections/Pricing";
import FAQ from "@/components/Home_sections/FAQ";
import CTA from "@/components/Home_sections/CTA";
import Navbar from "@/components/Home_sections/Navbar";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <WorkflowBento />
      <Pricing />
      <FAQ />
      <CTA />
      
    </main>
  );
}
