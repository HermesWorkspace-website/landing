import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://hermesworkspace.com";

  return {
    rules: [
      // ── Standard search engine bots ────────────────────────────────────────
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },

      // ── AI training / crawling bots — explicitly allowed ──────────────────
      // Google AI (Gemini, SGE overviews)
      { userAgent: "Googlebot-Extended", allow: "/" },

      // OpenAI / ChatGPT
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },

      // Anthropic / Claude
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },

      // Perplexity
      { userAgent: "PerplexityBot", allow: "/" },

      // Meta AI
      { userAgent: "FacebookBot", allow: "/" },

      // Microsoft / Bing AI (Copilot)
      { userAgent: "Bingbot", allow: "/" },

      // Common Crawl (powers many LLM training sets)
      { userAgent: "CCBot", allow: "/" },

      // Cohere AI
      { userAgent: "cohere-ai", allow: "/" },

      // You.com
      { userAgent: "YouBot", allow: "/" },

      // Diffbot (knowledge graph)
      { userAgent: "Diffbot", allow: "/" },

      // Apple Intelligence / Applebot
      { userAgent: "Applebot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
