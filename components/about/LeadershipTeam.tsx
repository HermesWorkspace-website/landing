"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import {
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandX
} from "@tabler/icons-react";
import { useEffect } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const team = [
  {
    name: "Apurav Agarwal",
    role: "Co-Founder & CEO",
    initials: "AP",
    bg: "#0f1f30",

    bio: `Apurav Agarwal is the Co-Founder and Chief Executive Officer of HermesWorkspace, leading the company’s long-term product vision, institutional strategy, operational growth, and platform direction. His work focuses on building modern infrastructure systems that simplify how educational institutions communicate, coordinate, and operate on a daily basis.

The foundation of HermesWorkspace began through direct observation of operational inefficiencies across schools — fragmented communication systems, disconnected administrative workflows, inconsistent notice distribution, and the growing difficulty institutions face while coordinating academic operations at scale. Apurav identified that most schools were still relying on disconnected tools that were never designed specifically for educational environments.

At HermesWorkspace, he works closely with institutions to understand how administrators, teachers, students, and families interact with communication systems in real-world academic settings. That institutional understanding directly shapes the product roadmap, operational priorities, onboarding systems, and deployment approach across the platform.

Beyond product strategy, Apurav leads institutional partnerships, operational execution, branding, deployment coordination, and platform adoption initiatives. His approach combines infrastructure thinking with practical operational clarity — ensuring HermesWorkspace remains deeply aligned with the realities of educational institutions rather than becoming another generic software platform.

He believes the future of educational technology is not built around feature overload, but around operational reliability, clarity, and systems that quietly improve institutional coordination without increasing complexity.`,

    quote:
      "Educational institutions deserve infrastructure built for clarity, reliability, and long-term operational scale.",

    socials: {
      linkedin: "https://www.linkedin.com/in/apurav-agarwal",
      instagram: "https://www.instagram.com/apurav_agarwal",
      twitter: "https://x.com/realapurav",
    },
  },

  {
    name: "Lakshya Kumar",
    role: "Co-Founder & CTO",
    initials: "LK",
    bg: "#0f2318",

    bio: `Lakshya Kumar is the Co-Founder and Chief Technology Officer of HermesWorkspace, responsible for the technical architecture, infrastructure engineering, and scalability systems powering the platform. His work focuses on building resilient backend systems and real-time communication infrastructure capable of supporting modern educational operations at institutional scale.

He leads the development of HermesWorkspace’s core platform architecture — including communication systems, meeting infrastructure, real-time coordination services, backend scalability, database systems, and platform reliability. His engineering philosophy centers around building systems that remain operationally invisible to users while maintaining high levels of performance, consistency, and scalability.

Lakshya designed the foundational infrastructure architecture supporting HermesWorkspace’s operational model, ensuring the platform can support communication workflows, meetings, online classes, and institutional coordination across multiple environments without sacrificing reliability or performance.

His technical direction emphasizes long-term infrastructure thinking over short-term engineering shortcuts. Every architectural decision is designed around scalability, operational resilience, and the evolving needs of educational institutions as digital coordination becomes increasingly important across academic ecosystems.

Alongside infrastructure engineering, Lakshya also contributes heavily to product systems design, platform optimization, and the technical execution of HermesWorkspace’s broader institutional vision — helping transform operational complexity into structured, scalable technology systems.`,

    quote:
      "The best infrastructure feels invisible — reliable systems should quietly support the people depending on them every day.",

    socials: {
      linkedin: "https://www.linkedin.com/in/lakshyakumar266/",
      instagram: "https://www.instagram.com/codingprogamer",
      twitter: "https://x.com/lakshyakumar266",
    },
  },
];

// Helper to dynamically style any occurrence of HermesWorkspace in paragraphs
const renderTextWithBrandFont = (text: string, isLightBg: boolean = true) => {
  if (!text.includes("HermesWorkspace")) return text;
  const parts = text.split("HermesWorkspace");
  return (
    <>
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < parts.length - 1 && (
            <span className={`font-logo font-bold ${isLightBg ? 'text-[#0A1628]' : 'text-white'}`}>
              HermesWorkspace
            </span>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default function LeadershipTeam() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="team" ref={sectionRef} className="bg-white py-24 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">

        {/* Section Header */}
        <div className="flex items-start justify-between mb-20 flex-wrap gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] font-bold text-[#6B7280] tracking-widest uppercase mb-2">
              The People Behind It
            </p>
            <h2 className="text-[2rem] lg:text-[2.4rem] font-bold text-[#0A1628] tracking-tight leading-tight">
              The Founders
            </h2>
            <p className="text-[13px] text-[#6B7280] mt-2">
              Two people. One mission. Built from scratch.
            </p>
          </motion.div>
        </div>

        {/* Editorial entries */}
        <div className="flex flex-col">
          {team.map((member, i) => (
            <EditorialEntry key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EditorialEntry({
  member,
  index,
}: {
  member: (typeof team)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="border-t border-gray-100 py-16"
    >
      <div
        className={`flex flex-col md:flex-row gap-10 items-start ${
          !isEven ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* ── Photo block ── */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -30 : 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex-shrink-0"
        >
          {/* Index number — ABOVE the card, not overlapping */}
          <div className="mb-2 pl-1">
            <span className="text-[2.8rem] font-black text-gray-100 leading-none select-none">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Card */}
          <div
            className="relative w-[260px] h-[320px] rounded-2xl overflow-hidden shadow-lg flex-shrink-0"
            style={{ backgroundColor: member.bg }}
          >
            {/* Noise */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

            {/* Big initials watermark — inside card only */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-[5.5rem] font-black text-white/[0.07] tracking-widest select-none leading-none">
                {member.initials}
              </span>
            </div>

            {/* Green accent bar */}
            <motion.div
              initial={{ scaleY: 0, originY: "top" }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#22C55E] rounded-full"
            />

            {/* Name overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
              <p className="text-[15px] font-bold text-white leading-tight">{member.name}</p>
              <p className="text-[11px] text-[#22C55E] font-medium mt-0.5">{member.role}</p>
            </div>

            {/* Hover shimmer */}
            <motion.div
              initial={{ opacity: 0, x: "-100%" }}
              whileHover={{ opacity: 1, x: "100%" }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
            />
          </div>
        </motion.div>

        {/* ── Text block ── */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 30 : -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-start gap-4 flex-1 pt-2"
        >
          {/* Role badge */}
          <div className="inline-flex w-fit items-center gap-1.5 bg-[#22C55E]/8 border border-[#22C55E]/20 rounded-full px-3 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
            <span className="text-[10px] font-semibold text-[#22C55E] tracking-wider uppercase">
              {member.role}
            </span>
          </div>

          {/* Name */}
          <h3 className="text-[1.8rem] font-bold text-[#0A1628] tracking-tight leading-tight">
            {member.name}
          </h3>

          {/* Bio paragraphs */}
          <div className="flex flex-col gap-3">
            {member.bio.split("\n\n").map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="text-[13px] text-[#4B5563] leading-[1.9]"
              >
                {renderTextWithBrandFont(para, true)}
              </motion.p>
            ))}
          </div>

          {/* Pull quote */}
          <motion.blockquote
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-2 border-l-[3px] border-[#22C55E] pl-4"
          >
            <p className="text-[13px] font-semibold text-[#0A1628] italic leading-relaxed">
              &ldquo;{member.quote}&rdquo;
            </p>
          </motion.blockquote>

          {/* Social links */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.85 }}
            className="flex items-center gap-3 pt-2"
          >
            <a
              href={member.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#0A66C2] hover:bg-[#0A66C2]"
            >
              <IconBrandLinkedin className="h-4 w-4 text-[#0A1628] transition-colors duration-300 group-hover:text-white" />
            </a>

            <a
              href={member.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-pink-500 hover:bg-pink-500"
            >
              <IconBrandInstagram className="h-4 w-4 text-[#0A1628] transition-colors duration-300 group-hover:text-white" />
            </a>

            <a
              href={member.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-black hover:bg-black"
            >
              <IconBrandX className="h-4 w-4 text-[#0A1628] transition-colors duration-300 group-hover:text-white" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}