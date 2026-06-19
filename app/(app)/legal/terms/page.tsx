import { legalDocuments } from "@/lib/legal-documents";
import LegalDocPage from "@/components/legal/LegalDocPage";

const BASE_URL = "https://hermesworkspace.com";
const OG_IMAGE = `${BASE_URL}/opengraph-image?v=3`;
const SLUG = "terms";

export const metadata = {
  title: "Terms of Service — HermesWorkspace",
  description: legalDocuments.terms.intro[0],
  alternates: { canonical: `${BASE_URL}/legal/${SLUG}` },
  openGraph: {
    title: "Terms of Service — HermesWorkspace",
    description: legalDocuments.terms.intro[0],
    url: `${BASE_URL}/legal/${SLUG}`,
    siteName: "HermesWorkspace",
    locale: "en_IN",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "HermesWorkspace Terms of Service" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@hermesworkspace",
    creator: "@hermesworkspace",
    title: "Terms of Service — HermesWorkspace",
    description: legalDocuments.terms.intro[0],
    images: [OG_IMAGE],
  },
};

export const dynamic = 'force-static';

export default function TermsPage() {
  return <LegalDocPage document={legalDocuments.terms} />;
}
