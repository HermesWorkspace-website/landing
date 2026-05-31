"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import * as THREE from "three";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // ── Three.js square particles ──
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
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
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); renderer.dispose(); };
  }, []);

  // ── GSAP title reveal ──
  useEffect(() => {
    if (!titleRef.current || !badgeRef.current) return;
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(badgeRef.current,
      { opacity: 0, y: 12, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.4)" }
    ).fromTo(titleRef.current.querySelectorAll(".word"),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.07, ease: "power3.out" },
      "-=0.2"
    );
  }, []);

  const titleWords = ["Modern", "infrastructure", "for", "institutional", "communication."];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden pt-[96px] md:pt-[120px] pb-16 md:pb-24 flex flex-col items-start justify-center"
      style={{ backgroundColor: "#eef0f8" }}
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
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#eef0f8] to-transparent z-[4]" />

      {/* ── Content — LEFT aligned like original ── */}
      <motion.div
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
            <motion.span
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >⚡</motion.span>
            <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#6366f1" }}>
             Designed for Academic Operations
            </span>
          </div>

          {/* Title — original words, new colors */}
          <h1
            ref={titleRef}
            className="font-display font-bold leading-[1.08] tracking-tight"
            style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}
          >
            {titleWords.map((w, i) => {
              // "institutional" and "communication." get the purple gradient
              const isGradient = i >= 3;
              return (
                <span
                  key={i}
                  className="word inline-block mr-[0.25em] opacity-0"
                  style={isGradient ? {
                    background: "linear-gradient(135deg, #4338ca 0%, #6366f1 50%, #a78bfa 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  } : { color: "#0d0e1c" }}
                >
                  {w}
                </span>
              );
            })}
          </h1>

          {/* Sub — original text, new muted color */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="text-[14px] leading-relaxed max-w-sm"
            style={{ color: "#6b7096" }}
          >
            HermesWorkspace helps educational institutions manage communication,
            notices, meetings, academic coordination, and operational workflows
            through one connected platform.
          </motion.p>

          {/* CTAs — original labels, new palette */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 16px 40px rgba(99,102,241,0.35)" }}
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
                background: "linear-gradient(135deg, #4338ca, #6366f1)",
                boxShadow: "0 4px 20px rgba(99,102,241,0.28)",
              }}
            >
              Explore Platform
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.9)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/contact?scroll=inquiry")}
              className="text-[13px] font-semibold px-6 py-3 rounded-xl border transition-colors"
              style={{
                backgroundColor: "rgba(255,255,255,0.6)",
                borderColor: "rgba(99,102,241,0.25)",
                color: "#4338ca",
                backdropFilter: "blur(8px)",
              }}
            >
              Request Demo
            </motion.button>
          </motion.div>

          {/* Trust dots — original labels */}
          <motion.div
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
              <span key={i} className="flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: "#8b8fbd" }}>
                <span className="w-1 h-1 rounded-full inline-block" style={{ backgroundColor: "#6366f1" }} />
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right — Phone Mockup, same as original but with lavender glow */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center lg:justify-end"
        >
          <PhoneMockup />
        </motion.div>
      </motion.div>
    </section>
  );
}

function PhoneMockup() {
  const bars = [40, 65, 50, 80, 60, 90, 70, 85];
  return (
    <div className="relative w-[220px] sm:w-[260px]">
      {/* Lavender glow instead of green */}
      <div className="absolute inset-0 rounded-[40px] blur-3xl scale-110" style={{ backgroundColor: "rgba(99,102,241,0.12)" }} />

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
            <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: "rgba(99,102,241,0.2)", borderColor: "rgba(99,102,241,0.35)" }} />
          </div>

          {/* Chart */}
          <div className="rounded-2xl p-3 border" style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="h-1.5 w-14 rounded-full mb-3" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
            <div className="flex items-end gap-1 h-12">
              {bars.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 1.2 + i * 0.07, duration: 0.5, ease: "easeOut" }}
                  className="flex-1 rounded-sm"
                  style={{ backgroundColor: i === 7 ? "#6366f1" : i === 3 ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.1)" }}
                />
              ))}
            </div>
          </div>

          {/* Notification rows */}
          {[
            { dot: "#6366f1" },
            { dot: "#a78bfa" },
            { dot: "#818cf8" },
          ].map((n, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 + i * 0.1 }}
              className="flex items-center gap-2.5 rounded-xl p-2.5 border"
              style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.06)" }}
            >
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: n.dot }} />
              <div>
                <div className="h-1.5 w-20 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.25)" }} />
                <div className="h-1.5 w-14 rounded-full mt-1" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
              </div>
            </motion.div>
          ))}

          {/* Bottom bar */}
          <div className="mt-auto flex justify-around pt-1">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="w-5 h-5 rounded-md" style={{ backgroundColor: i === 0 ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.1)" }} />
                <div className="w-3 h-1 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}