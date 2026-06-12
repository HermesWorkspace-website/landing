"use client";
import React, { useRef, useState } from "react";
import { m, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs= [
  {
    q: "How can schools get started with HermesWorkspace?",
    a: "Institutions can contact our team through the inquiry form to discuss onboarding, platform setup, and operational requirements.",
  },

  {
    q: "Do you provide onboarding assistance for institutions?",
    a: "Yes. We assist schools with platform onboarding, deployment guidance, and initial operational coordination.",
  },

  {
    q: "Can we request a platform walkthrough or demo?",
    a: "Yes. Schools and academic institutions can request guided product walkthroughs and platform demonstrations through the contact page.",
  },

  {
    q: "Who is HermesWorkspace designed for?",
    a: "HermesWorkspace is built for schools and educational institutions looking to improve communication, coordination, notices, meetings, and academic operations.",
  },

  {
    q: "Is HermesWorkspace accessible on mobile devices?",
    a: "Yes. HermesWorkspace is accessible across web, Android, and iOS platforms for administrators, teachers, students, and families.",
  },

  {
    q: "How does HermesWorkspace support institutional communication?",
    a: "The platform helps schools manage announcements, meetings, notices, academic coordination, and structured communication through a centralized system.",
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
        <h4 className="font-body font-medium text-[0.9375rem] text-brand-ink group-hover:text-brand transition-colors pr-4">
          {q}
        </h4>
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
