import { legalDocuments } from "@/lib/legal-documents";
import LegalDocPage from "@/components/legal/LegalDocPage";

const BASE_URL = "https://hermesworkspace.com";
const OG_IMAGE = `${BASE_URL}/opengraph-image?v=3`;
const SLUG = "aup";

export const metadata = {
  title: "Acceptable Use Policy — HermesWorkspace",
  description: legalDocuments.aup.intro[0],
  alternates: { canonical: `${BASE_URL}/legal/${SLUG}` },
  openGraph: {
    title: "Acceptable Use Policy — HermesWorkspace",
    description: legalDocuments.aup.intro[0],
    url: `${BASE_URL}/legal/${SLUG}`,
    siteName: "HermesWorkspace",
    locale: "en_IN",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "HermesWorkspace Acceptable Use Policy" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@hermesworkspace",
    creator: "@hermesworkspace",
    title: "Acceptable Use Policy — HermesWorkspace",
    description: legalDocuments.aup.intro[0],
    images: [OG_IMAGE],
  },
};

export default function AupPage() {
  return <LegalDocPage document={legalDocuments.aup} />;
}
