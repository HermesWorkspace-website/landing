"use client";

/**
 * mobileFounderShowcase.tsx
 * -------------------------
 * Mobile founder showcase — matches desktop theme exactly:
 * same FOUNDERS data, same accent colours, Bebas Neue + DM Sans,
 * framer-motion slide animations, real social links.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Linkedin, Instagram } from "lucide-react";
import { FOUNDERS } from "./founders-data";

// X icon (lucide doesn't have updated logo)
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

// Background shapes per founder (mirrors FounderAvatar)
const SHAPES = [
  [
    { cx: "50%", cy: "38%", r: 110, fill: "#EAE8FF" },
    { cx: "60%", cy: "62%", r: 80, fill: "#D5D0FF" },
    { cx: "30%", cy: "55%", r: 60, fill: "#F0EEFF" },
  ],
  [
    { cx: "50%", cy: "38%", r: 110, fill: "#E6EDFF" },
    { cx: "40%", cy: "65%", r: 80, fill: "#C9D7FF" },
    { cx: "70%", cy: "50%", r: 60, fill: "#EEF2FF" },
  ],
];

const AUTO_DURATION = 6000;

export default function MobileFoundersShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef<number>(Date.now());
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const founder = FOUNDERS[activeIndex];
  const shapes = SHAPES[activeIndex] ?? SHAPES[0];

  const advance = useCallback(
    (dir: 1 | -1 = 1) => {
      setDirection(dir);
      setActiveIndex((c) => {
        const next = c + dir;
        if (next >= FOUNDERS.length) return 0;
        if (next < 0) return FOUNDERS.length - 1;
        return next;
      });
      setProgress(0);
      startTimeRef.current = Date.now();
    },
    []
  );

  // Auto-advance
  useEffect(() => {
    const t = setTimeout(() => advance(1), AUTO_DURATION);
    return () => clearTimeout(t);
  }, [activeIndex, advance]);

  // Progress ticker
  useEffect(() => {
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      setProgress(Math.min((elapsed / AUTO_DURATION) * 100, 100));
    }, 50);
    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [activeIndex]);

  // Swipe support
  const touchStartX = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) advance(diff > 0 ? 1 : -1);
  };

  return (
    <section
      id="founders"
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: "#ffffff",
        fontFamily: "'DM Sans', sans-serif",
        minHeight: "100svh",
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Wordmark */}
      <div className="absolute left-5 top-5 z-30 flex items-center gap-2">
        <div
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: founder.accentColor }}
        />
        <span
          className="text-[10px] font-bold tracking-[0.2em] uppercase"
          style={{ color: "#0D0D0F", fontFamily: "'DM Sans', sans-serif" }}
        >
          HermesWorkspace
        </span>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={founder.id}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="flex flex-col items-center px-6 pt-20 pb-36"
          style={{ minHeight: "100svh" }}
        >
          {/* Founder index label */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-5 text-[10px] tracking-[4px] uppercase font-medium"
            style={{ color: founder.accentColor }}
          >
            Founder {String(founder.id).padStart(2, "0")} /{" "}
            {String(FOUNDERS.length).padStart(2, "0")}
          </motion.p>

          {/* Portrait card */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative mb-8 overflow-hidden rounded-2xl shadow-2xl"
            style={{ width: 200, height: 260 }}
          >
            {/* Organic background shapes */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 200 260"
              preserveAspectRatio="xMidYMid slice"
            >
              {shapes.map((s, i) => (
                <motion.circle
                  key={i}
                  cx={s.cx}
                  cy={s.cy}
                  r={s.r}
                  fill={s.fill}
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.6 }}
                />
              ))}
            </svg>

            {/* Initials circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-28 h-28 rounded-full flex items-center justify-center shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${founder.accentColor}22 0%, ${founder.accentColor}44 100%)`,
                  border: `2px solid ${founder.accentColor}55`,
                  boxShadow: `0 20px 60px ${founder.accentColor}30`,
                }}
              >
                <span
                  className="text-5xl font-black select-none"
                  style={{
                    color: founder.accentColor,
                    fontFamily: "'Bebas Neue', sans-serif",
                  }}
                >
                  {founder.avatarInitials}
                </span>
              </div>
            </div>

            {/* Floating accent rings */}
            <motion.div
              className="absolute rounded-full border pointer-events-none"
              style={{
                width: 170,
                height: 170,
                top: "50%",
                left: "50%",
                marginTop: -85,
                marginLeft: -85,
                borderColor: `${founder.accentColor}20`,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          {/* Role badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-4 flex items-center gap-2"
          >
            <span
              className="text-[10px] tracking-[3px] uppercase px-2.5 py-1 rounded-[2px] font-medium"
              style={{
                background: `${founder.accentColor}18`,
                color: founder.accentColor,
              }}
            >
              {founder.role}
            </span>
          </motion.div>

          {/* Name — Bebas Neue, matches desktop */}
          <div className="text-center mb-2">
            <motion.span
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="block leading-[0.86]"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(52px, 14vw, 80px)",
                color: "#0D0D0F",
              }}
            >
              {founder.firstName}
            </motion.span>
            {founder.lastName && (
              <motion.span
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.32, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="block leading-[0.86]"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(52px, 14vw, 80px)",
                  color: founder.accentColor,
                }}
              >
                {founder.lastName}
              </motion.span>
            )}
          </div>

          {/* Title line */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38 }}
            className="flex items-center gap-2 mb-6"
          >
            <div
              className="w-6 h-[2px] rounded-full"
              style={{ background: founder.accentColor }}
            />
            <span
              className="text-[10px] tracking-[2px] uppercase font-medium"
              style={{ color: founder.accentColor }}
            >
              {founder.title}
            </span>
            <div
              className="w-6 h-[2px] rounded-full"
              style={{ background: founder.accentColor }}
            />
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42 }}
            className="text-center text-[12px] leading-[1.7] max-w-[280px] mb-5"
            style={{ color: "#555" }}
          >
            {founder.bio}
          </motion.p>

          {/* Focus area pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.48 }}
            className="flex flex-wrap justify-center gap-1.5 mb-6"
          >
            {founder.focusAreas.map((area) => (
              <span
                key={area}
                className="text-[9px] tracking-[1px] uppercase px-2 py-1 rounded-[1px] border"
                style={{
                  borderColor: `${founder.accentColor}33`,
                  color: founder.accentColor,
                  background: `${founder.accentColor}08`,
                }}
              >
                {area}
              </span>
            ))}
          </motion.div>

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52 }}
            className="text-center text-[12px] italic leading-relaxed max-w-[280px] mb-6 border-l-2 pl-4 text-left"
            style={{
              borderColor: founder.accentColor,
              color: "#666",
              fontFamily: "'DM Serif Display', serif",
            }}
          >
            &ldquo;{founder.quote}&rdquo;
          </motion.blockquote>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.56 }}
            className="flex items-center gap-3"
          >
            {founder.socialLinks.linkedin && (
              <a
                href={founder.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border flex items-center justify-center"
                style={{ borderColor: "#D8D4CC", color: "#9896A4" }}
                aria-label="LinkedIn"
              >
                <Linkedin size={13} />
              </a>
            )}
            {founder.socialLinks.twitter && (
              <a
                href={founder.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border flex items-center justify-center"
                style={{ borderColor: "#D8D4CC", color: "#9896A4" }}
                aria-label="X (Twitter)"
              >
                <XIcon className="w-3 h-3" />
              </a>
            )}
            {founder.socialLinks.instagram && (
              <a
                href={founder.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border flex items-center justify-center"
                style={{ borderColor: "#D8D4CC", color: "#9896A4" }}
                aria-label="Instagram"
              >
                <Instagram size={13} />
              </a>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom progress + nav — fixed to bottom */}
      <div
        className="fixed bottom-0 left-0 right-0 z-30 px-6 pb-6 pt-4"
        style={{ background: "linear-gradient(to top, #fff 60%, transparent)" }}
      >
        {/* Progress tracks */}
        <div className="flex gap-3 mb-4">
          {FOUNDERS.map((f, i) => (
            <button
              key={f.id}
              onClick={() => {
                const dir = i > activeIndex ? 1 : -1;
                setDirection(dir);
                setActiveIndex(i);
                setProgress(0);
                startTimeRef.current = Date.now();
              }}
              className="flex-1 flex flex-col gap-1"
              aria-label={`Go to ${f.firstName} ${f.lastName}`}
            >
              <div className="flex justify-between items-center">
                <span
                  className="text-[9px] tracking-[2px] uppercase transition-colors duration-300"
                  style={{
                    color: i === activeIndex ? f.accentColor : "#9896A4",
                    fontWeight: i === activeIndex ? 500 : 400,
                  }}
                >
                  {f.firstName} {f.lastName}
                </span>
                {i === activeIndex && (
                  <span
                    className="text-[9px] tracking-[1px]"
                    style={{ color: f.accentColor }}
                  >
                    {Math.round(progress)}%
                  </span>
                )}
              </div>
              <div
                className="h-[2px] w-full rounded-full overflow-hidden"
                style={{ background: "#E8E4DC" }}
              >
                {i === activeIndex ? (
                  <motion.div
                    className="h-full rounded-full origin-left"
                    style={{
                      background: f.accentColor,
                      scaleX: progress / 100,
                      transformOrigin: "left",
                    }}
                  />
                ) : i < activeIndex ? (
                  <div
                    className="h-full w-full rounded-full"
                    style={{ background: f.accentColor, opacity: 0.35 }}
                  />
                ) : null}
              </div>
            </button>
          ))}
        </div>

        {/* Prev / Next nav */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => advance(-1)}
            className="flex items-center gap-1.5 text-[10px] tracking-[2px] uppercase"
            style={{ color: "#9896A4" }}
          >
            <ArrowLeft className="w-3 h-3" />
            Prev
          </button>
          <button
            onClick={() => advance(1)}
            className="flex items-center gap-1.5 text-[10px] tracking-[2px] uppercase"
            style={{ color: founder.accentColor }}
          >
            Next founder
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </section>
  );
}