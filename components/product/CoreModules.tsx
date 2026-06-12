"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { MessageSquare, Bell, Calendar, Settings, Monitor } from "lucide-react";

const modules = [
    {
    icon: MessageSquare,
    title: "Structured Communication",
    desc: "Organized institutional communication across classes, sections, teachers, students, and administration through centralized channels.",
    color: "#6063EE",
  },

  {
    icon: Monitor,
    title: "Online Classes",
    desc: "Conduct live academic sessions directly inside HermesWorkspace with integrated classroom controls and recorded session access.",
    color: "#6063EE",
  },

  {
    icon: Calendar,
    title: "Meetings & Webinars",
    desc: "Host PTMs, staff meetings, orientation sessions, competitions, and institutional webinars from one connected platform.",
    color: "#6063EE",
  },

  {
    icon: Bell,
    title: "Notices & Announcements",
    desc: "Push school-wide notices, exam schedules, holiday announcements, and urgent updates to parents, teachers, and students instantly.",
    color: "#6063EE",
  },

  {
    icon: Settings,
    title: "Admin Controls",
    desc: "Manage members, roles, departments, classes, communication settings, and institutional configurations from a centralized admin panel.",
    color: "#6063EE",
  },
];

export default function CoreModules() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="features" ref={sectionRef} className="bg-white py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <m.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-12">
          <p className="text-[11px] font-bold text-[#61667A] tracking-widest uppercase mb-3">Institutional Infrastructure</p>
          <h2 className="text-[1.8rem] sm:text-[2.2rem] font-bold text-[#1A1D26] tracking-tight leading-tight max-w-md">
            Core Infrastructure for Modern Institutions
          </h2>
        </m.div>

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
    <m.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5, boxShadow: `0 20px 40px ${color}18` }}
      className={`group flex flex-col gap-4 p-5 sm:p-6 border border-gray-100 rounded-2xl bg-white cursor-default transition-all ${isLast ? "sm:col-span-2 lg:col-span-1" : ""}`}
    >
      {/* Icon */}
      <m.div
        whileHover={{ scale: 1.08, rotate: 3 }}
        transition={{ type: "spring", stiffness: 350 }}
        className="size-10 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: `${color}15`, border: `1px solid ${color}25` }}
      >
        <Icon size={18} style={{ color }} />
      </m.div>

      <div>
        <p className="text-[14px] font-bold text-[#1A1D26] mb-2 leading-tight">{title}</p>
        <p className="text-[12px] text-[#61667A] leading-relaxed">{desc}</p>
      </div>

      {/* Micro hover indicator */}
      <m.div
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        className="h-[1.5px] rounded-full mt-auto"
        style={{ backgroundColor: color }}
        transition={{ duration: 0.3 }}
      />
    </m.div>
  );
}
