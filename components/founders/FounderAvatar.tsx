"use client";

import { motion } from "framer-motion";
import { Founder } from "@/types/founder";
import { FounderPhoto } from "./FounderPhoto";

interface FounderAvatarProps {
  founder: Founder;
  isActive: boolean;
  direction: "enter" | "exit" | "idle";
}

const AVATAR_VARIANTS = {
  enter: { x: 80, opacity: 0, scale: 0.96 },
  center: { x: 0, opacity: 1, scale: 1 },
  exit: { x: -80, opacity: 0, scale: 0.96 },
};

export function FounderAvatar({ founder }: FounderAvatarProps) {
  return (
    <motion.div
      key={founder.id}
      variants={AVATAR_VARIANTS}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      className="absolute inset-0 flex items-center justify-center px-3 py-10"
    >
      <div className="relative h-[min(68vh,440px)] w-full max-w-[230px] overflow-hidden rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.12)]">
        <FounderPhoto
          src={founder.photo}
          alt={`${founder.firstName} ${founder.lastName}`}
          className="absolute inset-0"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="absolute bottom-5 left-0 right-0 z-10 flex items-center justify-center gap-2"
        >
          <div className="h-px w-6 bg-white/70" />
          <span className="text-[10px] font-medium uppercase tracking-[4px] text-white">
            Founder {String(founder.id).padStart(2, "0")}
          </span>
          <div className="h-px w-6 bg-white/70" />
        </motion.div>
      </div>
    </motion.div>
  );
}
