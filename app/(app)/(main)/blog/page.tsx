import type { Metadata } from "next";
import Blogs from '@/components/blogs/blogs';

export const revalidate = 60;

const BASE_URL = "https://hermesworkspace.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Blog — Ideas & Infrastructure | HermesWorkspace",
  description:
    "Insights on school operations, educational technology, academic management, parent engagement, and digital infrastructure for modern Indian schools.",
  alternates: { canonical: `${BASE_URL}/blog` },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/blog`,
    siteName: "HermesWorkspace",
    title: "Blog — Ideas & Infrastructure | HermesWorkspace",
    description:
      "Insights on school operations, educational technology, academic management, parent engagement, and digital infrastructure for modern Indian schools.",
    locale: "en_IN",
    images: [{ url: `${BASE_URL}/opengraph-image?v=3`, width: 1200, height: 630, alt: "HermesWorkspace Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@hermesworkspace",
    creator: "@hermesworkspace",
    title: "Blog — Ideas & Infrastructure | HermesWorkspace",
    description:
      "Insights on school operations, educational technology, academic management, parent engagement, and digital infrastructure for modern Indian schools.",
    images: [`${BASE_URL}/opengraph-image?v=3`],
  },
  robots: { index: true, follow: true },
};

type BlogSearchParams = {
  category?: string;
  search?: string;
  tag?: string;
};

export default function BlogPage({
  searchParams,
}: {
  searchParams: Promise<BlogSearchParams>;
}) {
  return <Blogs searchParams={searchParams} />;
}
