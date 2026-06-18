"use client";

import { useRef, useEffect } from "react";
import { Founder } from "@/types/founder";

interface FounderVisionProps {
  founder: Founder;
}

/**
 * FounderVision
 *
 * Layout:
 *   Mobile (<768px): stacked — label/heading above, paragraphs below
 *   ≥768px: side-by-side [label+heading | paragraphs]
 *
 * The old code used `grid-cols-[180px_1fr]` which broke at ~600px viewports.
 * Now uses flex-col → md:flex-row with flex-shrink + min-width guards.
 *
 * Scroll-triggered CSS animation, IntersectionObserver, zero TBT.
 */
export function FounderVision({ founder }: FounderVisionProps) {
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

  if (!founder.vision || founder.vision.paragraphs.length === 0) return null;

  return (
    <div ref={rootRef} className="fv-root">
      <div className="fv-layout flex flex-col gap-7 md:flex-row md:gap-12 lg:gap-16 xl:gap-20">

        {/* Left: sticky label column */}
        <div
          className="fv-left flex flex-col gap-3"
          style={{ width: "clamp(160px, 22vw, 240px)", flexShrink: 0 }}
        >
          <p
            className="fv-label text-[11px] font-semibold uppercase tracking-[3px]"
            style={{ color: founder.accentColor }}
          >
            Vision
          </p>

          <h2
            className="fv-heading leading-[1.05] tracking-[-0.025em] text-[#0D0D0F]"
            style={{
              fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
              fontSize: "clamp(32px, 3.8vw, 48px)",
            }}
          >
            {founder.vision.heading}
          </h2>

          <div
            className="fv-rule mt-2 h-[3px] w-16 rounded-full"
            style={{ background: founder.accentColor }}
          />
        </div>

        {/* Right: prose */}
        <div className="fv-right flex flex-col gap-5 min-w-0 flex-1 md:pt-[25px]">
          {founder.vision.paragraphs.map((para, i) => (
            <p
              key={i}
              className="fv-para"
              style={{ "--i": i } as React.CSSProperties}
            >
              {para}
            </p>
          ))}
        </div>
      </div>

      <style>{`
        .fv-para {
          font-size: clamp(14px, 1.4vw, 16px);
          line-height: 1.85;
          color: #555;
        }
        @media (prefers-reduced-motion: no-preference) {
          .fv-left, .fv-label, .fv-heading, .fv-rule, .fv-para {
            opacity: 0;
            transform: translateY(16px);
            transition:
              opacity 0.6s cubic-bezier(0.22,1,0.36,1),
              transform 0.6s cubic-bezier(0.22,1,0.36,1);
          }
          .fv-label   { transition-delay: 0.06s; }
          .fv-heading { transition-delay: 0.12s; }
          .fv-rule    { transition-delay: 0.18s; }
          .fv-para    { transition-delay: calc(var(--i, 0) * 0.08s + 0.14s); }
          [data-visible="true"] .fv-left,
          [data-visible="true"] .fv-label,
          [data-visible="true"] .fv-heading,
          [data-visible="true"] .fv-rule,
          [data-visible="true"] .fv-para {
            opacity: 1;
            transform: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .fv-label, .fv-heading, .fv-rule, .fv-para {
            opacity: 1; transform: none;
          }
        }
      `}</style>
    </div>
  );
}
