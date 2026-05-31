"use client";
import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    num: "01",
    title: "Set up your institution",
    desc: "Import students, teachers, and parents in minutes using Excel sheets or invite links. Departments, classes, and communication channels are created automatically.",
    badge: "Onboarding",
  },

  {
    num: "02",
    title: "Centralize school communication",
    desc: "Notices, class discussions, staff coordination, PTMs, and announcements — everything runs through one organized workspace instead of scattered WhatsApp groups.",
    badge: "Communication",
  },

  {
    num: "03",
    title: "Conduct live academic sessions",
    desc: "Teachers start HD classes, webinars, doubt sessions, and meetings directly from HermesWorkspace. Students join securely from any device with attendance tracked automatically.",
    badge: "Academics",
  },

  {
    num: "04",
    title: "Monitor operations in real time",
    desc: "Track attendance, engagement, submissions, schedules, and institutional activity from a unified dashboard built for school administrators.",
    badge: "Administration",
  },
];

export default function WorkflowBento() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} id="workflow" className="relative py-section bg-[#F8F9FA]">
      {/* Grid bg */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-60 pointer-events-none" />


      <div className="container-page relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-[540px] mx-auto mb-16"
        >
          <span className="section-eyebrow">How it works</span>
          <h2 className="font-display text-display-xl font-extrabold text-brand-ink mt-3 tracking-[-0.03em]">
            Built to simplify{" "}
            <span className="gradient-text-brand">how schools communicate.</span>
          </h2>
          <p className="mt-4 text-body-lg text-brand-muted font-body">
           HermesWorkspace helps schools manage communication, academics, meetings, and coordination without switching between disconnected platforms.
          </p>
        </motion.div>

        {/* Steps grid Wrapper */}
        <div className="relative max-w-5xl mx-auto">
          <div className="relative z-[2] grid grid-cols-1 md:grid-cols-2 gap-5">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="bento p-7 flex flex-col gap-4 relative overflow-hidden group hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-500"
              >
                {/* Glowing border effect */}
                <div className="absolute inset-0 rounded-[inherit] border-2 border-transparent group-hover:border-brand/30 transition-colors duration-500 z-0 pointer-events-none shadow-[inset_0_0_20px_rgba(99,102,241,0)] group-hover:shadow-[inset_0_0_30px_rgba(99,102,241,0.15)]" />
              {/* Big number bg */}
              <div
                className="absolute -right-3 -top-4 font-display font-extrabold text-[7rem] leading-none tracking-tighter select-none pointer-events-none transition-opacity duration-300 group-hover:opacity-20"
                style={{ color: "rgba(96,99,238,0.05)" }}
              >
                {s.num}
              </div>

              <div className="flex items-start justify-between">
                <span className="badge badge-brand text-[10px]">{s.badge}</span>
                <CheckCircle2 className="w-5 h-5 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-[11px] text-brand/60">{s.num}</span>
                  <h3 className="font-display text-[1.125rem] font-bold text-brand-ink tracking-tight">
                    {s.title}
                  </h3>
                </div>
                <p className="text-body-sm text-brand-muted font-body leading-relaxed">{s.desc}</p>
              </div>

                <div className="mt-auto flex items-center gap-1 text-xs text-brand font-medium font-body group-hover:gap-2 transition-all relative z-10">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Connection SVG line (decorative, desktop) */}
     {/* Center connection line */}
<div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 pointer-events-none z-[1]">
  <motion.div
    initial={{ height: 0 }}
    whileInView={{ height: "100%" }}
    transition={{ duration: 1.4, ease: "easeOut" }}
    className="w-[2px] h-full bg-[rgba(96,99,238,0.18)]"
  />
</div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="text-center mt-14"
        >
          <Link href="/contact?scroll=inquiry" className="btn btn-dark inline-flex gap-2 text-sm">
            Schedule a School Demo <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
