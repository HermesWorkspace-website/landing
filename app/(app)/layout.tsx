import JsonLd from "@/components/shared/JsonLd";

const BASE_URL = "https://hermesworkspace.com";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",

  "@id": `${BASE_URL}/#organization`,

  name: "HermesWorkspace",

  legalName: "HermesWorkspace Pvt. Ltd.",

  url: BASE_URL,

  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/logo.png`,
    width: 512,
    height: 512,
  },

  image: `${BASE_URL}/opengraph-image?v=3`,

  description:
    "HermesWorkspace is a unified communication and management platform for educational institutions.",

  foundingDate: "2024",

  sameAs: [
    "https://linkedin.com/company/hermesworkspace",
    "https://twitter.com/hermesworkspace",
    "https://instagram.com/hermesworkspace",
  ],

  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@hermesworkspace.com",
      availableLanguage: ["English", "Hindi"],
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org", "@type": "WebSite", "@id": `${BASE_URL}/#website`,
  url: BASE_URL, name: "HermesWorkspace",
  description: "Every school. One platform. India's unified school communication and management platform.",
  publisher: { "@id": `${BASE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
  inLanguage: "en-IN",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[organizationSchema, websiteSchema]} />
      {children}
    </>
  );
}
