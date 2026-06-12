"use client";

import React, { useEffect, useState, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Shield, Globe, Zap, Clock, CheckCircle } from "lucide-react";

const WORDS = ["Connect", "Collaborate", "Coordinate"];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setWordIndex((v) => (v + 1) % WORDS.length), 2800);
    return () => clearInterval(id);
  }, []);

  // Three.js particles — unchanged
  useEffect(() => {
    let active = true;
    const dispose: (() => void)[] = [];

    (async () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const THREE = await import("three");
      if (!active) return;
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100);
      camera.position.z = 5;
      const count = 120;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 14;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({ color: 0x5a5fe8, size: 0.04, transparent: true, opacity: 0.5 });
      const points = new THREE.Points(geo, mat);
      scene.add(points);
      const gridHelper = new THREE.GridHelper(20, 20, 0x0a1628, 0x0a1628);
(gridHelper.material as { transparent: boolean; opacity: number }).transparent = true;
(gridHelper.material as { transparent: boolean; opacity: number }).opacity = 0.04;
      gridHelper.rotation.x = Math.PI / 2;
      gridHelper.position.z = -2;
      scene.add(gridHelper);
      let raf: number;
      const animate = () => {
        raf = requestAnimationFrame(animate);
        points.rotation.z += 0.0008;
        points.rotation.y += 0.0003;
        renderer.render(scene, camera);
      };
      animate();
      const handleResize = () => {
        if (!canvas.parentElement) return;
        const w = canvas.parentElement.offsetWidth;
        const h = canvas.parentElement.offsetHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", handleResize);
      dispose.push(() => { cancelAnimationFrame(raf); window.removeEventListener("resize", handleResize); renderer.dispose(); });
    })();

    return () => { active = false; dispose.forEach(fn => fn()); };
  }, []);

  // GSAP parallax — unchanged
  useEffect(() => {
    const init = async () => {
      try {
        const gsap = (await import("gsap")).default;
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);
        if (!sectionRef.current) return;
        gsap.to(".contact-hero-content", {
          y: 70, ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1.2 },
        });
      } catch {}
    };
    const timer = setTimeout(init, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-[96px] md:pt-[120px] pb-16 md:pb-24">

      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[1]" style={{ opacity: 0.7 }} />

      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none z-[2]" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(96,99,238,0.04), transparent)" }} />

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none z-[2] opacity-[0.045]" style={{ backgroundImage: `linear-gradient(rgba(120,120,120,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(120,120,120,0.18) 1px, transparent 1px)`, backgroundSize: "78px 78px" }} />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-[2]" />

      {/* ── Split layout ── */}
      <div className="contact-hero-content relative z-10 w-full container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT — content (unchanged, just left-aligned now) ── */}
          <div className="flex flex-col items-start text-left">

            {/* Badge */}
            <m.div
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full"
              style={{ background: "rgba(96,99,238,0.08)", border: "1px solid rgba(96,99,238,0.2)" }}
            >
              <span className="size-1.5 rounded-full anim-pulse-scale" style={{ background: "var(--brand)" }} />
              <span className="text-[10px] font-bold font-display tracking-[0.18em] uppercase" style={{ color: "var(--brand)" }}>Contact Support</span>
            </m.div>

            {/* Headline */}
            <div className="mb-6">
              <m.h1 className="font-display leading-[1.02] tracking-[-0.04em]" style={{ fontSize: "clamp(3rem,5vw,5.2rem)" }}>
                <m.span className="block" style={{ color: "var(--ink)" }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
                  <AnimatePresence mode="wait">
                    <m.span key={wordIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="inline-block" style={{ color: "var(--brand)" }}>
                      {WORDS[wordIndex]}
                    </m.span>
                  </AnimatePresence>
                </m.span>
                <m.span className="block" style={{ color: "var(--ink)" }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>With</m.span>
                <m.span className="block" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                  <span className="shimmer-text">Institutional</span>
                </m.span>
                <m.span className="block" style={{ color: "var(--ink)", opacity: 0.18 }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 0.18, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}>Precision.</m.span>
              </m.h1>
            </div>

            {/* Body */}
            <m.p className="text-[15px] leading-[1.75] font-body max-w-[480px] mb-10" style={{ color: "var(--ink-60)" }} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}>
              Built for academic coordination. Reach the HermesWorkspace team for onboarding, partnerships, institutional support, and platform inquiries.
            </m.p>

            {/* CTAs */}
            <m.div className="flex flex-wrap items-center gap-4" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.65 }}>
              <m.button
                whileHover={{ scale: 1.04, boxShadow: "0 12px 40px rgba(96,99,238,0.4)" }}
                whileTap={{ scale: 0.96 }}
                onClick={() => { const t = document.getElementById("inquiry"); if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 60, behavior: "smooth" }); }}
                className="flex items-center gap-2.5 text-white px-7 py-3.5 rounded-xl text-[13px] font-bold font-body"
                style={{ background: "var(--brand)", boxShadow: "0 4px 20px rgba(96,99,238,0.3)" }}
              >
                Request Demo
                <div className="anim-float-x">
                  <ArrowRight className="size-4" />
                </div>
              </m.button>
              <a href="mailto:support@hermesworkspace.com">
                <m.button whileHover={{ scale: 1.02, x: 2 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-2 text-[13px] font-semibold font-body" style={{ color: "var(--ink-60)" }}>
                  <Mail className="size-4" style={{ color: "var(--brand)" }} />
                  Contact Support
                </m.button>
              </a>
            </m.div>

            {/* Trust bar */}
            <m.div className="flex flex-wrap items-center gap-6 mt-6 pt-8" style={{ borderTop: "1px solid var(--ink-06)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
              {[
                { icon: <Shield className="size-3.5" />, label: "Secure Institutional Access" },
                { icon: <Globe className="size-3.5" />, label: "Web & Mobile Accessibility" },
                { icon: <Zap className="size-3.5" />, label: "Built for Academic Coordination" },
              ].map((item) => (
                <m.div key={item.label} className="flex items-center gap-1.5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
                  <span style={{ color: "var(--brand)" }}>{item.icon}</span>
                  <span className="text-[11px] font-semibold font-body" style={{ color: "var(--ink-60)" }}>{item.label}</span>
                </m.div>
              ))}
            </m.div>
          </div>

          {/* ── RIGHT — contact info cards ── */}
          <m.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            {/* Live chat card */}
            <m.div
              whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(96,99,238,0.1)" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white border rounded-2xl p-5 shadow-sm"
              style={{ borderColor: "var(--ink-06)" }}
            >
              <div className="flex items-start gap-4">
                <div className="size-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(96,99,238,0.08)" }}>
                  <Globe className="size-5" style={{ color: "var(--brand)" }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[13px] font-bold" style={{ color: "var(--ink)" }}>Institutional Partnerships</p>
                    <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-500">
                      <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Online Now
                    </span>
                  </div>
                  <p className="text-[12px] leading-relaxed" style={{ color: "var(--ink-60)" }}>HermesWorkspace collaborates with schools and institutions
  focused on modernizing communication, coordination, and
  operational infrastructure.</p>
                  <div className="mt-3 flex gap-2">
                    {["Education", "Operations", "Infrastructure"].map((tag) => (
                      <span key={tag} className="text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(96,99,238,0.07)", color: "var(--brand)" }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </m.div>

            {/* Phone card */}
            <m.div
              whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(96,99,238,0.1)" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white border rounded-2xl p-5 shadow-sm"
              style={{ borderColor: "var(--ink-06)" }}
            >
              <div className="flex items-start gap-4">
                <div className="size-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(96,99,238,0.08)" }}>
                  <Mail className="size-5" style={{ color: "var(--brand)" }} />
                </div>
                <div>
                  <p className="text-[13px] font-bold mb-1" style={{ color: "var(--ink)" }}>Institutional Inquiries</p>
                  <p className="text-[12px]" style={{ color: "var(--ink-60)" }}>Reach the HermesWorkspace team for partnerships,
  onboarding discussions, collaborations, and
  platform-related inquiries.</p>
                  <p className="text-[14px] font-bold mt-2" style={{ color: "var(--brand)" }}>connect@hermesworkspace.com</p>
                </div>
              </div>
            </m.div>

            {/* Response time card */}
            <m.div
              whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(96,99,238,0.1)" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white border rounded-2xl p-5 shadow-sm"
              style={{ borderColor: "var(--ink-06)" }}
            >
              <div className="flex items-start gap-4">
                <div className="size-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(96,99,238,0.08)" }}>
                  <Clock className="size-5" style={{ color: "var(--brand)" }} />
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-bold mb-1" style={{ color: "var(--ink)" }}>Response Time</p>
                  <p className="text-[12px] mb-3" style={{ color: "var(--ink-60)" }}>We get back to every institutional inquiry within one business day.</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Inquiry", time: "Within 24hrs" },
                      { label: "Email", time: "Within 24hrs" },
                      { label: "Demo", time: "1-2 Business Days" },
                    ].map((s) => (
                      <div key={s.label} className="rounded-xl p-2.5 text-center" style={{ background: "rgba(96,99,238,0.05)" }}>
                        <p className="text-[11px] font-bold" style={{ color: "var(--brand)" }}>{s.time}</p>
                        <p className="text-[10px] mt-0.5" style={{ color: "var(--ink-60)" }}>{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </m.div>

            {/* Trust checkmarks */}
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col gap-2 px-1"
            >
              {[
                "No sales pressure — just honest answers",
                "Supporting modern institutional operations",
                "Free Demo available for qualifing institutions",
              ].map((text) => (
                <m.div
                  key={text}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="size-3.5 flex-shrink-0 text-emerald-500" />
                  <span className="text-[12px]" style={{ color: "var(--ink-60)" }}>{text}</span>
                </m.div>
              ))}
            </m.div>
          </m.div>

        </div>
      </div>
    </section>
  );
}