import { legalDocuments } from "@/lib/legal-documents";
import LegalDocPage from "@/components/legal/LegalDocPage";

export const metadata = {
  title: "Parental Control Policy — HermesWorkspace",
  description: legalDocuments["parental-control"].intro[0],
};

export default function ParentalControlPage() {
  return <LegalDocPage document={legalDocuments["parental-control"]} />;
}
