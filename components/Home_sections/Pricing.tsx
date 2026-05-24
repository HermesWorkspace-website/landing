"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ThreePricingBackground from "./ThreePricingBackground";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const tiers = [
  {
    name: "Basic",
    tagline: "For schools starting digital coordination",
    desc: "Everything needed to manage communication, notices, online classes, meetings, and academic updates through one organized platform.",
    features: [
      "Centralized school communication",
      "Online classes & meetings",
      "Digital notice board",
      "Academic resource sharing",
      "Event & activity management",
      "Administrative dashboard",
      "Mobile & web access",
      "Onboarding assistance",
    ],
    cta: "Request Demo",
    featured: false,
  },
  {
    name: "Premium",
    tagline: "For actively growing institutions",
    desc: "Built for schools managing larger communication, online sessions, parent meetings, and institutional coordination daily.",
    features: [
      "Everything in Basic",
      "Higher live-session capacity",
      "Advanced communication workflows",
      "Expanded meeting support",
      "Priority onboarding",
      "Enhanced administrative controls",
      "Improved operational scalability",
      "Priority support access",
    ],
    cta: "Schedule Consultation",
    featured: true,
  },
  {
    name: "Olympus",
    tagline: "For large schools & campus-scale operations",
    desc: "Dedicated deployment solutions for institutions requiring advanced infrastructure, operational flexibility, and institution-scale coordination.",
    features: [
      "Everything in Premium",
      "Scalable infrastructure support",
      "Custom operational workflows",
      "Advanced deployment planning",
      "Enterprise-grade coordination systems",
      "Dedicated support assistance",
      "Institution-focused onboarding",
      "Custom infrastructure consultation",
    ],
    cta: "Contact Our Team",
    featured: false,
  },
];

export default function Pricing() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(".pricing-header", {
        opacity: 0,
        y: 24,
        duration: 0.75,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current || undefined, start: "top 80%" },
      });

      // Cards stagger animation
      gsap.from(".pricing-card-gsap", {
        opacity: 0,
        y: 32,
        duration: 0.75,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current || undefined, start: "top 70%" },
      });

      // Feature items and badge stagger per card
      gsap.utils.toArray(".pricing-card-gsap").forEach((card: any, index: number) => {
        const q = gsap.utils.selector(card);
        
        // Sync badge with the parent card
        const badge = q(".pricing-badge");
        if (badge.length) {
          gsap.from(badge, {
            opacity: 0,
            scale: 0.5,
            duration: 0.6,
            delay: index * 0.12 + 0.1, // Pop up right as the card starts sliding in
            ease: "back.out(1.5)",
            scrollTrigger: { trigger: ref.current || undefined, start: "top 70%" },
          });
        }

        gsap.from(q(".feature-item"), {
          opacity: 0,
          x: -10,
          duration: 0.4,
          stagger: 0.05,
          delay: index * 0.12 + 0.3,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current || undefined, start: "top 70%" },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="pricing" className="relative py-section overflow-hidden">
      <ThreePricingBackground />
      
      <div className="container-page relative z-10">
        {/* Header */}
        <div className="pricing-header text-center max-w-[520px] mx-auto mb-12">
          <span className="section-eyebrow">Pricing</span>
          <h2 className="font-display text-display-xl font-extrabold text-brand-ink mt-3 tracking-[-0.03em]">
            Transparent pricing.
            <br />
            <span className="gradient-text-brand">No surprises.</span>
          </h2>
          <p className="mt-4 text-body-lg text-brand-muted font-body">
            All plans include unlimited base features. Pay only for what you scale.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch pt-4 pb-8">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`pricing-card-gsap pricing-card relative h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                tier.featured ? "featured md:-mt-4" : "md:mt-4"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-0 w-full flex justify-center z-10 pointer-events-none">
                  <div className="pricing-badge pointer-events-auto">
                    <span className="inline-flex items-center gap-1 bg-brand text-white text-[10px] font-semibold px-3 py-1 rounded-full shadow-glow font-body">
                      <Sparkles className="w-3 h-3 text-yellow-300" />
                      Most Popular
                    </span>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <div
                  className={`text-[11px] font-semibold uppercase tracking-widest mb-1 font-body ${
                    tier.featured ? "text-white/50" : "text-brand-muted"
                  }`}
                >
                  {tier.tagline}
                </div>
                <div
                  className={`font-display text-2xl font-bold ${
                    tier.featured ? "text-white" : "text-brand-ink"
                  }`}
                >
                  {tier.name}
                </div>
                <p
                  className={`mt-4 text-sm font-body ${
                    tier.featured ? "text-white/60" : "text-brand-muted"
                  }`}
                >
                  {tier.desc}
                </p>
              </div>

              <Button
                asChild
                variant={tier.featured ? "outline" : "default"}
                className={`w-full justify-center gap-2 mb-6 group/btn transition-transform active:scale-[0.98] ${
                  tier.featured
                    ? "bg-white text-brand-ink hover:bg-white/90"
                    : tier.name === "Olympus"
                    ? "bg-transparent border border-black/10 text-brand-ink hover:bg-black/[0.03]"
                    : ""
                }`}
              >
                <Link href="/contact?scroll=inquiry">
                  {tier.cta}{" "}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </Button>

              <div
                className={`h-px mb-5 ${
                  tier.featured ? "bg-white/10" : "bg-black/[0.06]"
                }`}
              />

              <ul className="space-y-3 flex-1">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className={`feature-item flex items-start gap-2.5 text-sm font-body ${
                      tier.featured ? "text-white/80" : "text-brand-ink/75"
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="shrink-0"
                    >
                      <Check
                        className={`w-4 h-4 mt-0.5 ${
                          tier.featured ? "text-green-400" : "text-green-600"
                        }`}
                      />
                    </motion.div>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-center text-sm text-brand-muted mt-10 font-body">
            Institutional deployment pricing may vary based on operational requirements. GST applicable as per government regulations.
          </p>
        </div>
      </div>
    </section>
  );
}
