import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#FAFAFA",
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "0 24px",
        margin: 0,
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
        <Link
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
        </Link>

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
          Page not found
        </h1>

        <p
          style={{
            fontSize: 15,
            lineHeight: 1.6,
            color: "#62666D",
            margin: "0 0 36px",
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
          }}
        >
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              height: 44,
              padding: "0 24px",
              borderRadius: 12,
              background: "#6063EE",
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              fontFamily: "inherit",
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(96,99,238,0.3)",
            }}
          >
            Go Home
          </Link>

          <Link
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
          </Link>
        </div>
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
    </main>
  );
}
