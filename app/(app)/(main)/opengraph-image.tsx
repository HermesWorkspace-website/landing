import { ImageResponse } from "next/og";
import { alt, contentType, size } from "./opengraph-image-meta";

const BRAND = "#6063EE";
const BRAND_PURPLE = "#6063EE";
const BG = "#0B0C1E";

// Base URL: production domain or fallback to localhost in dev
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_URL ??
  "http://localhost:3000";

const containerStyle = {
  background: BG,
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "sans-serif",
  position: "relative",
  overflow: "hidden",
} as const;

const gridOverlayStyle = {
  position: "absolute",
  inset: 0,
  backgroundImage:
    "linear-gradient(rgba(96,99,238,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(96,99,238,0.06) 1px, transparent 1px)",
  backgroundSize: "64px 64px",
} as const;

const glowOrbTopLeftStyle = {
  position: "absolute",
  top: -140,
  left: -100,
  width: 560,
  height: 440,
  background: `radial-gradient(ellipse, rgba(96,99,238,0.28) 0%, transparent 68%)`,
  borderRadius: "50%",
} as const;

const glowOrbBottomRightStyle = {
  position: "absolute",
  bottom: -120,
  right: -80,
  width: 460,
  height: 380,
  background: `radial-gradient(ellipse, rgba(168,85,247,0.2) 0%, transparent 70%)`,
  borderRadius: "50%",
} as const;

const glowOrbCenterStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -60%)",
  width: 700,
  height: 500,
  background: `radial-gradient(ellipse, rgba(96,99,238,0.07) 0%, transparent 70%)`,
  borderRadius: "50%",
} as const;

const logoRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: 16,
  marginBottom: 40,
} as const;

const logoBadgeStyle = {
  width: 56,
  height: 56,
  borderRadius: 14,
  background: "rgba(96,99,238,0.15)",
  border: `1.5px solid rgba(96,99,238,0.5)`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 20,
  fontWeight: 900,
  color: BRAND,
  boxShadow: `0 0 24px rgba(96,99,238,0.3)`,
} as const;

const wordmarkContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
} as const;

const wordmarkTitleStyle = {
  fontSize: 24,
  fontWeight: 700,
  color: "rgba(255,255,255,0.92)",
  letterSpacing: "-0.02em",
} as const;

const wordmarkSubtitleStyle = {
  fontSize: 12,
  fontWeight: 500,
  color: "rgba(255,255,255,0.35)",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
} as const;

const headlineStyle = {
  fontSize: 78,
  fontWeight: 900,
  textAlign: "center",
  lineHeight: 1.05,
  letterSpacing: "-0.04em",
  maxWidth: 920,
  color: "#ffffff",
  marginBottom: 10,
} as const;

const headlineGradientStyle = {
  fontSize: 78,
  fontWeight: 900,
  textAlign: "center",
  lineHeight: 1.05,
  letterSpacing: "-0.04em",
  maxWidth: 920,
  background: `linear-gradient(135deg, ${BRAND} 0%, #818cf8 45%, ${BRAND_PURPLE} 100%)`,
  backgroundClip: "text",
  color: "transparent",
  marginBottom: 28,
} as const;

const subtitleStyle = {
  fontSize: 21,
  color: "rgba(255,255,255,0.48)",
  textAlign: "center",
  maxWidth: 700,
  lineHeight: 1.5,
  marginBottom: 44,
  letterSpacing: "-0.01em",
} as const;

const pillRowStyle = {
  display: "flex",
  gap: 10,
} as const;

const pillStyle = {
  background: "rgba(96,99,238,0.10)",
  border: "1px solid rgba(96,99,238,0.32)",
  borderRadius: 100,
  padding: "8px 20px",
  fontSize: 13,
  fontWeight: 600,
  color: "rgba(255,255,255,0.68)",
  letterSpacing: "0.04em",
} as const;

const footerStyle = {
  position: "absolute",
  bottom: 30,
  fontSize: 13,
  color: "rgba(255,255,255,0.2)",
  letterSpacing: "0.08em",
} as const;

export default async function Image() {
  return new ImageResponse(
    (
      <div style={containerStyle}>
        {/* ── Subtle grid overlay ───────────────────────────────────── */}
        <div style={gridOverlayStyle} />

        {/* ── Glow orb — top-left ──────────────────────────────────── */}
        <div style={glowOrbTopLeftStyle} />

        {/* ── Glow orb — bottom-right ──────────────────────────────── */}
        <div style={glowOrbBottomRightStyle} />

        {/* ── Glow orb — center subtle ─────────────────────────────── */}
        <div style={glowOrbCenterStyle} />

        {/* ── Logo row ─────────────────────────────────────────────── */}
        <div style={logoRowStyle}>
          {/* Brand logo badge */}
          <div style={logoBadgeStyle}>HW</div>

          {/* Brand wordmark */}
          <div style={wordmarkContainerStyle}>
            <span style={wordmarkTitleStyle}>HermesWorkspace</span>
            <span style={wordmarkSubtitleStyle}>
              School Management Platform
            </span>
          </div>
        </div>

        {/* ── Main headline ────────────────────────────────────────── */}
        <div style={headlineStyle}>Every school.</div>
        <div style={headlineGradientStyle}>One platform.</div>

        {/* ── Subtitle ─────────────────────────────────────────────── */}
        <div style={subtitleStyle}>
          Live classes · Messaging · Notices · Meetings · Analytics
        </div>

        {/* ── Feature pills ────────────────────────────────────────── */}
        <div style={pillRowStyle}>
          {["CBSE Ready", "ICSE Ready", "State Board", "India-First"].map(
            (tag) => (
              <div key={tag} style={pillStyle}>
                {tag}
              </div>
            )
          )}
        </div>

        {/* ── URL footer ───────────────────────────────────────────── */}
        <div style={footerStyle}>hermesworkspace.com</div>
      </div>
    ),
    { ...size }
  );
}
