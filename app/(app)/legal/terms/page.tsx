import { legalDocuments } from "@/lib/legal-documents";
import LegalDocPage from "@/components/legal/LegalDocPage";

export const metadata = {
  title: "Terms of Service — HermesWorkspace",
  description: legalDocuments.terms.intro[0],
};

export default function TermsPage() {
  return <LegalDocPage document={legalDocuments.terms} />;
}
