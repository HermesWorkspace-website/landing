"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { staggerContainer, fadeUp } from "@/components/socials/motion-variants";

export function CtaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="contact" className="py-28 bg-[#F9F8FF] relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute bottom-0 left-0 w-full opacity-[0.03]" viewBox="0 0 1440 300">
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={`item-${i}`}
              x1={i * 120}
              y1="0"
              x2={i * 120}
              y2="300"
              stroke="#6063EE"
              strokeWidth="1"
            />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <line
              key={`item-${i}`}
              x1="0"
              y1={i * 50}
              x2="1440"
              y2={i * 50}
              stroke="#6063EE"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>

      {/* Gradient blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#6063EE]/5 blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <m.p
            variants={fadeUp}
            className="text-[10px] tracking-[3px] uppercase text-[#6063EE] font-medium mb-5"
          >
            Build With HermesWorkspace
          </m.p>

          <m.h2
            variants={fadeUp}
            className="font-display text-[clamp(36px,5vw,64px)] font-black text-[#0D0D0F] leading-[1.05] tracking-tight mb-6"
          >
            Building the future of
            <br />
            <span className="text-[#6063EE]">
              institutional communication
            </span>
            <br />
            across India.
          </m.h2>

          <m.p
            variants={fadeUp}
            className="text-[15px] text-[#666] leading-relaxed mb-10 max-w-md mx-auto"
          >
            HermesWorkspace is creating modern operational infrastructure for
            schools and institutions through connected communication,
            academic coordination, and scalable digital systems designed
            for the next generation of education.
          </m.p>

          <m.div
            variants={fadeUp}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <m.a
              href="mailto:connect@hermesworkspace.com"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 16px 50px rgba(96,99,238,0.4)",
              }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 bg-[#6063EE] text-white text-[13px] font-semibold px-7 py-3.5 rounded-full"
            >
              Connect With Us
              <ArrowRight size={14} />
            </m.a>

            <m.a
              href="/about"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 text-[#0D0D0F] text-[13px] font-medium px-7 py-3.5 rounded-full border border-[#D8D4CC] hover:border-[#6063EE] transition-colors"
            >
              Learn About HermesWorkspace
            </m.a>
          </m.div>

          {/* Trust note */}
          <m.p
            variants={fadeUp}
            className="text-[11px] text-[#9896A4] mt-8"
          >
            HermesWorkspace · support@hermesworkspace.com · connect@hermesworkspace.com
          </m.p>
        </m.div>
      </div>
    </section>
  );
}
