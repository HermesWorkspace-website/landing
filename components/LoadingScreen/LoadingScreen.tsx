"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PHASES = [
  { pct: 15,  label: "Initializing workspace"         },
  { pct: 38,  label: "Connecting infrastructure"      },
  { pct: 62,  label: "Loading communication systems"  },
  { pct: 84,  label: "Preparing platform environment" },
  { pct: 100, label: "Ready"                          },
] as const;

const DELAYS = [380, 500, 520, 460, 0];

export default function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [phase, setPhase]     = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (phase >= PHASES.length - 1) {
      const t = setTimeout(() => {
        setExiting(true);
        setTimeout(() => onComplete?.(), 680);
      }, 420);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhase(p => p + 1), DELAYS[phase]);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  const { pct, label } = PHASES[phase];

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="hw-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#FAFAFA",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 24px",
          }}
        >
          {/* ── Logo ──────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: 24 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="HermesWorkspace"
              style={{
                // Responsive: 96px on mobile, 120px on desktop
                width: "clamp(88px, 14vw, 120px)",
                height: "clamp(88px, 14vw, 120px)",
                objectFit: "contain",
                borderRadius: "clamp(18px, 3vw, 26px)",
                filter: "invert(1)",
              }}
            />
          </motion.div>

          {/* ── Brand name ────────────────────────────────────────── */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-body, system-ui, sans-serif)",
              fontSize: "clamp(15px, 2.5vw, 18px)",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "#0f172a",
              marginBottom: 40,
              textAlign: "center",
            }}
          >
            HermesWorkspace
          </motion.p>

          {/* ── Progress bar ──────────────────────────────────────── */}
          <motion.div
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
              <motion.div
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
              <motion.span
                key={phase}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "var(--font-body, system-ui, sans-serif)",
                  fontSize: "clamp(10px, 2vw, 12px)",
                  letterSpacing: "0.01em",
                  color: "rgba(15,23,42,0.38)",
                  textAlign: "center",
                }}
              >
                {label}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* ── Version (bottom left) ─────────────────────────────── */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            style={{
              position: "fixed",
              bottom: 20,
              left: 20,
              fontFamily: "var(--font-mono, monospace)",
              fontSize: 10,
              letterSpacing: "0.06em",
              color: "rgba(15,23,42,0.18)",
            }}
          >
            v1.0.1
          </motion.span>

          {/* ── Secure dot (bottom right) ─────────────────────────── */}
          <motion.div
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
            <motion.div
              animate={{ opacity: [1, 0.25, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
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
                fontFamily: "var(--font-mono, monospace)",
                fontSize: 10,
                letterSpacing: "0.06em",
                color: "rgba(15,23,42,0.18)",
              }}
            >
              Secure
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}