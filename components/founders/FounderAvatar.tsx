"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Founder } from "@/types/founder";

interface FounderAvatarProps {
  founder: Founder;
  isActive: boolean;
  direction: "enter" | "exit" | "idle";
}

const SHAPES_1 = [
  { cx: "50%", cy: "38%", r: "110", fill: "#EAE8FF" },
  { cx: "60%", cy: "62%", r: "80", fill: "#D5D0FF" },
  { cx: "30%", cy: "55%", r: "60", fill: "#F0EEFF" },
];

const SHAPES_2 = [
  { cx: "50%", cy: "38%", r: "110", fill: "#E6EDFF" },
  { cx: "40%", cy: "65%", r: "80", fill: "#C9D7FF" },
  { cx: "70%", cy: "50%", r: "60", fill: "#EEF2FF" },
];

export function FounderAvatar({ founder, isActive, direction }: FounderAvatarProps) {
  const shapes = founder.id === 1 ? SHAPES_1 : SHAPES_2;
  const accentHex = founder.accentColor;

  const variants = {
    enter: { x: 80, opacity: 0, scale: 0.96 },
    center: { x: 0, opacity: 1, scale: 1 },
    exit: { x: -80, opacity: 0, scale: 0.96 },
  };

  return (
    <motion.div
      key={founder.id}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Background organic shapes */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 320 520"
          preserveAspectRatio="xMidYMid slice"
        >
          {shapes.map((s, i) => (
            <motion.circle
              key={i}
              cx={s.cx}
              cy={s.cy}
              r={s.r}
              fill={s.fill}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: "easeOut" }}
            />
          ))}
        </svg>

        {/* Central avatar circle */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative z-10 flex flex-col items-center gap-5"
        >
          {/* Large initial circle */}
          <div
            className="w-44 h-44 rounded-full flex items-center justify-center shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${accentHex}22 0%, ${accentHex}44 100%)`,
              border: `2px solid ${accentHex}55`,
              boxShadow: `0 32px 80px ${accentHex}30, 0 8px 32px ${accentHex}20`,
            }}
          >
            <span
              className="font-display text-6xl font-black tracking-tighter select-none"
              style={{ color: accentHex, fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {founder.avatarInitials}
            </span>
          </div>

          {/* Founder number badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div
              className="w-8 h-px"
              style={{ background: accentHex }}
            />
            <span
              className="text-[10px] tracking-[4px] uppercase font-medium"
              style={{ color: accentHex }}
            >
              Founder {String(founder.id).padStart(2, "0")}
            </span>
            <div
              className="w-8 h-px"
              style={{ background: accentHex }}
            />
          </motion.div>
        </motion.div>

        {/* Floating accent ring */}
        <motion.div
          className="absolute rounded-full border"
          style={{
            width: 260,
            height: 260,
            borderColor: `${accentHex}18`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute rounded-full border"
          style={{
            width: 340,
            height: 340,
            borderColor: `${accentHex}0D`,
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}
