"use client"
import { FoundersShowcase } from "@/components/founders";
import HeroSection from "@/components/founders/founderHero";
import MissionSection from "@/components/founders/mission";
import FAQItem from "@/components/founders/FAQ"
import CTASection from "@/components/founders/CTA"; 
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const scrollParam = urlParams.get("scroll");

  if (scrollParam === "founders") {
    setTimeout(() => {
      const inquirySection = document.getElementById("founders");

      if (inquirySection) {
        const headerOffset = 60;

        const elementPosition =
          inquirySection.getBoundingClientRect().top;

        const offsetPosition =
          elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // clean URL
        window.history.replaceState({}, "", "/founder");
      }
    }, 500);
  }
}, []);
return (
  <>
  <HeroSection/>
<FoundersShowcase/>
<MissionSection/>
<FAQItem/>
<CTASection/>
</>
)
}
