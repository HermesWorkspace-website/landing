"use client"
import { useState, useEffect } from "react";

import Hero from "@/components/product/producthero";
import InMotion from "@/components/product/InMotion";
import CoreModules from "@/components/product/CoreModules";
import DesignedForClarity from "@/components/product/DesignedForClarity";
import ProblemSolution from "@/components/product/ProblemSolution";
import Community from "@/components/product/Community";
import Reliability from "@/components/product/Reliability";
import CTA from "@/components/product/CTA";
import {MobileProductPage} from "@/components/product/Mobileproductpage";

export default function ProductPage() {
   const [isMobile, setIsMobile] = useState(false);
  const [ready, setReady] = useState(false);
 
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    setReady(true);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
 
  if (!ready) return null;
  if (isMobile) return <MobileProductPage />;
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
