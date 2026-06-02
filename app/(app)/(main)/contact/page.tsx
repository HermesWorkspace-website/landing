import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import JsonLd from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Contact HermesWorkspace — Request a School Demo",
  description:
    "Get in touch with HermesWorkspace to schedule a live platform demo, discuss institutional onboarding, or ask about partnerships. We respond within one business day.",
  alternates: {
    canonical: "https://hermesworkspace.com/contact",
  },
  openGraph: {
    title: "Contact HermesWorkspace — Request a School Demo",
    description:
      "Schedule a live demo or submit an institutional inquiry. We respond within one business day.",
    url: "https://hermesworkspace.com/contact",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://hermesworkspace.com" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://hermesworkspace.com/contact" },
  ],
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: "https://hermesworkspace.com/contact",
  name: "Contact HermesWorkspace",
  description: "Submit an institutional inquiry or request a live product demo.",
  publisher: { "@id": "https://hermesworkspace.com/#organization" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How can schools get started with HermesWorkspace?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Schools can contact the HermesWorkspace team through the inquiry form to discuss onboarding, platform setup, and operational requirements. We respond to all institutional inquiries within one business day.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a free demo available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. HermesWorkspace offers guided product walkthroughs and live platform demonstrations for qualifying educational institutions. Request a demo through the contact form.",
      },
    },
    {
      "@type": "Question",
      name: "How quickly does HermesWorkspace respond to inquiries?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We provide an initial response to all institutional inquiries within 2 academic hours, with full resolution typically within one business day.",
      },
    },
    {
      "@type": "Question",
      name: "What types of schools can use HermesWorkspace?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HermesWorkspace is designed for CBSE, ICSE, and State Board schools across India. Both private and government-affiliated institutions can onboard.",
      },
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema, contactPageSchema, faqSchema]} />
      <ContactClient />
    </>
  );
}
