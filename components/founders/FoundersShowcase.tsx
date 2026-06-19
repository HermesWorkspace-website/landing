"use client";

import { FounderIdentity } from "./FounderIdentity";
import { FounderBiography } from "./FounderBiography";
import { FounderPrinciples } from "./FounderPrinciples";
import { FounderVision } from "./FounderVision";
import { FounderFoundation } from "./FounderFoundation";
import { FOUNDERS } from "./founders-data";
import CTA from "./CTA";

export function FoundersShowcase() {
  return (
    <section id="founders" className="relative w-full" style={{ background: "#fafafe" }}>
      <FounderFoundation />

      <div className="mx-auto w-full max-w-7xl px-10 py-16 lg:py-20">
        {FOUNDERS.map((founder, idx) => (
          <article
            key={founder.id}
            id={founder.firstName.toLowerCase()}
          >
            <FounderIdentity founder={founder} index={idx} />

            <div className="my-10 h-px" style={{ background: "linear-gradient(to right,#E0DDD7 60%,transparent)" }} />

            <FounderBiography founder={founder} />

            <div className="my-10 h-px" style={{ background: "linear-gradient(to right,#E0DDD7 60%,transparent)" }} />

            <FounderPrinciples founder={founder} />

            <div className="my-10 h-px" style={{ background: "linear-gradient(to right,#E0DDD7 60%,transparent)" }} />

            <FounderVision founder={founder} />

            <div className="mt-6 flex items-end">
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-semibold tracking-[0.5px] text-[#2A2A2E]">
                  {founder.firstName} {founder.lastName}
                </span>
                <span className="text-[10px] uppercase tracking-[1.8px]" style={{ color: "#7A7A85" }}>
                  {founder.title}
                </span>
              </div>
            </div>

            {idx < FOUNDERS.length - 1 && (
              <div className="my-16 lg:my-20 h-px"
                style={{ background: "linear-gradient(to right,transparent 5%,#D8D4CC 30%,#D8D4CC 70%,transparent 95%)" }} />
            )}
          </article>
        ))}
      </div>

      <CTA />
    </section>
  );
}
