"use client";

/**
 * MobileProductPage.tsx — Lightweight mobile-only view for the Product page.
 *
 * HOW TO USE (zero changes to desktop files):
 *   In your product/page.tsx:
 *
 *   import { MobileProductPage } from "@/components/product/MobileProductPage";
 *
 *   export default function ProductPage() {
 *     const [isMobile, setIsMobile] = useState(false);
 *     const [ready, setReady] = useState(false);
 *     useEffect(() => {
 *       const check = () => setIsMobile(window.innerWidth < 768);
 *       check(); setReady(true);
 *       window.addEventListener("resize", check);
 *       return () => window.removeEventListener("resize", check);
 *     }, []);
 *     if (!ready) return null;
 *     if (isMobile) return <MobileProductPage />;
 *     return <DesktopProductPage />;  // your existing component
 *   }
 *
 * What's stripped:
 *  - Three.js canvas (producthero) — biggest bundle cost
 *  - GSAP title word-by-word reveal & ScrollTrigger parallax (DesignedForClarity, CTA)
 *  - framer-motion scroll parallax (useScroll/useTransform in hero, InMotion, DesignedForClarity)
 *  - gsap.to background-position animation (CTA)
 *  - InMotion video section — replaced with static preview card (video autoplays poorly on mobile)
 *  - Phone mockup parallax rotation in DesignedForClarity
 *
 * What's kept:
 *  - ALL brand colors (#12141D, #1A1D26, #F8F9FA, #6063EE, #6063EE, etc.)
 *  - All content: Hero → Problem/Solution → CoreModules → DesignedForClarity → Community → Reliability → CTA
 *  - Animated stat counters (lightweight requestAnimationFrame)
 *  - framer-motion for entrance animations (no scroll-linked transforms)
 *  - Phone mockups (CSS only, no parallax)
 *  - Animated bar chart in hero phone mockup
 *  - Full CTA with router navigation
 *  - active:scale-95 tap feedback everywhere
 */

import { useRef, useState, useEffect, ReactNode } from "react";
import { m, AnimatePresence, useInView, animate } from "framer-motion";
import {
  Shield, BookOpen, Users, User,
  MessageSquare, Bell, Calendar, Settings, Monitor,
  CheckCircle, XCircle, ArrowRight, Play,
} from "lucide-react";
import { useRouter } from "next/navigation";

function FadeUp({ children, delay = 0, className = "" }: {
  children: ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Stat counter (lightweight rAF easing)
   ───────────────────────────────────────────── */
function useCounter(end: number, duration: number) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || started) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0, rootMargin: "0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const controls = animate(0, end, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setCount(v),
    });
    return controls.stop;
  }, [started, end, duration]);

  return { count, ref };
}

const scrollToFeatures = () => {
  const el = document.getElementById("m-features");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* ══════════════════════════════════════════════
    1. HERO
    No Three.js, no GSAP, no scroll parallax
    ══════════════════════════════════════════════ */
function MobileHero() {
  const router = useRouter();

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-14 px-5 overflow-hidden"
      style={{ backgroundColor: "#F8F9FA" }}
    >
      {/* Static grid — replaces Three.js canvas */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(139,143,212,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(139,143,212,0.13) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 30% 40%, rgba(96,99,238,0.06), transparent)" }}
      />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to top, #F8F9FA, transparent)" }} />

      <div className="relative z-10 flex flex-col gap-6">
        {/* Badge */}
        <div
          className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 border"
          style={{ backgroundColor: "rgba(255,255,255,0.7)", borderColor: "rgba(139,143,212,0.3)" }}
        >
          <span>⚡</span>
          <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#6063EE" }}>
            Designed for Academic Operations
          </span>
        </div>

        {/* Title */}
        <h1
          className="font-display font-bold leading-[1.08] tracking-tight"
          style={{ fontSize: "clamp(2.2rem, 9vw, 3rem)", color: "#1A1D26" }}
        >
          Modern infrastructure for{" "}
          <span style={{
            background: "linear-gradient(135deg, #4648D4 0%, #6063EE 50%, #7B7FF0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            institutional communication.
          </span>
        </h1>

        <p className="text-[14px] leading-relaxed" style={{ color: "#61667A" }}>
          HermesWorkspace helps educational institutions manage communication,
          notices, meetings, academic coordination, and operational workflows
          through one connected platform.
        </p>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <button type="button"
            onClick={scrollToFeatures}
            className="flex items-center justify-center gap-2 text-white text-[13px] font-bold px-6 py-3.5 rounded-xl active:scale-95 transition-transform"
            style={{ background: "linear-gradient(135deg, #4648D4, #6063EE)", boxShadow: "0 4px 20px rgba(96,99,238,0.28)" }}
          >
            Explore Platform
          </button>
          <button type="button"
            onClick={() => router.push("/contact?scroll=inquiry")}
            className="text-[13px] font-semibold px-6 py-3.5 rounded-xl border active:scale-95 transition-transform"
            style={{ backgroundColor: "rgba(255,255,255,0.6)", borderColor: "rgba(96,99,238,0.25)", color: "#4648D4" }}
          >
            Request Demo
          </button>
        </div>

        {/* Trust dots */}
        <div className="flex flex-col gap-2">
          {["Built for Educational Institutions", "Designed for Academic Coordination", "Accessible Across Web & Mobile"].map((t, i) => (
            <span key={`item-${i}`} className="flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: "#A9ADC0" }}>
              <span className="size-1 rounded-full inline-block shrink-0" style={{ backgroundColor: "#6063EE" }} />
              {t}
            </span>
          ))}
        </div>

        {/* Video preview — inline in hero */}
        <HeroVideoPlayer />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Video player used inside the hero
   ───────────────────────────────────────────── */
function HeroVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = async () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      try {
        await videoRef.current.play();
        setPlaying(true);
      } catch {
        // interrupted or no src — safe to ignore
      }
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-xl border"
      style={{ borderColor: "rgba(96,99,238,0.2)", backgroundColor: "#1A1D28" }}
    >
      {/* Browser chrome */}
      <div
        className="flex items-center gap-2 px-3 py-2 border-b"
        style={{ backgroundColor: "#12141D", borderColor: "rgba(255,255,255,0.05)" }}
      >
        <div className="flex gap-1.5">
          <div className="size-2 rounded-full bg-red-400/50" />
          <div className="size-2 rounded-full bg-yellow-400/50" />
          <div className="size-2 rounded-full" style={{ backgroundColor: "rgba(96,99,238,0.5)" }} />
        </div>
        <div className="flex-1 h-3.5 rounded-md ml-1" style={{ backgroundColor: "rgba(255,255,255,0.05)" }} />
      </div>

      {/* Video */}
      <div className="relative aspect-video" style={{ backgroundColor: "#12141D" }}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          muted
          preload="metadata"
          aria-label="Product demo video showcasing HermesWorkspace platform features"
          onEnded={() => setPlaying(false)}
          onPause={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
          src="https://ik.imagekit.io/hermesworkspace/Landing/assets/hermes-launch.mp4"
        />

        {/* Play overlay */}
        <AnimatePresence>
          {!playing && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              style={{ backgroundColor: "rgba(6,14,26,0.5)" }}
              onClick={handlePlay}
            >
              <m.div
                whileTap={{ scale: 0.93 }}
                className="size-12 bg-white rounded-full flex items-center justify-center shadow-2xl"
              >
                <Play size={16} className="ml-0.5" style={{ color: "#1A1D26" }} />
              </m.div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Pause button — corner, visible while playing */}
        {playing && (
          <m.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={handlePlay}
            className="absolute top-2 right-2 size-7 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="white">
              <rect x="1" y="0" width="3" height="10" rx="1" />
              <rect x="6" y="0" width="3" height="10" rx="1" />
            </svg>
          </m.button>
        )}
      </div>

      <p className="text-center text-[10px] py-2.5 px-4" style={{ color: "rgba(255,255,255,0.25)" }}>
        Communication, classes, notices, and coordination — one platform.
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════
   2. PROBLEM / SOLUTION
   ══════════════════════════════════════════════ */
const PROBLEMS = [
  "WhatsApp groups with no access control",
  "Important notices buried inside WhatsApp groups",
  "Separate apps for classes, meetings, and announcements",
  "No centralized communication across the institution",
  "Difficulty tracking updates across departments and classes",
  "No visibility across departments",
];
const SOLUTIONS = [
  "Centralized communication channels for the entire institution",
  "Official notices and announcements in one verified platform",
  "Integrated classes, meetings, webinars, and academic coordination",
  "Role-scoped channels with admin controls",
  "One platform — every workflow unified",
  "Real-time dashboard across all functions",
];

function MobileProblemSolution() {
  const [tab, setTab] = useState<"before" | "after">("before");
  return (
    <section className="bg-white py-14 px-5">
      <FadeUp>
        <p className="text-[11px] font-bold text-[#61667A] tracking-widest uppercase mb-3">Why HermesWorkspace</p>
        <h2 className="text-[1.65rem] font-bold text-[#1A1D26] tracking-tight leading-tight mb-8">
          Bring communication, notices, classes, and coordination into one place.
        </h2>
      </FadeUp>

      {/* Tab switcher */}
      <FadeUp delay={60}>
        <div className="flex rounded-xl overflow-hidden border border-gray-100 mb-5">
          {(["before", "after"] as const).map((t) => (
            <button type="button"
              key={t}
              onClick={() => setTab(t)}
              className="flex-1 py-2.5 text-[12px] font-bold transition-colors active:scale-95"
              style={{
                background: tab === t ? (t === "before" ? "#FEF2F2" : "#F0FDF4") : "white",
                color: tab === t ? (t === "before" ? "#BC1C1E" : "#6063EE") : "#8B8FA0",
              }}
            >
              {t === "before" ? "❌ Fragmented" : "✅ Connected"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <m.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-2.5"
          >
            {(tab === "before" ? PROBLEMS : SOLUTIONS).map((item, i) => (
              <div
                key={`ps-${item}`}
                className="flex items-start gap-3 p-3.5 rounded-xl"
                style={{
                  border: tab === "before" ? "1px solid #FEE2E2" : "1px solid rgba(96,99,238,0.15)",
                  background: tab === "before" ? "rgba(254,242,242,0.5)" : "rgba(96,99,238,0.05)",
                }}
              >
                <div
                  className="size-1.5 rounded-full shrink-0 mt-1.5"
                  style={{ backgroundColor: tab === "before" ? "#E88A8A" : "#6063EE" }}
                />
                <span className="text-[13px] leading-relaxed" style={{ color: tab === "before" ? "#5D6173" : "#1A1D26", fontWeight: tab === "after" ? 500 : 400 }}>
                  {item}
                </span>
              </div>
            ))}
          </m.div>
        </AnimatePresence>
      </FadeUp>
    </section>
  );
}

/* ══════════════════════════════════════════════
   3. CORE MODULES
   ══════════════════════════════════════════════ */
const MODULES = [
  { icon: MessageSquare, title: "Structured Communication", desc: "Organized channels across classes, sections, teachers, students, and administration.", color: "#6063EE" },
  { icon: Monitor, title: "Online Classes", desc: "Conduct live academic sessions directly inside HermesWorkspace.", color: "#6063EE" },
  { icon: Calendar, title: "Meetings & Webinars", desc: "Host PTMs, staff meetings, orientation sessions, and institutional webinars.", color: "#6063EE" },
  { icon: Bell, title: "Verified Notice Board", desc: "Distribute official school notices through a centralized institution-controlled system.", color: "#6063EE" },
  { icon: Settings, title: "Events & Activities", desc: "Manage institutional events, registrations, and participation workflows.", color: "#6063EE" },
  { icon: Monitor, title: "Web & Mobile Accessibility", desc: "Access HermesWorkspace across web and mobile for connected institutional experience.", color: "#6063EE" },
];

function MobileCoreModules() {
  return (
    <section id="features" className="bg-white py-14 px-5">
      <FadeUp>
        <p className="text-[11px] font-bold text-[#61667A] tracking-widest uppercase mb-3">Institutional Infrastructure</p>
        <h2 className="text-[1.65rem] font-bold text-[#1A1D26] tracking-tight leading-tight mb-8">
          Core Infrastructure for Modern Institutions
        </h2>
      </FadeUp>

      <div className="grid grid-cols-2 gap-3">
        {MODULES.map((mod, i) => {
          const Icon = mod.icon;
          return (
            <FadeUp key={mod.title} delay={i * 55}>
              <div
                className="flex flex-col gap-3 p-4 rounded-2xl border bg-white h-full"
                style={{ borderColor: "#F3F4F6" }}
              >
                <div
                  className="size-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${mod.color}15`, border: `1px solid ${mod.color}25` }}
                >
                  <Icon size={16} style={{ color: mod.color }} />
                </div>
                <div>
                  <p className="text-[12.5px] font-bold text-[#1A1D26] mb-1 leading-tight">{mod.title}</p>
                  <p className="text-[11px] text-[#61667A] leading-relaxed">{mod.desc}</p>
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
   4. DESIGNED FOR CLARITY (dark section)
   No GSAP, no scroll parallax; phone is static
   ══════════════════════════════════════════════ */
const CLARITY_FEATURES = [
  "Structured communication channels for administrators, teachers, and students",
  "Centralized notices, announcements, and academic updates in one connected platform",
  "Integrated online classes, meetings, webinars, and institutional sessions",
  "Accessible across web and mobile for connected school communication",
];

function ClarityPhone() {
  return (
    <div className="flex justify-center mb-8">
      <div className="relative w-[170px]">
        <div className="absolute inset-0 rounded-[36px] blur-3xl scale-110" style={{ backgroundColor: "rgba(96,99,238,0.08)" }} />
        <div
          className="relative border rounded-[28px] overflow-hidden shadow-2xl"
          style={{ aspectRatio: "9/19", backgroundColor: "#1A1D28", borderColor: "rgba(255,255,255,0.1)" }}
        >
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-3.5 rounded-full z-10" style={{ backgroundColor: "#12141D" }} />
          <div className="absolute inset-0 p-3 pt-9 flex flex-col gap-2">
            <div className="flex items-center justify-between mb-1">
              <div className="h-2 w-16 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
              <div className="size-4 rounded-full" style={{ backgroundColor: "rgba(96,99,238,0.3)" }} />
            </div>
            <div className="bg-[#6063EE]/10 border border-[#6063EE]/20 rounded-xl p-2">
              <div className="flex items-center gap-1 mb-1">
                <div className="size-1.5 rounded-full bg-[#6063EE]" />
                <div className="h-1.5 w-10 rounded-full bg-[#6063EE]/60" />
              </div>
              <div className="space-y-1">
                <div className="h-1.5 w-full rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
                <div className="h-1.5 w-3/4 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
              </div>
            </div>
            {[...Array(3)].map((_, i) => (
              <div key={`phone-${i}`} className="flex items-center gap-2 p-1.5 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
                <div className="size-5 rounded-md shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
                <div className="flex-1">
                  <div className="h-1.5 w-12 rounded-full mb-1" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
                  <div className="h-1 w-8 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
                </div>
                <div className="size-3 rounded-full shrink-0" style={{ backgroundColor: "rgba(96,99,238,0.3)" }} />
              </div>
            ))}
            <div className="mt-auto flex justify-around pt-1 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              {[...Array(4)].map((_, i) => (
                <div key={`nav-${i}`} className="flex flex-col items-center gap-1">
                  <div className="size-3.5 rounded-md" style={{ backgroundColor: i === 0 ? "rgba(96,99,238,0.4)" : "rgba(255,255,255,0.1)" }} />
                  <div className="w-2 h-1 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileDesignedForClarity() {
  return (
    <section className="py-14 px-5" style={{ backgroundColor: "#12141D" }}>
      <FadeUp>
        <ClarityPhone />
        <p className="text-[11px] font-bold text-[#6063EE] tracking-widest uppercase mb-3">
          Designed for Educational Institutions
        </p>
        <h2 className="text-[1.65rem] font-bold text-white leading-tight tracking-tight mb-4">
          Built Around Institutional Communication
        </h2>
        <p className="text-[13px] mb-7 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
          HermesWorkspace is designed specifically for how schools communicate,
          coordinate, and operate daily — bringing classes, notices, meetings,
          and institutional updates into one structured digital environment.
        </p>
      </FadeUp>

      <div className="flex flex-col gap-2.5">
        {CLARITY_FEATURES.map((f, i) => (
          <FadeUp key={`clarity-${f}`} delay={i * 70}>
            <div
              className="flex items-start gap-3 p-3.5 rounded-xl border"
              style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "rgba(255,255,255,0.03)" }}
            >
              <CheckCircle size={13} className="text-[#6063EE] shrink-0 mt-0.5" />
              <span className="text-[12.5px] leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{f}</span>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   5. COMMUNITY / ROLES
   2-col grid on mobile (was 4-col on desktop)
   ══════════════════════════════════════════════ */
const ROLES = [
  {
    icon: Shield, label: "Administrators", color: "#6063EE",
    features: ["Institution management", "Department coordination", "Notice distribution", "Role-based access"],
  },
  {
    icon: BookOpen, label: "Teachers", color: "#6063EE",
    features: ["Class communication", "Academic updates", "Online class coordination", "Student coordination"],
  },
  {
    icon: Users, label: "Students", color: "#6063EE",
    features: ["Notice access", "Academic schedules", "Institution updates", "Class announcements"],
  },
  {
    icon: User, label: "Parents", color: "#6063EE",
    features: ["Academic visibility", "Institution updates", "Notice access", "Schedule visibility"],
  },
];

function MobileCommunity() {
  return (
    <section className="bg-[#F7F8FB] py-14 px-5">
      <FadeUp>
        <p className="text-[11px] font-bold text-[#61667A] tracking-widest uppercase mb-3">Built for Every Institutional Role</p>
        <h2 className="text-[1.65rem] font-bold text-[#1A1D26] tracking-tight leading-tight mb-3">
          Empowering the Institution
        </h2>
        <p className="text-[13px] text-[#61667A] mb-8 leading-relaxed">
          HermesWorkspace connects administrators, teachers, and students through centralized communication and academic coordination.
        </p>
      </FadeUp>

      <div className="grid grid-cols-2 gap-3">
        {ROLES.map((role, i) => {
          const Icon = role.icon;
          return (
            <FadeUp key={role.label} delay={i * 60}>
              <div
                className="bg-white rounded-2xl p-4 border flex flex-col gap-3 h-full"
                style={{ borderColor: "#F3F4F6" }}
              >
                <div
                  className="size-9 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${role.color}12`, border: `1px solid ${role.color}22` }}
                >
                  <Icon size={16} style={{ color: role.color }} />
                </div>
                <p className="text-[13px] font-bold text-[#1A1D26]">{role.label}</p>
                <div className="flex flex-wrap gap-1 mt-auto pt-2 border-t border-gray-50">
                  {role.features.map((f) => (
                    <span
                      key={f}
                      className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `${role.color}10`, color: role.color }}
                    >
                      {f}
                    </span>
                  ))}
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
   6. RELIABILITY / STATS
   ══════════════════════════════════════════════ */
const STATS = [
  { value: 1, suffix: "", label: "CONNECTED PLATFORM", desc: "Classes, communication, notices, meetings, and coordination unified in one system." },
  { value: 3, suffix: "+", label: "INSTITUTIONAL ROLES", desc: "Built for administrators, teachers, students, and connected parent visibility." },
  { value: 24, suffix: "/7", label: "ACCESSIBILITY", desc: "Accessible across web and mobile for continuous institutional communication." },
];

function StatItem({ value, suffix, label, desc, delay }: {
  value: number; suffix: string; label: string; desc: string; delay: number;
}) {
  const { count, ref } = useCounter(value, 1.6);
  return (
    <div
      className="flex flex-col gap-1.5"
    >
      <div className="flex items-end gap-0.5">
        <span className="text-[2.4rem] font-black text-white leading-none tracking-tight tabular-nums" ref={ref}>
          {Math.floor(count)}
        </span>
        <span className="text-[1.2rem] font-black leading-none mb-1" style={{ color: "#6063EE" }}>{suffix}</span>
      </div>
      <p className="text-[9px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>{label}</p>
      <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>{desc}</p>
    </div>
  );
}

function MobileReliability() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, margin: "-40px" });
  return (
    <section ref={ref as any} className="py-14 px-5" style={{ backgroundColor: "#12141D" }}>
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s, transform 0.6s",
        }}
      >
        <div
          className="inline-flex items-center gap-2 border rounded-full px-3 py-1.5 mb-5"
          style={{ borderColor: "rgba(96,99,238,0.25)", backgroundColor: "rgba(96,99,238,0.08)" }}
        >
          <Shield size={11} className="text-[#6063EE]" />
          <span className="text-[9px] font-bold text-[#6063EE] tracking-widest uppercase">Why HermesWorkspace</span>
        </div>
        <h2 className="text-[1.65rem] font-bold text-white leading-tight tracking-tight mb-3">
          Reliable communication for modern institutions.
        </h2>
        <p className="text-[13px] mb-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
          HermesWorkspace helps schools replace fragmented communication systems
          with one connected platform for classes, notices, meetings, and coordination.
        </p>
        <div className="flex flex-wrap gap-2 mb-10">
          {["Web & Mobile Access", "Structured Communication", "Integrated Online Classes"].map((b) => (
            <span
              key={b}
              className="text-[10px] font-bold px-3 py-1.5 rounded-full border tracking-wider"
              style={{ borderColor: "rgba(96,99,238,0.25)", color: "#6063EE", backgroundColor: "rgba(96,99,238,0.08)" }}
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 border-t" style={{ borderColor: "rgba(255,255,255,0.06)", paddingTop: 28 }}>
        {STATS.map((s, i) => (
          <StatItem key={s.label} {...s} delay={i * 120} />
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   7. CTA
   No GSAP background animation, no rotating rings
   ══════════════════════════════════════════════ */
function MobileCTA() {
  const router = useRouter();
  return (
    <section className="bg-white px-5 py-8 pb-16">
      <FadeUp>
        <div
          className="relative rounded-2xl overflow-hidden px-6 py-12 text-center"
          style={{ background: "linear-gradient(135deg, #12141D 0%, #1A1D28 50%, #12141D 100%)" }}
        >
          {/* Top glow line */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(96,99,238,0.5), transparent)" }}
          />
          {/* Ambient blob */}
          <div className="absolute top-0 left-1/4 size-40 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: "rgba(96,99,238,0.06)" }} />

          <p className="text-[11px] font-bold text-[#6063EE] tracking-widest uppercase mb-4">Get Started</p>
          <h2 className="text-[1.6rem] font-bold text-white tracking-tight leading-tight mb-4">
            Modernize institutional operations with HermesWorkspace.
          </h2>
          <p className="text-[13px] mb-8 leading-relaxed max-w-xs mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
            HermesWorkspace helps schools replace scattered WhatsApp groups,
            unverified notices, and fragmented communication through one
            centralized system built specifically for education.
          </p>

          <div className="flex flex-col gap-3">
            <button type="button"
              onClick={() => router.push("/contact?scroll=inquiry")}
              className="flex items-center justify-center gap-2.5 text-white text-[13px] font-bold py-3.5 rounded-xl active:scale-95 transition-transform"
              style={{ backgroundColor: "#6063EE" }}
            >
              Request a Demo
              <ArrowRight size={15} />
            </button>
            <button type="button"
              onClick={() => router.push("/?scroll=pricing")}
              className="text-white text-[13px] font-medium py-3.5 rounded-xl border active:scale-95 transition-transform"
              style={{ borderColor: "rgba(255,255,255,0.2)" }}
            >
              See Pricing
            </button>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}

/* ══════════════════════════════════════════════
   ROOT EXPORT
   ══════════════════════════════════════════════ */
export function MobileProductPage() {
  return (
    <main className="w-full overflow-x-hidden">
      <MobileHero />
      <MobileProblemSolution />
      <MobileCoreModules />
      <MobileDesignedForClarity />
      <MobileCommunity />
      <MobileReliability />
      <MobileCTA />
    </main>
  );
}