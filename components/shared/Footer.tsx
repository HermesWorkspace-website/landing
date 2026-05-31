"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NavHashLink from "@/components/shared/NavHashLink";
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconChevronDown,
} from "@tabler/icons-react";

const columns = [
  {
    title: "Platform",
    links: [
      { label: "Features", href: "/product#features" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Contact", href: "/contact" },
    ],
  },

  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Founders", href: "/founder" },
      { label: "Contact", href: "/contact" },
    ],
  },

  {
    title: "Resources",
    links: [
      { label: "Product", href: "/product" },
      { label: "Socials", href: "/socials" },
      { label: "Home", href: "/" },
    ],
  },
];

const socials = [
  {
    icon: <IconBrandInstagram className="w-[18px] h-[18px]" />,
    href: "https://instagram.com/hermesworkspace",
    label: "Instagram",
  },
  {
    icon: <IconBrandLinkedin className="w-[18px] h-[18px]" />,
    href: "https://linkedin.com/company/hermesworkspace",
    label: "LinkedIn",
  },
  {
    icon: <IconBrandX className="w-[18px] h-[18px]" />,
    href: "https://x.com/hermesworkspace",
    label: "X (Twitter)",
  },
];

// Accordion — only active on mobile; on md+ columns are always visible
function Column({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/[0.06] md:border-none">
      {/* Mobile: tappable header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 md:hidden"
        aria-expanded={open}
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/30 font-body">
          {title}
        </span>
        <IconChevronDown
          className={`w-4 h-4 text-white/25 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Desktop: static header */}
      <p className="hidden md:block text-[11px] font-semibold uppercase tracking-[0.12em] text-white/30 font-body mb-5">
        {title}
      </p>

      {/* Mobile: collapsible links */}
      <div
        className="overflow-hidden transition-all duration-200 ease-in-out md:hidden"
        style={{ maxHeight: open ? `${links.length * 44}px` : "0px" }}
      >
        <ul className="flex flex-col pb-4">
          {links.map((l) => (
            <li key={l.label}>
              <NavHashLink
                href={l.href}
                className="block py-2 text-[14px] text-white/50 hover:text-white transition-colors font-body"
              >
                {l.label}
              </NavHashLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop: always-visible links */}
      <ul className="hidden md:flex flex-col gap-3">
        {links.map((l) => (
          <li key={l.label}>
            <NavHashLink
              href={l.href}
              className="text-[14px] text-white/50 hover:text-white transition-colors duration-150 font-body"
            >
              {l.label}
            </NavHashLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-brand-ink overflow-hidden">
      {/* Glow — decorative, desktop only */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 w-[520px] h-[520px] rounded-full opacity-[0.06] hidden md:block"
        style={{
          background:
            "radial-gradient(circle, var(--color-brand, #6366f1) 0%, transparent 70%)",
        }}
      />

      {/* ─── Mobile brand block (outside grid) ───────────── */}
      <div className="md:hidden px-5 pt-10 pb-6 flex flex-col gap-4">
        <Link href="/" className="flex items-center gap-2.5 w-fit">
          <div className="w-8 h-8 rounded-xl overflow-hidden bg-white/10 ring-1 ring-white/10 flex items-center justify-center">
            <Image src="/logo.png" alt="HermesWorkspace" width={32} height={32} className="w-full h-full object-cover" />
          </div>
          <span className="font-logo font-bold text-[15px] text-white tracking-[-0.02em]">HermesWorkspace</span>
        </Link>
        <p className="text-[13px] leading-[1.65] text-white/40 font-body max-w-[280px]">
          Every school. One platform. School communication &amp; management built for India.
        </p>
        <div className="flex items-center gap-2.5">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
              className="w-9 h-9 rounded-full ring-1 ring-white/10 flex items-center justify-center text-white/40 hover:text-white hover:ring-white/25 transition-all">
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* ─── Main content ─────────────────────────────────── */}
      <div className="container-page pb-6 md:pt-16 md:pb-10 xl:pt-20 xl:pb-14">

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-12 gap-x-8 gap-y-12">
          {/* Brand col */}
          <div className="col-span-4 xl:col-span-4 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="w-9 h-9 rounded-xl overflow-hidden bg-white/10 ring-1 ring-white/10 flex items-center justify-center group-hover:ring-white/25 transition-all">
                <Image src="/logo.png" alt="HermesWorkspace" width={36} height={36} className="w-full h-full object-cover" />
              </div>
              <span className="font-logo font-bold text-[16px] text-white tracking-[-0.02em]">HermesWorkspace</span>
            </Link>
            <p className="text-[14px] leading-[1.65] text-white/45 font-body max-w-[260px]">
              Every school. One platform. School communication &amp; management built for India.
            </p>
            <div className="flex items-center gap-2.5 mt-1">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  className="w-9 h-9 rounded-full ring-1 ring-white/10 flex items-center justify-center text-white/40 hover:text-white hover:ring-white/30 hover:bg-white/[0.06] transition-all duration-200">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden xl:block xl:col-span-1" />

          {/* Link cols */}
          {columns.map((col) => (
            <div key={col.title} className="col-span-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/30 font-body mb-5">
                {col.title}
              </p>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <NavHashLink href={l.href} className="text-[14px] text-white/50 hover:text-white transition-colors duration-150 font-body">
                      {l.label}
                    </NavHashLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter strip — desktop */}
          <div className="col-span-12 mt-2">
            <div className="flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.03] px-6 py-5 xl:px-8 xl:py-6">
              <div>
                <p className="text-[15px] font-semibold text-white tracking-[-0.01em]">Stay ahead of school management trends</p>
                <p className="text-[13px] text-white/40 font-body mt-0.5">Early access updates, product news &amp; insights — no spam.</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <NavHashLink
                  href="/contact#inquiry"
                  className="inline-flex h-9 items-center px-4 rounded-lg bg-white text-brand-ink text-[13px] font-semibold font-body hover:bg-white/90 active:scale-[0.97] transition-all duration-150"
                >
                  Get Early Access
                </NavHashLink>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: accordion columns */}
        <div className="md:hidden px-5">
          {columns.map((col) => (
            <Column key={col.title} title={col.title} links={col.links} />
          ))}
        </div>

        {/* Mobile: newsletter strip */}
        <div className="md:hidden mx-5 mt-6 rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">
          <p className="text-[13px] font-semibold text-white tracking-[-0.01em]">Stay in the loop</p>
          <p className="text-[12px] text-white/35 font-body mt-0.5 mb-3">Early access updates &amp; product news — no spam.</p>
          <input type="email" placeholder="school@example.com"
            className="w-full h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] px-3 text-[13px] text-white placeholder:text-white/25 outline-none focus:border-white/25 transition-all font-body mb-2" />
          <button className="w-full h-9 rounded-lg bg-white text-brand-ink text-[13px] font-semibold font-body hover:bg-white/90 active:scale-[0.98] transition-all">
            Subscribe
          </button>
        </div>
      </div>

      {/* ─── Divider ──────────────────────────────────────── */}
      <div className="container-page">
        <div className="h-px bg-white/[0.06]" />
      </div>

      {/* ─── Bottom bar ───────────────────────────────────── */}
      <div className="container-page py-5 md:py-6">
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] md:text-[12px] text-white/25 font-body text-center sm:text-left">
            © {year} HermesWorkspace Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy", "Terms", "Security"].map((item) => (
              <a key={item} href="#" className="text-[12px] text-white/30 hover:text-white/60 transition-colors font-body">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}