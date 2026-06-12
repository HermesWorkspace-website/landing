"use client";

import { useEffect, useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/lib/useIsMobile";
// gsap dynamically imported inside useEffect
// THREE dynamically imported inside useEffect
import { useRouter } from "next/navigation";

const TITLE_WORDS = ["Modern", "infrastructure", "for", "institutional", "communication."];

export default function Hero() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const isDesktop = !useIsMobile();

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // ── Three.js square particles ──
  useEffect(() => {
    let active = true;
    const dispose: (() => void)[] = [];

    (async () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const THREE = await import("three");
      if (!active) return;
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100);
      camera.position.z = 6;

      // Small lavender squares
      const squareGeo = new THREE.PlaneGeometry(0.06, 0.06);
      const squareGroup = new THREE.Group();
      for (let i = 0; i < 60; i++) {
        const mat = new THREE.MeshBasicMaterial({ color: 0x8b8fd4, transparent: true, opacity: Math.random() * 0.4 + 0.15 });
        const mesh = new THREE.Mesh(squareGeo, mat);
        mesh.position.set((Math.random() - 0.5) * 22, (Math.random() - 0.5) * 14, (Math.random() - 0.5) * 4);
        mesh.rotation.z = Math.random() * Math.PI;
        squareGroup.add(mesh);
      }
      scene.add(squareGroup);

      // Larger accent squares
      for (let i = 0; i < 8; i++) {
        const size = Math.random() * 0.1 + 0.08;
        const mat = new THREE.MeshBasicMaterial({ color: 0xa78bfa, transparent: true, opacity: Math.random() * 0.3 + 0.1 });
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(size, size), mat);
        mesh.position.set((Math.random() - 0.5) * 22, (Math.random() - 0.5) * 14, (Math.random() - 0.5) * 2);
        mesh.rotation.z = Math.random() * Math.PI;
        scene.add(mesh);
      }

      let raf: number;
      const animate = () => {
        raf = requestAnimationFrame(animate);
        squareGroup.rotation.z += 0.00015;
        squareGroup.rotation.y += 0.00008;
        renderer.render(scene, camera);
      };
      animate();

      const onResize = () => {
        if (!canvas.parentElement) return;
        renderer.setSize(canvas.parentElement.offsetWidth, canvas.parentElement.offsetHeight);
        camera.aspect = canvas.parentElement.offsetWidth / canvas.parentElement.offsetHeight;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", onResize);
      dispose.push(() => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); renderer.dispose(); });
    })();

    return () => { active = false; dispose.forEach(fn => fn()); };
  }, []);

  // ── GSAP title reveal ──
  useEffect(() => {
    const titleEl = titleRef.current;
    const badgeEl = badgeRef.current;
    if (!titleEl || !badgeEl) return;
    const init = async () => {
      const gsap = (await import("gsap")).default;
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo(badgeEl,
        { opacity: 0, y: 12, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.4)" }
      ).fromTo(titleEl.querySelectorAll(".word"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.07, ease: "power3.out" },
        "-=0.2"
      );
    };
    init();
  }, []);

  if (!isDesktop) return null;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden pt-[96px] md:pt-[120px] pb-16 md:pb-24 flex flex-col items-start justify-center"
      style={{ backgroundColor: "#F8F9FA" }}
    >
      {/* Three.js canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[1]" />

      {/* Grid mesh */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139,143,212,0.13) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,143,212,0.13) 1px, transparent 1px)
          `,
          backgroundSize: "120px 120px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{ background: "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(238,240,248,0.0), rgba(238,240,248,0.5) 80%)" }}
      />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8F9FA] to-transparent z-[4]" />

      {/* ── Content — LEFT aligned like original ── */}
      <m.div
        style={{ y, opacity }}
        className="relative z-10 container-page grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full"
      >
        {/* Left */}
        <div className="flex flex-col gap-6">

          {/* Badge — same structure, new theme */}
          <div
            ref={badgeRef}
            className="opacity-0 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 border"
            style={{
              backgroundColor: "rgba(255,255,255,0.7)",
              borderColor: "rgba(139,143,212,0.3)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="anim-pulse-scale">⚡</span>
            <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#6063EE" }}>
             Designed for Academic Operations
            </span>
          </div>

          {/* Title — original words, new colors */}
          <h1
            ref={titleRef}
            className="font-display font-bold leading-[1.08] tracking-tight"
            style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}
          >
            {TITLE_WORDS.map((w, i) => {
              // "institutional" and "communication." get the purple gradient
              const isGradient = i >= 3;
              return (
                <span
                  key={w}
                  className="word inline-block mr-[0.25em] opacity-0"
                  style={isGradient ? {
                    background: "linear-gradient(135deg, #4648D4 0%, #6063EE 50%, #7B7FF0 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  } : { color: "#1A1D26" }}
                >
                  {w}
                </span>
              );
            })}
          </h1>

          {/* Sub — original text, new muted color */}
          <m.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="text-[14px] leading-relaxed max-w-sm"
            style={{ color: "#61667A" }}
          >
            HermesWorkspace helps educational institutions manage communication,
            notices, meetings, academic coordination, and operational workflows
            through one connected platform.
          </m.p>

          {/* CTAs — original labels, new palette */}
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            <m.button
              whileHover={{ scale: 1.03, boxShadow: "0 16px 40px rgba(96,99,238,0.35)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                const target = document.getElementById("inmotion");
                if (target) {
                  const headerOffset = 60;
                  const elementPosition = target.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.scrollY - headerOffset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  });
                }
              }}
              className="text-white text-[13px] font-bold px-6 py-3 rounded-xl"
              style={{
                background: "linear-gradient(135deg, #4648D4, #6063EE)",
                boxShadow: "0 4px 20px rgba(96,99,238,0.28)",
              }}
            >
              Explore Platform
            </m.button>
            <m.button
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.9)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/contact?scroll=inquiry")}
              className="text-[13px] font-semibold px-6 py-3 rounded-xl border transition-colors"
              style={{
                backgroundColor: "rgba(255,255,255,0.6)",
                borderColor: "rgba(96,99,238,0.25)",
                color: "#4648D4",
                backdropFilter: "blur(8px)",
              }}
            >
              Request Demo
            </m.button>
          </m.div>

          {/* Trust dots — original labels */}
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="flex flex-wrap gap-5"
          >
            {[
              "Built for Educational Institutions",
              "Designed for Academic Coordination",
              "Accessible Across Web & Mobile"
            ].map((t, i) => (
              <span key={t} className="flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: "#A9ADC0" }}>
                <span className="size-1 rounded-full inline-block" style={{ backgroundColor: "#6063EE" }} />
                {t}
              </span>
            ))}
          </m.div>
        </div>

        {/* Right — Phone Mockup, same as original but with lavender glow */}
        <m.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center lg:justify-end"
        >
          <PhoneMockup />
        </m.div>
      </m.div>
    </section>
  );
}

const PHONE_BARS = [40, 65, 50, 80, 60, 90, 70, 85];

function PhoneMockup() {
  return (
    <div className="relative w-[220px] sm:w-[260px]">
      {/* Lavender glow instead of green */}
      <div className="absolute inset-0 rounded-[40px] blur-3xl scale-110" style={{ backgroundColor: "rgba(96,99,238,0.12)" }} />

      {/* Phone shell — light frosted glass */}
      <div
        className="relative border rounded-[32px] overflow-hidden shadow-2xl"
        style={{ aspectRatio: "9/19", backgroundColor: "#1a1d3a", borderColor: "rgba(139,143,212,0.2)" }}
      >
        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full z-10" style={{ backgroundColor: "#0f1128" }} />

        {/* Screen */}
        <div className="absolute inset-0 p-4 pt-10 flex flex-col gap-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="h-2 w-16 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
              <div className="h-1.5 w-10 rounded-full mt-1.5" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
            </div>
            <div className="size-6 rounded-full border" style={{ backgroundColor: "rgba(96,99,238,0.2)", borderColor: "rgba(96,99,238,0.35)" }} />
          </div>

          {/* Chart */}
          <div className="rounded-2xl p-3 border" style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="h-1.5 w-14 rounded-full mb-3" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
            <div className="flex items-end gap-1 h-12">
              {PHONE_BARS.map((h, i) => (
                <m.div
                  key={`bar-${h}-${i}`}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 1.2 + i * 0.07, duration: 0.5, ease: "easeOut" }}
                  className="flex-1 rounded-sm"
                  style={{ backgroundColor: i === 7 ? "#6063EE" : i === 3 ? "rgba(96,99,238,0.4)" : "rgba(255,255,255,0.1)" }}
                />
              ))}
            </div>
          </div>

          {/* Notification rows */}
          {[
            { dot: "#6063EE" },
            { dot: "#7B7FF0" },
            { dot: "#818cf8" },
          ].map((n, i) => (
            <m.div
              key={n.dot}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 + i * 0.1 }}
              className="flex items-center gap-2.5 rounded-xl p-2.5 border"
              style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.06)" }}
            >
              <div className="size-2 rounded-full flex-shrink-0" style={{ backgroundColor: n.dot }} />
              <div>
                <div className="h-1.5 w-20 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.25)" }} />
                <div className="h-1.5 w-14 rounded-full mt-1" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
              </div>
            </m.div>
          ))}

          {/* Bottom bar */}
          <div className="mt-auto flex justify-around pt-1">
            {[...Array(4)].map((_, i) => (
              <div key={`item-${i}`} className="flex flex-col items-center gap-1">
                <div className="size-5 rounded-md" style={{ backgroundColor: i === 0 ? "rgba(96,99,238,0.4)" : "rgba(255,255,255,0.1)" }} />
                <div className="w-3 h-1 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}