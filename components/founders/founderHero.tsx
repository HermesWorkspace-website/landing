"use client";

import { useEffect, useRef } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  useSpring(mouseX, { stiffness: 60, damping: 20 });
  useSpring(mouseY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="hero-viewport relative overflow-hidden bg-white"
      style={{
        fontFamily: "var(--font-body, Inter, sans-serif)",
      }}
    >
      {/* Ambient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-[-10%] top-[18%] h-[420px] w-[420px] rounded-full bg-indigo-100/70 blur-3xl" />
        <div className="absolute right-[-8%] bottom-[10%] h-[360px] w-[360px] rounded-full bg-violet-100/60 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      {/* Watermark */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6 }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <span className="select-none text-[18vw] font-black tracking-[-0.08em] text-black/[0.025]">
          FOUNDERS
        </span>
      </m.div>

      {/* Left sidebar — xl only */}
      <m.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="absolute left-8 top-[30%] hidden -translate-y-1/2 xl:flex flex-col items-start gap-3"
      >
        <span className="text-[12px] tracking-[0.28em] uppercase text-brand">
          Leadership & Vision
        </span>
        <div className="h-20 w-px bg-gradient-to-b from-brand/80 to-transparent" />
        <p className="max-w-[140px] text-xs leading-6 text-brand-muted">
          Institutional infrastructure designed for modern educational operations.
        </p>
      </m.div>

      {/* Right sidebar — xl only */}
      <m.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute right-8 top-[80%] hidden -translate-y-1/2 xl:flex flex-col items-end text-right"
      >
        <span className="mb-3 text-[12px] tracking-[0.3em] uppercase text-brand-muted">
          HermesWorkspace
        </span>
        <p className="max-w-[220px] text-xs italic leading-7 text-brand-ink/70">
          "Educational institutions deserve operational systems built for clarity,
          reliability, and scale."
        </p>
        <div className="mt-5 h-px w-16 bg-gradient-to-r from-transparent via-brand to-transparent" />
      </m.div>

      {/* ── Main content ── */}
      <div
        className="hero-viewport__main relative z-10 container-page flex flex-col items-center justify-center text-center w-full"
      >
        {/* Mobile eyebrow */}
        <m.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-8 flex items-center gap-2 md:hidden"
        >
          <span className="size-1.5 rounded-full bg-indigo-500" />
          <span className="text-[11px] tracking-[0.28em] uppercase text-indigo-500 font-medium">
            Leadership & Vision
          </span>
        </m.div>

        {/* Headline */}
        <h1
          className="font-display font-extrabold leading-[1.06] tracking-[-0.04em] text-brand-ink w-full max-w-[900px]"
          style={{
            fontSize: "clamp(3.5rem, 9vw, 5.2rem)",
          }}
        >
          {["Building The Future", "Of Institutional", "Communication."].map((line, i) => (
            <span key={`item-${i}`} className="block overflow-hidden">
              <m.span
                className={`inline-block ${i >= 1 ? "gradient-text-brand" : ""}`}
                initial={{ y: 64, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.18, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </m.span>
            </span>
          ))}
        </h1>

        {/* Sub-copy */}
        <m.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 w-full max-w-[520px] text-[1rem] sm:text-[1.0625rem] text-brand-muted leading-[1.8] font-body"
        >
          HermesWorkspace was founded to modernize how educational institutions
          communicate, coordinate, and operate through scalable digital infrastructure.
        </m.p>

        {/* CTA */}
        <m.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.7 }}
          className="mt-10"
        >
          <m.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="default"
              size="lg"
              onClick={() => {
                const section = document.getElementById("founders");
                if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="gap-2 shadow-[0_4px_24px_rgba(96,99,238,0.35)] hover:shadow-[0_8px_36px_rgba(96,99,238,0.45)] h-14 px-8 text-[1rem]"
            >
              Meet our Founders
              <ArrowDown className="size-4" />
            </Button>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}