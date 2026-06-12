"use client";
import React from "react";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThreePricingBackground from "./ThreePricingBackground";
import Link from "next/link";

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
  return (
    <section id="pricing" className="relative py-section overflow-hidden">
      <ThreePricingBackground />

      <div className="container-page relative z-10">
        {/* Header */}
        <div className="text-center max-w-[520px] mx-auto mb-12">
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
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                tier.featured
                  ? "bg-[#1A1C1D] border-transparent shadow-[0_20px_60px_rgba(0,0,0,0.25)] md:-mt-4"
                  : "bg-white border-black/10 md:mt-4"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-0 w-full flex justify-center z-10">
                  <span className="inline-flex items-center gap-1 bg-brand text-white text-[10px] font-semibold px-3 py-1 rounded-full font-body">
                    <Sparkles className="size-3 text-yellow-300" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Tier info */}
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
                  className={`mt-4 text-sm font-body leading-relaxed ${
                    tier.featured ? "text-white/60" : "text-brand-muted"
                  }`}
                >
                  {tier.desc}
                </p>
              </div>

              {/* CTA */}
              <Button
                asChild
                className={`w-full justify-center gap-2 mb-6 ${
                  tier.featured
                    ? "bg-white text-brand-ink hover:bg-white/90"
                    : tier.name === "Olympus"
                    ? "bg-transparent border border-black/10 text-brand-ink hover:bg-black/[0.04]"
                    : "bg-brand-ink text-white hover:opacity-90"
                }`}
              >
                <Link href="/contact?scroll=inquiry">
                  {tier.cta}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>

              {/* Divider */}
              <div
                className={`h-px mb-5 ${
                  tier.featured ? "bg-white/10" : "bg-black/[0.06]"
                }`}
              />

              {/* Features */}
              <ul className="space-y-3 flex-1">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className={`flex items-start gap-2.5 text-sm font-body ${
                      tier.featured ? "text-white/80" : "text-brand-ink/75"
                    }`}
                  >
                    <Check
                      className={`size-4 mt-0.5 shrink-0 ${
                        tier.featured ? "text-green-400" : "text-green-600"
                      }`}
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-brand-muted mt-10 font-body">
          Institutional deployment pricing may vary based on operational requirements. GST applicable as per government regulations.
        </p>
      </div>
    </section>
  );
}
