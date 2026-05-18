"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Handshake, Newspaper, Sparkles, ArrowRight } from "lucide-react";

interface FeatureCard {
  icon: React.ReactNode;
  colorFrom: string;
  colorTo: string;
  title: string;
  desc: string;
  link: string;
}

const featureCards: FeatureCard[] = [
  {
    icon: <Users className="w-5 h-5" />,
    colorFrom: "#5A5FE8",
    colorTo: "#7B7FF0",
    title: "Structured School Communication",
    desc: "Role-based communication channels for administrators, teachers, students, and parents across classes, sections, and departments.",
    link: "Explore communication",
  },
  {
    icon: <Handshake className="w-5 h-5" />,
    colorFrom: "#a855f7",
    colorTo: "#c084fc",
    title: "Academic Operations",
    desc: "Manage meetings, notices, events, announcements, resources, and institutional coordination from one centralized platform.",
    link: "View operations",
  },
  {
    icon: <Newspaper className="w-5 h-5" />,
    colorFrom: "#10b981",
    colorTo: "#34d399",
    title: "Secure Digital Infrastructure",
    desc: "Built for institutional reliability with verified notice delivery, secure access control, and scalable cloud infrastructure.",
    link: "Learn about security",
  },
];

function MarqueeBar() {
  const items = [
  "School Communication Infrastructure",
  "Class & Section Based Channels",
  "Meetings • Notices • Events",
  "Built for Educational Institutions",
  "Centralized Academic Operations",
  "HermesWorkspace Platform",
];
  const doubled = [...items, ...items];

  return (
    <div
      className="py-4 overflow-hidden border-y"
      style={{ borderColor: "var(--ink-06)", background: "rgba(90,95,232,0.03)" }}
    >
      <div className="flex animate-marquee whitespace-nowrap" style={{ width: "max-content" }}>
        {doubled.map((text, i) => (
          <React.Fragment key={i}>
            <span className="text-[11px] font-bold font-syne uppercase tracking-widest px-6" style={{ color: "var(--ink-35)" }}>
              {text}
            </span>
            <span style={{ color: "var(--brand)" }} className="text-[8px]">◆</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      <MarqueeBar />
      <section ref={ref} id="features" className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full" style={{ background: "rgba(90,95,232,0.07)", border: "1px solid rgba(90,95,232,0.15)" }}>
            <Sparkles className="w-3 h-3" style={{ color: "var(--brand)" }} />
            <span className="text-[9px] font-bold font-syne uppercase tracking-[0.18em]" style={{ color: "var(--brand)" }}>
              What we offer
            </span>
          </div>
          <h2 className="text-[2.2rem] font-black font-display tracking-tight" style={{ color: "var(--ink)" }}>
            Everything your school needs
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {featureCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="relative group cursor-pointer rounded-2xl overflow-hidden"
              style={{
                background: "#fff",
                border: "1px solid var(--ink-06)",
                boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
              }}
              whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(0,0,0,0.1)" }}
            >
              {/* Gradient overlay on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `linear-gradient(135deg, ${card.colorFrom}08, ${card.colorTo}05)` }}
              />

              {/* Top colored bar */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: `linear-gradient(90deg, ${card.colorFrom}, ${card.colorTo})` }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
              />

              <div className="p-7 relative">
                <motion.div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${card.colorFrom}12`, color: card.colorFrom }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {card.icon}
                </motion.div>

                <h3 className="text-[15px] font-bold font-syne mb-2.5" style={{ color: "var(--ink)" }}>
                  {card.title}
                </h3>
                <p className="text-[13px] font-body leading-[1.65] mb-5" style={{ color: "var(--ink-60)" }}>
                  {card.desc}
                </p>

                <motion.a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-[12px] font-bold font-body"
                  style={{ color: card.colorFrom }}
                  whileHover={{ gap: "8px" } as any}
                >
                  {card.link}
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
