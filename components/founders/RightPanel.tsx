"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IconArrowRight, IconArrowLeft, IconBrandLinkedin, IconBrandInstagram, IconBrandX } from "@tabler/icons-react";
import { Founder } from "@/types/founder";

interface RightPanelProps {
  founder: Founder;
  nextFounder: Founder;
  onNext: () => void;
  onPrev: () => void;
}

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemVariants = {
  hidden: { y: 28, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] } },
  exit: { y: -18, opacity: 0, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
};

export function RightPanel({ founder, nextFounder, onNext, onPrev }: RightPanelProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={founder.id}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        className="flex flex-col justify-between h-full py-8 pr-6 lg:pr-9 pl-4 text-right"
      >
        {/* Top header */}
        <motion.div variants={itemVariants}>
          <p className="text-[10px] tracking-[3px] uppercase text-[#9896A4] mb-1 pt-5">
            Every school. One platform.
          </p>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(28px, 4vw, 52px)",
              lineHeight: "0.9",
            }}
            className="text-[#0D0D0F]"
          >
            MEET THE
            <br />
            <span style={{ color: founder.accentColor }}>FOUNDERS</span>
            <span className="text-[#0D0D0F]">.</span>
          </div>
        </motion.div>

        {/* Quote */}
        <div className="my-auto">
          <motion.div variants={itemVariants} className="flex justify-end">
            <span
              className="text-[80px] leading-none"
              style={{
                fontFamily: "'DM Serif Display', serif",
                color: founder.accentColor,
                opacity: 0.25,
              }}
            >
              "
            </span>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="text-[13px] leading-[1.65] text-[#444] italic max-w-[220px] ml-auto"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            {founder.quote}
          </motion.p>
        </div>

        {/* Bottom: social + next preview + nav */}
        <div className="space-y-4">
          {/* Social icons */}
          <motion.div variants={itemVariants} className="flex items-center justify-end gap-3">
            {founder.socialLinks.linkedin && (
              <motion.a
                href={founder.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="size-7 rounded-full border flex items-center justify-center"
                style={{ borderColor: "#D8D4CC", color: "#9896A4" }}
              >
                <IconBrandLinkedin size={12} />
              </motion.a>
            )}
            {founder.socialLinks.twitter && (
              <motion.a
                href={founder.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="size-7 rounded-full border flex items-center justify-center"
                style={{ borderColor: "#D8D4CC", color: "#9896A4" }}
              >
                <IconBrandX size={12} />
              </motion.a>
            )}
            {founder.socialLinks.instagram && (
              <motion.a
                href={founder.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="size-7 rounded-full border flex items-center justify-center"
                style={{ borderColor: "#D8D4CC", color: "#9896A4" }}
              >
                <IconBrandInstagram size={12} />
              </motion.a>
            )}
          </motion.div>

          {/* Next founder preview */}
          <motion.div
            variants={itemVariants}
            className="border-t pt-3"
            style={{ borderColor: "#E8E4DC" }}
          >
            <p className="text-[9px] tracking-[3px] uppercase text-[#9896A4] mb-1.5">Up Next</p>
            <p className="text-[11px] tracking-[1px] text-[#0D0D0F] font-medium">
              {nextFounder.firstName} {nextFounder.lastName}
            </p>
            <p className="text-[9px] tracking-[1px] uppercase text-[#9896A4]">{nextFounder.title}</p>
          </motion.div>

          {/* Nav buttons */}
          <motion.div variants={itemVariants} className="flex items-center justify-end gap-2">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              onClick={onPrev}
              className="size-9 rounded-full border flex items-center justify-center"
              style={{ borderColor: "#D8D4CC", color: "#9896A4" }}
              aria-label="Previous founder"
            >
              <IconArrowLeft size={14} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              onClick={onNext}
              className="size-9 rounded-full border flex items-center justify-center text-white"
              style={{ background: founder.accentColor, borderColor: founder.accentColor }}
              aria-label="Next founder"
            >
              <IconArrowRight size={14} />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}