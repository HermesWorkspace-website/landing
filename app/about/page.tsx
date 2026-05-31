import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import JsonLd from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "About HermesWorkspace — Building India's School Infrastructure",
  description:
    "Learn how HermesWorkspace was built to solve the communication chaos in Indian schools. Our story, our mission, and the team building the future of institutional infrastructure.",
  alternates: {
    canonical: "https://hermesworkspace.com/about",
  },
  openGraph: {
    title: "About HermesWorkspace — Building India's School Infrastructure",
    description:
      "Our story, mission, philosophy, and the team behind HermesWorkspace — the platform replacing WhatsApp groups in Indian schools.",
    url: "https://hermesworkspace.com/about",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://hermesworkspace.com" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://hermesworkspace.com/about" },
  ],
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://hermesworkspace.com/about#page",
  url: "https://hermesworkspace.com/about",
  name: "About HermesWorkspace",
  description:
    "HermesWorkspace was founded in Ranchi, Jharkhand to replace the fragmented WhatsApp-based communication in Indian schools with a structured, institutional-grade platform.",
  publisher: { "@id": "https://hermesworkspace.com/#organization" },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema, aboutPageSchema]} />
      <AboutClient />
    </>
  );
}
