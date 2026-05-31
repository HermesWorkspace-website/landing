"use client";

import { AnimatePresence } from "framer-motion";
import { Founder } from "@/types/founder";
import { FounderAvatar } from "./FounderAvatar";

interface CenterPortraitProps {
  founder: Founder;
}

export function CenterPortrait({ founder }: CenterPortraitProps) {
  return (
    <div className="relative h-full w-full overflow-hidden z-10">
      {/* Vertical rule lines */}
      <div
        className="absolute top-0 bottom-0 left-0 w-px"
        style={{ background: "linear-gradient(to bottom, transparent, #D8D4CC55, transparent)" }}
      />
      <div
        className="absolute top-0 bottom-0 right-0 w-px"
        style={{ background: "linear-gradient(to bottom, transparent, #D8D4CC55, transparent)" }}
      />

      <AnimatePresence mode="wait">
        <FounderAvatar
          key={founder.id}
          founder={founder}
          isActive={true}
          direction="enter"
        />
      </AnimatePresence>
    </div>
  );
}
