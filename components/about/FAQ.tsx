"use client";
import React, { useRef, useState } from "react";
import { m, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What is HermesWorkspace building?",
    a: "HermesWorkspace is building operational infrastructure for modern educational institutions — centralizing communication, academic coordination, meetings, notices, and institutional workflows into one connected platform.",
  },

  {
    q: "Why was HermesWorkspace founded?",
    a: "HermesWorkspace was founded to modernize how institutions operate internally. Many schools still rely on fragmented tools and manual coordination systems, creating communication gaps and operational inefficiencies.",
  },

  {
    q: "Who are the founders of HermesWorkspace?",
    a: "HermesWorkspace was founded by Apurav Agarwal and Lakshya Kumar, focused on building scalable institutional systems that combine operational clarity, infrastructure reliability, and long-term digital transformation.",
  },

  {
    q: "What makes HermesWorkspace different from traditional school software?",
    a: "HermesWorkspace is designed as a connected operational ecosystem rather than isolated administrative software. The platform focuses on institutional communication, coordination, infrastructure scalability, and unified workflows.",
  },

  {
    q: "What is the long-term vision behind HermesWorkspace?",
    a: "The long-term vision is to create infrastructure that helps institutions operate with greater efficiency, coordination, transparency, and scalability across communication and academic systems.",
  },

  {
    q: "Is HermesWorkspace focused only on schools?",
    a: "While HermesWorkspace currently focuses on educational institutions, the broader vision extends toward scalable operational systems and communication infrastructure for complex organizations and institutional environments.",
  },
];

function FAQItem({ q, a, open, toggle }: { q: string; a: string; open: boolean; toggle: () => void }) {
  return (
        <button
          type="button"
          className="w-full text-left p-0 bg-transparent border-0 border-b border-black/[0.06] cursor-pointer group"
          onClick={toggle}
        >
        
      <div className="py-5 flex items-start justify-between gap-4">
        <h3 className="font-body font-medium text-[0.9375rem] text-brand-ink group-hover:text-brand transition-colors pr-4">
          {q}
        </h3>
        <div className={`size-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
          open ? "border-brand bg-brand/10 text-brand rotate-45" : "border-black/10 text-brand-muted"
        }`}>
          {open ? <Minus className="size-3" /> : <Plus className="size-3" />}
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-brand-muted font-body leading-relaxed pr-8">{a}</p>
          </m.div>
        )}
      </AnimatePresence>
    </button>
  );
}

export default function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faqs" ref={ref} className="py-section">
      <div className="container-page max-w-[800px]">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <span className="section-eyebrow">FAQ</span>
          <h2 className="font-display text-display-xl font-extrabold text-brand-ink mt-3 tracking-[-0.03em]">
            Questions? <span className="gradient-text-brand">Answered.</span>
          </h2>
        </m.div>

        <m.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {faqs.map((f, i) => (
            <FAQItem
              key={f.q}
              q={f.q}
              a={f.a}
              open={openIdx === i}
              toggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </m.div>
      </div>
    </section>
  );
}
