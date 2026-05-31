import { legalDocuments } from "@/lib/legal-documents";
import LegalDocPage from "@/components/legal/LegalDocPage";

export const metadata = {
  title: "Data Processing Addendum — HermesWorkspace",
  description: legalDocuments.dpa.intro[0],
};

export default function DpaPage() {
  return <LegalDocPage document={legalDocuments.dpa} />;
}
