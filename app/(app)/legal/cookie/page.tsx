import { legalDocuments } from "@/lib/legal-documents";
import LegalDocPage from "@/components/legal/LegalDocPage";

const BASE_URL = "https://hermesworkspace.com";
const OG_IMAGE = `${BASE_URL}/opengraph-image?v=3`;
const SLUG = "cookie";

export const metadata = {
  title: "Cookie Policy — HermesWorkspace",
  description: legalDocuments.cookie.intro[0],
  alternates: { canonical: `${BASE_URL}/legal/${SLUG}` },
  openGraph: {
    title: "Cookie Policy — HermesWorkspace",
    description: legalDocuments.cookie.intro[0],
    url: `${BASE_URL}/legal/${SLUG}`,
    siteName: "HermesWorkspace",
    locale: "en_IN",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "HermesWorkspace Cookie Policy" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@hermesworkspace",
    creator: "@hermesworkspace",
    title: "Cookie Policy — HermesWorkspace",
    description: legalDocuments.cookie.intro[0],
    images: [OG_IMAGE],
  },
};

export const dynamic = 'force-static';

export default function CookiePage() {
  return <LegalDocPage document={legalDocuments.cookie} />;
}
