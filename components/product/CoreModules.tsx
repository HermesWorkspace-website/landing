"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageSquare, Bell, Calendar, Settings, Monitor } from "lucide-react";

const modules = [
    {
    icon: MessageSquare,
    title: "Structured Communication",
    desc: "Organized institutional communication across classes, sections, teachers, students, and administration through centralized channels.",
    color: "#22C55E",
  },

  {
    icon: Monitor,
    title: "Online Classes",
    desc: "Conduct live academic sessions directly inside HermesWorkspace with integrated classroom controls and recorded session access.",
    color: "#3b82f6",
  },

  {
    icon: Calendar,
    title: "Meetings & Webinars",
    desc: "Host PTMs, staff meetings, orientation sessions, competitions, and institutional webinars from one connected platform.",
    color: "#f59e0b",
  },

  {
    icon: Bell,
    title: "Verified Notice Board",
    desc: "Distribute official school notices and announcements through a centralized and institution-controlled digital notice system.",
    color: "#a855f7",
  },

  {
    icon: Settings,
    title: "Events & Activities",
    desc: "Manage institutional events, student activities, registrations, and participation through organized operational workflows.",
    color: "#ec4899",
  },
  {
    icon: Monitor,
    title: "Web & Mobile Accessibility",
    desc: "Access HermesWorkspace across web and mobile environments with a connected experience designed for modern institutions.",
    color: "#22C55E",
  },
];

export default function CoreModules() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="features" ref={sectionRef} className="bg-white py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-12">
          <p className="text-[11px] font-bold text-[#6B7280] tracking-widest uppercase mb-3">Institutional Infrastructure</p>
          <h2 className="text-[1.8rem] sm:text-[2.2rem] font-bold text-[#0A1628] tracking-tight leading-tight max-w-md">
            Core Infrastructure for Modern Institutions
          </h2>
        </motion.div>

        {/* Cards grid — 1 col mobile, 2 col tablet, 3+2 desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((mod, i) => (
            <ModuleCard key={mod.title} {...mod} index={i} isInView={isInView} total={modules.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ModuleCard({ icon: Icon, title, desc, color, index, isInView, total }: {
  icon: React.ElementType; title: string; desc: string; color: string; index: number; isInView: boolean; total: number;
}) {
  // Last card spans full width on desktop if odd count
  const isLast = index === total - 1;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5, boxShadow: `0 20px 40px ${color}18` }}
      className={`group flex flex-col gap-4 p-5 sm:p-6 border border-gray-100 rounded-2xl bg-white cursor-default transition-all ${isLast ? "sm:col-span-2 lg:col-span-1" : ""}`}
    >
      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.08, rotate: 3 }}
        transition={{ type: "spring", stiffness: 350 }}
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: `${color}15`, border: `1px solid ${color}25` }}
      >
        <Icon size={18} style={{ color }} />
      </motion.div>

      <div>
        <p className="text-[14px] font-bold text-[#0A1628] mb-2 leading-tight">{title}</p>
        <p className="text-[12px] text-[#6B7280] leading-relaxed">{desc}</p>
      </div>

      {/* Micro hover indicator */}
      <motion.div
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        className="h-[1.5px] rounded-full mt-auto"
        style={{ backgroundColor: color }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
