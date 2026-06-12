import type { Metadata, Viewport } from "next";
import "./(app)/globals.css";
import { DM_Sans, Inter } from "next/font/google";
import { cn } from "@/lib/utils";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const BASE_URL = "https://hermesworkspace.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "HermesWorkspace - Every school. One platform.",
    template: "%s | HermesWorkspace",
  },
  description:
    "HermesWorkspace is the all-in-one school management and communication platform built for India's CBSE, ICSE, and State Board schools. Live classes, messaging, notices, meetings, assignments, and analytics — all in one place.",
  keywords: [
    "school management system", "CBSE school app",
    "ICSE school software", "India school platform", "online classes for schools",
    "school messaging app", "educational institution platform", "school ERP India",
    "HermesWorkspace", "school notice board app", "school admin software", "school ERP", "CBSE school management software", "ICSE school platform", "school administration software", "parent teacher communication", "online school platform", "digital school infrastructure", "school collaboration platform", "HermesWorkspace",
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
    images: [{ url: `${BASE_URL}/opengraph-image?v=3`, width: 1200, height: 630, alt: "HermesWorkspace — Every school. One platform." }],
  },
  twitter: {
    card: "summary_large_image", site: "@hermesworkspace", creator: "@hermesworkspace",
    title: "HermesWorkspace — Every school. One platform.",
    description: "India's all-in-one school platform: live classes, messaging, notices, meetings & more.",
    images: [`${BASE_URL}/opengraph-image?v=3`],
  },
  applicationName: "HermesWorkspace",
  appleWebApp: { capable: true, title: "HermesWorkspace", statusBarStyle: "default" },
  category: "EdTech",
  creator: "HermesWorkspace",
  publisher: "HermesWorkspace Pvt. Ltd.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={cn(dmSans.variable, inter.variable)}
    >
      <body className="antialiased font-body" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
