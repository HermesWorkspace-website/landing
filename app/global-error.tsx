"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en-IN">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FAFAFA",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: 420,
          }}
        >
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 32,
              textDecoration: "none",
              color: "inherit",
            }}
            aria-label="HermesWorkspace home"
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                overflow: "hidden",
                background: "#161922",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <img
                src="/logo.png"
                alt="HermesWorkspace logo"
                width={56}
                height={56}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <span
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 22,
                letterSpacing: "-0.02em",
                color: "#161922",
              }}
            >
              HermesWorkspace
            </span>
          </a>

          <h1
            style={{
              fontSize: 48,
              lineHeight: 1,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#161922",
              margin: "0 0 8px",
            }}
          >
            Something went wrong
          </h1>

          <p
            style={{
              fontSize: 15,
              lineHeight: 1.6,
              color: "#62666D",
              margin: "0 0 36px",
            }}
          >
            An unexpected error occurred. Our team has been notified.
            Please try again or contact support if the issue persists.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              onClick={reset}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                height: 44,
                padding: "0 24px",
                borderRadius: 12,
                border: "none",
                background: "#6063EE",
                color: "#fff",
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "inherit",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(96,99,238,0.3)",
              }}
            >
              Try Again
            </button>

            <a
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                height: 44,
                padding: "0 24px",
                borderRadius: 12,
                border: "1.5px solid #D0D6E0",
                color: "#161922",
                fontSize: 13,
                fontWeight: 600,
                fontFamily: "inherit",
                textDecoration: "none",
              }}
            >
              Contact Support
            </a>
          </div>

          <p
            style={{
              marginTop: 64,
              fontSize: 11,
              color: "#A0A5B0",
              letterSpacing: "0.03em",
            }}
          >
            HermesWorkspace &middot; Every school. One platform.
          </p>
        </div>
      </body>
    </html>
  );
}
