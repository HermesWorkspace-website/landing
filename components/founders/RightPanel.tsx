"use client";

import { useEffect, useRef } from "react";
import {
  IconArrowRight,
  IconArrowLeft,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandX,
} from "@tabler/icons-react";
import { Founder } from "@/types/founder";

interface RightPanelProps {
  founder: Founder;
  nextFounder: Founder;
  onNext: () => void;
  onPrev: () => void;
}

/**
 * RightPanel
 *
 * - No AnimatePresence: CSS key-based animation via data-key attribute
 * - Uses clip-path reveal on content change (GPU composited, no reflow)
 * - Keyboard: left/right arrow keys navigate founders
 * - will-change: opacity, transform — added only during animation, removed after
 */
export function RightPanel({
  founder,
  nextFounder,
  onNext,
  onPrev,
}: RightPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const prevId = useRef(founder.id);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;

    // Trigger re-animation on founder change
    if (prevId.current !== founder.id) {
      el.setAttribute("data-animating", "true");
      const t = setTimeout(() => {
        el.removeAttribute("data-animating");
        prevId.current = founder.id;
      }, 650);
      return () => clearTimeout(t);
    }
  }, [founder.id]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onNext, onPrev]);

  return (
    <div
      ref={panelRef}
      className="rp-root flex flex-col justify-between h-full py-8 pr-6 lg:pr-9 pl-4 text-right"
    >
      {/* Top header — static, no per-founder animation */}
      <div className="rp-header">
        <p className="text-[10px] tracking-[3px] uppercase text-[#7A7A85] mb-1 pt-5">
          Every school. One platform.
        </p>
        <div
          className="text-[#0D0D0F]"
          style={{
            fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
            fontSize: "clamp(26px, 4vw, 52px)",
            lineHeight: "0.9",
          }}
        >
          MEET THE
          <br />
          <span style={{ color: founder.accentColor }}>FOUNDERS</span>
          <span className="text-[#0D0D0D]">.</span>
        </div>
      </div>

      {/* Quote — animates on change */}
      <div className="my-auto rp-quote-zone">
        <div className="flex justify-end">
          <span
            className="text-[72px] leading-none"
            style={{
              fontFamily: "'Bebas Neue', 'Georgia', serif",
              color: founder.accentColor,
              opacity: 0.22,
            }}
          >
            &ldquo;
          </span>
        </div>
        <p
          key={founder.id}
          className="rp-quote text-[13px] leading-[1.65] text-[#444] italic max-w-[220px] ml-auto"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {founder.quote}
        </p>
      </div>

      {/* Bottom: socials + next preview + nav */}
      <div className="space-y-4">
        {/* Social icons */}
        <div className="flex items-center justify-end gap-2.5">
          {founder.socialLinks.linkedin && (
            <SocialBtn href={founder.socialLinks.linkedin} label="LinkedIn">
              <IconBrandLinkedin size={12} />
            </SocialBtn>
          )}
          {founder.socialLinks.twitter && (
            <SocialBtn href={founder.socialLinks.twitter} label="X (Twitter)">
              <IconBrandX size={12} />
            </SocialBtn>
          )}
          {founder.socialLinks.instagram && (
            <SocialBtn href={founder.socialLinks.instagram} label="Instagram">
              <IconBrandInstagram size={12} />
            </SocialBtn>
          )}
        </div>

        {/* Next founder preview */}
        <div className="border-t pt-3" style={{ borderColor: "#E8E4DC" }}>
          <p className="text-[9px] tracking-[3px] uppercase text-[#7A7A85] mb-1.5">
            Up Next
          </p>
          <p className="text-[11px] tracking-[1px] text-[#0D0D0F] font-semibold">
            {nextFounder.firstName} {nextFounder.lastName}
          </p>
          <p className="text-[9px] tracking-[1px] uppercase text-[#7A7A85]">
            {nextFounder.title}
          </p>
        </div>

        {/* Nav buttons */}
        <div className="flex items-center justify-end gap-2">
          <NavBtn onClick={onPrev} label="Previous founder">
            <IconArrowLeft size={14} />
          </NavBtn>
          <NavBtn
            onClick={onNext}
            label="Next founder"
            style={{
              background: founder.accentColor,
              borderColor: founder.accentColor,
              color: "white",
            }}
          >
            <IconArrowRight size={14} />
          </NavBtn>
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .rp-quote {
            animation: rpQuoteFade 0.55s cubic-bezier(0.22,1,0.36,1) both;
          }
          @keyframes rpQuoteFade {
            from { opacity: 0; transform: translateY(14px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        }
      `}</style>
    </div>
  );
}

function SocialBtn({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="
        size-7 rounded-full border flex items-center justify-center
        transition-all duration-200 hover:scale-110 hover:border-black/25
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1
      "
      style={{ borderColor: "#D8D4CC", color: "#7A7A85" }}
    >
      {children}
    </a>
  );
}

function NavBtn({
  onClick,
  label,
  children,
  style,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="
        size-9 rounded-full border flex items-center justify-center
        transition-all duration-200 hover:scale-105 active:scale-95
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1
      "
      style={{
        borderColor: "#D8D4CC",
        color: "#7A7A85",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
