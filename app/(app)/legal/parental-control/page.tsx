import { legalDocuments } from "@/lib/legal-documents";
import LegalDocPage from "@/components/legal/LegalDocPage";

const BASE_URL = "https://hermesworkspace.com";
const OG_IMAGE = `${BASE_URL}/opengraph-image?v=3`;
const SLUG = "parental-control";

export const metadata = {
  title: "Parental Control Guidance — HermesWorkspace",
  description: legalDocuments["parental-control"].intro[0],
  alternates: { canonical: `${BASE_URL}/legal/${SLUG}` },
  openGraph: {
    title: "Parental Control Guidance — HermesWorkspace",
    description: legalDocuments["parental-control"].intro[0],
    url: `${BASE_URL}/legal/${SLUG}`,
    siteName: "HermesWorkspace",
    locale: "en_IN",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "HermesWorkspace Parental Control" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@hermesworkspace",
    creator: "@hermesworkspace",
    title: "Parental Control Guidance — HermesWorkspace",
    description: legalDocuments["parental-control"].intro[0],
    images: [OG_IMAGE],
  },
};

export default function ParentalControlPage() {
  return <LegalDocPage document={legalDocuments["parental-control"]} />;
}
