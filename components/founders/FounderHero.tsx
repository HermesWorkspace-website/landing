"use client";

import { useEffect, useRef } from "react";

const ACCENT = "#6063EE";

export function FounderHero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (rootRef.current) rootRef.current.setAttribute("data-animate", "true");
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden pt-[56px] md:pt-[96px]"
      style={{
        background: "#f0f0ff",
        backgroundImage:
          "radial-gradient(circle, rgba(96,99,238,0.13) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10 py-10 lg:py-20 grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-8 lg:gap-16 items-center">
        <div>
          <div
            className="fh-label inline-block mb-6 text-[10px] font-semibold uppercase tracking-[2.5px] px-3 py-1.5 rounded-md border"
            style={{ color: ACCENT, background: "#fff", borderColor: "#ddd" }}
          >
            People Behind HermesWorkspace 
          </div>

          <h1
            className="fh-heading font-black leading-[0.95] tracking-[-0.03em] text-[#0D0D0F] mb-5"
            style={{ fontSize: "clamp(26px, 7vw, 68px)" }}
          >
            Meet the founders<br />
            behind{" "}
            <span style={{ color: ACCENT }}>HermesWorkspace.</span>
          </h1>

          <p
            className="fh-desc text-[14px] leading-[1.85] max-w-[460px] mb-8"
            style={{ color: "#555" }}
          >
            Two founders. One mission — building infrastructure that simplifies how educational
            institutions communicate, coordinate, and operate.
          </p>

          <div
            className="fh-meta flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[2px]"
            style={{ color: "#7A7A85" }}
          >
            <span>2026</span>
            <span className="size-1 rounded-full" style={{ background: ACCENT }} />
            <span>2 Founders</span>
            <span className="size-1 rounded-full" style={{ background: ACCENT }} />
            <span>India</span>
          </div>
        </div>

        <div className="fh-card rounded-2xl bg-white p-6" style={{ boxShadow: "0 8px 40px rgba(96,99,238,0.12)" }}>
          <p className="text-[10px] font-semibold uppercase tracking-[2px] mb-4" style={{ color: "#7A7A85" }}>
            The Founding Team
          </p>
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { role: "CEO", first: "Apurav", last: "Agarwal", accent: ACCENT },
              { role: "CTO", first: "Lakshya", last: "Kumar", accent: ACCENT },
            ].map((f) => (
              <div key={f.role} className="rounded-xl p-3" style={{ background: "#f7f7ff" }}>
                <p className="text-[10px] font-medium uppercase tracking-[1.5px] mb-1" style={{ color: "#7A7A85" }}>{f.role}</p>
                <p className="text-[13px] font-bold text-[#0D0D0F]">
                  {f.first} <span style={{ color: f.accent }}>{f.last}</span>
                </p>
              </div>
            ))}
          </div>
          <p className="text-[10px] uppercase tracking-[1.5px]" style={{ color: "#7A7A85" }}>Est. 2026 · Jharkhand, India</p>
        </div>
      </div>

      <style>{`
        .fh-label, .fh-heading, .fh-desc, .fh-meta, .fh-card {
          opacity: 0;
          transform: translateY(16px);
          will-change: opacity, transform;
          transition:
            opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .fh-label {
          transition-delay: 0s;
          transition-duration: 0.5s;
        }
        section[data-animate] .fh-label {
          opacity: 1;
          transform: translateY(0);
        }

        .fh-heading {
          transition-delay: 0.1s;
          transition-duration: 0.6s;
        }
        section[data-animate] .fh-heading {
          opacity: 1;
          transform: translateY(0);
        }

        .fh-desc {
          transition-delay: 0.25s;
          transition-duration: 0.6s;
        }
        section[data-animate] .fh-desc {
          opacity: 1;
          transform: translateY(0);
        }

        .fh-meta {
          transition-delay: 0.35s;
          transition-duration: 0.4s;
        }
        section[data-animate] .fh-meta {
          opacity: 1;
          transform: translateY(0);
        }

        .fh-card {
          transition-delay: 0.45s;
          transition-duration: 0.6s;
        }
        section[data-animate] .fh-card {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .fh-label, .fh-heading, .fh-desc, .fh-meta, .fh-card {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}