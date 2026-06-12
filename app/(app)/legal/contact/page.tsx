import { legalDocuments } from "@/lib/legal-documents";
import LegalDocPage from "@/components/legal/LegalDocPage";

const BASE_URL = "https://hermesworkspace.com";
const OG_IMAGE = `${BASE_URL}/opengraph-image?v=3`;
const SLUG = "contact";

export const metadata = {
  title: "Legal Contact — HermesWorkspace",
  description: legalDocuments.contact.intro[0],
  alternates: { canonical: `${BASE_URL}/legal/${SLUG}` },
  openGraph: {
    title: "Legal Contact — HermesWorkspace",
    description: legalDocuments.contact.intro[0],
    url: `${BASE_URL}/legal/${SLUG}`,
    siteName: "HermesWorkspace",
    locale: "en_IN",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "HermesWorkspace Legal Contact" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@hermesworkspace",
    creator: "@hermesworkspace",
    title: "Legal Contact — HermesWorkspace",
    description: legalDocuments.contact.intro[0],
    images: [OG_IMAGE],
  },
};

export default function LegalContactPage() {
  return <LegalDocPage document={legalDocuments.contact} />;
}
