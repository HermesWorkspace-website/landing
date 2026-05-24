"use client";
import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Why was HermesWorkspace founded?",
    a: "HermesWorkspace was founded to modernize how educational institutions communicate, coordinate, and manage operational workflows through centralized digital infrastructure.",
  },

  {
    q: "What is the long-term vision behind HermesWorkspace?",
    a: "The platform is being built to provide scalable communication and operational infrastructure for modern educational institutions across academic and administrative workflows.",
  },

  {
    q: "Who leads HermesWorkspace?",
    a: "HermesWorkspace is led by its founding team with a focus on institutional operations, infrastructure engineering, communication systems, and long-term platform scalability.",
  },

  {
    q: "What areas does the founding team focus on?",
    a: "The leadership team focuses on institutional partnerships, operational execution, platform infrastructure, backend systems, scalability, and educational technology workflows.",
  },

  {
    q: "How does HermesWorkspace approach institutional infrastructure?",
    a: "HermesWorkspace is designed around operational clarity, structured communication, scalable systems, and infrastructure reliability for educational institutions.",
  },

  {
    q: "Is HermesWorkspace designed only for communication?",
    a: "No. Beyond communication, HermesWorkspace supports meetings, notices, academic coordination, operational workflows, online classes, and institutional management systems.",
  },
];

function FAQItem({ q, a, open, toggle }: { q: string; a: string; open: boolean; toggle: () => void }) {
  return (
    <div
      className="border-b border-black/[0.06] cursor-pointer group"
      onClick={toggle}
    >
      <div className="py-5 flex items-start justify-between gap-4">
        <h4 className="font-body font-medium text-[0.9375rem] text-brand-ink group-hover:text-brand transition-colors pr-4">
          {q}
        </h4>
        <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
          open ? "border-brand bg-brand/10 text-brand rotate-45" : "border-black/10 text-brand-muted"
        }`}>
          {open ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-brand-muted font-body leading-relaxed pr-8">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faqs" ref={ref} className="py-section">
      <div className="container-page max-w-[800px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <span className="section-eyebrow">FAQ</span>
          <h2 className="font-display text-display-xl font-extrabold text-brand-ink mt-3 tracking-[-0.03em]">
            Questions? <span className="gradient-text-brand">Answered.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {faqs.map((f, i) => (
            <FAQItem
              key={i}
              q={f.q}
              a={f.a}
              open={openIdx === i}
              toggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
