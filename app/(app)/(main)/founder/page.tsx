import type { Metadata } from "next";
import FounderClient from "./FounderClient";
import JsonLd from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Founders — Apurav Agarwal & Lakshya Kumar | HermesWorkspace",
  description:
    "Meet Apurav Agarwal (CEO) and Lakshya Kumar (CTO), the founders of HermesWorkspace. Two engineers building India's institutional communication infrastructure from Ranchi, Jharkhand.",
  alternates: {
    canonical: "https://hermesworkspace.com/founder",
  },
  openGraph: {
    title: "Founders — Apurav Agarwal & Lakshya Kumar | HermesWorkspace",
    description:
      "The story of two engineers building India's school infrastructure from Ranchi.",
    url: "https://hermesworkspace.com/founder",
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
