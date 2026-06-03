import type { Metadata } from "next";
import ProductClient from "./ProductClient";
import JsonLd from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Product — School Communication & Management Platform",
  description:
    "Explore HermesWorkspace's full product: HD live classes, institutional messaging, digital notice board, meeting scheduler, parent communication, and school analytics — all in one platform built for Indian schools.",
  alternates: {
    canonical: "https://hermesworkspace.com/product",
  },
  openGraph: {
    title: "HermesWorkspace Product — The Complete School Platform",
    description:
      "Live HD classes, messaging, notices, meetings, and analytics built for CBSE, ICSE, and State Board schools in India.",
    url: "https://hermesworkspace.com/product",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://hermesworkspace.com" },
    { "@type": "ListItem", position: 2, name: "Product", item: "https://hermesworkspace.com/product" },
  ],
};

const productFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What features does HermesWorkspace include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HermesWorkspace includes HD live video classes, institutional messaging with role-based channels, digital notice board with delivery tracking, meeting and webinar scheduler, parent-teacher communication, member management for students and teachers, real-time activity feed, and school-wide analytics.",
      },
    },
    {
      "@type": "Question",
      name: "Is HermesWorkspace available on mobile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. HermesWorkspace works on web browsers, Android, and iOS devices, so administrators, teachers, students, and parents can all stay connected from any device.",
      },
    },
    {
      "@type": "Question",
      name: "How many concurrent classes can HermesWorkspace support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HermesWorkspace supports concurrent live class sessions, with up to 150 students per session, in HD quality.",
      },
    },
    {
      "@type": "Question",
      name: "Does HermesWorkspace replace WhatsApp groups?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. HermesWorkspace is specifically designed to replace scattered WhatsApp groups with structured, role-based institutional channels for notices, class discussions, staff coordination, and parent-teacher communication.",
      },
    },
  ],
};

export default function ProductPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema, productFaqSchema]} />
      <ProductClient />
    </>
  );
}
