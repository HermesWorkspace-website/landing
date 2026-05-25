"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { IconArrowDown } from "@tabler/icons-react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Floating dot parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const dotX = useTransform(springX, (v) => v * 0.04);
  const dotY = useTransform(springY, (v) => v * 0.04);

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
      className="relative min-h-screen overflow-hidden bg-white"
      style={{ fontFamily: "var(--font-body, 'DM Sans', sans-serif)" }}
    >
      {/* Ambient background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[18%] h-[420px] w-[420px] rounded-full bg-indigo-100/70 blur-3xl" />
        <div className="absolute right-[-8%] bottom-[10%] h-[360px] w-[360px] rounded-full bg-violet-100/60 blur-3xl" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      <motion.div
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6 }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <span className="select-none text-[18vw] font-black tracking-[-0.08em] text-black/[0.025]">
          FOUNDERS
        </span>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-8 md:px-16 lg:px-24 pt-30">
        <div className="container-page relative z-10 flex flex-col items-center text-center">

          {/* Headline */}
          <h1 className="font-display text-[clamp(2.6rem,6vw,5.2rem)] font-extrabold leading-[1.04] tracking-[-0.04em] text-brand-ink max-w-[900px]">
            {["Building The Future" , "Of Institutional" , "Communication."].map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-3">
                <motion.span
                  className={`inline-block ${i >= 1 ? "gradient-text-brand" : ""}`}
                  initial={{ y: 56, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.18, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-[560px] text-[1.0625rem] text-brand-muted leading-[1.75] font-body"
          >
            <span className="font-logo font-semibold text-brand-ink">HermesWorkspace</span> was founded to modernize how educational institutions
            communicate, coordinate, and operate through scalable digital infrastructure.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="default"
                size="lg"
                onClick={() => {
                  const section = document.getElementById("founders");
                  if (section) {
                    section.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
                className="gap-2 shadow-[0_4px_24px_rgba(96,99,238,0.35)] hover:shadow-[0_8px_36px_rgba(96,99,238,0.45)]"
              >
                Meet our Founders
                <IconArrowDown className="w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>

        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute right-8 top-[80%] hidden -translate-y-1/2 xl:flex flex-col items-end text-right"
      >
        <span className="font-logo mb-3 text-[12px] tracking-[0.3em] uppercase text-brand-muted">
          HermesWorkspace
        </span>

        <p className="max-w-[220px] text-xs italic leading-7 text-brand-ink/70">
          “Educational institutions deserve operational systems built for clarity,
          reliability, and scale.”
        </p>

        <div className="mt-5 h-px w-16 bg-gradient-to-r from-transparent via-brand to-transparent" />
      </motion.div>
    </section>
  );
}
