import SmoothScroll from "@/components/shared/SmoothScroll";
import ScrollOnNavigate from "@/components/shared/ScrollOnNavigate";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { WithLoader } from "@/components/LoadingScreen/useLoader";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",

    name: "HermesWorkspace",
    url: "https://www.hermesworkspace.com",

    logo: "https://www.hermesworkspace.com/logo.png",

    description:
      "Communication and management platform for educational institutions.",

    sameAs: [
      "https://x.com/hermesworkspace",
      "https://www.linkedin.com/company/hermesworkspace",
    ],
  };

  return (
    <WithLoader>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <Navbar />

      <SmoothScroll>
        <ScrollOnNavigate />
        {children}
      </SmoothScroll>

      <Footer />
    </WithLoader>
  );
}