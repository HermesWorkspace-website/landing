import { legalDocuments } from "@/lib/legal-documents";
import LegalDocPage from "@/components/legal/LegalDocPage";

export const metadata = {
  title: "Acceptable Use Policy — HermesWorkspace",
  description: legalDocuments.aup.intro[0],
};

export default function AupPage() {
  return <LegalDocPage document={legalDocuments.aup} />;
}
