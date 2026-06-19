"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Founder } from "@/types/founder";
import { SIGNATURES, hasVectorPaths } from "./signatures-data";

interface FounderSignatureProps {
  founder: Founder;
  className?: string;
}

export function FounderSignature({ founder, className = "" }: FounderSignatureProps) {
  if (!hasVectorPaths(founder.founderId)) {
    return <StaticSignature founder={founder} className={className} />;
  }
  return <AnimatedSignature founder={founder} className={className} />;
}

/* ── Static Image fallback (no vector paths available) ──────────── */
function StaticSignature({ founder, className }: FounderSignatureProps) {
  const isLakshya = founder.founderId === "lakshya";
  return (
    <Image
      src={isLakshya ? "/founder/signatures/LakshyaSignature.svg" : "/founder/signatures/ApuravSignature.svg"}
      alt={isLakshya ? "Lakshya Kumar Signature" : "Apurav Agarwal Signature"}
      width={180}
      height={60}
      className={className}
      style={{ width: "clamp(120px, 18vw, 180px)", height: "auto" }}
      priority
      unoptimized
    />
  );
}

/* ── Animated inline SVG (vector paths exist) ───────────────────── */
function AnimatedSignature({ founder, className }: FounderSignatureProps) {
  const id = founder.founderId;
  const svgRef = useRef<SVGSVGElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [drawn, setDrawn] = useState(false);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!revealed) return;
    if (prefersReducedMotion.current) {
      setDrawn(true);
      return;
    }

    const paths = svgRef.current?.querySelectorAll<SVGPathElement>("[data-signature-path]");
    if (!paths || paths.length === 0) {
      setDrawn(true);
      return;
    }

    paths.forEach((p) => {
      const len = p.getTotalLength();
      p.style.transition = "none";
      p.style.strokeDasharray = String(len);
      p.style.strokeDashoffset = String(len);
    });

    void svgRef.current?.getBoundingClientRect();

    paths.forEach((p, i) => {
      p.style.transition = `stroke-dashoffset 1.8s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.12}s`;
      p.style.strokeDashoffset = "0";
    });

    const last = paths[paths.length - 1];
    const onEnd = () => setDrawn(true);
    last.addEventListener("transitionend", onEnd, { once: true });
    return () => last.removeEventListener("transitionend", onEnd);
  }, [revealed]);

  const data = SIGNATURES[id];
  const isLakshya = id === "lakshya";

  return (
    <svg
      ref={svgRef}
      viewBox={data.viewBox}
      className={className}
      style={{
        width: "clamp(120px, 18vw, 180px)",
        height: "auto",
        display: "block",
        overflow: "visible",
      }}
      aria-label={isLakshya ? "Lakshya Kumar Signature" : "Apurav Agarwal Signature"}
      role="img"
    >
      {data.paths.map((d, i) => (
        <path
          key={i}
          data-signature-path
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={
            drawn
              ? { strokeDasharray: "none", strokeDashoffset: 0, transition: "none" }
              : undefined
          }
        />
      ))}
    </svg>
  );
}
