"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconMenu2, IconX, IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { navbarSections } from "@/components/shared/config/navbar";
import Link from "next/link";
import NavHashLink from "@/components/shared/NavHashLink";
import { scrollToSection } from "@/lib/scroll-to-section";

const mainLinks = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/product" },
  { label: "Blog", href: "/blog" },
  { label: "Socials", href: "/socials" },
  { label: "About Us", href: "/about" },
  { label: "Founders", href: "/founder" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const sectionLinks =
    pathname === "/"
      ? navbarSections.home
      : pathname === "/about"
      ? navbarSections.about
      : pathname === "/socials"
      ? navbarSections.socials
      : pathname === "/contact"
      ? navbarSections.contact
      : pathname === "/founder"
      ? navbarSections.founder
      : pathname === "/product"
      ? navbarSections.product
      : [];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.slice(1);
      if (id && scrollToSection(id)) setOpen(false);
    }
  };

  // A link is "active" if pathname exactly matches its href,
  // except "/" which only matches exactly (not every page).
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#F8F9FA]/90 backdrop-blur-xl border-b border-black/[0.06] shadow-[0_1px_12px_rgba(0,0,0,0.04)]"
            : "bg-[#FAFAF9]/90 backdrop-blur-xl border-b border-black/[0.06] shadow-[0_1px_12px_rgba(0,0,0,0.04)]"
        }`}
      >
        {/* ── Main bar ── */}
        <div className="px-4 md:container-page h-[56px] md:h-[60px] flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="HermesWorkspace home"
            onClick={() => setOpen(false)}
          >
            <div className="size-8 rounded-lg overflow-hidden bg-brand-ink flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <Image
                src="/logo.png"
                alt="HermesWorkspace logo"
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-logo font-700 text-[15px] text-brand-ink tracking-[-0.02em]">
              HermesWorkspace
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {mainLinks.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-[14px] font-medium transition-colors whitespace-nowrap"
                  style={
                    active
                      ? {
                          color: "#6366f1",
                          textShadow:
                            "0 0 12px rgba(99,102,241,0.45), 0 0 24px rgba(99,102,241,0.2)",
                        }
                      : undefined
                  }
                >
                  <span className={active ? "text-brand" : "text-brand-ink hover:text-brand"}>
                    {l.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <NavHashLink href="/contact#inquiry">
              <Button variant="default" size="sm" className="gap-1.5">
                Get Early Access <IconArrowRight className="size-3.5" />
              </Button>
            </NavHashLink>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden size-9 flex items-center justify-center rounded-lg hover:bg-black/[0.05] active:bg-black/10 transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open
              ? <IconX className="size-5 text-brand-ink" />
              : <IconMenu2 className="size-5 text-brand-ink" />
            }
          </button>
        </div>

        {/* ── Desktop secondary section navbar ── */}
        {sectionLinks.length > 0 && (
          <div className="hidden md:block border-t border-black/[0.05] bg-black/[0.02]">
            <div className="container-page h-[36px] flex items-center justify-start gap-8 overflow-x-auto">
              {sectionLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => handleScroll(e, l.href)}
                  className="text-[13px] text-brand-ink/55 hover:text-brand transition-colors whitespace-nowrap"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </motion.header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
              onClick={() => setOpen(false)}
            />

            {/* Drawer panel */}
            <motion.nav
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden fixed top-0 right-0 bottom-0 z-50 w-[78vw] max-w-[300px] bg-[#F8F9FA] flex flex-col shadow-2xl"
            >
              {/* Drawer header */}
              <div className="h-[56px] flex items-center justify-between px-5 border-b border-black/[0.06]">
                <span className="font-logo font-700 text-[13px] text-brand-ink/40 tracking-widest uppercase">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="size-8 flex items-center justify-center rounded-lg hover:bg-black/[0.06] transition-colors"
                  aria-label="Close menu"
                >
                  <IconX className="size-4 text-brand-ink" />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex-1 overflow-y-auto py-4 px-5 flex flex-col gap-1">
                {mainLinks.map((l, i) => {
                  const active = isActive(l.href);
                  return (
                    <motion.div
                      key={l.label}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.04 + i * 0.04, duration: 0.28 }}
                    >
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center h-11 px-3 rounded-lg text-[15px] font-medium transition-colors ${
                          active
                            ? "text-brand bg-brand/[0.07]"
                            : "text-brand-ink/70 hover:text-brand-ink hover:bg-black/[0.04]"
                        }`}
                      >
                        {/* Active dot indicator for mobile */}
                        {active && (
                          <span
                            className="mr-2.5 size-1.5 rounded-full bg-brand flex-shrink-0"
                            style={{ boxShadow: "0 0 6px rgba(99,102,241,0.8)" }}
                          />
                        )}
                        {l.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA pinned at bottom */}
              <div className="p-5 border-t border-black/[0.06]">
                <NavHashLink href="/contact#inquiry" onClick={() => setOpen(false)}>
                  <Button variant="default" size="default" className="w-full gap-2 justify-center">
                    Get Early Access <IconArrowRight className="size-4" />
                  </Button>
                </NavHashLink>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}