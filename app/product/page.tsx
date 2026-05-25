import Hero from "@/components/product/Hero";
import InMotion from "@/components/product/InMotion";
import CoreModules from "@/components/product/CoreModules";
import DesignedForClarity from "@/components/product/DesignedForClarity";
import ProblemSolution from "@/components/product/ProblemSolution";
import Community from "@/components/product/Community";
import Reliability from "@/components/product/Reliability";
import CTA from "@/components/product/CTA";

export default function ProductPage() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <InMotion />
      <CoreModules />
      <DesignedForClarity />
      <ProblemSolution />
      <Community />
      <Reliability />
      <CTA />
    </main>
  );
}
