"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { type LegalSlug } from "@/lib/legal-documents";

const documentNav: { slug: LegalSlug; label: string; href: string }[] = [
  { slug: "terms", label: "Terms", href: "/legal/terms" },
  { slug: "privacy", label: "Privacy", href: "/legal/privacy" },
  { slug: "dpa", label: "DPA", href: "/legal/dpa" },
  { slug: "data-deletion", label: "Data Deletion", href: "/legal/data-deletion" },
  { slug: "information", label: "Information", href: "/legal/information" },
  { slug: "parental-control", label: "Parental Control", href: "/legal/parental-control" },
  { slug: "aup", label: "Acceptable Use", href: "/legal/aup" },
  { slug: "grievance", label: "Grievance Officer", href: "/legal/grievance" },
  { slug: "cookie", label: "Cookie Policy", href: "/legal/cookie" },
  { slug: "contact", label: "Contact", href: "/legal/contact" },
];

interface LegalHeaderProps {
  activeSlug?: string;
}

export default function LegalHeader({ activeSlug }: LegalHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ── Header ── */}
      <header className="border-b border-[#d0d6e0]/70 bg-[#f7f8f8]/92 backdrop-blur sticky top-0 z-20">
        <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between gap-4 px-5">
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-[14px] font-medium text-[#161922] shrink-0"
          >
            <Image
              src="/hermes-square-icon.svg"
              alt="HermesWorkspace"
              width={28}
              height={28}
              className="size-7 rounded-md"
            />
            HermesWorkspace
          </Link>
          
          <button
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-[#d0d6e0]/70 bg-[#f7f8f8]/50 px-3.5 py-1.5 text-[13px] font-medium text-[#62666d] transition hover:bg-[#f3f4f5] hover:text-[#161922]"
          >
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Documents
          </button>
        </div>
      </header>

      {/* ── Mobile & Desktop Sliding Drawer ── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] bg-[#f7f8f8] border-l border-[#d0d6e0]/60 p-6 shadow-2xl transition-transform duration-300 ease-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#d0d6e0]/60 pb-4 mb-6">
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#62666d]">
            Documents
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className="rounded-lg p-1.5 text-[#62666d] hover:bg-[#eef0ff] hover:text-[#161922] transition-colors"
          >
            <span className="sr-only">Close menu</span>
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-120px)] pr-2">
          {documentNav.map((item) => (
            <Link
              key={item.slug}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`rounded-lg px-4 py-2.5 text-[14px] font-medium transition-all ${
                item.slug === activeSlug
                  ? "bg-[#eef0ff] text-[#5e6ad2] shadow-sm font-semibold"
                  : "text-[#62666d] hover:bg-[#f3f4f5] hover:text-[#161922]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
