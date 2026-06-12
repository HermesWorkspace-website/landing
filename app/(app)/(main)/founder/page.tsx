import type { Metadata } from "next";
import FounderClient from "./FounderClient";
import JsonLd from "@/components/shared/JsonLd";

const BASE_URL = "https://hermesworkspace.com";
const OG_IMAGE = `${BASE_URL}/opengraph-image?v=3`;

export const metadata: Metadata = {
  title: "Founders — Apurav Agarwal & Lakshya Kumar | HermesWorkspace",
  description:
    "Meet Apurav Agarwal (CEO) and Lakshya Kumar (CTO), the founders of HermesWorkspace. Two engineers building India's institutional communication infrastructure from Ranchi, Jharkhand.",
  alternates: {
    canonical: `${BASE_URL}/founder`,
  },
  openGraph: {
    title: "Founders — Apurav Agarwal & Lakshya Kumar | HermesWorkspace",
    description:
      "The story of two engineers building India's school infrastructure from Ranchi.",
    url: `${BASE_URL}/founder`,
    siteName: "HermesWorkspace",
    locale: "en_IN",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "HermesWorkspace Founders" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@hermesworkspace",
    creator: "@hermesworkspace",
    title: "Founders — Apurav Agarwal & Lakshya Kumar | HermesWorkspace",
    description:
      "The story of two engineers building India's school infrastructure from Ranchi.",
    images: [OG_IMAGE],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://hermesworkspace.com" },
    { "@type": "ListItem", position: 2, name: "Founders", item: "https://hermesworkspace.com/founder" },
  ],
};

const foundersSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "HermesWorkspace Founders",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Person",
        "@id": "https://hermesworkspace.com/founder#apurav-agarwal",
        name: "Apurav Agarwal",
        jobTitle: "Co-Founder & CEO",
        description:
          "Leads HermesWorkspace's institutional strategy, partnerships, operational growth, and platform direction.",
        worksFor: { "@id": "https://hermesworkspace.com/#organization" },
        sameAs: ["https://linkedin.com/in/apurav-agarwal"],
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Person",
        "@id": "https://hermesworkspace.com/founder#lakshya-kumar",
        name: "Lakshya Kumar",
        jobTitle: "Co-Founder, Director & CTO",
        description:
          "Architects HermesWorkspace's backend infrastructure, real-time communication systems, and platform scalability.",
        worksFor: { "@id": "https://hermesworkspace.com/#organization" },
        sameAs: ["https://linkedin.com/in/lakshya-kumar"],
      },
    },
  ],
};

export default function FounderPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema, foundersSchema]} />
      <FounderClient />
    </>
  );
}
