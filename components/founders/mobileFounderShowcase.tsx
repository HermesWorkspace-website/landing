"use client";

/**
 * MobileFoundersShowcase.tsx
 * ------------------------------------------------------------------------------
 * Mobile-optimised version of the founder showcase.
 * Rendered below md breakpoint via the wrapper component.
 * ------------------------------------------------------------------------------
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { Linkedin, Github, Instagram, ArrowRight } from "lucide-react";

// X (formerly Twitter) brand icon — lucide doesn't have the updated logo
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

const FOUNDERS = [
  {
    id: 0,
    number: "01",
    firstName: "APURAV",
    lastName: "AGARWAL",
    role: "Co-Founder · Managing Director & CEO",
    bio: "Institutional partnerships, operational execution, strategic growth, branding, and deployment coordination.",
    quote: "Educational institutions deserve operational systems built for clarity, reliability, and scale.",
    tags: ["Partnerships", "Strategy", "Operations"],
    accent: "#4f46e5",
    accentMuted: "rgba(79,70,229,0.08)",
    portraitBg: "linear-gradient(160deg, #e8e6f8 0%, #c7c3ef 40%, #9d96e0 100%)",
    initials: "AA",
    socials: [
      { icon: XIcon, label: "X (Twitter)" },
      { icon: Linkedin, label: "LinkedIn" },
      { icon: Github, label: "GitHub" },
    ],
  },
  {
    id: 1,
    number: "02",
    firstName: "LAKSHYA",
    lastName: "KUMAR",
    role: "Co-Founder · Chief Technology Officer",
    bio: "Infrastructure engineering, scalability, system architecture, backend development, and platform security.",
    quote: "Modern institutional platforms should feel seamless, scalable, and operationally intelligent.",
    tags: ["Engineering", "Architecture", "Security"],
    accent: "#7c3aed",
    accentMuted: "rgba(124,58,237,0.08)",
    portraitBg: "linear-gradient(160deg, #ede9f8 0%, #c4b8f0 40%, #8b7fd4 100%)",
    initials: "LK",
    socials: [
      { icon: XIcon, label: "X (Twitter)" },
      { icon: Linkedin, label: "LinkedIn" },
      { icon: Github, label: "GitHub" },
    ],
  },
] as const;

const AUTO_DURATION = 6000;

function ProgressLine({
  active,
  duration,
  accent,
}: {
  active: boolean;
  duration: number;
  accent: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.killTweensOf(el);
    if (active) {
      gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: duration / 1000, ease: "none", transformOrigin: "left" });
    } else {
      gsap.set(el, { scaleX: 0 });
    }
  }, [active, duration]);

  return (
    <div className="h-px w-full overflow-hidden bg-zinc-200">
      <div ref={ref} className="h-full origin-left" style={{ backgroundColor: accent }} />
    </div>
  );
}

export default function MobileFoundersShowcase() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const founder = FOUNDERS[current];

  const advance = useCallback((dir: 1 | -1 = 1) => {
    setDirection(dir);
    setCurrent((c) => {
      const next = c + dir;
      if (next >= FOUNDERS.length) return 0;
      if (next < 0) return FOUNDERS.length - 1;
      return next;
    });
  }, []);

  useEffect(() => {
    const t = setTimeout(() => advance(1), AUTO_DURATION);
    return () => clearTimeout(t);
  }, [current, advance]);

  // Swipe support
  const touchStartX = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) advance(diff > 0 ? 1 : -1);
  };

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#f5f3ff", fontFamily: "var(--font-body, 'DM Sans', sans-serif)" }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Wordmark */}
      <div className="absolute left-5 top-5 z-30 flex items-center gap-2">
        <div className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
        <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-zinc-800 uppercase">HermesWorkspace</span>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={founder.id}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="flex min-h-screen flex-col items-center pt-20"
        >
          {/* Number */}
          <p className="mb-4 font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: founder.accent }}>
            {founder.number} / {FOUNDERS.length.toString().padStart(2, "0")}
          </p>

          {/* Portrait */}
          <div
            className="relative mx-auto mb-8 h-72 w-56 overflow-hidden rounded-2xl shadow-2xl"
            style={{ background: founder.portraitBg }}
          >
            <div className="absolute inset-0 flex items-end justify-center pb-6">
              <span
                className="select-none text-8xl font-black text-white opacity-10"
                style={{ fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)" }}
              >
                {founder.initials}
              </span>
            </div>
          </div>

          {/* Name */}
          <div className="px-6 text-center">
            <h1
              className="leading-[0.88] tracking-[-0.02em]"
              style={{
                fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
                fontSize: "clamp(56px, 15vw, 96px)",
                color: founder.accent,
              }}
            >
              {founder.firstName}
            </h1>
            <h1
              className="leading-[0.88] tracking-[-0.02em] text-zinc-900"
              style={{
                fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
                fontSize: "clamp(56px, 15vw, 96px)",
              }}
            >
              {founder.lastName}
            </h1>
          </div>

          {/* Role */}
          <p className="mt-3 px-6 text-center font-mono text-[10px] tracking-[0.15em] text-zinc-500 uppercase">
            {founder.role}
          </p>

          {/* Tags */}
          <div className="mt-5 flex flex-wrap justify-center gap-2 px-8">
            {founder.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border px-3 py-1 font-mono text-[9px] tracking-widest text-zinc-500 uppercase"
                style={{ borderColor: `${founder.accent}30`, backgroundColor: founder.accentMuted }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Quote */}
          <blockquote
            className="mx-8 mt-6 border-l-2 pl-4 text-sm italic leading-relaxed text-zinc-400"
            style={{ borderColor: founder.accent, fontFamily: "var(--font-serif, 'Cormorant Garamond', serif)" }}
          >
            &ldquo;{founder.quote}&rdquo;
          </blockquote>

          {/* Socials */}
          <div className="mt-5 flex gap-3">
            {founder.socials.map(({ icon: Icon, label }) => (
              <button key={label} aria-label={label} className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 text-zinc-400">
                <Icon className="h-3.5 w-3.5" />
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress + nav */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex flex-col items-center gap-5 px-8">
        <div className="flex w-full gap-3">
          {FOUNDERS.map((f) => (
            <div key={f.id} className="flex-1">
              <ProgressLine active={f.id === current} duration={AUTO_DURATION} accent={f.accent} />
            </div>
          ))}
        </div>
        <button
          onClick={() => advance(1)}
          className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase"
        >
          Next founder <ArrowRight className="h-3 w-3" style={{ color: founder.accent }} />
        </button>
      </div>
    </section>
  );
}
