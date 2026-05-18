"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });

  return (
    <section ref={ref} id="contact" className="py-section">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[28px] overflow-hidden bg-brand-ink px-8 py-16 md:py-20 text-center"
          style={{
            background: "linear-gradient(160deg, #1A1C1D 0%, #22252A 50%, #1d1f24 100%)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.05) inset",
          }}
        >
          {/* Ambient glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(96,99,238,0.18) 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 right-[10%] w-[300px] h-[200px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(168,85,247,0.1) 0%, transparent 70%)" }} />

          {/* Grid lines */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }} />

          <div className="relative z-10 max-w-[640px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 }}
            >
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand/70 uppercase tracking-widest font-body mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                Institutional Demonstrations Open
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-white tracking-[-0.04em] leading-tight mb-5"
            >
              Ready to transform<br />your school?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.28 }}
              className="text-[1rem] text-white/55 font-body mb-9 leading-relaxed"
            >
              HermesWorkspace helps schools centralize communication, meetings, notices, online classes, and academic coordination through one structured platform with guided onboarding support.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.36 }}
              className="flex flex-wrap items-center justify-center gap-3 mb-12"
            >
              <Button
                variant="brand"
                size="xl"
                className="shadow-[0_8px_32px_rgba(96,99,238,0.5)] gap-2"
              >
                Schedule Demonstration <ArrowRight className="w-4 h-4" />
              </Button>
              <Link href="/contact" className="nav-item text-sm">
                Contact
              </Link>
            </motion.div>

            {/* Contact row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.45 }}
              className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/40 font-body"
            >
              <a href="mailto:connect@hermesworkspace.com" className="flex items-center gap-2 hover:text-white/70 transition-colors">
                <Mail className="w-4 h-4" />
                connect@hermesworkspace.com
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
