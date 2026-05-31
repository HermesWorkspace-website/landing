import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "HermesWorkspace — Every school. One platform.",
  description:
    "HermesWorkspace centralizes communication, notices, live classes, meetings, events, and academic coordination for CBSE, ICSE, and State Board schools in India. Replace scattered WhatsApp groups with one institutional platform.",
  alternates: {
    canonical: "https://hermesworkspace.com",
  },
  openGraph: {
    title: "HermesWorkspace — Every school. One platform.",
    description:
      "Replace WhatsApp groups with one institutional platform. Live classes, messaging, notices, meetings, and analytics built for Indian schools.",
    url: "https://hermesworkspace.com",
  },
};

export default function Home() {
  return <HomeClient />;
}