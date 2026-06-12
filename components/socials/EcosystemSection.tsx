"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { IconArrowRight, IconBrandLinkedin, IconBrandInstagram, IconBrandYoutube, IconBrandX } from "@tabler/icons-react";
import { staggerContainer, fadeUp, scaleIn } from "@/components/socials/motion-variants";

const CHANNELS = [
  {
    icon: IconBrandLinkedin,
    name: "LinkedIn",
    tag: "Institutional Insights",
    tagColor: "#0077B5",
    bg: "#EBF5FB",
    description:
      "Founder-led updates, operational thinking, product development, and institutional communication insights shared with educators and modern organizations.",
    cta: "Explore Updates",
    accentColor: "#0077B5",
    link: "https://www.linkedin.com/company/hermesworkspace/?originalSubdomain=in"
  },

  {
    icon: IconBrandInstagram,
    name: "Instagram",
    tag: "Visual Storytelling",
    tagColor: "#E1306C",
    bg: "#FDF0F5",
    description:
      "A visual look into HermesWorkspace through product design, interface systems, institutional aesthetics, and behind-the-scenes development moments.",
    cta: "View Stories",
    accentColor: "#E1306C",
    link: "https://www.instagram.com/hermesworkspace?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
  },

  {
    icon: IconBrandX,
    name: "X Platform",
    tag: "Real-Time Thinking",
    tagColor: "#0D0D0F",
    bg: "#F4F4F4",
    description:
      "Short-form perspectives on infrastructure, digital coordination, product strategy, and the evolving future of institutional systems.",
    cta: "Read Threads",
    accentColor: "#0D0D0F",
    link:" https://x.com/hermesworkspace"
  },

  {
    icon: IconBrandYoutube,
    name: "YouTube",
    tag: "Platform Narratives",
    tagColor: "#FF0000",
    bg: "#FFF0F0",
    description:
      "Long-form walkthroughs, founder conversations, platform demonstrations, and educational discussions around modern operational infrastructure.",
    cta: "Watch Content",
    accentColor: "#FF0000",
    link:"https://www.youtube.com/@hermesworkspace"
  },
];

const renderDescription = (text: string) => {
  if (text.includes("HermesWorkspace")) {
    const parts = text.split("HermesWorkspace");
    return (
      <>
        {parts[0]}
        <span className="font-display font-semibold text-[#0D0D0F]">HermesWorkspace</span>
        {parts[1]}
      </>
    );
  }
  return text;
};

function ChannelCard({
  channel,
  index,
}: {
  channel: (typeof CHANNELS)[0];
  index: number;
}) {
  const Icon = channel.icon;

  return (
    <m.a
      href={channel.link}
      target="_blank"
      rel="noopener noreferrer"
      variants={scaleIn}
      whileHover={{ y: -6, boxShadow: `0 20px 50px ${channel.accentColor}18` }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="relative bg-white rounded-2xl border border-[#E8E5F0] p-6 flex flex-col gap-4 group cursor-pointer overflow-hidden"
    >
      {/* Hover background bloom */}
      <m.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 30% 20%, ${channel.bg} 0%, transparent 70%)` }}
      />

      {/* Icon */}
      <div
        className="relative size-10 rounded-xl flex items-center justify-center"
        style={{ background: channel.bg }}
      >
        <Icon size={18} style={{ color: channel.accentColor }} />
      </div>

      {/* Name + tag */}
      <div>
        <p className="text-[15px] font-bold text-[#0D0D0F] mb-1">{channel.name}</p>
        <span
          className="text-[9px] tracking-[2px] uppercase font-semibold"
          style={{ color: channel.tagColor }}
        >
          {channel.tag}
        </span>
      </div>

      {/* Description */}
      <p className="text-[12.5px] leading-[1.7] text-[#666] flex-1">
        {renderDescription(channel.description)}
      </p>

      {/* CTA */}
      <m.div
        className="flex items-center gap-1.5 text-[11px] tracking-[0.5px] font-medium"
        style={{ color: channel.accentColor }}
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        {channel.cta}
        <IconArrowRight size={12} />
      </m.div>

      {/* Bottom line accent */}
      <m.div
        className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
        style={{ background: channel.accentColor }}
      />
    </m.a>
  );
}

export function EcosystemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="ecosystem" className="py-24 bg-white" ref={ref}>
      <div className="container-page">
        {/* Header */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="mb-14"
        >
          <m.h2
            variants={fadeUp}
            className="text-[clamp(32px,4vw,48px)] font-black text-[#0D0D0F] tracking-tight mb-3"
          >
            Digital Ecosystem
          </m.h2>
          <m.p variants={fadeUp} className="text-[14px] text-[#888] max-w-md">
            How <span className="font-display font-semibold text-[#0D0D0F]">HermesWorkspace</span> communicates product vision, institutional thinking, and operational innovation across modern digital platforms.
          </m.p>
        </m.div>

        {/* Channel grid */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {CHANNELS.map((ch, i) => (
            <ChannelCard key={ch.name} channel={ch} index={i} />
          ))}
        </m.div>
      </div>
    </section>
  );
}
