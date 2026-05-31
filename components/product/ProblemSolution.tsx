"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { XCircle, CheckCircle } from "lucide-react";

const problems = [
  "WhatsApp groups with no access control",
  "Important notices buried inside WhatsApp groups",
  "Separate apps for classes, meetings, and announcements",
  "No centralized communication across the institution",
  "Difficulty tracking updates across departments and classes",
  "No visibility across departments"
];

const solutions = [
  "Centralized communication channels for the entire institution",
  "Official notices and announcements in one verified platform",
  "Integrated classes, meetings, webinars, and academic coordination",
  "Role-scoped channels with admin controls",
  "One platform — every workflow unified",
  "Real-time dashboard across all functions",
];

export default function ProblemSolution() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="why" ref={sectionRef} className="bg-white py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-12 sm:mb-16">
          <p className="text-[11px] font-bold text-[#6B7280] tracking-widest uppercase mb-3">Why HermesWorkspace</p>
          <h2 className="text-[1.8rem] sm:text-[2.2rem] font-bold text-[#0A1628] tracking-tight max-w-lg leading-tight">
            Bring communication, notices,
            classes, and coordination
            into one place.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-start">
          {/* Before */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}>
            <div className="flex items-center gap-2 mb-5">
              <div className="size-6 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
                <XCircle size={14} className="text-red-400" />
              </div>
              <p className="text-[12px] font-bold text-red-400 tracking-wider uppercase">Fragmented Workflows</p>
            </div>
            <div className="flex flex-col gap-3">
              {problems.map((p, i) => (
                <motion.div key={`item-${i}`} initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-xl border border-red-50 bg-red-50/50">
                  <div className="size-1.5 rounded-full bg-red-300 flex-shrink-0 mt-1.5" />
                  <span className="text-[13px] text-[#4B5563] leading-relaxed">{p}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>



          {/* After */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            <div className="flex items-center gap-2 mb-5">
              <div className="size-6 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center">
                <CheckCircle size={14} className="text-[#22C55E]" />
              </div>
              <p className="text-[12px] font-bold text-[#22C55E] tracking-wider uppercase">Connected Infrastructure</p>
            </div>
            <div className="flex flex-col gap-3">
              {solutions.map((s, i) => (
                <motion.div key={`item-${i}`} initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-xl border border-[#22C55E]/15 bg-[#22C55E]/5">
                  <div className="size-1.5 rounded-full bg-[#22C55E] flex-shrink-0 mt-1.5" />
                  <span className="text-[13px] text-[#0A1628] font-medium leading-relaxed">{s}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Learn more */}
        
      </div>
    </section>
  );
}
