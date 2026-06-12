"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { Shield, BookOpen, Users, User } from "lucide-react";

const roles = [
  {
    icon: Shield,
    label: "Administrators",
    desc: "Manage institutional communication, notices, meetings, departments, academic coordination, and operational workflows from one centralized platform.",
    color: "#6063EE",
    features: [
      "Institution management",
      "Department coordination",
      "Notice distribution",
      "Webinars scheduling",
      "Role-based access",
      "Operational visibility"
    ],
  },

  {
    icon: BookOpen,
    label: "Teachers",
    desc: "Coordinate classes, communicate with students, share academic updates, manage schedules, and stay aligned with institutional operations through connected workflows.",
    color: "#6063EE",
    features: [
      "Class communication",
      "Academic updates",
      "Online class coordination",
      "Schedule access",
      "Activity sharing",
      "Student coordination"
    ],
  },

  {
    icon: Users,
    label: "Students",
    desc: "Access notices, schedules, announcements, meetings, academic updates, and institutional communication through one connected academic platform.",
    color: "#6063EE",
    features: [
      "Notice access",
      "Academic schedules",
      "Institution updates",
      "Activity updates",
      "Class announcements",
      "Centralized communication"
    ],
  },

  {
    icon: User,
    label: "Parents",
    desc: "Parents can stay informed through the student account experience, including institutional notices, academic updates, schedules, announcements, and important communication.",
    color: "#6063EE",
    features: [
      "Academic visibility",
      "Institution updates",
      "Notice access",
      "Schedule visibility",
      "Important announcements",
      "Student progress updates"
    ],
  },
];

export default function Community() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="roles" ref={sectionRef} className="bg-[#F7F8FB] py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <m.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12 sm:mb-16">
          <p className="text-[11px] font-bold text-[#61667A] tracking-widest uppercase mb-3">Built for Every Institutional Role</p>
          <h2 className="text-[1.8rem] sm:text-[2.4rem] font-bold text-[#1A1D26] tracking-tight leading-tight">
            Empowering the Institution
          </h2>
          <p className="text-[14px] text-[#61667A] mt-3 max-w-md mx-auto leading-relaxed">
            HermesWorkspace connects administrators, teachers, and students through centralized communication and academic coordination.
          </p>
        </m.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {roles.map((role, i) => (
            <RoleCard key={role.label} {...role} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RoleCard({ icon: Icon, label, desc, color, features, index, isInView }: {
  icon: React.ElementType; label: string; desc: string; color: string; features: string[]; index: number; isInView: boolean;
}) {
  return (
    <m.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, boxShadow: `0 24px 48px ${color}18` }}
      className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 flex flex-col gap-4 cursor-default"
    >
      {/* Icon */}
      <m.div whileHover={{ scale: 1.1, rotate: 4 }} transition={{ type: "spring", stiffness: 350 }}
        className="size-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}12`, border: `1px solid ${color}22` }}>
        <Icon size={18} style={{ color }} />
      </m.div>

      <div>
        <p className="text-[14px] font-bold text-[#1A1D26] mb-2">{label}</p>
        <p className="text-[12px] text-[#61667A] leading-relaxed">{desc}</p>
      </div>

      {/* Feature pills */}
      <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-gray-50">
        {features.map((f) => (
          <span key={f} className="text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: `${color}10`, color }}>
            {f}
          </span>
        ))}
      </div>
    </m.div>
  );
}
