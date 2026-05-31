import type { Metadata } from "next";
import "./globals.css";
import JsonLd from "@/components/shared/JsonLd";
import { Geist, Bebas_Neue, Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-body" });
const cormorant = Cormorant_Garamond({ weight: ["300", "400", "600"], subsets: ["latin"], variable: "--font-serif" });

const BASE_URL = "https://hermesworkspace.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "HermesWorkspace — Every school. One platform.",
    template: "%s | HermesWorkspace",
  },
  description:
    "HermesWorkspace is the all-in-one school management and communication platform built for India's CBSE, ICSE, and State Board schools. Live classes, messaging, notices, meetings, assignments, and analytics — all in one place.",
  keywords: [
    "school management system", "school communication platform", "CBSE school app",
    "ICSE school software", "India school platform", "online classes for schools",
    "school messaging app", "educational institution platform", "school ERP India",
    "HermesWorkspace", "school notice board app", "parent teacher communication", "school admin software",
  ],
  alternates: { canonical: BASE_URL, languages: { "en-IN": BASE_URL } },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website", locale: "en_IN", url: BASE_URL, siteName: "HermesWorkspace",
    title: "HermesWorkspace — Every school. One platform.",
    description: "India's unified school platform for communication, live classes, meetings, notices, and academic coordination.",
    images: [{ url: `${BASE_URL}/opengraph-image`, width: 1200, height: 630, alt: "HermesWorkspace — Every school. One platform." }],
  },
  twitter: {
    card: "summary_large_image", site: "@hermesworkspace", creator: "@hermesworkspace",
    title: "HermesWorkspace — Every school. One platform.",
    description: "India's all-in-one school platform: live classes, messaging, notices, meetings & more.",
    images: [`${BASE_URL}/opengraph-image`],
  },
  applicationName: "HermesWorkspace",
  appleWebApp: { capable: true, title: "HermesWorkspace", statusBarStyle: "default" },
  category: "EdTech",
  creator: "HermesWorkspace",
  publisher: "HermesWorkspace Pvt. Ltd.",
};

const organizationSchema = {
  "@context": "https://schema.org", "@type": "Organization", "@id": `${BASE_URL}/#organization`,
  name: "HermesWorkspace", legalName: "HermesWorkspace Pvt. Ltd.", url: BASE_URL,
  logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.png`, width: 512, height: 512 },
  description: "HermesWorkspace is the all-in-one school management and communication platform built for India's educational institutions.",
  foundingDate: "2024",
  foundingLocation: { "@type": "Place", addressLocality: "Ranchi", addressRegion: "Jharkhand", addressCountry: "IN" },
  address: { "@type": "PostalAddress", addressLocality: "Ranchi", addressRegion: "Jharkhand", addressCountry: "IN" },
  contactPoint: [
    { "@type": "ContactPoint", contactType: "customer support", email: "support@hermesworkspace.com", availableLanguage: ["English", "Hindi"] },
    { "@type": "ContactPoint", contactType: "sales", email: "connect@hermesworkspace.com" },
  ],
  sameAs: ["https://linkedin.com/company/hermesworkspace", "https://twitter.com/hermesworkspace", "https://instagram.com/hermesworkspace"],
};

const websiteSchema = {
  "@context": "https://schema.org", "@type": "WebSite", "@id": `${BASE_URL}/#website`,
  url: BASE_URL, name: "HermesWorkspace",
  description: "Every school. One platform. India's unified school communication and management platform.",
  publisher: { "@id": `${BASE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
  inLanguage: "en-IN",
};

const softwareApplicationSchema = {
  "@context": "https://schema.org", "@type": "SoftwareApplication", "@id": `${BASE_URL}/#software`,
  name: "HermesWorkspace", applicationCategory: "EducationApplication",
  applicationSubCategory: "School Management System", operatingSystem: "Web, Android, iOS", url: BASE_URL,
  description: "All-in-one school management and communication platform for CBSE, ICSE, and State Board schools in India.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR", description: "Free demo available for qualifying institutions." },
  publisher: { "@id": `${BASE_URL}/#organization` },
  featureList: ["Live HD video classes", "Institutional messaging and channels", "Digital notice board with delivery tracking", "Parent-teacher communication", "Meeting and webinar scheduler", "Role-based access control", "School-wide analytics dashboard", "CBSE/ICSE/State Board compatible"],
  screenshot: `${BASE_URL}/opengraph-image`,
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "47", bestRating: "5" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={cn("font-sans", geist.variable, bebas.variable, plusJakartaSans.variable, cormorant.variable)}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          href="https://ik.imagekit.io/hermesworkspace/Landing/fonts/SFPRODISPLAYREGULAR.woff2"
          as="font" type="font/woff2" crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased font-body" suppressHydrationWarning>
        <JsonLd data={[organizationSchema, websiteSchema, softwareApplicationSchema]} />
        {children}
      </body>
    </html>
  );
}