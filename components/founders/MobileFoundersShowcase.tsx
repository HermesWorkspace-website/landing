"use client";

import { useRef, useEffect } from "react";
import { IconBrandLinkedin, IconBrandInstagram, IconBrandX } from "@tabler/icons-react";
import { FOUNDERS } from "./founders-data";
import { FounderPhoto } from "./FounderPhoto";
import { FounderFoundation } from "./FounderFoundation";
import { Founder } from "@/types/founder";
import CTA from "./CTA";

export default function MobileFoundersShowcase() {
  return (
    <main style={{ background: "#fafafe" }}>
      <FounderFoundation />
      {FOUNDERS.map((founder, idx) => (
        <MobileFounderSection key={founder.id} founder={founder} idx={idx} />
      ))}
      <CTA />
    </main>
  );
}

function MobileFounderSection({ founder, idx }: { founder: Founder; idx: number }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.setAttribute("data-visible","true"); io.disconnect(); } }, { threshold: 0.06 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id={founder.firstName.toLowerCase()} className="mf w-full">

      {/* Portrait card — square ratio, compact and card-like */}
      <div
        className="mx-5 rounded-2xl overflow-hidden relative"
        style={{
          aspectRatio: "1/1",
          boxShadow: "0 8px 32px rgba(13,13,15,0.18)",
        }}
      >
        <FounderPhoto
          src={founder.photo}
          alt={`${founder.firstName} ${founder.lastName}`}
          aspectRatio="1/1"
          priority={idx === 0}
          sizes="(max-width: 768px) calc(100vw - 40px), 320px"
          className="absolute inset-0 w-full h-full"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top,rgba(13,13,15,0.88) 0%,rgba(13,13,15,0.2) 35%,transparent 60%)" }}
        />
        {/* Name + title badge */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-5">
          <p className="text-[9px] font-medium uppercase tracking-[2.5px] mb-1" style={{ color: "rgba(255,255,255,0.65)" }}>{founder.role}</p>
          <h2 className="font-black leading-[0.9] tracking-[-0.025em] text-white mb-1" style={{ fontSize: "clamp(22px,6vw,36px)" }}>
            {founder.firstName} <span style={{ color: founder.accentColor }}>{founder.lastName}</span>
          </h2>
          <p className="text-[9px] font-semibold uppercase tracking-[2px]" style={{ color: founder.accentColor }}>{founder.title}</p>
        </div>
      </div>


      {/* Domains + socials */}
      <div className="mf-z flex items-start justify-between px-5 pt-5 pb-1">
        <div className="flex flex-col gap-0.5">
          {founder.focusAreas.map((area) => (
            <span key={area} className="text-[10px] uppercase tracking-[0.15em] leading-[1.5]" style={{ color: "#7A7A85" }}>
              {area}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 ml-3 shrink-0 pt-0.5">
          {founder.socialLinks.linkedin && <MobileLink href={founder.socialLinks.linkedin} label="LinkedIn"><IconBrandLinkedin size={20}/></MobileLink>}
          {founder.socialLinks.twitter && <MobileLink href={founder.socialLinks.twitter} label="X"><IconBrandX size={20}/></MobileLink>}
          {founder.socialLinks.instagram && <MobileLink href={founder.socialLinks.instagram} label="Instagram"><IconBrandInstagram size={20}/></MobileLink>}
        </div>
      </div>

      <Div /><div className="mf-z px-5"><blockquote className="text-[13px] italic leading-[1.78]" style={{ color:"#555", fontFamily:"Georgia,serif" }}>&ldquo;{founder.quote}&rdquo;</blockquote></div>

      <Div /><div className="mf-z px-5 flex flex-col gap-4">{founder.fullBio.map((p,i) => <p key={i} className="text-[13px] leading-[1.88]" style={{color:"#555"}}>{p}</p>)}</div>

      {founder.principles && founder.principles.length > 0 && (<>
        <Div />
        <div className="mf-z px-5">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[3px]" style={{color: founder.accentColor}}>Principles</p>
          {founder.principles.map((pr,i) => (
            <div key={pr.title} className="py-4">
              <h3 className="text-[16px] font-semibold text-[#1A1A1E] mb-2 leading-[1.3]">{pr.title}</h3>
              <p className="text-[13px] leading-[1.78]" style={{color:"#666"}}>{pr.body}</p>
              {i < founder.principles!.length - 1 && <div className="mt-4 h-px" style={{background:"#EDEBE6"}} />}
            </div>
          ))}
        </div>
      </>)}

      {founder.vision && founder.vision.paragraphs.length > 0 && (<>
        <Div />
        <div className="mf-z px-5">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[3px]" style={{color: founder.accentColor}}>Vision</p>
          <h2 className="mb-2 font-black leading-[1.02] tracking-[-0.025em] text-[#0D0D0F]" style={{fontSize:"clamp(32px,9vw,48px)"}}>{founder.vision.heading}</h2>
          <div className="mb-5 h-[3px] w-12 rounded-full" style={{background:founder.accentColor}} />
          <div className="flex flex-col gap-4">{founder.vision.paragraphs.map((p,i) => <p key={i} className="text-[14px] leading-[1.85]" style={{color:"#555"}}>{p}</p>)}</div>
        </div>
      </>)}

      <div className="mf-z mx-5 mt-6 mb-2">
        {/* <FounderSignature founder={founder} /> */}
        <div className="mt-2"><span className="text-[11px] font-semibold tracking-[0.5px] text-[#2A2A2E] block">{founder.firstName} {founder.lastName}</span><span className="text-[10px] uppercase tracking-[1.8px]" style={{color:"#7A7A85"}}>{founder.title}</span></div>
      </div>

      {idx < FOUNDERS.length - 1 && <div className="mx-5 my-12 h-px" style={{background:"#D8D4CC"}} />}
      {idx === FOUNDERS.length - 1 && <div className="h-16" />}

      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .mf-z { opacity:0; transform:translateY(12px); transition:opacity .55s cubic-bezier(.22,1,.36,1), transform .55s cubic-bezier(.22,1,.36,1); }
          [data-visible="true"] .mf-z { opacity:1; transform:none; }
          [data-visible="true"] .mf-z:nth-child(1){transition-delay:.05s}
          [data-visible="true"] .mf-z:nth-child(2){transition-delay:.10s}
          [data-visible="true"] .mf-z:nth-child(3){transition-delay:.15s}
          [data-visible="true"] .mf-z:nth-child(4){transition-delay:.20s}
          [data-visible="true"] .mf-z:nth-child(5){transition-delay:.25s}
          [data-visible="true"] .mf-z:nth-child(6){transition-delay:.30s}
          [data-visible="true"] .mf-z:nth-child(7){transition-delay:.35s}
        }
        @media (prefers-reduced-motion: reduce) { .mf-z{opacity:1;transform:none;} }
      `}</style>
    </section>
  );
}

function Div() {
  return <div className="mx-5 my-5 h-px" style={{background:"#EDEBE6"}} />;
}

function MobileLink({ href, label, children }: { href:string; label:string; children:React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      className="flex items-center justify-center rounded-full border transition-all hover:-translate-y-0.5 hover:border-[#6063EE]"
      style={{borderColor:"#ddd",color:"#7A7A85",minWidth:48,minHeight:48,width:48,height:48}}>
      {children}
    </a>
  );
}
