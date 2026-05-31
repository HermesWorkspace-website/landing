"use client";
import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "How quickly can our school start using HermesWorkspace?",
    a: "Most schools can begin onboarding within the same day. Our team assists with setup, configuration, and platform activation to ensure a smooth transition for administration, teachers, students, and parents.",
  },

  {
    q: "Can HermesWorkspace be used for online classes and meetings?",
    a: "Yes. Schools can conduct online classes, PTMs, webinars, meetings, and academic sessions directly through the platform across both desktop and mobile devices.",
  },

  {
    q: "Will parents and students need technical training?",
    a: "No. HermesWorkspace is designed to be simple and easy to use for students, parents, teachers, and administrators with minimal learning effort required.",
  },

  {
    q: "Is HermesWorkspace accessible on mobile devices?",
    a: "Yes. HermesWorkspace is accessible across Android, iOS, and web platforms, allowing institutions to stay connected from anywhere.",
  },

  {
    q: "Can the platform scale as our institution grows?",
    a: "Absolutely. HermesWorkspace is designed to support institutions of different sizes with scalable infrastructure and flexible deployment options.",
  },

  {
    q: "Do you provide onboarding and support for schools?",
    a: "Yes. We assist schools with onboarding, deployment guidance, and operational support to help institutions adopt the platform smoothly.",
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
        <div className={`size-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
          open ? "border-brand bg-brand/10 text-brand rotate-45" : "border-black/10 text-brand-muted"
        }`}>
          {open ? <Minus className="size-3" /> : <Plus className="size-3" />}
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
  const inView = useInView(ref, { once: true, margin: "-60px" });
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
              key={f.q}
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
