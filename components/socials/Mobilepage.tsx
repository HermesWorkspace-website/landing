"use client";

/**
 * MobilePage.tsx — Lightweight mobile-only view for the Socials page.
 *
 * HOW TO USE (no changes to desktop files):
 *   In your page.tsx, render conditionally:
 *
 *   import { MobileSocialsPage } from "@/components/socials/MobilePage";
 *
 *   // Inside your page component:
 *   return (
 *     <>
 *       {/* Desktop — hidden on mobile *\/}
 *       <div className="hidden md:block">
 *         <HeroSection />
 *         <EcosystemSection />
 *         ...
 *       </div>
 *       {/* Mobile — hidden on desktop *\/}
 *       <div className="block md:hidden">
 *         <MobileSocialsPage />
 *       </div>
 *     </>
 *   );
 *
 * What's removed vs desktop:
 *  - Three.js canvases (DarkCanvas, ThreeCanvas, OrbCanvas) — too heavy for mobile
 *  - ImageGallery — decorative only, dropped entirely
 *  - InstitutionalPulse bento grid — simplified to single card
 *  - Heavy framer-motion scroll parallax effects
 *  - Complex SVG grid decorations
 *
 * What's kept:
 *  - Exact brand colors, fonts, spacing language
 *  - All content sections (Hero, Stats, Ecosystem, Trust, CTA)
 *  - Subtle CSS-only entrance animations (no JS animation library)
 *  - Full interactivity (links, email, smooth scroll)
 */

import { useRef, useEffect, useState, ReactNode } from "react";
import {
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandYoutube,
  IconBrandX,
  IconArrowRight,
} from "@tabler/icons-react";
import { ArrowRight, TrendingUp, BarChart3, Layers, Cpu } from "lucide-react";
import Link from "next/link";

/* ─────────────────────────────────────────────
   Tiny hook: fires once when element enters view
   ───────────────────────────────────────────── */
function useVisible(rootMargin = "-40px") {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const marginRef = useRef(rootMargin);

  useEffect(() => {
    marginRef.current = rootMargin;
  }, [rootMargin]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { rootMargin: marginRef.current }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ─────────────────────────────────────────────
   Fade-up wrapper (CSS animation, no JS lib)
   ───────────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useVisible();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s cubic-bezier(0.76,0,0.24,1) ${delay}ms, transform 0.6s cubic-bezier(0.76,0,0.24,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════
   1. HERO — mobile
   ══════════════════════════════════════════════ */
function MobileHero() {
  const scrollToEcosystem = () => {
    const el = document.getElementById("m-ecosystem");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative bg-[#F9F8FF] pt-24 pb-14 px-5 overflow-hidden">
      {/* Subtle static background blob — no Three.js */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(107,92,231,0.07) 0%, transparent 70%)" }}
      />

      {/* Badge */}
      <div
        className="inline-block text-[10px] tracking-[2.5px] uppercase text-[#6B5CE7] font-semibold bg-[#EAE8FF] px-3 py-1.5 rounded-[3px] mb-5"
        style={{ opacity: 1 }}
      >
        HermesWorkspace Digital Presence
      </div>

      {/* Headline */}
      <h1
        className="font-black text-[38px] leading-[1.05] tracking-tight text-[#0D0D0F] mb-5"
        style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}
      >
        Sharing the future
        <br />
        of institutional
        <br />
        communication
        <br />
        <span className="text-[#6B5CE7]">in real time.</span>
      </h1>

      <p className="text-[14px] leading-[1.75] text-[#666] mb-8">
        HermesWorkspace uses digital platforms to share product development,
        operational thinking, and founder-led insights shaping the future
        of modern institutions.
      </p>

      {/* CTAs */}
      <div className="flex flex-col gap-3">
        <button
          onClick={scrollToEcosystem}
          className="flex items-center justify-center gap-2 bg-[#6B5CE7] text-white text-[13px] font-semibold px-5 py-3.5 rounded-[5px] active:scale-95 transition-transform"
        >
          Explore Platforms
          <ArrowRight size={14} />
        </button>
        <Link
          href="/contact"
          className="flex items-center justify-center gap-2 text-[#0D0D0F] text-[13px] font-medium px-5 py-3.5 rounded-[5px] border border-[#D8D4CC] active:scale-95 transition-transform"
        >
          Contact Media Team
        </Link>
      </div>

      {/* Lightweight analytics card */}
      <div className="mt-10 bg-white rounded-2xl border border-[#E8E5F0] p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] tracking-[2px] uppercase text-[#9896A4] font-medium">
            Live Analytics View
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { label: "Content Focus", value: "Infrastructure" },
            { label: "Community", value: "Founder-Led" },
          ].map((item) => (
            <div key={item.label} className="bg-[#F8F7FF] rounded-xl p-3">
              <p className="text-[9px] tracking-[2px] uppercase text-[#9896A4] mb-1">{item.label}</p>
              <p className="text-[15px] font-black text-[#0D0D0F] tracking-tight">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Static sparkline SVG */}
        <svg viewBox="0 0 240 40" className="w-full h-10 mb-4">
          <defs>
            <linearGradient id="mSpark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6B5CE7" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#6B5CE7" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,32 C20,29 40,22 60,24 C80,26 100,14 120,11 C140,8 160,16 180,7 C200,0 220,4 240,2"
            fill="none"
            stroke="#6B5CE7"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M0,32 C20,29 40,22 60,24 C80,26 100,14 120,11 C140,8 160,16 180,7 C200,0 220,4 240,2 L240,40 L0,40 Z"
            fill="url(#mSpark)"
          />
        </svg>

        <div className="flex items-center gap-2 bg-[#EAE8FF] rounded-xl px-3 py-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#6B5CE7] flex items-center justify-center shrink-0">
            <TrendingUp size={13} className="text-white" />
          </div>
          <div className="flex-1 h-1.5 bg-[#6B5CE7]/25 rounded-full overflow-hidden">
            <div className="h-full bg-[#6B5CE7] rounded-full w-[72%]" />
          </div>
          <span className="text-[10px] font-semibold text-[#6B5CE7] whitespace-nowrap">
            Institutional Narratives
          </span>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   2. STATS — mobile (no Three.js canvas)
   ══════════════════════════════════════════════ */
const STATS = [
  {
    value: "1",
    label: "CONNECTED PLATFORM",
    sublabel: "One unified system for communication, meetings, notices, and institutional coordination.",
  },
  {
    value: "24+",
    label: "OPERATIONAL WORKFLOWS",
    sublabel: "Designed to simplify academic operations across administrators, teachers, and students.",
  },
  {
    value: "100%",
    label: "FOCUSED ON EDUCATION",
    sublabel: "Built specifically for educational environments, not adapted from generic workplace tools.",
  },
];

function MobileStats() {
  return (
    <section className="bg-[#0D0D0F] py-16 px-5">
      <FadeUp>
        <h2
          className="text-[28px] font-black text-white leading-[1.1] tracking-tight mb-12 text-center"
          style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}
        >
          Designed for modern institutions.
          <br />
          <span className="text-[#6B5CE7]">Built for long-term clarity.</span>
        </h2>
      </FadeUp>

      <div className="flex flex-col gap-8 mb-12">
        {STATS.map((stat, i) => (
          <FadeUp key={stat.label} delay={i * 80}>
            <div className="text-center">
              <p className="text-[52px] font-black text-white leading-none tracking-tight mb-2">
                {stat.value}
              </p>
              <p className="text-[10px] tracking-[2px] uppercase text-[#9896A4] mb-1">{stat.label}</p>
              <p className="text-[12px] text-[#666] leading-relaxed max-w-[220px] mx-auto">{stat.sublabel}</p>
            </div>
          </FadeUp>
        ))}
      </div>

      <FadeUp>
        <div className="flex justify-center">
          <Link
            href="/contact"
            className="bg-[#6B5CE7] text-white text-[13px] font-semibold px-8 py-3.5 rounded-full active:scale-95 transition-transform"
          >
            Join the Network
          </Link>
        </div>
      </FadeUp>
    </section>
  );
}

/* ══════════════════════════════════════════════
   3. ECOSYSTEM — mobile (2-col grid, no hover effects)
   ══════════════════════════════════════════════ */
const CHANNELS = [
  {
    icon: IconBrandLinkedin,
    name: "LinkedIn",
    tag: "Institutional Insights",
    tagColor: "#0077B5",
    bg: "#EBF5FB",
    cta: "Explore Updates",
    accentColor: "#0077B5",
    link: "https://www.linkedin.com/company/hermesworkspace/?originalSubdomain=in",
    description: "Founder-led updates, operational thinking, and institutional communication insights.",
  },
  {
    icon: IconBrandInstagram,
    name: "Instagram",
    tag: "Visual Storytelling",
    tagColor: "#E1306C",
    bg: "#FDF0F5",
    cta: "View Stories",
    accentColor: "#E1306C",
    link: "https://www.instagram.com/hermesworkspace?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    description: "Product design, interface systems, and behind-the-scenes development moments.",
  },
  {
    icon: IconBrandX,
    name: "X Platform",
    tag: "Real-Time Thinking",
    tagColor: "#0D0D0F",
    bg: "#F4F4F4",
    cta: "Read Threads",
    accentColor: "#0D0D0F",
    link: "https://x.com/hermesworkspace",
    description: "Short-form perspectives on infrastructure, product strategy, and institutional systems.",
  },
  {
    icon: IconBrandYoutube,
    name: "YouTube",
    tag: "Platform Narratives",
    tagColor: "#FF0000",
    bg: "#FFF0F0",
    cta: "Watch Content",
    accentColor: "#FF0000",
    link: "https://www.youtube.com/@hermesworkspace",
    description: "Walkthroughs, founder conversations, and platform demonstrations.",
  },
];

function MobileEcosystem() {
  return (
    <section id="m-ecosystem" className="py-16 px-5 bg-white">
      <FadeUp>
        <h2 className="text-[28px] font-black text-[#0D0D0F] tracking-tight mb-2">
          Digital Ecosystem
        </h2>
        <p className="text-[13px] text-[#888] mb-8 leading-relaxed">
          How{" "}
          <span className="font-semibold text-[#0D0D0F]">HermesWorkspace</span>{" "}
          communicates across modern digital platforms.
        </p>
      </FadeUp>

      <div className="grid grid-cols-2 gap-3">
        {CHANNELS.map((ch, i) => {
          const Icon = ch.icon;
          return (
            <FadeUp key={ch.name} delay={i * 60}>
              <a
                href={ch.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-3 bg-white rounded-2xl border border-[#E8E5F0] p-4 active:scale-95 transition-transform h-full"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: ch.bg }}
                >
                  <Icon size={16} style={{ color: ch.accentColor }} />
                </div>
                <div>
                  <p className="text-[14px] font-bold text-[#0D0D0F] mb-0.5">{ch.name}</p>
                  <span
                    className="text-[8px] tracking-[1.5px] uppercase font-semibold"
                    style={{ color: ch.tagColor }}
                  >
                    {ch.tag}
                  </span>
                </div>
                <p className="text-[11px] leading-[1.65] text-[#777] flex-1">{ch.description}</p>
                <span
                  className="flex items-center gap-1 text-[10px] font-semibold"
                  style={{ color: ch.accentColor }}
                >
                  {ch.cta}
                  <IconArrowRight size={10} />
                </span>
              </a>
            </FadeUp>
          );
        })}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   4. TRUST — mobile (quote card only, no OrbCanvas)
   ══════════════════════════════════════════════ */
function MobileTrust() {
  const PILLARS = [
    "Institutional Communication",
    "Operational Coordination",
    "Modern Educational Infrastructure",
  ];

  return (
    <section className="py-16 px-5 bg-[#F9F8FF]">
      <FadeUp>
        <h2 className="text-[28px] font-black text-[#0D0D0F] leading-[1.1] tracking-tight mb-3">
          Building systems that improve institutional{" "}
          <span className="text-[#6B5CE7]">clarity.</span>
        </h2>
        <p className="text-[13px] leading-[1.8] text-[#666] mb-6">
          HermesWorkspace was created to simplify how institutions communicate,
          coordinate, and operate — with systems designed specifically for
          academic workflows.
        </p>

        <ul className="space-y-2 mb-8">
          {PILLARS.map((p) => (
            <li key={p} className="flex items-center gap-3 text-[#0D0D0F]">
              <span className="block w-3 h-px bg-[#6B5CE7] shrink-0" />
              <span className="text-[10px] tracking-[2px] uppercase font-medium">{p}</span>
            </li>
          ))}
        </ul>
      </FadeUp>

      {/* Quote card — static, no hover parallax */}
      <FadeUp delay={100}>
        <div className="bg-white rounded-3xl border border-[#E8E5F0] p-7 shadow-sm">
          <div
            className="text-[48px] leading-none text-[#6B5CE7] opacity-20 mb-3 select-none"
            style={{ fontFamily: "Georgia, serif" }}
          >
            "
          </div>
          <blockquote
            className="text-[16px] leading-[1.6] font-medium text-[#0D0D0F] mb-6"
            style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontStyle: "italic" }}
          >
            We believe institutional technology should reduce complexity —
            helping educators and organizations focus on people,
            communication, and long-term growth.
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#EAE8FF] flex items-center justify-center shrink-0">
              <span className="text-[10px] font-black text-[#6B5CE7]">HW</span>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-[#0D0D0F]">Founding Members</p>
              <p className="text-[11px] text-[#9896A4]">HermesWorkspace</p>
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}

/* ══════════════════════════════════════════════
   5. INSIDE HERMES — minimal card (replaces bento)
   ══════════════════════════════════════════════ */
function MobilePulse() {
  const CARDS = [
    {
      icon: Cpu,
      label: "Founder Notes",
      title: "Building systems that reduce operational complexity.",
      color: "#6B5CE7",
      bg: "#EAE8FF",
    },
    {
      icon: Layers,
      label: "Platform Focus",
      title: "Unified infrastructure designed for modern academic workflows.",
      color: "#1A3FBE",
      bg: "#E8EDFF",
    },
    {
      icon: BarChart3,
      label: "Communication Systems",
      title: "Unified workflows replacing fragmented, generic institutional tools.",
      color: "#6B5CE7",
      bg: "#EAE8FF",
    },
  ];

  return (
    <section className="py-16 px-5 bg-white">
      <FadeUp>
        <h2 className="text-[28px] font-black text-[#0D0D0F] tracking-tight mb-2">
          Inside HermesWorkspace
        </h2>
        <p className="text-[13px] text-[#888] mb-8">
          Stories, product thinking, and operational insights.
        </p>
      </FadeUp>

      {/* Featured dark card */}
      <FadeUp>
        <div className="relative rounded-2xl overflow-hidden bg-[#0D0D0F] mb-4 p-6 min-h-[180px] flex flex-col justify-end">
          {/* Lightweight grid decoration */}
          <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 300 180">
            {[0,1,2,3,4,5].map((i) => (
              <line key={`v${i}`} x1={i*50} y1="0" x2={i*50} y2="180" stroke="white" strokeWidth="0.4" />
            ))}
            {[0,1,2,3].map((i) => (
              <line key={`h${i}`} x1="0" y1={i*45} x2="300" y2={i*45} stroke="white" strokeWidth="0.4" />
            ))}
          </svg>
          <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-[#6B5CE7]/15 blur-2xl pointer-events-none" />

          <span className="self-start text-[8px] tracking-[2px] uppercase text-[#6B5CE7] bg-[#6B5CE7]/20 px-2 py-1 rounded-[2px] mb-2 font-medium">
            Product Insight
          </span>
          <h3 className="text-[18px] font-black text-white leading-tight">
            How HermesWorkspace is rethinking institutional communication.
          </h3>
        </div>
      </FadeUp>

      <div className="flex flex-col gap-3">
        {CARDS.map((card, i) => {
          const Icon = card.icon;
          return (
            <FadeUp key={card.label} delay={i * 60}>
              <div className="bg-[#F9F8FF] border border-[#E8E5F0] rounded-2xl p-4 flex items-start gap-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: card.bg }}
                >
                  <Icon size={14} style={{ color: card.color }} />
                </div>
                <div>
                  <span className="text-[9px] tracking-[1.5px] uppercase text-[#9896A4] font-medium">
                    {card.label}
                  </span>
                  <p className="text-[13px] font-semibold text-[#0D0D0F] mt-0.5 leading-snug">
                    {card.title}
                  </p>
                </div>
              </div>
            </FadeUp>
          );
        })}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   6. CTA — mobile
   ══════════════════════════════════════════════ */
function MobileCta() {
  return (
    <section id="m-contact" className="py-16 px-5 bg-[#F9F8FF]">
      {/* Soft blob */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(107,92,231,0.06) 0%, transparent 70%)" }}
      />
      <FadeUp>
        <p className="text-[9px] tracking-[2.5px] uppercase text-[#6B5CE7] font-semibold mb-4">
          Build With HermesWorkspace
        </p>
        <h2
          className="text-[30px] font-black text-[#0D0D0F] leading-[1.05] tracking-tight mb-5"
          style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}
        >
          Building the future of{" "}
          <span className="text-[#6B5CE7]">institutional communication</span>{" "}
          across India.
        </h2>
        <p className="text-[13px] text-[#666] leading-relaxed mb-8">
          HermesWorkspace is creating modern operational infrastructure for
          schools and institutions through connected communication, academic
          coordination, and scalable digital systems.
        </p>

        <div className="flex flex-col gap-3">
          <a
            href="mailto:connect@hermesworkspace.com"
            className="flex items-center justify-center gap-2 bg-[#6B5CE7] text-white text-[13px] font-semibold px-6 py-3.5 rounded-full active:scale-95 transition-transform"
          >
            Connect With Us
            <ArrowRight size={14} />
          </a>
          <a
            href="/about"
            className="flex items-center justify-center gap-2 text-[#0D0D0F] text-[13px] font-medium px-6 py-3.5 rounded-full border border-[#D8D4CC] active:scale-95 transition-transform"
          >
            Learn About HermesWorkspace
          </a>
        </div>

        <p className="text-[10px] text-[#9896A4] mt-7 text-center">
          HermesWorkspace · support@hermesworkspace.com · connect@hermesworkspace.com
        </p>
      </FadeUp>
    </section>
  );
}

/* ══════════════════════════════════════════════
   ROOT EXPORT
   ══════════════════════════════════════════════ */
export function MobileSocialsPage() {
  return (
    <main className="w-full overflow-x-hidden">
      <MobileHero />
      <MobileStats />
      <MobileEcosystem />
      <MobileTrust />
      <MobilePulse />
      <MobileCta />
    </main>
  );
}