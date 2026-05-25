"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Founder } from "@/types/founder";

interface LeftPanelProps {
  founder: Founder;
  onLearnMore?: () => void;
}

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemVariants = {
  hidden: { y: 32, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] } },
  exit: { y: -20, opacity: 0, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
};

export function LeftPanel({ founder, onLearnMore }: LeftPanelProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={founder.id}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        className="flex flex-col justify-between h-full py-8 pl-6 lg:pl-9 pr-4"
      >
        {/* Top meta row */}
        <motion.div variants={itemVariants} className="flex pt-5 items-center gap-3">
          <span
            className="text-[10px] tracking-[3px] uppercase px-2.5 py-1 rounded-[2px] font-medium"
            style={{
              background: `${founder.accentColor}18`,
              color: founder.accentColor,
            }}
          >
            {founder.role}
          </span>
          <span className="text-[10px] tracking-[2px] uppercase text-[#9896A4] hidden lg:inline">
            HermesWorkspace
          </span>
        </motion.div>

        {/* Giant name block */}
        <div className="flex-1 flex flex-col justify-center my-4">
          <motion.p
            variants={itemVariants}
            className="text-[11px] tracking-[4px] uppercase text-[#9896A4] mb-1"
          >
            Meet
          </motion.p>

          <div className="overflow-hidden">
            <motion.span
              variants={itemVariants}
              className="block text-[#0D0D0F] leading-[0.86]"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(40px, 6vw, 82px)",
              }}
            >
              {founder.firstName}
            </motion.span>
          </div>

          {founder.lastName && (
            <div className="overflow-hidden">
              <motion.span
                variants={itemVariants}
                className="block leading-[0.86]"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(40px, 6vw, 82px)",
                  color: founder.accentColor,
                }}
              >
                {founder.lastName}
              </motion.span>
            </div>
          )}

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 mt-3"
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
          </motion.div>
        </div>

        {/* Bio + CTA */}
        <div className="space-y-4">
          <motion.p
            variants={itemVariants}
            className="text-[12px] leading-[1.7] text-[#555] max-w-[240px]"
          >
            {founder.bio}
          </motion.p>

          {/* Focus area pills */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-1.5">
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

          <motion.div variants={itemVariants} className="flex gap-2 pt-1">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onLearnMore}
              className="px-4 py-2 text-[10px] tracking-[2px] uppercase font-medium text-white rounded-[1px]"
              style={{ background: founder.accentColor }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}