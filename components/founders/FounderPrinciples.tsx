"use client";

import { useRef, useEffect } from "react";
import { Founder } from "@/types/founder";

interface FounderPrinciplesProps {
  founder: Founder;
}

/**
 * FounderPrinciples
 *
 * - Editorial statements — no decorative numbers
 * - IntersectionObserver stagger on scroll-enter
 * - Title is the primary focal point
 */
export function FounderPrinciples({ founder }: FounderPrinciplesProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-visible", "true");
          io.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [founder.id]);

  if (!founder.principles || founder.principles.length === 0) return null;

  return (
    <div ref={rootRef} className="fp-root">
      {/* Section label */}
      <p
        className="fp-label mb-4 text-[11px] font-semibold uppercase tracking-[3px]"
        style={{ color: "#6063EE" }}
      >
        Principles
      </p>

      {founder.principles!.map((principle, i) => (
        <div key={principle.title} className="fp-item" style={{ "--i": i } as React.CSSProperties}>
          <h3
            className="text-[18px] font-semibold tracking-[-0.01em] text-[#1A1A1E] leading-[1.3] mb-2"
          >
            {principle.title}
          </h3>
          <p className="text-[13px] leading-[1.78] text-[#666] mb-5">
            {principle.body}
          </p>

          {i < founder.principles!.length - 1 && (
            <div className="h-px mb-5" style={{ background: "#EDEBE6" }} />
          )}
        </div>
      ))}

      <style>{`
        .fp-label { opacity: 0; }
        .fp-item { opacity: 0; transform: translateY(12px); }
        @media (prefers-reduced-motion: no-preference) {
          .fp-label { transition: opacity 0.45s ease 0.05s; }
          .fp-item {
            transition:
              opacity 0.55s cubic-bezier(0.22,1,0.36,1),
              transform 0.55s cubic-bezier(0.22,1,0.36,1);
            transition-delay: calc(var(--i, 0) * 0.09s + 0.1s);
          }
          [data-visible="true"] .fp-label { opacity: 1; }
          [data-visible="true"] .fp-item { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fp-label, .fp-item { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}
