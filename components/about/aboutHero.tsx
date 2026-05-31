"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import * as THREE from "three";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 80]);
  const opacity = useTransform(scrollY, [0, 350], [1, 0]);

  // Three.js floating particles
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100);
    camera.position.z = 5;

    // Particles
    const count = 120;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({ color: 0x22c55e, size: 0.04, transparent: true, opacity: 0.5 });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // Subtle grid lines
    const gridHelper = new THREE.GridHelper(20, 20, 0x0a1628, 0x0a1628);
    (gridHelper.material as THREE.LineBasicMaterial).transparent = true;
    (gridHelper.material as THREE.LineBasicMaterial).opacity = 0.04;
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

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  // GSAP title split animation
  useEffect(() => {
    if (!titleRef.current || !badgeRef.current) return;
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: 12, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.4)" }
    ).fromTo(
      titleRef.current.querySelectorAll(".word"),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" },
      "-=0.2"
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-white overflow-hidden pt-[96px] md:pt-[120px] pb-16 md:pb-24 flex items-center">
      {/* Three.js canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.7 }}
      />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(34,197,94,0.04),transparent)]" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 container-page grid grid-cols-1 lg:grid-cols-2 gap-12 items-start w-full"
      >
        {/* Left */}
        <div className="flex flex-col gap-6">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="opacity-0 inline-flex w-fit items-center gap-2 border border-[#22C55E]/30 bg-[#22C55E]/5 rounded-full px-3 py-1"
          >
            <span className="size-1.5 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="text-[11px] font-semibold text-[#22C55E] tracking-widest uppercase">
              Transforming Education
            </span>
          </div>

          {/* Headline */}
          <h1 ref={titleRef} className="font-display text-[2.6rem] lg:text-[3.4rem] font-bold text-[#0A1628] leading-[1.1] tracking-tight">
            {["Building", "Modern", "Infrastructure", "For", "Educational", "Institutions"].map((w, i) => (
              <span key={`item-${i}`} className="word inline-block mr-[0.28em] opacity-0">{w}</span>
            ))}
          </h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="text-[#6B7280] text-[14px] leading-relaxed max-w-sm"
          >
            HermesWorkspace is the backbone of the next generation of academic management, delivering high-performance tools for clarity and scale.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#0D1F38" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                const section = document.getElementById("mission");
                if (section) {
                  section.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
              className="flex items-center gap-2 bg-[#0A1628] text-white text-[13px] font-semibold px-5 py-2.5 rounded-md"
            >
              Get Started
              <span className="text-[#22C55E]">→</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Right — Dashboard Cards */}
        <motion.div
          initial={{ opacity: 0, x: 40, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.8, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4 pt-4"
        >
          {/* Workspace Health Card */}
          <WorkspaceHealthCard />

          {/* Resource Allocation Card */}
          <ResourceAllocationCard />
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

function WorkspaceHealthCard() {
  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: "0 20px 40px rgba(10,22,40,0.1)" }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm w-full max-w-xs ml-auto"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="size-6 bg-[#0A1628] rounded-md flex items-center justify-center">
            <div className="size-3 bg-[#22C55E] rounded-[2px]" />
          </div>
          <span className="text-[12px] font-semibold text-[#0A1628]">Platform Status</span>
        </div>
        <span className="text-[10px] text-[#22C55E] font-medium flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-[#22C55E] animate-pulse inline-block" />
          Live Infrastructure
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-gray-500">System Stability</span>
        <span className="text-[12px] font-bold text-[#0A1628]">24/7</span>
      </div>
      <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "99.98%" }}
          transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
          className="h-full bg-[#22C55E] rounded-full"
        />
      </div>
    </motion.div>
  );
}

const RESOURCE_BARS = [65, 82, 48, 91, 73, 55, 88];

function ResourceAllocationCard() {
  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: "0 20px 40px rgba(10,22,40,0.1)" }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-[#0A1628] rounded-xl p-4 shadow-sm w-[80%] ml-auto overflow-hidden relative"
    >
      {/* Subtle glow */}
      <div className="absolute top-0 right-0 size-24 bg-[#22C55E]/10 rounded-full blur-2xl" />
      <div className="relative z-10">
        <div className="flex items-end gap-1 h-14 mb-3">
          {RESOURCE_BARS.map((h, i) => (
            <motion.div
              key={`item-${i}`}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 1.2 + i * 0.08, duration: 0.6, ease: "easeOut" }}
              className="flex-1 rounded-sm"
              style={{ backgroundColor: i === 3 ? "#22C55E" : "rgba(255,255,255,0.15)" }}
            />
          ))}
        </div>
        <p className="text-[12px] font-semibold text-white">Institutional Activity</p>
        <p className="text-[10px] text-gray-400 mt-0.5">Connected communication and coordination across modern academic workflows.</p>
      </div>
    </motion.div>
  );
}
