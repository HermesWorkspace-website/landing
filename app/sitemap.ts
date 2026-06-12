import { MetadataRoute } from "next";
import { getPayloadClient } from "@/lib/payload";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://hermesworkspace.com";
  const now = new Date();

  // ── Static pages ──
  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/product`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/founder`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/socials`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/legal`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/legal/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/legal/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/legal/dpa`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/legal/information`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/legal/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/legal/data-deletion`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/legal/parental-control`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/legal/aup`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/legal/grievance`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/legal/cookie`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  // ── Blog posts ──
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "posts",
      where: { status: { equals: "published" } },
      limit: 200,
      depth: 0,
    });
    blogPages = docs.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // If Payload is unavailable, sitemap still returns static pages
  }

  return [...staticPages, ...blogPages];
}
