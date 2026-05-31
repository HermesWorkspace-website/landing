"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { legalDocuments, type LegalDocument, type LegalSlug } from "@/lib/legal-documents";
import LegalHeader from "./LegalHeader";

const EMAIL_RE = /([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/g;

function renderContent(text: string) {
  const parts = text.split(EMAIL_RE);
  return parts.map((part, i) =>
    EMAIL_RE.test(part) ? (
      <a
        key={i}
        href={`mailto:${part}`}
        className="text-[#5e6ad2] underline decoration-[rgba(94,106,210,0.28)] underline-offset-4 transition-colors hover:text-[#414bb3]"
      >
        {part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

interface LegalDocPageProps {
  document: LegalDocument;
}

const supportEmail = "support@hermesworkspace.com";

const documentNav: { type: LegalSlug; label: string; href: string }[] = [
  { type: "terms", label: "Terms", href: "/legal/terms" },
  { type: "privacy", label: "Privacy", href: "/legal/privacy" },
  { type: "dpa", label: "DPA", href: "/legal/dpa" },
  { type: "data-deletion", label: "Data Deletion", href: "/legal/data-deletion" },
  { type: "information", label: "Information", href: "/legal/information" },
  { type: "parental-control", label: "Parental Control", href: "/legal/parental-control" },
  { type: "aup", label: "Acceptable Use", href: "/legal/aup" },
  { type: "grievance", label: "Grievance Officer", href: "/legal/grievance" },
  { type: "cookie", label: "Cookie Policy", href: "/legal/cookie" },
  { type: "contact", label: "Contact", href: "/legal/contact" },
];

export default function LegalDocPage({ document }: LegalDocPageProps) {
  return (
    <main
      className="min-h-screen bg-[#f7f8f8] text-[#161922]"
      style={{
        fontFamily:
          '"SF Pro Display Medium", "Inter Variable", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        fontFeatureSettings: '"cv01", "ss03"',
      }}
    >
      {/* Bulletproof native smooth scrolling fallback */}
      <style dangerouslySetInnerHTML={{ __html: `html { scroll-behavior: smooth !important; }` }} />
      
      {/* ── Header with Drawer Menu ── */}
      <LegalHeader activeSlug={document.slug} />

      {/* ── Body grid ── */}
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-10 lg:grid-cols-[220px_minmax(0,760px)] lg:py-14">
        {/* ── Sidebar ── */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="mb-3 text-[12px] font-medium text-[#62666d]">
              Documents
            </p>
            <nav className="grid gap-1 border-l border-[#d0d6e0] pl-3">
              {documentNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`py-1.5 text-[13px] transition-colors ${
                    item.type === document.slug
                      ? "font-medium text-[#5e6ad2]"
                      : "text-[#62666d] hover:text-[#161922]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <p className="mt-8 mb-3 text-[12px] font-medium text-[#62666d]">
              On this page
            </p>
            <nav className="grid gap-1 border-l border-[#d0d6e0] pl-3">
              {document.sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = window.document.getElementById(section.id);
                    if (element) {
                      const headerOffset = 80;
                      const elementPosition = element.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                      
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                      });
                    }
                    window.history.pushState(null, "", `#${section.id}`);
                  }}
                  className="py-1 text-[13px] leading-5 text-[#62666d] transition-colors hover:text-[#161922]"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* ── Article ── */}
        <article className="min-w-0">
          <div className="border-b border-[#d0d6e0] pb-10">
            <p className="text-[13px] font-medium text-[#5e6ad2]">
              {document.eyebrow}
            </p>
            <h1 className="mt-4 text-[42px] font-medium leading-none text-[#161922] sm:text-[56px]">
              {document.title}
            </h1>
            <p className="mt-5 text-[15px] text-[#62666d]">
              {document.effective}
            </p>
            <div className="mt-8 space-y-5 text-[17px] leading-8 text-[#34343a]">
              {document.intro.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div>
            {document.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-8 border-b border-[#d0d6e0] py-9"
              >
                <h2 className="text-[24px] font-medium leading-tight text-[#161922]">
                  {section.title}
                </h2>
                <div className="mt-5 text-[16px] leading-8 text-[#34343a]">
                  {renderContent(section.content)}
                </div>
              </section>
            ))}
          </div>
        </article>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-[#d0d6e0]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 py-8 text-[13px] text-[#62666d] md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/hermes-square-icon.svg"
              alt=""
              width={24}
              height={24}
              className="size-6 rounded"
              aria-hidden="true"
            />
            <span>2026 HermesWorkspace</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {documentNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-[#161922]"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`mailto:${supportEmail}`}
              className="transition-colors hover:text-[#161922]"
            >
              Support
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
