import type { Metadata } from "next";
import SocialsClient from "./SocialsClient";
import JsonLd from "@/components/shared/JsonLd";

const BASE_URL = "https://hermesworkspace.com";
const OG_IMAGE = `${BASE_URL}/opengraph-image?v=3`;

export const metadata: Metadata = {
  title: "Community & Trust — HermesWorkspace School Network",
  description:
    "See how educational institutions across India are using HermesWorkspace to modernize school communication, reduce WhatsApp dependency, and streamline academic coordination.",
  alternates: {
    canonical: `${BASE_URL}/socials`,
  },
  openGraph: {
    title: "HermesWorkspace Community — Schools Across India",
    description:
      "How Indian schools are replacing scattered communication tools with HermesWorkspace.",
    url: `${BASE_URL}/socials`,
    siteName: "HermesWorkspace",
    locale: "en_IN",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "HermesWorkspace Community" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@hermesworkspace",
    creator: "@hermesworkspace",
    title: "HermesWorkspace Community — Schools Across India",
    description:
      "How Indian schools are replacing scattered communication tools with HermesWorkspace.",
    images: [OG_IMAGE],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://hermesworkspace.com" },
    { "@type": "ListItem", position: 2, name: "Community", item: "https://hermesworkspace.com/socials" },
  ],
};

export const revalidate = 3600;

export default function SocialsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <SocialsClient />
    </>
  );
}
