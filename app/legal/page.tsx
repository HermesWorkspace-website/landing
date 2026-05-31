import Link from "next/link";
import Image from "next/image";
import { legalDocuments } from "@/lib/legal-documents";

export const metadata = {
  title: "Legal — HermesWorkspace",
  description:
    "Legal information for HermesWorkspace, including Terms, Privacy, Data Processing, and Parental Control guidance for under-18 use.",
};

const supportEmail = "support@hermesworkspace.com";

const documentNav = [
  { slug: "terms", label: "Terms", href: "/legal/terms" },
  { slug: "privacy", label: "Privacy", href: "/legal/privacy" },
  { slug: "dpa", label: "DPA", href: "/legal/dpa" },
  { slug: "data-deletion", label: "Data Deletion", href: "/legal/data-deletion" },
  { slug: "information", label: "Information", href: "/legal/information" },
  { slug: "parental-control", label: "Parental Control", href: "/legal/parental-control" },
  { slug: "contact", label: "Contact", href: "/legal/contact" },
];

export default function LegalOverviewPage() {
  const documents = Object.values(legalDocuments);

  return (
    <main
      className="min-h-screen bg-[#f7f8f8] text-[#161922]"
      style={{
        fontFamily:
          '"SF Pro Display Medium", "Inter Variable", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        fontFeatureSettings: '"cv01", "ss03"',
      }}
    >
      {/* ── Header ── */}
      <header className="border-b border-[#d0d6e0]/70 bg-[#f7f8f8]/92 backdrop-blur sticky top-0 z-10">
        <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between gap-4 px-5">
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-[14px] font-medium text-[#161922]"
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
          <nav className="hidden items-center gap-1 md:flex">
            {documentNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-1.5 text-[13px] font-medium text-[#62666d] transition-colors hover:bg-[#f3f4f5] hover:text-[#161922]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="mx-auto w-full max-w-6xl px-5 py-10 lg:py-14">
        <div className="border-b border-[#d0d6e0] pb-10">
          <p className="text-[13px] font-medium text-[#5e6ad2]">Legal</p>
          <h1 className="mt-4 text-[42px] font-medium leading-none text-[#161922] sm:text-[56px]">
            HermesWorkspace Legal Documents
          </h1>
          <p className="mt-5 text-[15px] text-[#62666d]">
            Find terms, privacy details, parental control guidance, and support contact information for students, schools, and guardians.
          </p>
        </div>

        <div className="mt-10 grid gap-px border border-[#d0d6e0] rounded-xl overflow-hidden bg-[#d0d6e0]">
          {documents.map((document) => (
            <Link
              key={document.slug}
              href={`/legal/${document.slug}`}
              className="group flex items-center justify-between gap-4 bg-[#f7f8f8] px-6 py-5 transition hover:bg-white"
            >
              <div>
                <p className="text-[13px] font-medium text-[#5e6ad2]">
                  {document.eyebrow}
                </p>
                <p className="mt-1 text-[17px] font-medium text-[#161922]">
                  {document.title}
                </p>
                <p className="mt-1 text-[14px] text-[#62666d]">
                  {document.intro[0]}
                </p>
              </div>
              <span className="shrink-0 text-[#62666d] transition-colors group-hover:text-[#161922]">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-[#d0d6e0] mt-10">
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
