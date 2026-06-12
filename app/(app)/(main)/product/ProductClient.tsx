"use client";
import dynamic from "next/dynamic";
import Hero from "@/components/product/producthero";
import { MobileProductPage } from "@/components/product/Mobileproductpage";

const InMotion = dynamic(() => import("@/components/product/InMotion"), { ssr: false });
const CoreModules = dynamic(() => import("@/components/product/CoreModules"), { ssr: false });
const DesignedForClarity = dynamic(() => import("@/components/product/DesignedForClarity"), { ssr: false });
const ProblemSolution = dynamic(() => import("@/components/product/ProblemSolution"), { ssr: false });
const Community = dynamic(() => import("@/components/product/Community"), { ssr: false });
const Reliability = dynamic(() => import("@/components/product/Reliability"), { ssr: false });
const CTASection = dynamic(() => import("@/components/product/CTA"), { ssr: false });

export default function ProductClient() {
  return (
    <>
      <div className="md:hidden">
        <MobileProductPage />
      </div>
      <main className="hidden md:block overflow-x-hidden min-h-screen">
        <Hero />
        <InMotion />
        <CoreModules />
        <DesignedForClarity />
        <ProblemSolution />
        <Community />
        <Reliability />
        <CTASection />
      </main>
    </>
  );
}
