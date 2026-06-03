import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hermesworkspace.com"),

  title: {
    default: "HermesWorkspace | School Communication & Management Platform",
    template: "%s | HermesWorkspace",
  },

  description:
    "HermesWorkspace is a unified communication and management platform for schools, coaching institutes, and educational organisations across India.",

  keywords: [
    "school management platform",
    "school communication platform",
    "school ERP India",
    "parent teacher communication",
    "school administration software",
    "CBSE school software",
    "ICSE school ERP",
    "educational organisation management",
    "school collaboration platform",
  ],

  alternates: {
    canonical: "https://www.hermesworkspace.com",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    url: "https://www.hermesworkspace.com",
    siteName: "HermesWorkspace",
    title: "HermesWorkspace | School Communication & Management Platform",
    description:
      "A modern communication and management workspace for educational institutions.",
    locale: "en_IN",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HermesWorkspace",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "HermesWorkspace",
    description:
      "Modern communication and management platform for educational institutions.",
    images: ["/og-image.png"],
  },

  category: "education",

  applicationName: "HermesWorkspace",

  authors: [
    {
      name: "HermesWorkspace",
      url: "https://www.hermesworkspace.com",
    },
  ],

  creator: "HermesWorkspace",
  publisher: "HermesWorkspace",

  other: {
    "theme-color": "#0A0A0A",
  },
};

export default function Home() {
  return <HomeClient />;
}