"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, BarChart3, Cpu, Layers } from "lucide-react";
import { staggerContainer, fadeUp, scaleIn } from "@/components/socials/motion-variants";

// Large featured card
function FeaturedCard() {
  return (
    <motion.article
      variants={scaleIn}
      whileHover={{ scale: 1.01 }}
      className="relative rounded-2xl overflow-hidden bg-[#0D0D0F] row-span-2 min-h-[320px] group cursor-pointer"
    >
      {/* Simulated architectural image bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0D0D0F]" />

      {/* Grid lines overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 400">
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={`item-${i}`}>
            <line x1={i * 50} y1="0" x2={i * 50} y2="400" stroke="white" strokeWidth="0.5" />
            <line x1="0" y1={i * 50} x2="400" y2={i * 50} stroke="white" strokeWidth="0.5" />
          </g>
        ))}
      </svg>

      {/* Glowing orb */}
      <div className="absolute top-8 right-8 size-32 rounded-full bg-[#6B5CE7]/20 blur-2xl" />

      {/* Content */}
      <div className="absolute inset-0 p-7 flex flex-col justify-end">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="self-start text-[9px] tracking-[2px] uppercase text-[#6B5CE7] bg-[#6B5CE7]/20 px-2 py-1 rounded-[2px] mb-3 font-medium"
        >
          Product Insight
        </motion.span>
        <h3 className="text-[22px] font-black text-white leading-tight mb-2">
          How HermesWorkspace is rethinking institutional communication.
        </h3>
        <motion.div
          className="flex items-center gap-1.5 text-[11px] text-[#9896A4] font-medium mt-2 group-hover:text-white transition-colors"
          whileHover={{ x: 4 }}
        >
          Explore Story <ArrowUpRight size={12} />
        </motion.div>
      </div>
    </motion.article>
  );
}

// Top-right article card
function ArticleCard() {
  return (
    <motion.article
      variants={scaleIn}
      whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(107,92,231,0.12)" }}
      transition={{ type: "spring", stiffness: 280 }}
      className="bg-white rounded-2xl border border-[#E8E5F0] p-6 group cursor-pointer"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="size-8 rounded-lg bg-[#EAE8FF] flex items-center justify-center">
          <Cpu size={14} className="text-[#6B5CE7]" />
        </div>
        <span className="text-[9px] tracking-[2px] uppercase text-[#9896A4]">Founder Notes</span>
      </div>
      <h3 className="text-[15px] font-bold text-[#0D0D0F] mb-2 leading-snug">
        Building systems that reduce operational complexity.
      </h3>
      <p className="text-[12px] text-[#888] leading-relaxed">
        Thoughts on communication infrastructure, academic coordination,
and designing operational systems for modern institutions.
      </p>
      <motion.div
        className="flex items-center gap-1 text-[10px] text-[#6B5CE7] font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity"
        whileHover={{ x: 3 }}
      >
        Read More <ArrowUpRight size={10} />
      </motion.div>
    </motion.article>
  );
}

const METRICS_CARDS = [
  {
    label: "Platform Focus",
    value: "Institutional Infrastructure",
    icon: Layers,
    color: "#6B5CE7",
  },
  {
    label: "Communication Systems",
    value: "Unified Workflows",
    icon: BarChart3,
    color: "#1A3FBE",
  },
];

function MetricsMiniCards() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {METRICS_CARDS.map((card) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.label}
            variants={scaleIn}
            whileHover={{ scale: 1.03 }}
            className="bg-[#F9F8FF] border border-[#E8E5F0] rounded-xl p-4 cursor-pointer"
          >
            <div
              className="size-7 rounded-lg flex items-center justify-center mb-3"
              style={{ background: `${card.color}18` }}
            >
              <Icon size={13} style={{ color: card.color }} />
            </div>
            <p className="text-[10px] tracking-[1px] uppercase text-[#9896A4] mb-1">{card.label}</p>
            <p className="text-[13px] font-black text-[#0D0D0F]">{card.value}</p>

            {/* Animated progress bar */}
            <div className="mt-2 h-1 bg-[#E8E5F0] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: card.color }}
                initial={{ width: 0 }}
                whileInView={{ width: "78%" }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Small bottom card
function SmallCard() {
  return (
    <motion.article
      variants={scaleIn}
      whileHover={{ y: -3, boxShadow: "0 12px 30px rgba(0,0,0,0.06)" }}
      className="bg-white rounded-2xl border border-[#E8E5F0] p-5 flex items-center gap-5 group cursor-pointer"
    >
      {/* Thumb */}
      <div className="size-16 rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#0D0D0F] flex items-center justify-center shrink-0 overflow-hidden">
        <svg viewBox="0 0 64 64" className="w-full h-full opacity-60">
          {Array.from({ length: 5 }).map((_, i) => (
            <line key={`item-${i}`} x1={i * 12 + 8} y1="8" x2={i * 12 + 8} y2="56" stroke="#6B5CE7" strokeWidth="1.5" />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <line key={`item-${i}`} x1="8" y1={i * 12 + 8} x2="56" y2={i * 12 + 8} stroke="#6B5CE7" strokeWidth="1.5" />
          ))}
        </svg>
      </div>
      <div>
        <span className="text-[9px] tracking-[2px] uppercase text-[#9896A4]">Inside HermesWorkspace</span>
        <h3 className="text-[13px] font-bold text-[#0D0D0F] mt-0.5 leading-snug">
          Documenting product development, operational thinking, and the future of connected institutional systems.
        </h3>
      </div>
      <ArrowUpRight size={14} className="text-[#9896A4] group-hover:text-[#6B5CE7] transition-colors ml-auto shrink-0" />
    </motion.article>
  );
}

export function InstitutionalPulse() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="News" className="py-24 bg-[#F9F8FF]" ref={ref}>
      <div className="container-page">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-center mb-14"
        >
          <motion.h2 variants={fadeUp} className="text-[clamp(30px,4vw,48px)] font-black text-[#0D0D0F] tracking-tight mb-3">
            Inside HermesWorkspace
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[14px] text-[#888]">
            Stories, product thinking, and operational insights shaping the future of modern institutions.
          </motion.p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5"
        >
          {/* Col 1: large featured */}
          <div className="lg:col-span-1">
            <FeaturedCard />
          </div>

          {/* Col 2+3: stacked cards */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <ArticleCard />
            <MetricsMiniCards />
            <SmallCard />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
