"use client";

/**
 * Mobile.tsx — Lightweight mobile version of the HermesWorkspace home page
 * ─────────────────────────────────────────────────────────────────────────────
 * Rules:
 *  • NO Three.js / WebGL / canvas
 *  • NO particle backgrounds
 *  • NO heavy GSAP ScrollTrigger timelines
 *  • Simple CSS transitions + minimal Framer Motion (opacity/y only)
 *  • Only essential content — hero, features (list), workflow, pricing (simplified), FAQ, CTA
 *  • Matches your existing brand tokens exactly
 *
 * Usage — in your home page (e.g. app/page.tsx or Home_sections/index):
 *
 *   import MobilePage from "@/components/Home_sections/Mobile"
 *
 *   // wrap in md:hidden so desktop is untouched:
 *   <div className="block md:hidden">
 *     <MobilePage />
 *   </div>
 *   <div className="hidden md:block">
 *     ... your existing desktop sections ...
 *   </div>
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useState, useRef } from "react";
import { m, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowRight, Zap, Video, MessageSquare, Bell,
  Users, Activity, Calendar, Presentation,
  Check, Plus, Minus, Mail, ChevronRight,
  Shield, Globe2, BookOpen
} from "lucide-react";
import Link from "next/link";

// ─── SHARED FADE-UP ───────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <m.div ref={ref} className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </m.div>
  );
}

// ─── SECTION EYEBROW ─────────────────────────────────────────────────────────
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="section-eyebrow">{children}</span>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. HERO
// ═══════════════════════════════════════════════════════════════════════════════
function MobileHero() {
  return (
    <section className="relative pt-24 pb-10 overflow-hidden bg-[var(--bg)]">
      {/* Minimal static gradient — no canvas */}
      <div className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(96,99,238,0.10) 0%, transparent 70%)",
        }} />

      <div className="container-page relative z-10 flex flex-col items-center text-center gap-5">

        {/* Badge */}
        <m.div initial={{ opacity: 1, y: 0 }}>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/[0.08] border border-brand/[0.12] text-[11px] font-semibold text-brand font-body">
            <Zap className="size-3 fill-brand" />
            v1.0.1 Live Now
          </span>
        </m.div>

        {/* Headline */}
        <m.h1 initial={{ opacity: 1, y: 0 }}
          className="font-display font-extrabold leading-[1.08] tracking-[-0.03em] text-brand-ink"
          style={{ fontSize: "clamp(2rem, 9vw, 2.8rem)" }}
        >
          Every school.<br />
          <span className="gradient-text-brand">Connected Through<br />One Platform.</span>
        </m.h1>

        {/* Sub */}
        <m.p initial={{ opacity: 1, y: 0 }}
          className="text-[0.9375rem] text-brand-muted font-body leading-relaxed max-w-[320px]"
        >
          HermesWorkspace centralizes communication, notices, classes, meetings, and academic coordination — built for Indian schools.
        </m.p>

        {/* CTAs */}
        <m.div initial={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-3 w-full max-w-[280px]"
        >
          <Link href="/contact?scroll=inquiry"
            className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-brand text-white font-bold text-sm font-body shadow-[0_4px_20px_rgba(96,99,238,0.35)] active:scale-[0.97] transition-transform">
            Request Live Demo <ArrowRight className="size-4" />
          </Link>
          <button
            type="button"
            onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
            className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-black/[0.08] text-brand-ink font-semibold text-sm font-body active:scale-[0.97] transition-transform bg-white"
          >
            <Video className="size-4 text-brand" /> Explore Platform
          </button>
        </m.div>

        {/* Trust strip */}
        {/* <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2 text-xs text-brand-muted font-body"
        >
          <div className="flex -space-x-1.5">
            {["#6063EE", "#7B7FF0", "#4648D4", "#8A8DF5"].map((c, i) => (
              <div key={`item-${i}`} className="size-5 rounded-full border-2 border-white" style={{ background: c }} />
            ))}
          </div>
          <span>Built for Indian schools</span>
        </m.div> */}

        {/* Minimal dashboard preview — static, no mock UI overhead */}
        <m.div initial={{ opacity: 1, y: 0 }}
          className="w-full mt-2 rounded-2xl border border-black/[0.06] bg-white shadow-[0_8px_40px_rgba(96,99,238,0.10)] overflow-hidden"
        >
          {/* Fake browser bar */}
          <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-black/[0.05] bg-[#FAFAFA]">
            {["#ff5f57","#febc2e","#28c840"].map((c, i) => (
              <div key={c} className="size-2 rounded-full" style={{ background: c, animation: `browserDot 2s ease-in-out ${i * 0.3}s infinite` }} />
            ))}
            <div className="ml-2 flex-1 h-4 rounded bg-black/[0.04]" />
          </div>
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2 p-3">
            {[
              { label: "Students", val: "2000+", color: "bg-blue-500/[0.07]" },
              { label: "Teachers", val: "50+", color: "bg-brand/[0.07]" },
              { label: "Engage", val: "94%", color: "bg-green-500/[0.07]" },
            ].map(s => (
              <div key={s.label} className={`${s.color} rounded-xl p-2.5 text-center`}>
                <div className="font-display font-bold text-brand-ink text-base">{s.val}</div>
                <div className="text-[9px] text-brand-ink/40 uppercase tracking-wider font-body">{s.label}</div>
              </div>
            ))}
          </div>
          {/* Live sessions row */}
          <div className="px-3 pb-3 space-y-2">
            {[
              { label: "Physics · Class X", color: "bg-red-500/[0.05] border-red-500/10", dot: "bg-red-500", text: "text-red-500" },
              { label: "Maths · Class XII", color: "bg-brand/[0.05] border-brand/10", dot: "bg-brand", text: "text-brand" },
            ].map(item => (
              <div key={item.label} className={`flex items-center gap-2 rounded-xl px-3 py-2 border ${item.color}`}>
                <div
                  className={`size-1.5 rounded-full shrink-0 ${item.dot} anim-pulse-opacity`} />
                <span className={`text-[10px] font-bold font-body ${item.text}`}>{item.label}</span>
              </div>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2. STATS — simple, no counter animation overhead
// ═══════════════════════════════════════════════════════════════════════════════
const MOBILE_STATS_ITEMS = [
  { val: "1 Platform", label: "Centralized Communication" },
  { val: "24/7", label: "Institution Connectivity" },
  { val: "100%", label: "Administrative Visibility" },
  { val: "0 WhatsApp", label: "Structured Workflow" },
];

function MobileStats() {
  return (
    <section className="py-10 border-y border-black/[0.05] bg-white">
      <div className="container-page grid grid-cols-2 gap-5">
        {MOBILE_STATS_ITEMS.map((s, i) => (
          <FadeUp key={s.label} delay={i * 0.07}>
            <div className="font-display font-extrabold text-brand-ink text-[1.6rem] tracking-tight leading-tight">{s.val}</div>
            <div className="text-xs text-brand-muted font-body mt-1">{s.label}</div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3. FEATURES — icon list, no mock UIs (too heavy for mobile)
// ═══════════════════════════════════════════════════════════════════════════════
const FEATURES = [
  { icon: MessageSquare, label: "Messages", desc: "Parent–teacher, staff, and class group chats with read receipts.", color: "bg-brand/[0.08] text-brand" },
  { icon: Video, label: "Classes", desc: "Live classes up to 150 students each.", color: "bg-brand/[0.08] text-brand" },
  { icon: Calendar, label: "Meetings", desc: "Staff meetings, Teacher meeting, Parents-Teachers meeting", color: "bg-brand/[0.08] text-brand" },
  { icon: Presentation, label: "Webinars", desc: "Large-scale webinars for orientations and guest lectures up to 500 attendees.", color: "bg-brand/[0.08] text-brand" },
  { icon: Bell, label: "Notice Board", desc: "Push school announcements to every one's phone in seconds.", color: "bg-brand/[0.08] text-brand" },
  { icon: Users, label: "Members", desc: "Manage students, teachers, admins with role-based access and bulk onboarding.", color: "bg-brand/[0.08] text-brand" },
  { icon: Activity, label: "Activity", desc: "Teachers can create and manage activities, competitions, and events for students to discover and participate in.", color: "bg-brand/[0.08] text-brand" },
];

function MobileFeatures() {
  return (
    <section id="features" className="py-12 bg-[var(--bg)]">
      <div className="container-page">
        <FadeUp>
          <Eyebrow>Features</Eyebrow>
          <h2 className="font-display text-[1.75rem] font-extrabold text-brand-ink mt-2 mb-1 tracking-[-0.03em]">
            Everything a school needs.{" "}
            <span className="gradient-text-brand">Nothing it doesn&apos;t.</span>
          </h2>
          <p className="text-sm text-brand-muted font-body mb-8 leading-relaxed">
            One subscription. Every tool your teachers, students, and parents rely on daily.
          </p>
        </FadeUp>

        <div className="space-y-3">
          {FEATURES.map((f, i) => (
            <FadeUp key={f.label} delay={i * 0.06}>
              <div className="flex items-start gap-4 bg-white rounded-2xl border border-black/[0.05] px-4 py-4 shadow-sm">
                <div className={`size-9 rounded-xl flex items-center justify-center shrink-0 ${f.color}`}>
                  <f.icon className="size-4" />
                </div>
                <div>
                  <div className="font-display font-bold text-brand-ink text-[0.9375rem] mb-0.5">{f.label}</div>
                  <p className="text-xs text-brand-muted font-body leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Trust strip */}
        <FadeUp delay={0.3} className="mt-8 flex flex-wrap gap-3">
          {[
            { icon: Shield, label: "DPDPA Compliant", color: "text-green-600" },
            { icon: Globe2, label: "Hosted in India", color: "text-brand" },
          ].map(t => (
            <div key={t.label} className="flex items-center gap-1.5 text-xs text-brand-muted font-body">
              <t.icon className={`size-3.5 ${t.color}`} />
              {t.label}
            </div>
          ))}
        </FadeUp>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 4. WORKFLOW — numbered steps, simplified
// ═══════════════════════════════════════════════════════════════════════════════
const STEPS = [
  { num: "01", title: "Set up your institution", badge: "Onboarding",
    desc: "Import students, teachers, and admins in minutes. Departments and channels are created automatically." },
  { num: "02", title: "Centralize communication", badge: "Communication",
    desc: "Notices, class chats, staff coordination, and PTMs — all through one organized workspace." },
  { num: "03", title: "Conduct live sessions", badge: "Academics",
    desc: "Teachers start Live classes directly from HermesWorkspace." },
  { num: "04", title: "Monitor in real time", badge: "Administration",
    desc: "Track Groups, engagement, and institutional activity from one admin dashboard." },
];

function MobileWorkflow() {
  return (
    <section id="workflow" className="py-12 bg-[#F8F9FA] relative overflow-hidden">
      <div className="container-page">
        <FadeUp>
          <Eyebrow>How it works</Eyebrow>
          <h2 className="font-display text-[1.75rem] font-extrabold text-brand-ink mt-2 mb-1 tracking-[-0.03em]">
            Built to simplify{" "}
            <span className="gradient-text-brand">how schools communicate.</span>
          </h2>
          <p className="text-sm text-brand-muted font-body mb-8 leading-relaxed">
            Replace fragmented WhatsApp groups with one organized institutional platform.
          </p>
        </FadeUp>

        {/* Vertical stepper */}
        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-[18px] top-6 bottom-6 w-px bg-brand/10" />

          <div className="space-y-4">
            {STEPS.map((s, i) => (
              <FadeUp key={s.num} delay={i * 0.08}>
                <div className="flex gap-4">
                  {/* Step dot */}
                  <div className="relative z-10 size-9 rounded-full bg-brand/[0.08] border border-brand/[0.15] flex items-center justify-center shrink-0">
                    <span className="font-body text-[10px] font-bold text-brand">{s.num}</span>
                  </div>
                  {/* Content */}
                  <div className="bg-white rounded-2xl border border-black/[0.05] p-4 shadow-sm flex-1">
                    <span className="inline-block text-[9px] font-bold text-brand bg-brand/[0.08] px-2 py-0.5 rounded-full mb-2 uppercase tracking-wider font-body">
                      {s.badge}
                    </span>
                    <h3 className="font-display font-bold text-brand-ink text-[0.9375rem] mb-1">{s.title}</h3>
                    <p className="text-xs text-brand-muted font-body leading-relaxed">{s.desc}</p>
                  </div>
              </div>
            </FadeUp>
            ))}
          </div>
        </div>

        <FadeUp delay={0.35} className="mt-8">
          <Link href="/contact?scroll=inquiry"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border border-black/[0.08] text-brand-ink font-semibold text-sm font-body bg-white active:scale-[0.97] transition-transform">
            Schedule a School Demo <ArrowRight className="size-4" />
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 5. PRICING — simplified cards, no Three.js background
// ═══════════════════════════════════════════════════════════════════════════════
const TIERS = [
  {
    name: "Basic",
    tagline: "For schools starting digital coordination",
    features: ["Centralized communication", "Online classes & meetings", "Digital notice board", "Mobile & web access", "Onboarding assistance"],
    featured: false,
    cta: "Request Demo",
  },
  {
    name: "Premium",
    tagline: "For actively growing institutions",
    features: ["Everything in Basic", "Higher session capacity", "Advanced communication workflows", "Priority onboarding", "Priority support"],
    featured: true,
    cta: "Schedule Consultation",
  },
  {
    name: "Olympus",
    tagline: "For large schools & campus-scale",
    features: ["Everything in Premium", "Scalable infrastructure", "Custom workflows", "Dedicated support", "Custom deployment"],
    featured: false,
    cta: "Contact Our Team",
  },
];

function MobilePricing() {
  return (
    <section id="pricing" className="py-12 bg-[var(--bg)]">
      <div className="container-page">
        <FadeUp>
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="font-display text-[1.75rem] font-extrabold text-brand-ink mt-2 mb-1 tracking-[-0.03em]">
            Transparent pricing.<br />
            <span className="gradient-text-brand">No surprises.</span>
          </h2>
          <p className="text-sm text-brand-muted font-body mb-8 leading-relaxed">
            All plans include unlimited base features. Pay only for what you scale.
          </p>
        </FadeUp>

        <div className="space-y-4">
          {TIERS.map((t, i) => (
            <FadeUp key={t.name} delay={i * 0.09}>
              <div className={`rounded-2xl border p-5 ${t.featured
                ? "bg-brand-ink border-brand-ink text-white shadow-[0_8px_32px_rgba(96,99,238,0.25)]"
                : "bg-white border-black/[0.07] shadow-sm"}`}>

                {t.featured && (
                  <span className="inline-flex items-center gap-1 bg-brand text-white text-[9px] font-bold px-2.5 py-1 rounded-full mb-3 font-body">
                    ✦ Most Popular
                  </span>
                )}

                <div className={`text-[10px] font-semibold uppercase tracking-widest font-body mb-1 ${t.featured ? "text-white/50" : "text-brand-muted"}`}>
                  {t.tagline}
                </div>
                <div className={`font-display text-xl font-bold mb-3 ${t.featured ? "text-white" : "text-brand-ink"}`}>
                  {t.name}
                </div>

                <ul className="space-y-2 mb-5">
                  {t.features.map(f => (
                    <li key={f} className={`flex items-center gap-2 text-sm font-body ${t.featured ? "text-white/80" : "text-brand-ink/75"}`}>
                      <Check className={`size-3.5 shrink-0 ${t.featured ? "text-green-400" : "text-green-600"}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link href="/contact?scroll=inquiry"
                  className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold font-body active:scale-[0.97] transition-transform ${t.featured
                    ? "bg-white text-brand-ink hover:bg-white/90"
                    : "border border-black/[0.10] text-brand-ink"}`}>
                  {t.cta} <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </FadeUp>
          ))}
        </div>

        <p className="text-center text-xs text-brand-muted mt-6 font-body">
          Pricing varies by operational requirements. GST applicable.
        </p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 6. FAQ
// ═══════════════════════════════════════════════════════════════════════════════
const FAQS = [
  { q: "How quickly can our school start?", a: "Most schools begin onboarding within the same day. Our team assists with setup, configuration, and platform activation." },
  { q: "Can we conduct online classes?", a: "Yes. HD classes, PTMs, webinars, and staff meetings run directly through HermesWorkspace on desktop and mobile." },
  { q: "Is it accessible on mobile?", a: "Yes. HermesWorkspace works on Android, iOS, and web — so staff, students, and parents stay connected from anywhere." },
  { q: "Will parents need technical training?", a: "No. The platform is designed to be simple for students, parents, teachers, and administrators with minimal learning effort." },
  { q: "Can it scale as we grow?", a: "Absolutely. HermesWorkspace supports institutions of all sizes with scalable infrastructure and flexible deployment." },
  { q: "Do you help with onboarding?", a: "Yes. We provide guided onboarding, deployment coordination, and operational support throughout the process." },
];

function MobileFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faqs" className="py-12 bg-white">
      <div className="container-page max-w-[560px]">
        <FadeUp>
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="font-display text-[1.75rem] font-extrabold text-brand-ink mt-2 mb-8 tracking-[-0.03em]">
            Questions? <span className="gradient-text-brand">Answered.</span>
          </h2>
        </FadeUp>

        <div className="divide-y divide-black/[0.06]">
          {FAQS.map((f, i) => (
              <FadeUp key={f.q} delay={i * 0.05}>
                <button type="button" className="w-full text-left p-0 bg-transparent border-0 cursor-pointer" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                <div className="py-4 flex items-start justify-between gap-3">
                  <span className={`font-body font-medium text-[0.9rem] transition-colors ${openIdx === i ? "text-brand" : "text-brand-ink"}`}>
                    {f.q}
                  </span>
                  <div className={`size-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-all ${openIdx === i ? "border-brand bg-brand/10 text-brand" : "border-black/10 text-brand-muted"}`}>
                    {openIdx === i ? <Minus className="size-2.5" /> : <Plus className="size-2.5" />}
                  </div>
                </div>
                <AnimatePresence initial={false}>
                  {openIdx === i && (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-4 text-sm text-brand-muted font-body leading-relaxed pr-6">{f.a}</p>
                    </m.div>
                  )}
                </AnimatePresence>
              </button>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 7. CTA
// ═══════════════════════════════════════════════════════════════════════════════
function MobileCTA() {
  return (
    <section id="contact" className="py-8 px-4">
      <div className="container-page">
        <FadeUp>
          <div className="relative rounded-[20px] overflow-hidden px-6 py-10 text-center"
            style={{
              background: "linear-gradient(160deg, #1A1C1D 0%, #22252A 50%, #1d1f24 100%)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.05) inset",
            }}>

            {/* Static ambient glow — no heavy canvas */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-48 pointer-events-none"
              style={{ background: "radial-gradient(ellipse, rgba(96,99,238,0.18) 0%, transparent 70%)" }} />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-brand/70 uppercase tracking-widest font-body mb-4">
                <span className="size-1.5 rounded-full bg-brand animate-pulse" />
                Demonstrations Open
              </span>

              <h2 className="font-display text-[1.75rem] font-extrabold text-white tracking-[-0.03em] leading-tight mb-3">
                Ready to transform<br />your school?
              </h2>

              <p className="text-sm text-white/55 font-body mb-7 leading-relaxed">
                HermesWorkspace helps schools centralize communication, meetings, notices, and academic coordination through one structured platform.
              </p>

              <div className="flex flex-col gap-3">
                <Link href="/contact?scroll=inquiry"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-brand text-white font-bold text-sm font-body shadow-[0_4px_20px_rgba(96,99,238,0.5)] active:scale-[0.97] transition-transform">
                  Schedule Demonstration <ArrowRight className="size-4" />
                </Link>
                <Link href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border border-white/[0.12] text-white font-semibold text-sm font-body active:scale-[0.97] transition-transform">
                  Contact Us
                </Link>
              </div>

              <a href="mailto:connect@hermesworkspace.com"
                className="flex items-center justify-center gap-2 mt-6 text-xs text-white/40 font-body hover:text-white/60 transition-colors">
                <Mail className="size-3.5" />
                connect@hermesworkspace.com
              </a>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT EXPORT
// ═══════════════════════════════════════════════════════════════════════════════
export default function MobilePage() {
  return (
    <>
      <MobileHero />
      <MobileStats />
      <MobileFeatures />
      <MobileWorkflow />
      <MobilePricing />
      <MobileFAQ />
      <MobileCTA />
    </>
  );
}