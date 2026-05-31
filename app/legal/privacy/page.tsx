import { legalDocuments } from "@/lib/legal-documents";
import LegalDocPage from "@/components/legal/LegalDocPage";

export const metadata = {
  title: "Privacy Policy — HermesWorkspace",
  description: legalDocuments.privacy.intro[0],
};

export default function PrivacyPage() {
  return <LegalDocPage document={legalDocuments.privacy} />;
}
