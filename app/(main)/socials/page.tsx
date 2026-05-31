import type { Metadata } from "next";
import SocialsClient from "./SocialsClient";
import JsonLd from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Community & Trust — HermesWorkspace School Network",
  description:
    "See how educational institutions across India are using HermesWorkspace to modernize school communication, reduce WhatsApp dependency, and streamline academic coordination.",
  alternates: {
    canonical: "https://hermesworkspace.com/socials",
  },
  openGraph: {
    title: "HermesWorkspace Community — Schools Across India",
    description:
      "How Indian schools are replacing scattered communication tools with HermesWorkspace.",
    url: "https://hermesworkspace.com/socials",
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

export default function SocialsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <SocialsClient />
    </>
  );
}
