import { legalDocuments } from "@/lib/legal-documents";
import LegalDocPage from "@/components/legal/LegalDocPage";

export const metadata = {
  title: "Legal Contact — HermesWorkspace",
  description: legalDocuments.contact.intro[0],
};

export default function LegalContactPage() {
  return <LegalDocPage document={legalDocuments.contact} />;
}
