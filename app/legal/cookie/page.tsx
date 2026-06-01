import { legalDocuments } from "@/lib/legal-documents";
import LegalDocPage from "@/components/legal/LegalDocPage";

export const metadata = {
  title: "Cookie Policy — HermesWorkspace",
  description: legalDocuments.cookie.intro[0],
};

export default function CookiePage() {
  return <LegalDocPage document={legalDocuments.cookie} />;
}
