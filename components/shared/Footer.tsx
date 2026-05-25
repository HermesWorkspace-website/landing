import React from "react";
import Image from "next/image";
import { IconBrandInstagram, IconBrandLinkedin, IconBrandX } from "@tabler/icons-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/[0.06] py-14 bg-white/60">
      <div className="container-page">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-brand-ink">
                <Image src="/logo.png" alt="HermesWorkspace" width={32} height={32} className="w-full h-full object-cover" />
              </div>
              <span className="font-logo font-bold text-[15px] text-brand-ink tracking-tight">HermesWorkspace</span>
            </div>
            <p className="text-sm text-brand-muted font-body leading-relaxed max-w-[240px]">
              Every school. One platform. School communication & management built for India.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[
                { icon: <IconBrandInstagram className="w-4 h-4" />, href: "https://instagram.com/hermesworkspace" },
                { icon: <IconBrandLinkedin className="w-4 h-4" />, href: "https://linkedin.com/company/hermesworkspace" },
                { icon: <IconBrandX className="w-4 h-4" />, href: "https://x.com/hermesworkspace" },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer"
                  className="w-8 h-8 rounded-full border border-black/[0.08] flex items-center justify-center text-brand-muted hover:text-brand-ink hover:border-black/20 transition-all">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: "Product",
              links: ["Features", "Pricing", "Changelog", "Roadmap"],
            },
            {
              title: "Schools",
              links: ["CBSE Schools", "ICSE Schools", "State Board", "Private Schools"],
            },
            {
              title: "Company",
              links: ["About", "Blog", "Careers", "Contact"],
            },
          ].map((col) => (
            <div key={col.title}>
              <div className="text-[11px] font-semibold uppercase tracking-widest text-brand-muted mb-4 font-body">
                {col.title}
              </div>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-brand-ink/60 hover:text-brand-ink transition-colors font-body">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-black/[0.06] pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-muted font-body">
            © {year} HermesWorkspace Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-brand-muted font-body">
            <a href="#" className="hover:text-brand-ink transition-colors">Privacy</a>
            <a href="#" className="hover:text-brand-ink transition-colors">Terms</a>
            <a href="#" className="hover:text-brand-ink transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
