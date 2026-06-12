"use client";

import { useEffect, useState, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import Image from "next/image";

const PHASES = [
  { pct: 15,  label: "Initializing workspace"         },
  { pct: 38,  label: "Connecting infrastructure"      },
  { pct: 62,  label: "Loading communication systems"  },
  { pct: 84,  label: "Preparing platform environment" },
  { pct: 100, label: "Ready"                          },
] as const;

const MIN_VISIBLE_MS = 250;

export default function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [phase, setPhase]     = useState(0);
  const [exiting, setExiting] = useState(false);
  const onCompleteRef        = useRef(onComplete);
  onCompleteRef.current       = onComplete;

  useEffect(() => {
    if (phase >= PHASES.length - 1) {
      const t = setTimeout(() => {
        setExiting(true);
        setTimeout(() => onCompleteRef.current?.(), 450);
      }, 300);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhase(p => p + 1), MIN_VISIBLE_MS / PHASES.length);
    return () => clearTimeout(t);
  }, [phase]);

  const { pct, label } = PHASES[phase];

  return (
    <AnimatePresence>
      {!exiting && (
        <m.div
          key="hw-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] bg-[#FAFAFA] flex flex-col items-center justify-center px-6"
        >
          {/* ── Logo ──────────────────────────────────────────────── */}
          <m.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: 24 }}
          >
            <Image
              src="/logo.png"
              alt="HermesWorkspace"
              width={120}
              height={120}
              style={{
                // Responsive: 96px on mobile, 120px on desktop
                width: "clamp(88px, 14vw, 120px)",
                height: "clamp(88px, 14vw, 120px)",
                objectFit: "contain",
                borderRadius: "clamp(18px, 3vw, 26px)",
                filter: "invert(1)",
              }}
            />
          </m.div>

          {/* ── Brand name ────────────────────────────────────────── */}
          <m.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-body, Inter, sans-serif)",
              fontSize: "clamp(15px, 2.5vw, 18px)",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "#0f172a",
              marginBottom: 40,
              textAlign: "center",
            }}
          >
            HermesWorkspace
          </m.p>

          {/* ── Progress bar ──────────────────────────────────────── */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            style={{
              width: "min(260px, 72vw)",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {/* Track */}
            <div
              style={{
                position: "relative",
                height: 2,
                background: "rgba(15,23,42,0.08)",
                borderRadius: 99,
                overflow: "hidden",
              }}
            >
              <m.div
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute",
                  inset: "0 auto 0 0",
                  background: "#0f172a",
                  borderRadius: 99,
                }}
              />
            </div>

            {/* Phase label */}
            <AnimatePresence mode="wait">
              <m.span
                key={phase}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "var(--font-body, Inter, sans-serif)",
                  fontSize: "clamp(10px, 2vw, 12px)",
                  letterSpacing: "0.01em",
                  color: "rgba(15,23,42,0.38)",
                  textAlign: "center",
                }}
              >
                {label}
              </m.span>
            </AnimatePresence>
          </m.div>

          {/* ── Version (bottom left) ─────────────────────────────── */}
          <m.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            style={{
              position: "fixed",
              bottom: 20,
              left: 20,
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              fontSize: 12,
              letterSpacing: "0.06em",
              color: "rgba(15,23,42,0.18)",
            }}
          >
            v1.0.1
          </m.span>

          {/* ── Secure dot (bottom right) ─────────────────────────── */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            style={{
              position: "fixed",
              bottom: 18,
              right: 20,
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <div
              className="anim-pulse-opacity"
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#22c55e",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                fontSize: 12,
                letterSpacing: "0.06em",
                color: "rgba(15,23,42,0.18)",
              }}
            >
              Secure
            </span>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}