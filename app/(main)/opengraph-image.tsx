import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "HermesWorkspace — Every school. One platform.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BRAND = "#6063EE";
const BRAND_PURPLE = "#A855F7";
const BG = "#0B0C1E";

// Base URL: production domain or fallback to localhost in dev
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_URL ??
  "http://localhost:3000";

export default async function Image() {
  // Prefer local public/logo.png so it always matches the real logo
  const logoSrc = `${BASE_URL.startsWith("http") ? BASE_URL : `https://${BASE_URL}`}/logo.png`;
  
  // Attempt to load logo; gracefully fall back to text badge if it fails
  let logoData: string | null = null;
  try {
    const res = await fetch(logoSrc);
    if (res.ok) {
      const buf = await res.arrayBuffer();
      const b64 = Buffer.from(buf).toString("base64");
      const mime = res.headers.get("content-type") ?? "image/png";
      logoData = `data:${mime};base64,${b64}`;
    }
  } catch {
    // logo will be replaced by text badge fallback below
  }

  return new ImageResponse(
    (
      <div
        style={{
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
        }}
      >
        {/* ── Subtle grid overlay ───────────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(96,99,238,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(96,99,238,0.06) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* ── Glow orb — top-left ──────────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            top: -140,
            left: -100,
            width: 560,
            height: 440,
            background: `radial-gradient(ellipse, rgba(96,99,238,0.28) 0%, transparent 68%)`,
            borderRadius: "50%",
          }}
        />

        {/* ── Glow orb — bottom-right ──────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            bottom: -120,
            right: -80,
            width: 460,
            height: 380,
            background: `radial-gradient(ellipse, rgba(168,85,247,0.2) 0%, transparent 70%)`,
            borderRadius: "50%",
          }}
        />

        {/* ── Glow orb — center subtle ─────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -60%)",
            width: 700,
            height: 500,
            background: `radial-gradient(ellipse, rgba(96,99,238,0.07) 0%, transparent 70%)`,
            borderRadius: "50%",
          }}
        />

        {/* ── Logo row ─────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 40,
          }}
        >
          {/* Logo image or fallback badge */}
          {logoData ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoData}
              width={56}
              height={56}
              alt="HermesWorkspace logo"
              style={{
                borderRadius: 14,
                border: `1.5px solid rgba(96,99,238,0.5)`,
                boxShadow: `0 0 24px rgba(96,99,238,0.35)`,
              }}
            />
          ) : (
            <div
              style={{
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
              }}
            >
              HW
            </div>
          )}

          {/* Brand wordmark */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: "rgba(255,255,255,0.92)",
                letterSpacing: "-0.02em",
              }}
            >
              HermesWorkspace
            </span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              School Management Platform
            </span>
          </div>
        </div>

        {/* ── Main headline ────────────────────────────────────────── */}
        <div
          style={{
            fontSize: 78,
            fontWeight: 900,
            textAlign: "center",
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            maxWidth: 920,
            color: "#ffffff",
            marginBottom: 10,
          }}
        >
          Every school.
        </div>
        <div
          style={{
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
          }}
        >
          One platform.
        </div>

        {/* ── Subtitle ─────────────────────────────────────────────── */}
        <div
          style={{
            fontSize: 21,
            color: "rgba(255,255,255,0.48)",
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.5,
            marginBottom: 44,
            letterSpacing: "-0.01em",
          }}
        >
          Live classes · Messaging · Notices · Meetings · Analytics
        </div>

        {/* ── Feature pills ────────────────────────────────────────── */}
        <div style={{ display: "flex", gap: 10 }}>
          {["CBSE Ready", "ICSE Ready", "State Board", "India-First"].map((tag) => (
            <div
              key={tag}
              style={{
                background: "rgba(96,99,238,0.10)",
                border: "1px solid rgba(96,99,238,0.32)",
                borderRadius: 100,
                padding: "8px 20px",
                fontSize: 13,
                fontWeight: 600,
                color: "rgba(255,255,255,0.68)",
                letterSpacing: "0.04em",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* ── URL footer ───────────────────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            fontSize: 13,
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.08em",
          }}
        >
          hermesworkspace.com
        </div>
      </div>
    ),
    { ...size }
  );
}
