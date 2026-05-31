import { legalDocuments } from "@/lib/legal-documents";
import LegalDocPage from "@/components/legal/LegalDocPage";

export const metadata = {
  title: "Data Deletion — HermesWorkspace",
  description: legalDocuments["data-deletion"].intro[0],
};

export default function DataDeletionPage() {
  return <LegalDocPage document={legalDocuments["data-deletion"]} />;
}
