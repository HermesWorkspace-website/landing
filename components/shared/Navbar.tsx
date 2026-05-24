"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { navbarSections } from "@/components/shared/config/navbar";
import Link from "next/link";

const mainLinks =[
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Socials", href: "/socials" },
  { label: "Contact", href: "/contact" },
  { label: "Founders", href: "/founder"}
];



export default function Navbar() {
  const pathname = usePathname();

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
    : [];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerOffset = 60; // offset for the sticky header
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
        setOpen(false); // close mobile menu if open
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-[#F8F9FA]/90 backdrop-blur-xl border-b border-black/[0.06] shadow-[0_1px_12px_rgba(0,0,0,0.04)]"
        : "bg-transparent"
        }`}
    >
      <div className="container-page h-[56px] md:h-[60px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="HermesWorkspace home">
          <div className="w-8 h-8 rounded-lg overflow-hidden bg-brand-ink flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <Image src="/logo.png" alt="HermesWorkspace logo" width={32} height={32} className="w-full h-full object-cover" />
          </div>
          <span className="font-display font-700 text-[15px] text-brand-ink tracking-[-0.02em]">
            HermesWorkspace
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {mainLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-[14px] font-medium text-brand-ink hover:text-brand transition-colors whitespace-nowrap"
            >
              {l.label}
            </Link>
          ))}
        </div>
        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="default" size="sm" className="gap-1.5">
            Get Early Access <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>


        {/* Mobile toggle */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-black/[0.05] transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Secondary navbar - Visible on Desktop */}
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

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-[#F8F9FA]/98 backdrop-blur-xl border-b border-black/[0.06]"
          >
            <div className="container-page py-6 flex flex-col gap-4">
              {mainLinks.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={l.href}
                    className="text-base font-medium text-brand-ink/70 hover:text-brand-ink transition-colors block"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <Button variant="default" size="default" className="mt-2 gap-2 w-full justify-center">
                Get Early Access <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
