"use client";

/**
 * MobileAbout.tsx
 * ---------------
 * Lightweight mobile-only version of the About page.
 * Rendered below md breakpoint via the page root.
 *
 * What's stripped vs desktop:
 *  - Three.js canvas (aboutHero)         → ambient CSS gradient only
 *  - GSAP ScrollTrigger (OurStory, Ecosystem, LeadershipTeam) → framer-motion only
 *  - Long multi-paragraph bios (LeadershipTeam) → 2-sentence summary each
 *  - Dashboard mockup cards (Ecosystem)  → stat pills only
 *  - useMagnetic hook (CTA)              → plain buttons
 *  - ResourceAllocationCard / bar charts → removed
 *
 * Everything else — colors, fonts, content, section order — is identical.
 */

import { useRef, useState } from "react";
import Image from "next/image";
import { FOUNDER_PHOTO_QUALITY, FOUNDER_PHOTO_SIZES } from "@/components/founders/FounderPhoto";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Plus,
  Minus,
  MessageSquare,
  LayoutGrid,
  Eye,
  Server,
  ShieldCheck,
  ArrowRight,
  Linkedin,
  Instagram,
  Zap,
  Globe,
} from "lucide-react";
import { useRouter } from "next/navigation";

// ─── shared token ────────────────────────────────────────────────────────────
const INK = "#0A1628";
const GREEN = "#22C55E";
const MUTED = "#6B7280";

// X icon
function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

// ─── fade-up wrapper ──────────────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── section label ────────────────────────────────────────────────────────────
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[10px] font-bold tracking-widest uppercase mb-3"
      style={{ color: GREEN }}
    >
      {children}
    </p>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 7. FAQ
// ═══════════════════════════════════════════════════════════════════════════════
const FAQS = [
  {
    q: "What is HermesWorkspace building?",
    a: "HermesWorkspace is building operational infrastructure for modern educational institutions — centralizing communication, academic coordination, meetings, notices, and institutional workflows into one connected platform.",
  },
  {
    q: "Why was HermesWorkspace founded?",
    a: "HermesWorkspace was founded to modernize how institutions operate internally. Many schools still rely on fragmented tools and manual coordination systems, creating communication gaps and operational inefficiencies.",
  },
  {
    q: "Who are the founders of HermesWorkspace?",
    a: "HermesWorkspace was founded by Apurav Agarwal and Lakshya Kumar, focused on building scalable institutional systems that combine operational clarity, infrastructure reliability, and long-term digital transformation.",
  },
  {
    q: "What makes HermesWorkspace different from traditional school software?",
    a: "HermesWorkspace is designed as a connected operational ecosystem rather than isolated administrative software. The platform focuses on institutional communication, coordination, infrastructure scalability, and unified workflows.",
  },
  {
    q: "What is the long-term vision behind HermesWorkspace?",
    a: "The long-term vision is to create infrastructure that helps institutions operate with greater efficiency, coordination, transparency, and scalability across communication and academic systems.",
  },
  {
    q: "Is HermesWorkspace focused only on schools?",
    a: "While HermesWorkspace currently focuses on educational institutions, the broader vision extends toward scalable operational systems and communication infrastructure for complex organizations and institutional environments.",
  },
];

function FAQItem({
  q,
  a,
  open,
  toggle,
}: {
  q: string;
  a: string;
  open: boolean;
  toggle: () => void;
}) {
  return (
    <div
      className="cursor-pointer border-b border-gray-100"
      onClick={toggle}
    >
      <div className="flex items-start justify-between gap-4 py-4">
        <h4 className="pr-2 text-[13.5px] font-semibold leading-snug" style={{ color: INK }}>
          {q}
        </h4>
        <div
          className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border transition-all"
          style={{
            borderColor: open ? `${GREEN}50` : "#E5E7EB",
            background: open ? `${GREEN}12` : "transparent",
            color: open ? GREEN : MUTED,
          }}
        >
          {open ? <Minus size={12} /> : <Plus size={12} />}
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-4 pr-6 text-[13px] leading-[1.75]" style={{ color: MUTED }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatValue({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) {
    return <span style={{ color: INK }}>{value}</span>;
  }
  return (
    <>
      <span style={{ color: GREEN }}>{match[1]}</span>
      <span style={{ color: INK }}>{match[2]}</span>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. HERO — same layout pattern as contact mobile hero
// ═══════════════════════════════════════════════════════════════════════════════
function MobileHero() {
  return (
    <section className="relative overflow-x-hidden bg-white pt-[96px] pb-10 px-5">
      {/* CSS ambient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-20%] top-[5%] size-80 rounded-full bg-green-100/70 blur-3xl" />
        <div className="absolute right-[-15%] bottom-[8%] size-72 rounded-full bg-emerald-50/90 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[2] h-16 bg-gradient-to-t from-white to-transparent" />

      <div className="relative z-10 w-full">
        <div className="flex flex-col items-start text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2"
            style={{ borderColor: `${GREEN}40`, background: `${GREEN}0D` }}
          >
            <motion.span
              className="size-1.5 rounded-full"
              style={{ background: GREEN }}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: GREEN }}>
              Transforming Education
            </span>
          </motion.div>

          {/* Headline — stacked blocks like contact hero */}
          <div className="mb-5">
            <motion.h1
              className="font-display leading-[1.02] tracking-[-0.04em]"
              style={{ fontSize: "clamp(2.5rem, 11vw, 3.5rem)" }}
            >
              {[
                { text: "Building Modern", accent: "Modern" },
                { text: "Infrastructure For", accent: null },
                { text: "Educational", accent: "Educational" },
                { text: "Institutions", accent: null },
              ].map((line, i) => (
                <motion.span
                  key={line.text}
                  className="block"
                  style={{ color: INK }}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line.accent && line.text.includes(line.accent) ? (
                    <>
                      {line.text.replace(line.accent, "").trim()}{" "}
                      <span style={{ color: GREEN }}>{line.accent}</span>
                    </>
                  ) : (
                    line.text
                  )}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="mb-8 max-w-[480px] text-[15px] leading-[1.75]"
            style={{ color: MUTED }}
          >
            HermesWorkspace is the backbone of next-generation academic management — delivering clarity and scale for modern institutions.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById("mission")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl px-7 text-[13px] font-bold text-white sm:w-auto"
              style={{ background: INK }}
            >
              Explore Mission
              <ArrowRight className="size-4 shrink-0" style={{ color: GREEN }} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById("team")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border px-7 text-[13px] font-bold sm:w-auto"
              style={{
                background: `${GREEN}12`,
                borderColor: `${GREEN}45`,
                color: INK,
              }}
            >
              <Globe className="size-4 shrink-0" style={{ color: GREEN }} />
              Meet the Founders
            </motion.button>
          </motion.div>

          {/* Trust bar — same pattern as contact hero */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            className="mt-6 flex flex-col gap-3 border-t border-black/[0.06] pt-6"
          >
            {[
              { icon: <MessageSquare className="size-3.5" />, label: "Institutional Communication" },
              { icon: <Server className="size-3.5" />, label: "Scalable Academic Infrastructure" },
              { icon: <Zap className="size-3.5" />, label: "Built for Modern Institutions" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.08 }}
                className="flex items-center gap-1.5"
              >
                <span style={{ color: GREEN }}>{item.icon}</span>
                <span className="text-[11px] font-semibold" style={{ color: MUTED }}>
                  {item.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MobileOurStory() {
  return (
    <section id="mission" className="bg-white py-16 px-5 border-t border-gray-100">
      <FadeUp>
        <Eyebrow>The Foundation</Eyebrow>
        <h2 className="text-[1.7rem] font-bold leading-tight tracking-tight mb-5" style={{ color: INK }}>
          Built for Clarity and Scale
        </h2>
      </FadeUp>

      <FadeUp delay={0.1}>
        <p className="text-[14px] leading-[1.85]" style={{ color: "#4B5563" }}>
          Founded in 2026, HermesWorkspace was created after recognizing how fragmented institutional
          communication and academic coordination had become across modern educational environments.
          Most institutions still depend on disconnected tools — creating inefficiencies across
          administrators, teachers, students, and families.
        </p>
      </FadeUp>

      <FadeUp delay={0.2} className="mt-6">
        <div
          className="border-l-[3px] pl-4 py-1"
          style={{ borderColor: GREEN }}
        >
          <p className="text-[13.5px] font-semibold leading-relaxed" style={{ color: INK }}>
            "Educational institutions deserve systems built for clarity, reliability, and scale. We didn't just
            build a dashboard — we built an institutional operating system."
          </p>
        </div>
      </FadeUp>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3. STATS
// ═══════════════════════════════════════════════════════════════════════════════
const STATS = [
  { value: "8+", label: "Core Institutional Modules" },
  { value: "24+", label: "Connected Workflows" },
  { value: "100%", label: "Focused on Education" },
];

function MobileStats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="py-14 px-5 border-t border-b border-gray-100 bg-white">
      <div className="grid grid-cols-3 gap-3">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            className="flex flex-col gap-1"
          >
            <span className="text-[2rem] font-black leading-none">
              <StatValue value={s.value} />
            </span>
            <p className="text-[9px] font-bold tracking-wider uppercase leading-tight" style={{ color: MUTED }}>
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 4. PHILOSOPHY
// ═══════════════════════════════════════════════════════════════════════════════
const PILLARS = [
  { icon: MessageSquare, title: "Communication", desc: "Centralizing institutional communication across all stakeholders." },
  { icon: LayoutGrid, title: "Coordination", desc: "Simplifying academic workflows and operational processes." },
  { icon: Eye, title: "Clarity", desc: "Creating operational transparency through unified workflows." },
  { icon: Server, title: "Infrastructure", desc: "Scalable digital infrastructure for long-term growth." },
  { icon: ShieldCheck, title: "Reliability", desc: "Consistent, secure, dependable institutional performance." },
];

function MobilePhilosophy() {
  return (
    <section id="vision" className="bg-white py-16 px-5 border-t border-gray-100">
      <FadeUp>
        <Eyebrow>Operating Principles</Eyebrow>
        <h2 className="text-[1.7rem] font-bold tracking-tight mb-8" style={{ color: INK }}>
          The HermesWorkspace Philosophy
        </h2>
      </FadeUp>

      <div className="grid grid-cols-2 gap-3">
        {PILLARS.map((p, i) => {
          const Icon = p.icon;
          return (
            <FadeUp key={p.title} delay={i * 0.07}>
              <div
                className="flex flex-col gap-2.5 rounded-xl border border-gray-100 bg-white p-4"
                style={i === 4 ? { gridColumn: "1 / -1" } : {}}
              >
                <div
                  className="flex size-8 items-center justify-center rounded-lg"
                  style={{ background: `${GREEN}12`, border: `1px solid ${GREEN}30` }}
                >
                  <Icon size={15} style={{ color: GREEN }} />
                </div>
                <p className="text-[12.5px] font-semibold" style={{ color: INK }}>{p.title}</p>
                <p className="text-[11px] leading-relaxed" style={{ color: MUTED }}>{p.desc}</p>
              </div>
            </FadeUp>
          );
        })}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 5. ECOSYSTEM (no dashboard mockup — just the text + feature pills)
// ═══════════════════════════════════════════════════════════════════════════════
function MobileEcosystem() {
  return (
    <section className="relative py-16 px-5" style={{ background: INK }}>
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 size-48 rounded-full opacity-10 blur-3xl" style={{ background: GREEN }} />
      </div>

      <FadeUp>
        <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: "#6063EE" }}>
          Institutional Infrastructure
        </p>
        <h2 className="text-[1.7rem] font-bold leading-[1.1] tracking-tight text-white mb-5">
          One operational system for modern educational institutions.
        </h2>
        <p className="text-[13.5px] leading-[1.85] mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
          HermesWorkspace centralizes communication, academic coordination, meetings, notices,
          and institutional workflows into one connected platform designed for clarity and scale.
        </p>
      </FadeUp>

      {/* Feature pills */}
      <FadeUp delay={0.15}>
        <div className="flex flex-col gap-3">
          {[
            "Institutional-Grade Communication Infrastructure",
            "Integrated Academic Coordination & Meetings",
            "Scalable Operational Workflows",
            "Centralised Notices & Announcements",
          ].map((f) => (
            <div
              key={f}
              className="flex items-center gap-3 rounded-xl border px-4 py-3"
              style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }}
            >
              <div className="size-1.5 shrink-0 rounded-full" style={{ background: GREEN }} />
              <p className="text-[12.5px] font-medium text-white">{f}</p>
            </div>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 6. LEADERSHIP (condensed bios — 2 sentences each)
// ═══════════════════════════════════════════════════════════════════════════════
const TEAM = [
  {
    name: "Apurav Agarwal",
    role: "Co-Founder & CEO",
    initials: "AA",
    photo: "https://ik.imagekit.io/hermesworkspace/Landing/assets/apurav.png",
    bg: "#0f1f30",
    accentColor: "#6B5CE7",
    bio: "Leads HermesWorkspace's institutional strategy, partnerships, operational growth, and platform direction. His work focuses on building infrastructure that simplifies how schools communicate and coordinate on a daily basis.",
    quote: "Educational institutions deserve infrastructure built for clarity, reliability, and long-term operational scale.",
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
    photo: "https://ik.imagekit.io/hermesworkspace/Landing/assets/lakshya.png",
    bg: "#0f2318",
    accentColor: "#1A3FBE",
    bio: "Architects HermesWorkspace's backend infrastructure, real-time communication systems, and platform scalability. His engineering philosophy centers around building systems that remain operationally invisible while maintaining high performance.",
    quote: "The best infrastructure feels invisible — reliable systems should quietly support the people depending on them every day.",
    socials: {
      linkedin: "https://www.linkedin.com/in/lakshyakumar266/",
      instagram: "https://www.instagram.com/codingprogamer",
      twitter: "https://x.com/lakshyakumar266",
    },
  },
];

function MobileLeadershipTeam() {
  return (
    <section id="team" className="bg-white py-16 px-5 border-t border-gray-100">
      <FadeUp>
        <Eyebrow>The People Behind It</Eyebrow>
        <h2 className="text-[1.7rem] font-bold tracking-tight mb-1" style={{ color: INK }}>
          The Founders
        </h2>
        <p className="text-[13px] mb-10" style={{ color: MUTED }}>
          Two people. One mission. Built from scratch.
        </p>
      </FadeUp>

      <div className="flex flex-col gap-14">
        {TEAM.map((member, i) => (
          <FadeUp key={member.name} delay={i * 0.1}>
            <div className="flex flex-col gap-5">

              {/* ── Portrait card — 38% screen height, organic shapes + initials circle ── */}
              <div
                className="relative w-full overflow-hidden rounded-2xl shadow-lg"
                style={{ height: "38svh", background: member.bg }}
              >
                {/* Noise texture */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
                  }}
                />

                {/* Organic background SVG shapes — mirrors FounderAvatar */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 360 280" preserveAspectRatio="xMidYMid slice">
                  {(i === 0
                    ? [
                      { cx: "50%", cy: "38%", r: 120, fill: "#EAE8FF" },
                      { cx: "62%", cy: "65%", r: 85, fill: "#D5D0FF" },
                      { cx: "28%", cy: "58%", r: 65, fill: "#F0EEFF" },
                    ]
                    : [
                      { cx: "50%", cy: "38%", r: 120, fill: "#E6EDFF" },
                      { cx: "38%", cy: "68%", r: 85, fill: "#C9D7FF" },
                      { cx: "72%", cy: "52%", r: 65, fill: "#EEF2FF" },
                    ]
                  ).map((s, si) => (
                    <motion.circle
                      key={`circle-${si}`}
                      cx={s.cx} cy={s.cy} r={s.r} fill={s.fill}
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: si * 0.1, duration: 0.6 }}
                    />
                  ))}
                </svg>

                {/* Green accent bar left */}
                <div className="absolute left-0 top-0 bottom-0 z-10 w-[3px]" style={{ background: GREEN }} />

                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  sizes={FOUNDER_PHOTO_SIZES}
                  quality={FOUNDER_PHOTO_QUALITY}
                  className="object-cover object-top"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                {/* Rotating accent rings */}
                <motion.div
                  className="absolute rounded-full border pointer-events-none"
                  style={{ width: 200, height: 200, top: "50%", left: "50%", marginTop: -100, marginLeft: -100, borderColor: `${member.accentColor}25` }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                />

                {/* Founder label */}
                <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center justify-end gap-3 pb-5">
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-2"
                  >
                    <div className="h-px w-6" style={{ background: member.accentColor }} />
                    <span className="text-[9px] tracking-[3px] uppercase font-medium" style={{ color: member.accentColor }}>
                      Founder {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="h-px w-6" style={{ background: member.accentColor }} />
                  </motion.div>
                </div>
              </div>

              {/* ── Info block ── */}
              <div className="flex flex-col gap-4">
                {/* Role badge + name */}
                <div>
                  <div
                    className="mb-2 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5"
                    style={{ borderColor: `${GREEN}30`, background: `${GREEN}0D` }}
                  >
                    <div className="size-1 rounded-full" style={{ background: GREEN }} />
                    <span className="text-[9px] font-semibold tracking-wider uppercase" style={{ color: GREEN }}>
                      {member.role}
                    </span>
                  </div>
                  <h3 className="text-[1.5rem] font-bold leading-tight tracking-tight" style={{ color: INK }}>
                    {member.name}
                  </h3>
                </div>

                {/* Bio */}
                <p className="text-[13px] leading-[1.85]" style={{ color: "#4B5563" }}>
                  {member.bio}
                </p>

                {/* Pull quote */}
                <div className="rounded-xl px-4 py-3" style={{ background: `${GREEN}0A`, borderLeft: `3px solid ${GREEN}` }}>
                  <p className="text-[12.5px] font-semibold italic leading-relaxed" style={{ color: INK }}>
                    &ldquo;{member.quote}&rdquo;
                  </p>
                </div>

                {/* Socials */}
                <div className="flex items-center gap-2.5">
                  <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer"
                    className="flex size-9 items-center justify-center rounded-full border border-gray-200" aria-label="LinkedIn">
                    <Linkedin size={14} style={{ color: INK }} />
                  </a>
                  <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer"
                    className="flex size-9 items-center justify-center rounded-full border border-gray-200" aria-label="Instagram">
                    <Instagram size={14} style={{ color: INK }} />
                  </a>
                  <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer"
                    className="flex size-9 items-center justify-center rounded-full border border-gray-200" aria-label="X">
                    <XIcon size={14} />
                  </a>
                </div>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}


function MobileFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faqs" className="bg-white py-16 px-5 border-t border-gray-100">
      <FadeUp>
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="text-[1.7rem] font-bold tracking-tight mb-8" style={{ color: INK }}>
          Questions?{" "}
          <span style={{ color: GREEN }}>Answered.</span>
        </h2>
      </FadeUp>

      <FadeUp delay={0.1}>
        {FAQS.map((f, i) => (
          <FAQItem
            key={f.q}
            q={f.q}
            a={f.a}
            open={openIdx === i}
            toggle={() => setOpenIdx(openIdx === i ? null : i)}
          />
        ))}
      </FadeUp>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 8. CTA
// ═══════════════════════════════════════════════════════════════════════════════
function MobileCTA() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section id="cta" className="px-5 py-10 pb-20 bg-white">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl px-7 py-12 text-center"
        style={{ background: "#071221" }}
      >
        {/* Top border glow */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px"
          style={{
            width: "70%",
            background: "linear-gradient(90deg, transparent, rgba(90,95,232,0.6), transparent)",
          }}
        />
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(circle at top, rgba(96,99,238,0.14), transparent 55%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center gap-5">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
            style={{ borderColor: "rgba(255,255,255,0.15)" }}
          >
            <span className="text-[9px] font-bold tracking-widest uppercase text-white">
              Every School. One Platform.
            </span>
          </div>

          {/* Heading */}
          <h2
            className="text-[1.65rem] font-bold leading-[1.1] tracking-tight text-white"
          >
            Ready To Modernize{" "}
            <span style={{ color: GREEN }}>Institutional</span>{" "}
            Communication?
          </h2>

          {/* Sub */}
          <p className="text-[13px] leading-[1.8]" style={{ color: "rgba(255,255,255,0.45)", maxWidth: 280 }}>
            Join forward-thinking schools across India that have unified their operations with HermesWorkspace.
          </p>

          {/* Buttons */}
          <div className="flex flex-col w-full gap-3 mt-2">
            <button type="button"
              onClick={() => router.push("/contact?scroll=inquiry")}
              className="w-full rounded-xl py-3.5 text-[13px] font-bold"
              style={{ background: "#fff", color: INK }}
            >
              Schedule Consultation
            </button>
            <button type="button"
              onClick={() => router.push("/?scroll=pricing")}
              className="w-full rounded-xl border py-3.5 text-[13px] font-bold text-white"
              style={{ borderColor: "rgba(255,255,255,0.2)" }}
            >
              View All Plans
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT EXPORT
// ═══════════════════════════════════════════════════════════════════════════════
export default function MobileAbout() {
  return (
    <main style={{ fontFamily: "var(--font-body, 'DM Sans', sans-serif)" }}>
      <MobileHero />
      <MobileOurStory />
      <MobileStats />
      <MobilePhilosophy />
      <MobileEcosystem />
      <MobileLeadershipTeam />
      <MobileFAQ />
      <MobileCTA />
    </main>
  );
}