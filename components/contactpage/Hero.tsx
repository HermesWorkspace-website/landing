"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Shield, Globe, Zap } from "lucide-react";


export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const words = ["Connect", "Collaborate", "Coordinate"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setWordIndex((v) => (v + 1) % words.length), 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        const gsap = (await import("gsap")).default;
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        if (!sectionRef.current) return;

        // Perform clean, hardware-accelerated scroll-parallax using GSAP ScrollTrigger
        // This is highly efficient and doesn't trigger React re-renders on every scroll pixel!
        gsap.to(".contact-hero-content", {
          y: 70,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      } catch {
        // GSAP not available
      }
    };
    const timer = setTimeout(init, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Ultra-lightweight CSS grid mesh and soft ambient radial glows (Zero CPU/GPU overhead) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% -20%, rgba(90,95,232,0.15) 0%, transparent 50%),
            radial-gradient(circle at 100% 80%, rgba(168,85,247,0.1) 0%, transparent 40%),
            linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 100% 100%, 48px 48px, 48px 48px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)",
        }}
      />

     

      <div className="contact-hero-content relative z-10 w-full max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-[1fr_auto] gap-16 items-center">
        {/* Left */}
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full"
            style={{
              background: "rgba(90,95,232,0.08)",
              border: "1px solid rgba(90,95,232,0.2)",
            }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--brand)" }}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-[10px] font-bold font-syne tracking-[0.18em] uppercase" style={{ color: "var(--brand)" }}>
              Contact Support
            </span>
          </motion.div>

          {/* Headline */}
          <div className="mb-6">
            <motion.h1
              className="font-display leading-[1.02] tracking-[-0.04em]"
              style={{ fontSize: "clamp(3rem,6vw,5.2rem)" }}
            >
              <motion.span
                className="block"
                style={{ color: "var(--ink)" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block"
                    style={{ color: "var(--brand)" }}
                  >
                    {words[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </motion.span>
              <motion.span
                className="block"
                style={{ color: "var(--ink)" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                With
              </motion.span>
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="shimmer-text">Institutional</span>
              </motion.span>
              <motion.span
                className="block"
                style={{ color: "var(--ink)", opacity: 0.18 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 0.18, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                Precision.
              </motion.span>
            </motion.h1>
          </div>

          {/* Body */}
          <motion.p
            className="text-[15px] leading-[1.75] font-body max-w-[440px] mb-10"
            style={{ color: "var(--ink-60)" }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Built for academic coordination. Reach the HermesWorkspace team for onboarding,
            partnerships, institutional support, and platform inquiries.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
          <a href="#inquiry">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 12px 40px rgba(90,95,232,0.4)" }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2.5 text-white px-7 py-3.5 rounded-xl text-[13px] font-bold font-body"
              style={{ background: "var(--brand)", boxShadow: "0 4px 20px rgba(90,95,232,0.3)" }}
            >
              Request Demo
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </a>
           <a href="mailto:support@hermesworkspace.com">
  <motion.button
    whileHover={{ scale: 1.02, x: 2 }}
    whileTap={{ scale: 0.98 }}
    className="flex items-center gap-2 text-[13px] font-semibold font-body"
    style={{ color: "var(--ink-60)" }}
  >
    <Mail className="w-4 h-4" style={{ color: "var(--brand)" }} />
    Contact Support
  </motion.button>
</a>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            className="flex items-center gap-6 mt-10 pt-8"
            style={{ borderTop: "1px solid var(--ink-06)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {[
              { icon: <Shield className="w-3.5 h-3.5" />, label: "Secure Institutional Access" },
              { icon: <Globe className="w-3.5 h-3.5" />, label: "Web & Mobile Accessibility" },
              { icon: <Zap className="w-3.5 h-3.5" />, label: "Built for Academic Coordination" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-1.5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
              >
                <span style={{ color: "var(--brand)" }}>{item.icon}</span>
                <span className="text-[11px] font-semibold font-body" style={{ color: "var(--ink-60)" }}>
                  {item.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-[9px] uppercase tracking-widest font-syne" style={{ color: "var(--ink-35)" }}>
          Scroll
        </span>
        <motion.div
          className="w-px h-8 rounded-full"
          style={{ background: "linear-gradient(180deg, var(--brand), transparent)", transformOrigin: "top" }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
