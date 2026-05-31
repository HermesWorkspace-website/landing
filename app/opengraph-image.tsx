import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "HermesWorkspace — Every school. One platform.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0d0e1c 0%, #1a1d3a 50%, #0d0e1c 100%)",
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
        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(96,99,238,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(96,99,238,0.08) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glow orb top-left */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -80,
            width: 500,
            height: 400,
            background: "radial-gradient(ellipse, rgba(96,99,238,0.25) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Glow orb bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -60,
            width: 400,
            height: 350,
            background: "radial-gradient(ellipse, rgba(168,85,247,0.18) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Logo badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "rgba(96,99,238,0.15)",
              border: "1px solid rgba(96,99,238,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 900,
              color: "#6063EE",
            }}
          >
            HW
          </div>
          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "rgba(255,255,255,0.9)",
              letterSpacing: "-0.01em",
            }}
          >
            HermesWorkspace
          </span>
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            textAlign: "center",
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            maxWidth: 900,
            color: "#ffffff",
            marginBottom: 24,
          }}
        >
          Every school.{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #6063EE 0%, #818cf8 50%, #a78bfa 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            One platform.
          </span>
        </div>

        {/* Sub */}
        <div
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.55)",
            textAlign: "center",
            maxWidth: 680,
            lineHeight: 1.5,
            marginBottom: 48,
          }}
        >
          Communication, live classes, notices, meetings, and academic coordination
          — built for Indian schools.
        </div>

        {/* Pills */}
        <div style={{ display: "flex", gap: 12 }}>
          {["CBSE Ready", "ICSE Ready", "State Board Ready", "India-First"].map((tag) => (
            <div
              key={tag}
              style={{
                background: "rgba(96,99,238,0.12)",
                border: "1px solid rgba(96,99,238,0.3)",
                borderRadius: 100,
                padding: "8px 18px",
                fontSize: 13,
                fontWeight: 600,
                color: "rgba(255,255,255,0.7)",
                letterSpacing: "0.03em",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* URL footer */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            fontSize: 14,
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.05em",
          }}
        >
          hermesworkspace.com
        </div>
      </div>
    ),
    { ...size }
  );
}
