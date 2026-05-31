"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CTA() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!bgRef.current) return;
    gsap.to(bgRef.current, { backgroundPosition: "100% 50%", duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut" });
  }, []);

  return (
    <section id="cta" ref={sectionRef} className="bg-white px-4 sm:px-6 py-8 sm:py-12">
      <motion.div initial={{ opacity: 0, y: 30, scale: 0.98 }} animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden relative">
        <div ref={bgRef} className="absolute inset-0" style={{ background: "linear-gradient(135deg, #060E1A 0%, #0A1628 40%, #0f2d4a 70%, #060E1A 100%)", backgroundSize: "200% 200%" }} />
        <div className="absolute top-0 left-1/4 size-64 bg-[#22C55E]/6 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 size-48 bg-[#22C55E]/4 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 px-6 sm:px-12 py-12 sm:py-16 items-center">
          {/* Left */}
          <div>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="text-[11px] font-bold text-[#22C55E] tracking-widest uppercase mb-4">
              Get Started
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }} className="text-[2rem] sm:text-[2.6rem] font-bold text-white tracking-tight leading-tight">
              Modernize institutional operations with HermesWorkspace.
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }} className="text-[14px] text-white/50 mt-4 max-w-sm leading-relaxed">
              HermesWorkspace helps schools replace scattered WhatsApp groups,
              unverified notices, disconnected meetings, and fragmented communication
              through one centralized system built specifically for education.
            </motion.p>
          </div>

          {/* Right */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 lg:items-start xl:items-center lg:pl-12">
            <motion.button whileHover={{ scale: 1.04, backgroundColor: "#16a34a" }} whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/contact?scroll=inquiry")}
              className="flex items-center justify-center gap-2.5 bg-[#22C55E] text-white text-[13px] font-bold px-7 py-3.5 rounded-xl transition-colors">
              Request a Demo
              <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight size={15} />
              </motion.div>
            </motion.button>
            <motion.button whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.4)" }} whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/?scroll=pricing")}
              className="flex items-center justify-center gap-2 border border-white/20 text-white text-[13px] font-medium px-7 py-3.5 rounded-xl hover:bg-white/5 transition-colors">
              See Pricing
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
