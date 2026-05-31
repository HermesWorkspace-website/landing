import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/shared/SmoothScroll";
import ScrollOnNavigate from "@/components/shared/ScrollOnNavigate";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Geist, Bebas_Neue, Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "HermesWorkspace — Every school. One platform.",
  description:
    "HermesWorkspace is the all-in-one school management & communication platform built for India's CBSE, ICSE, and State Board schools. Live classes, messaging, assignments, fees, and analytics — unified.",
  keywords: ["school management", "CBSE school app", "India school platform", "online classes", "school communication"],
  openGraph: {
    title: "HermesWorkspace — Every school. One platform.",
    description: "India's unified school platform for communication, live classes, and management.",
    url: "https://hermesworkspace.com",
    siteName: "HermesWorkspace",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@hermesworkspace",
    title: "HermesWorkspace",
    description: "Every school. One platform.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "font-sans",
        geist.variable,
        bebas.variable,
        plusJakartaSans.variable,
        cormorant.variable
      )}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased font-body" suppressHydrationWarning>
        <Navbar />
        <SmoothScroll>
          <ScrollOnNavigate />
          {children}
        </SmoothScroll>
        <Footer />
      </body>
    </html>
  );
}
