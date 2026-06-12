import { legalDocuments } from "@/lib/legal-documents";
import LegalDocPage from "@/components/legal/LegalDocPage";

const BASE_URL = "https://hermesworkspace.com";
const OG_IMAGE = `${BASE_URL}/opengraph-image?v=3`;
const SLUG = "information";

export const metadata = {
  title: "Information Collection Notice — HermesWorkspace",
  description: legalDocuments.information.intro[0],
  alternates: { canonical: `${BASE_URL}/legal/${SLUG}` },
  openGraph: {
    title: "Information Collection Notice — HermesWorkspace",
    description: legalDocuments.information.intro[0],
    url: `${BASE_URL}/legal/${SLUG}`,
    siteName: "HermesWorkspace",
    locale: "en_IN",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "HermesWorkspace Information Notice" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@hermesworkspace",
    creator: "@hermesworkspace",
    title: "Information Collection Notice — HermesWorkspace",
    description: legalDocuments.information.intro[0],
    images: [OG_IMAGE],
  },
};

export default function InformationPage() {
  return <LegalDocPage document={legalDocuments.information} />;
}
