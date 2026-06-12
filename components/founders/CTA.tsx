"use client";

import React, { useRef } from "react";
import { m, useInView } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);

  const inView = useInView(ref, {
    once: false,
    margin: "-60px",
  });

  return (
    <section
      ref={ref}
      id="cta"
      className="py-22"
      style={{ fontFamily: "var(--font-body, Inter, sans-serif)" }}
    >
      <div className="container-page">
        <m.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[32px] px-8 py-14 md:px-14 md:py-18"
          style={{
            background:
              "linear-gradient(160deg, #181A1D 0%, #20242B 50%, #1A1D23 100%)",
            boxShadow:
              "0 32px 80px rgba(0,0,0,0.22), inset 0 0 0 1px rgba(255,255,255,0.05)",
          }}
        >
          {/* Ambient glows */}
          <div
            className="pointer-events-none absolute top-[-20%] left-1/2 h-[340px] w-[520px] -translate-x-1/2"
            style={{
              background:
                "radial-gradient(ellipse, rgba(96,99,238,0.18) 0%, transparent 70%)",
            }}
          />

          <div
            className="pointer-events-none absolute bottom-[-10%] right-[8%] h-[240px] w-[320px]"
            style={{
              background:
                "radial-gradient(ellipse, rgba(168,85,247,0.10) 0%, transparent 70%)",
            }}
          />

          {/* Grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative z-10 max-w-[760px]">
            {/* Top metadata */}
            <m.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="mb-8 flex items-center gap-3"
            >
              <span className="size-1.5 rounded-full bg-brand animate-pulse" />

              <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-brand/80">
                Building Modern Educational Infrastructure
              </span>
            </m.div>

            {/* Heading */}
            <m.h2
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.18 }}
              className="max-w-4xl text-[clamp(2rem,4vw,3.2rem)] font-black leading-[1] tracking-[-0.05em] text-white"
            >
              Designed for modern
              <br />
              educational operations.
            </m.h2>

            {/* Description */}
            <m.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.26 }}
              className="mt-6 max-w-2xl text-[15px] leading-8 text-white/55"
            >
              HermesWorkspace is building modern infrastructure for
              communication, academic coordination, and institutional
              operations across educational institutions.
            </m.p>

            {/* Buttons */}
            <m.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.34 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Button
                variant="brand"
                size="xl"
                className="group gap-2 shadow-[0_10px_34px_rgba(96,99,238,0.42)]"
              >
                <Link
                  href="/contact?scroll=inquiry"
                  className="flex items-center gap-2"
                >
                  Partner With HermesWorkspace

                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                asChild
                variant="ghost"
                size="xl"
                className="border border-white/[0.08] bg-white/[0.03] text-white/70 backdrop-blur-xl hover:bg-white/[0.06] hover:text-white"
              >
                <a href="mailto:connect@hermesworkspace.com">
                  <Mail className="mr-2 size-4" />
                  Contact Leadership
                </a>
              </Button>
            </m.div>

            {/* Bottom metadata */}
            <m.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.45 }}
              className="mt-12 flex flex-wrap items-center gap-5 border-t border-white/[0.06] pt-7 text-[11px] uppercase tracking-[0.24em] text-white/35"
            >
              <span>Institutional Communication</span>

              <span className="size-1 rounded-full bg-white/20" />

              <span>Academic Operations</span>

              <span className="size-1 rounded-full bg-white/20" />

              <span>Scalable Infrastructure</span>
            </m.div>
          </div>
        </m.div>
      </div>
    </section>
  );
}