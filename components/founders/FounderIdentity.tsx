"use client";

import { useRef, useEffect } from "react";
import { IconBrandLinkedin, IconBrandInstagram, IconBrandX } from "@tabler/icons-react";
import { Founder } from "@/types/founder";
import { FounderPhoto } from "./FounderPhoto";

interface FounderIdentityProps {
  founder: Founder;
  index?: number;
}

export function FounderIdentity({ founder, index = 0 }: FounderIdentityProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.setAttribute("data-visible", "true"); io.disconnect(); } },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="fi-root grid grid-cols-[180px_1fr] gap-6 lg:gap-8 items-start">

      {/* Portrait */}
      <div>
        <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "3/4", boxShadow: "0 16px 48px rgba(0,0,0,0.10)" }}>
          <FounderPhoto
            src={founder.photo}
            alt={`${founder.firstName} ${founder.lastName}`}
            aspectRatio="3/4"
            priority={index === 0}
            sizes="(max-width: 768px) 160px, 180px"
          />
        </div>
        <div className="flex gap-2 mt-2">
          {founder.socialLinks.linkedin && (
            <a href={founder.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="flex size-7 items-center justify-center rounded-full border transition-all hover:-translate-y-0.5"
              style={{ borderColor: "#ddd", color: "#7A7A85" }}>
              <IconBrandLinkedin size={11} />
            </a>
          )}
          {founder.socialLinks.twitter && (
            <a href={founder.socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="X"
              className="flex size-7 items-center justify-center rounded-full border transition-all hover:-translate-y-0.5"
              style={{ borderColor: "#ddd", color: "#7A7A85" }}>
              <IconBrandX size={11} />
            </a>
          )}
          {founder.socialLinks.instagram && (
            <a href={founder.socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="flex size-7 items-center justify-center rounded-full border transition-all hover:-translate-y-0.5"
              style={{ borderColor: "#ddd", color: "#7A7A85" }}>
              <IconBrandInstagram size={11} />
            </a>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="pt-1">
        <span className="fi-item fi-0 block text-[10px] font-semibold uppercase tracking-[2.5px] mb-3" style={{ color: founder.accentColor }}>
          {founder.role}
        </span>

        <div className="fi-item fi-1 overflow-hidden">
          <h2 className="font-black leading-[0.88] tracking-[-0.03em] text-[#0D0D0F]"
            style={{ fontSize: "clamp(48px, 6.5vw, 88px)" }}>
            {founder.firstName}{" "}
            <span style={{ color: founder.accentColor }}>{founder.lastName}</span>
          </h2>
        </div>

        <div className="fi-item fi-2 flex items-center gap-2.5 mt-3">
          <div className="h-[2px] w-5 rounded-full shrink-0" style={{ background: founder.accentColor }} />
          <span className="text-[10px] font-semibold uppercase tracking-[2px]" style={{ color: founder.accentColor }}>
            {founder.title}
          </span>
        </div>

        <div className="fi-item fi-3 mt-4 flex flex-col gap-1">
          {founder.focusAreas.map((area) => (
            <span key={area} className="text-[10px] uppercase tracking-[0.18em] leading-[1.4]" style={{ color: "#7A7A85" }}>
              {area}
            </span>
          ))}
        </div>

        <div className="fi-item fi-4 my-5 h-px" style={{ background: "linear-gradient(to right,#E0DDD7,transparent)" }} />

        <blockquote className="fi-item fi-5 text-[13px] italic leading-[1.75] max-w-[500px]" style={{ color: "#555" }}>
          &ldquo;{founder.quote}&rdquo;
        </blockquote>
      </div>

      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .fi-item { opacity: 0; transform: translateY(18px); transition: opacity .6s cubic-bezier(.22,1,.36,1), transform .6s cubic-bezier(.22,1,.36,1); }
          [data-visible="true"] .fi-0 { opacity:1;transform:none;transition-delay:.08s; }
          [data-visible="true"] .fi-1 { opacity:1;transform:none;transition-delay:.15s; }
          [data-visible="true"] .fi-2 { opacity:1;transform:none;transition-delay:.22s; }
          [data-visible="true"] .fi-3 { opacity:1;transform:none;transition-delay:.28s; }
          [data-visible="true"] .fi-4 { opacity:1;transform:none;transition-delay:.33s; }
          [data-visible="true"] .fi-5 { opacity:1;transform:none;transition-delay:.40s; }
        }
      `}</style>
    </div>
  );
}
