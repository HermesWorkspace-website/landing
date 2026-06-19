import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://hermesworkspace.com";

  // Block all non-production environments
  if (process.env.NODE_ENV !== "production") {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: [
      // ── Standard search engine bots ────────────────────────────────────────
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },

      // ── AI training / crawling bots — explicitly allowed ──────────────────
      { userAgent: "Googlebot-Extended", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "Applebot", allow: "/" },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
