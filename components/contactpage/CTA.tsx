"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles } from "lucide-react";
import useMagnetic from "./useMagnetic";
import { useRouter } from "next/navigation";

export default function CTA() {
  const router = useRouter();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { ref: btn1Ref, x: x1, y: y1 } = useMagnetic();
  const { ref: btn2Ref, x: x2, y: y2 } = useMagnetic();

  return (
    <section id="cta" ref={ref} className="max-w-7xl mx-auto px-6 py-20 pb-28">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl px-10 py-20 text-center overflow-hidden"
        style={{ background: "var(--dark)" }}
      >
        {/* Top border glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-px pointer-events-none"
          style={{
            width: "60%",
            background: "linear-gradient(90deg, transparent, rgba(90,95,232,0.6), transparent)",
          }}
        />

        {/* Ambient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(90,95,232,0.2) 0%, transparent 60%)" }}
        />

        {/* Rotating ring */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none animate-spin-slow"
          style={{ border: "1px solid rgba(90,95,232,0.06)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none animate-spin-slow"
          style={{ border: "1px solid rgba(90,95,232,0.04)", animationDirection: "reverse" }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full"
          style={{ background: "rgba(90,95,232,0.15)", border: "1px solid rgba(90,95,232,0.3)" }}
        >
          <Sparkles className="w-3 h-3" style={{ color: "var(--brand-light)" }} />
          <span className="text-[9px] font-bold font-syne uppercase tracking-widest" style={{ color: "var(--brand-light)" }}>
            Every School. One Platform.
          </span>
        </motion.div>

        <motion.h2
          className="font-display text-white leading-[1.08] tracking-[-0.03em] mb-5 max-w-xl mx-auto"
          style={{ fontSize: "clamp(1.8rem,4.5vw,3rem)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Ready To Modernize{" "}
          <span className="shimmer-text-dark">Institutional</span>{" "}
          Communication?
        </motion.h2>

        <motion.p
          className="text-[14px] font-body mb-10 max-w-sm mx-auto"
          style={{ color: "rgba(255,255,255,0.45)" }}
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Join forward-thinking schools across India that have unified their operations with HermesWorkspace.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.button
            ref={btn1Ref as any}
            style={{ x: x1, y: y1, background: "#fff" }}
            whileHover={{ scale: 1.04, boxShadow: "0 12px 40px rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              const target = document.getElementById("inquiry");
              if (target) {
                const headerOffset = 60;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth"
                });
              }
            }}
            className="px-8 py-3.5 rounded-xl text-[13px] font-bold font-body"
          >
            <span style={{ color: "var(--ink)" }}>Schedule Consultation</span>
          </motion.button>

          <motion.button
            ref={btn2Ref as any}
            style={{ x: x2, y: y2 }}
            whileHover={{ scale: 1.04, background: "rgba(255,255,255,0.08)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/?scroll=pricing")}
            className="px-8 py-3.5 rounded-xl text-[13px] font-bold font-body text-white transition-colors"
          >
            <span style={{ border: "1px solid rgba(255,255,255,0.2)", padding: "0", display: "contents" }}>
              View All Plans
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
