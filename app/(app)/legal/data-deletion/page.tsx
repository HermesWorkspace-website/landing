import { legalDocuments } from "@/lib/legal-documents";
import LegalDocPage from "@/components/legal/LegalDocPage";

const BASE_URL = "https://hermesworkspace.com";
const OG_IMAGE = `${BASE_URL}/opengraph-image?v=3`;
const SLUG = "data-deletion";

export const metadata = {
  title: "Data Deletion Policy — HermesWorkspace",
  description: legalDocuments["data-deletion"].intro[0],
  alternates: { canonical: `${BASE_URL}/legal/${SLUG}` },
  openGraph: {
    title: "Data Deletion Policy — HermesWorkspace",
    description: legalDocuments["data-deletion"].intro[0],
    url: `${BASE_URL}/legal/${SLUG}`,
    siteName: "HermesWorkspace",
    locale: "en_IN",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "HermesWorkspace Data Deletion Policy" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@hermesworkspace",
    creator: "@hermesworkspace",
    title: "Data Deletion Policy — HermesWorkspace",
    description: legalDocuments["data-deletion"].intro[0],
    images: [OG_IMAGE],
  },
};

export const dynamic = 'force-static';

export default function DataDeletionPage() {
  return <LegalDocPage document={legalDocuments["data-deletion"]} />;
}
