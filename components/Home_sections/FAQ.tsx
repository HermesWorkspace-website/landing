"use client";
import React, { useRef, useState } from "react";
import { m, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";


const faqs = [
  {
    q: "What is HermesWorkspace?",
    a: "HermesWorkspace is a unified school communication and management platform designed for educational institutions. It helps schools manage announcements, messaging, live classes, meetings, academic coordination, and institutional communication from one centralized platform.",
  },

  {
    q: "Who can use HermesWorkspace?",
    a: "HermesWorkspace is built for schools, coaching institutes, educational organizations, administrators, teachers, students, and parents who need a modern communication and operational platform.",
  },

  {
    q: "How does HermesWorkspace improve school communication?",
    a: "HermesWorkspace replaces fragmented communication systems like multiple WhatsApp groups with structured institution-wide messaging, announcements, notices, meeting systems, and academic coordination tools.",
  },

  {
    q: "Can schools conduct online classes using HermesWorkspace?",
    a: "Yes. Schools can host online classes, PTMs, webinars, meetings, and academic sessions directly through HermesWorkspace on both desktop and mobile devices.",
  },

  {
    q: "Is HermesWorkspace available on mobile devices?",
    a: "Yes. HermesWorkspace works across Android, iOS, and modern web browsers, allowing teachers, students, parents, and administrators to stay connected from anywhere.",
  },

  {
    q: "Is HermesWorkspace suitable for CBSE and ICSE schools?",
    a: "Yes. HermesWorkspace is designed for CBSE, ICSE, State Board schools, coaching institutes, and other educational institutions across India.",
  },

  {
    q: "How quickly can a school start using HermesWorkspace?",
    a: "Most institutions can begin onboarding quickly with support for setup, deployment, configuration, and operational guidance provided by the HermesWorkspace team.",
  },

  {
    q: "Does HermesWorkspace support parent-teacher communication?",
    a: "Yes. HermesWorkspace enables secure and organized communication between schools, teachers, parents, and students through institutional messaging and announcements.",
  },

  {
    q: "Can HermesWorkspace scale for large institutions?",
    a: "Yes. HermesWorkspace is built with scalable infrastructure capable of supporting institutions of different sizes, departments, and communication requirements.",
  },

  {
    q: "Does HermesWorkspace provide onboarding and support?",
    a: "Yes. HermesWorkspace provides onboarding assistance, deployment support, operational guidance, and institutional support for schools adopting the platform.",
  },
];


const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a, }, })), };

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
        <div className={`size-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-all ${open ? "border-brand bg-brand/10 text-brand rotate-45" : "border-black/10 text-brand-muted"
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
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <>
      {/* eslint-disable-next-line react/no-danger -- Safe because it is a stringified JSON schema object (JSON-LD) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema), }} />
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
    </>
  );
}
