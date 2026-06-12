"use client";

/**
 * mobile.tsx
 * ----------
 * Mobile-only full-page layout for HermesWorkspace founders page.
 * Contains: Hero → Founders Showcase → Mission → FAQ → CTA
 *
 * ⚠️  Import this in your page ONLY for mobile (md:hidden or via useIsMobile).
 *     Desktop layout is untouched — this file adds nothing to it.
 *
 * Usage in page.tsx:
 *   const isMobile = useIsMobile(); // or via CSS: <div className="md:hidden"><MobilePage /></div>
 *   if (isMobile) return <MobilePage />;
 */

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowLeft,
  Plus,
  Minus,
  Mail,
} from "lucide-react";
import { IconBrandLinkedin, IconBrandInstagram } from "@tabler/icons-react";
import { FOUNDERS } from "@/components/founders/founders-data";
import { FounderPhoto } from "@/components/founders/FounderPhoto";

// ─── Shared helpers ────────────────────────────────────────────────────────

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

const BODY = "var(--font-body, Inter, sans-serif)";
const DISPLAY = "var(--font-display, 'DM Sans', sans-serif)";

const scrollToFounders = () => {
  document.getElementById("founders-mobile")?.scrollIntoView({ behavior: "smooth" });
};

// ─── Section 1: Hero ───────────────────────────────────────────────────────

function MobileHero() {
  return (
    <section
      className="relative overflow-hidden bg-white"
      style={{ minHeight: "100svh", fontFamily: BODY }}
    >
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-16 top-[15%] size-72 rounded-full bg-indigo-100/70 blur-3xl" style={{ animation: "ambientBreath 8s ease-in-out infinite" }} />
        <div className="absolute -right-12 bottom-[8%] h-60 w-60 rounded-full bg-violet-100/60 blur-3xl" style={{ animation: "ambientBreath2 12s ease-in-out infinite" }} />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Watermark */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6 }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <span className="select-none text-[22vw] font-black tracking-[-0.08em] text-black/[0.025]">
          FOUNDERS
        </span>
      </m.div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
        {/* Eyebrow */}
        <m.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-8 flex items-center gap-2"
        >
          <span className="size-1.5 rounded-full bg-indigo-500" />
          <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-indigo-500">
            Leadership &amp; Vision
          </span>
        </m.div>

        {/* Headline */}
        <h1
          className="font-black leading-[1.04] tracking-[-0.04em] text-[#0D0D0F]"
          style={{ fontSize: "clamp(2.6rem, 11vw, 4rem)" }}
        >
          {["Building The Future", "Of Institutional", "Communication."].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <m.span
                className={`inline-block ${i >= 1 ? "bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent" : ""}`}
                initial={{ y: 0, opacity: 1 }}
              >
                {line}
              </m.span>
            </span>
          ))}
        </h1>

        {/* Sub-copy */}
        <m.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.82, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-[320px] text-[0.9rem] leading-[1.8] text-[#666]"
        >
          HermesWorkspace modernizes how educational institutions communicate,
          coordinate, and operate through scalable digital infrastructure.
        </m.p>

        {/* CTA */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7 }}
          className="mt-9"
        >
          <m.button
            whileTap={{ scale: 0.96 }}
            onClick={scrollToFounders}
            className="flex items-center gap-2 rounded-full px-7 py-3.5 text-[0.85rem] font-semibold text-white shadow-[0_4px_24px_rgba(96,99,238,0.38)]"
            style={{ background: "linear-gradient(135deg, #6063EE 0%, #8B5CF6 100%)" }}
          >
            Meet our Founders
            <ArrowDown className="size-3.5" />
          </m.button>
        </m.div>
      </div>
    </section>
  );
}

// ─── Section 2: Founders Showcase ─────────────────────────────────────────

const AUTO_DURATION = 6000;

function MobileFoundersShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number | null>(null);
  if (!startTimeRef.current) startTimeRef.current = Date.now();

  const founder = FOUNDERS[activeIndex];

  const advance = useCallback((dir: 1 | -1 = 1) => {
    setDirection(dir);
    setActiveIndex((c) => {
      const next = c + dir;
      if (next >= FOUNDERS.length) return 0;
      if (next < 0) return FOUNDERS.length - 1;
      return next;
    });
    startTimeRef.current = Date.now();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => advance(1), AUTO_DURATION);
    return () => clearTimeout(t);
  }, [activeIndex, advance]);

  const touchStartX = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) advance(diff > 0 ? 1 : -1);
  };

  return (
    <section
      id="founders-mobile"
      className="relative w-full bg-white"
      style={{ fontFamily: BODY }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <m.div
          key={founder.id}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >

          {/* ── ZONE 1: Portrait card ── */}
          <div className="px-5 pt-2">
            <div
              className="relative mx-auto w-full max-w-[240px] overflow-hidden rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
              style={{ height: "32vh", maxHeight: 280 }}
            >
              <FounderPhoto
                src={founder.photo}
                alt={`${founder.firstName} ${founder.lastName}`}
                className="absolute inset-0"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

              <m.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="absolute left-4 top-4 z-10 text-[10px] font-medium uppercase tracking-[3px] text-white drop-shadow-sm"
              >
                {String(founder.id).padStart(2, "0")} / {String(FOUNDERS.length).padStart(2, "0")}
              </m.p>
            </div>
          </div>

          {/* ── ZONE 2: Details — scrollable, ~60vh ── */}
          <div className="px-5 pt-5 pb-6">

            {/* Role badge */}
            <m.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="mb-2 flex justify-center"
            >
              <span
                className="rounded-sm px-3 py-1 text-[10px] font-medium uppercase tracking-[3px]"
                style={{ background: `${founder.accentColor}15`, color: founder.accentColor }}
              >
                {founder.role}
              </span>
            </m.div>

            {/* Name — big Bebas */}
            <div className="text-center leading-none">
              <m.span
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.22, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="block"
                style={{ fontFamily: DISPLAY, fontSize: "17vw", color: "#0D0D0F", lineHeight: 0.88 }}
              >
                {founder.firstName}
              </m.span>
              {founder.lastName && (
                <m.span
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.26, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                  style={{ fontFamily: DISPLAY, fontSize: "17vw", color: founder.accentColor, lineHeight: 0.88 }}
                >
                  {founder.lastName}
                </m.span>
              )}
            </div>

            {/* Title */}
            <m.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="my-3 flex flex-wrap items-center justify-center gap-2"
            >
              <div className="h-[2px] w-5 rounded-full" style={{ background: founder.accentColor }} />
              <span className="text-[10px] font-medium uppercase tracking-[1.5px]" style={{ color: founder.accentColor }}>
                {founder.title}
              </span>
              <div className="h-[2px] w-5 rounded-full" style={{ background: founder.accentColor }} />
            </m.div>

            {/* Bio */}
            <m.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34 }}
              className="mb-4 text-center text-[12px] leading-[1.75]"
              style={{ color: "#555" }}
            >
              {founder.bio}
            </m.p>

            {/* Focus pills */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.38 }}
              className="mb-4 flex flex-wrap justify-center gap-1.5"
            >
              {founder.focusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-[1px] border px-2 py-1 text-[9px] uppercase tracking-[1px]"
                  style={{
                    borderColor: `${founder.accentColor}33`,
                    color: founder.accentColor,
                    background: `${founder.accentColor}08`,
                  }}
                >
                  {area}
                </span>
              ))}
            </m.div>

            {/* Quote */}
            <m.blockquote
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42 }}
              className="mb-5 border-l-2 pl-4 text-left text-[12px] italic leading-relaxed"
              style={{ borderColor: founder.accentColor, color: "#666", fontFamily: DISPLAY }}
            >
              &ldquo;{founder.quote}&rdquo;
            </m.blockquote>

            {/* Social icons */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.46 }}
              className="flex items-center justify-center gap-3"
            >
              {founder.socialLinks.linkedin && (
                <a href={founder.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                  className="flex size-9 items-center justify-center rounded-full border"
                  style={{ borderColor: "#D8D4CC", color: "#9896A4" }} aria-label="LinkedIn">
                  <IconBrandLinkedin size={14} />
                </a>
              )}
              {founder.socialLinks.twitter && (
                <a href={founder.socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                  className="flex size-9 items-center justify-center rounded-full border"
                  style={{ borderColor: "#D8D4CC", color: "#9896A4" }} aria-label="X">
                  <XIcon className="size-3.5" />
                </a>
              )}
              {founder.socialLinks.instagram && (
                <a href={founder.socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                  className="flex size-9 items-center justify-center rounded-full border"
                  style={{ borderColor: "#D8D4CC", color: "#9896A4" }} aria-label="Instagram">
                  <IconBrandInstagram size={14} />
                </a>
              )}
            </m.div>
          </div>
        </m.div>
      </AnimatePresence>
    </section>
  );
}

// ─── Section 3: Mission ────────────────────────────────────────────────────

const FEATURES = [
  { num: "01", title: "Institutional Communication", text: "Structured announcements, notices, meetings, and real-time coordination across educational institutions." },
  { num: "02", title: "Academic Operations", text: "Online classes, academic workflows, scheduling, and institutional coordination in one unified system." },
  { num: "03", title: "Scalable Infrastructure", text: "Infrastructure engineered for long-term reliability, institutional scalability, and operational performance." },
];

function MobileMission() {
  return (
    <section
      id="mission"
      className="relative overflow-hidden border-t border-black/[0.04] bg-[#FAFAFA] py-16"
      style={{ fontFamily: BODY }}
    >
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-12 top-[10%] h-52 w-52 rounded-full bg-indigo-100/40 blur-3xl" />
        <div className="absolute -right-10 bottom-0 size-44 rounded-full bg-violet-100/30 blur-3xl" />
      </div>

      <div className="relative z-10 px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <h2 className="font-black leading-[1] tracking-[-0.05em] text-black" style={{ fontSize: "clamp(1.9rem, 9vw, 3rem)" }}>
            Infrastructure For{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">Modern</span>{" "}
            Education.
          </h2>
          <p className="mt-5 text-[0.85rem] leading-[1.85] text-zinc-600">
            HermesWorkspace centralizes communication, academic coordination, and operational workflows into one unified platform.
          </p>
        </m.div>

        <div className="flex flex-col gap-3">
          {FEATURES.map((f, i) => (
            <m.div
              key={f.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-black/[0.05] bg-white p-6"
            >
              <p className="mb-3 text-[10px] font-medium tracking-[0.22em] text-zinc-300">{f.num}</p>
              <h3 className="mb-2 text-[1rem] font-bold leading-tight tracking-[-0.02em] text-black">{f.title}</h3>
              <p className="text-[0.8rem] leading-7 text-zinc-600">{f.text}</p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 4: FAQ ────────────────────────────────────────────────────────

const FAQS = [
  { q: "Why was HermesWorkspace founded?", a: "To modernize how educational institutions communicate, coordinate, and manage operational workflows through centralized digital infrastructure." },
  { q: "What is the long-term vision?", a: "To provide scalable communication and operational infrastructure for modern educational institutions across academic and administrative workflows." },
  { q: "Who leads HermesWorkspace?", a: "HermesWorkspace is led by its founding team focusing on institutional operations, infrastructure engineering, and long-term platform scalability." },
  { q: "Is it only for communication?", a: "No — HermesWorkspace also supports meetings, notices, academic coordination, operational workflows, online classes, and institutional management." },
];

function MobileFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faqs" className="py-16" style={{ fontFamily: BODY }}>
      <div className="px-6">
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-indigo-500">FAQ</span>
          <h2 className="mt-2 font-black leading-[1.1] tracking-[-0.04em] text-[#0D0D0F]" style={{ fontSize: "clamp(1.8rem, 8vw, 2.5rem)" }}>
            Questions?{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">Answered.</span>
          </h2>
        </m.div>

        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {FAQS.map((f, i) => (
            <div key={f.q} className="cursor-pointer border-b border-black/[0.06]" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
              <div className="flex items-start justify-between gap-4 py-4">
                <h3 className="text-[0.875rem] font-medium text-[#0D0D0F]">{f.q}</h3>
                <div className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border transition-all ${openIdx === i ? "border-indigo-500 bg-indigo-500/10 text-indigo-500" : "border-black/10 text-[#9896A4]"}`}>
                  {openIdx === i ? <Minus className="size-3" /> : <Plus className="size-3" />}
                </div>
              </div>
              <AnimatePresence>
                {openIdx === i && (
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-4 text-[0.8rem] leading-relaxed text-[#666]">{f.a}</p>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </m.div>
      </div>
    </section>
  );
}

// ─── Section 5: CTA ────────────────────────────────────────────────────────

function MobileCTA() {
  return (
    <section className="px-5 pb-12 pt-2" style={{ fontFamily: BODY }}>
      <m.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[24px] px-7 py-12"
        style={{
          background: "linear-gradient(160deg, #181A1D 0%, #20242B 50%, #1A1D23 100%)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.22), inset 0 0 0 1px rgba(255,255,255,0.05)",
        }}
      >
        {/* Glow */}
        <div className="pointer-events-none absolute top-[-20%] left-1/2 h-60 w-80 -translate-x-1/2"
          style={{ background: "radial-gradient(ellipse, rgba(96,99,238,0.2) 0%, transparent 70%)" }} />
        {/* Grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="relative z-10">
          <div className="mb-5 flex items-center gap-2">
            <span className="size-1.5 animate-pulse rounded-full bg-indigo-400" />
            <span className="text-[10px] font-medium uppercase tracking-[0.26em] text-indigo-400/80">
              Modern Educational Infrastructure
            </span>
          </div>

          <h2 className="font-black leading-[1.02] tracking-[-0.05em] text-white" style={{ fontSize: "clamp(1.7rem, 8vw, 2.4rem)" }}>
            Designed for modern educational operations.
          </h2>

          <p className="mt-4 text-[0.82rem] leading-[1.85] text-white/55">
            HermesWorkspace is building modern infrastructure for communication, academic coordination, and institutional operations.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/contact?scroll=inquiry"
              className="flex items-center justify-center gap-2 rounded-xl py-3.5 text-[0.85rem] font-semibold text-white shadow-[0_8px_28px_rgba(96,99,238,0.4)]"
              style={{ background: "linear-gradient(135deg, #6063EE 0%, #8B5CF6 100%)" }}
            >
              Partner With HermesWorkspace
              <ArrowRight className="size-3.5" />
            </Link>
            <a
              href="mailto:connect@hermesworkspace.com"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] py-3.5 text-[0.85rem] font-medium text-white/70"
            >
              <Mail className="size-3.5" />
              Contact Leadership
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 border-t border-white/[0.06] pt-6 text-[9px] uppercase tracking-[0.22em] text-white/30">
            <span>Institutional Communication</span>
            <span className="size-1 self-center rounded-full bg-white/20" />
            <span>Academic Operations</span>
            <span className="size-1 self-center rounded-full bg-white/20" />
            <span>Scalable Infrastructure</span>
          </div>
        </div>
      </m.div>
    </section>
  );
}

// ─── Root export ───────────────────────────────────────────────────────────

/**
 * Full mobile page — use this instead of the desktop layout on small screens.
 *
 * Recommended usage in your page.tsx:
 *
 *   // Option A — CSS only (simplest, no JS):
 *   <>
 *     <div className="hidden md:block"><DesktopPage /></div>
 *     <div className="md:hidden"><MobilePage /></div>
 *   </>
 *
 *   // Option B — JS detection (avoids double render):
 *   const isMobile = useIsMobile(); // your hook
 *   return isMobile ? <MobilePage /> : <DesktopPage />;
 */
export default function MobilePage() {
  return (
    <main style={{ fontFamily: BODY }}>
      <MobileHero />
      <MobileFoundersShowcase />
      <MobileMission />
      <MobileFAQ />
      <MobileCTA />
    </main>
  );
}