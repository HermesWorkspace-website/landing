"use client";
import dynamic from "next/dynamic";

const ContactPage = dynamic(() => import("@/components/contactpage/contact"), {
  ssr: false,
  loading: () => <div className="min-h-screen" />,
});

export default function ContactClient() {
  return <ContactPage />;
}
