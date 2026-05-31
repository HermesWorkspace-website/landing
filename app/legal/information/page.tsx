import { legalDocuments } from "@/lib/legal-documents";
import LegalDocPage from "@/components/legal/LegalDocPage";

export const metadata = {
  title: "Service Information — HermesWorkspace",
  description: legalDocuments.information.intro[0],
};

export default function InformationPage() {
  return <LegalDocPage document={legalDocuments.information} />;
}
