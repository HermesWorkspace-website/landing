import { legalDocuments } from "@/lib/legal-documents";
import LegalDocPage from "@/components/legal/LegalDocPage";

const BASE_URL = "https://hermesworkspace.com";
const OG_IMAGE = `${BASE_URL}/opengraph-image?v=3`;
const SLUG = "grievance";

export const metadata = {
  title: "Grievance Officer — HermesWorkspace",
  description: legalDocuments.grievance.intro[0],
  alternates: { canonical: `${BASE_URL}/legal/${SLUG}` },
  openGraph: {
    title: "Grievance Officer — HermesWorkspace",
    description: legalDocuments.grievance.intro[0],
    url: `${BASE_URL}/legal/${SLUG}`,
    siteName: "HermesWorkspace",
    locale: "en_IN",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "HermesWorkspace Grievance Officer" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@hermesworkspace",
    creator: "@hermesworkspace",
    title: "Grievance Officer — HermesWorkspace",
    description: legalDocuments.grievance.intro[0],
    images: [OG_IMAGE],
  },
};

export default function GrievancePage() {
  return <LegalDocPage document={legalDocuments.grievance} />;
}
