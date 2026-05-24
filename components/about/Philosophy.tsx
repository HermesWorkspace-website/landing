"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MessageSquare,
  LayoutGrid,
  Eye,
  Server,
  ShieldCheck,
} from "lucide-react";

const pillars = [
  {
    icon: MessageSquare,
    title: "Communication",
    desc: "Centralizing institutional communication across administrators, teachers, students, and families through one connected platform.",
  },

  {
    icon: LayoutGrid,
    title: "Coordination",
    desc: "Simplifying academic workflows, scheduling, notices, meetings, and operational processes through structured digital systems.",
  },

  {
    icon: Eye,
    title: "Clarity",
    desc: "Reducing fragmented information and creating operational transparency through unified institutional workflows.",
  },

  {
    icon: Server,
    title: "Infrastructure",
    desc: "Building scalable digital infrastructure designed specifically for modern educational institutions and long-term operational growth.",
  },

  {
    icon: ShieldCheck,
    title: "Reliability",
    desc: "Designing systems focused on consistency, operational stability, secure access, and dependable institutional performance.",
  },
];

export default function Philosophy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="vision" ref={sectionRef} className="bg-white py-20 px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="text-[1.9rem] font-bold text-[#0A1628] tracking-tight">
          The HermesWorkspace's Philosophy
        </h2>
        <p className="text-[13px] text-[#6B7280] mt-2">Operating with institutional precision.</p>
      </motion.div>

      {/* Pillars grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {pillars.map((p, i) => (
          <PhilosophyCard key={p.title} {...p} index={i} isInView={isInView} />
        ))}
      </div>
    </section>
  );
}

function PhilosophyCard({
  icon: Icon,
  title,
  desc,
  index,
  isInView,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{
        y: -6,
        boxShadow: "0 16px 32px rgba(10,22,40,0.09)",
        borderColor: "rgba(34,197,94,0.35)",
      }}
      className="group flex flex-col gap-3 p-5 border border-gray-100 rounded-xl bg-white cursor-default transition-colors"
    >
      {/* Icon container */}
      <motion.div
        whileHover={{ scale: 1.08, backgroundColor: "#0A1628" }}
        transition={{ type: "spring", stiffness: 350 }}
        className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-[#0A1628] transition-colors"
      >
        <Icon
          size={16}
          className="text-[#6B7280] group-hover:text-[#22C55E] transition-colors"
        />
      </motion.div>

      <div>
        <p className="text-[13px] font-semibold text-[#0A1628] mb-1">{title}</p>
        <p className="text-[11.5px] text-[#6B7280] leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}
