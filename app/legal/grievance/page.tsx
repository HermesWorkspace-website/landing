import { legalDocuments } from "@/lib/legal-documents";
import LegalDocPage from "@/components/legal/LegalDocPage";

export const metadata = {
  title: "Grievance Officer — HermesWorkspace",
  description: legalDocuments.grievance.intro[0],
};

export default function GrievancePage() {
  return <LegalDocPage document={legalDocuments.grievance} />;
}
