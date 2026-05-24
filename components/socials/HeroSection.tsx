"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, slideRight } from "@/components/socials/motion-variants";
import { ArrowRight, TrendingUp, Globe } from "lucide-react";

// Three.js floating particles background
function ThreeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animId: number;
    (async () => {
      const THREE = await import("three");
      const canvas = canvasRef.current;
      if (!canvas) return;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100);
      camera.position.z = 5;

      // Floating dots
      const geo = new THREE.BufferGeometry();
      const count = 180;
      const positions = new Float32Array(count * 3);
      const scales = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 12;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
        scales[i] = Math.random();
      }
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

      const mat = new THREE.PointsMaterial({
        color: 0x6b5ce7,
        size: 0.04,
        transparent: true,
        opacity: 0.5,
        sizeAttenuation: true,
      });
      const points = new THREE.Points(geo, mat);
      scene.add(points);

      // Thin grid lines
      const lineMat = new THREE.LineBasicMaterial({ color: 0x6b5ce7, opacity: 0.07, transparent: true });
      for (let i = -3; i <= 3; i++) {
        const lg = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-6, i * 1.2, 0),
          new THREE.Vector3(6, i * 1.2, 0),
        ]);
        scene.add(new THREE.Line(lg, lineMat));
        const lg2 = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(i * 2, -4, 0),
          new THREE.Vector3(i * 2, 4, 0),
        ]);
        scene.add(new THREE.Line(lg2, lineMat));
      }

      let t = 0;
      const animate = () => {
        t += 0.004;
        points.rotation.y = t * 0.15;
        points.rotation.x = Math.sin(t * 0.3) * 0.08;
        renderer.render(scene, camera);
        animId = requestAnimationFrame(animate);
      };
      animate();

      const onResize = () => {
        if (!canvas) return;
        renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
        camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(animId);
        renderer.dispose();
      };
    })();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

// Animated analytics card
function AnalyticsCard() {
  return (
    <motion.div
      variants={slideRight}
      className="relative bg-white rounded-2xl shadow-xl shadow-[#6B5CE7]/10 border border-[#E8E5F0] p-6 w-full max-w-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-[10px] tracking-[2px] uppercase text-[#9896A4] font-medium">
          Live Analytics View
        </span>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-2 h-2 rounded-full bg-emerald-400"
        />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 mb-5">
  <div className="bg-[#F8F7FF] rounded-xl p-4">
    <p className="text-[9px] tracking-[2px] uppercase text-[#9896A4] mb-1">
      Content Focus
    </p>

    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="text-xl font-black text-[#0D0D0F] tracking-tight"
    >
      Infrastructure
    </motion.p>
  </div>

  <div className="bg-[#F8F7FF] rounded-xl p-4">
    <p className="text-[9px] tracking-[2px] uppercase text-[#9896A4] mb-1">
      Community
    </p>

    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0 }}
      className="text-xl font-black text-[#0D0D0F] tracking-tight"
    >
      Founder-Led
    </motion.p>
  </div>
</div>

      {/* Sparkline */}
      <div className="mb-4">
        <svg viewBox="0 0 240 48" className="w-full h-12">
          <defs>
            <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6B5CE7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#6B5CE7" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,38 C20,35 40,28 60,30 C80,32 100,18 120,15 C140,12 160,20 180,10 C200,2 220,8 240,5"
            fill="none"
            stroke="#6B5CE7"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.8, delay: 0.6, ease: "easeOut" }}
          />
          <path
            d="M0,38 C20,35 40,28 60,30 C80,32 100,18 120,15 C140,12 160,20 180,10 C200,2 220,8 240,5 L240,48 L0,48 Z"
            fill="url(#spark)"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Integration pill */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
        className="flex items-center gap-2 bg-[#EAE8FF] rounded-xl px-3 py-2.5"
      >
        <div className="w-7 h-7 rounded-lg bg-[#6B5CE7] flex items-center justify-center">
          <TrendingUp size={13} className="text-white" />
        </div>
        <div className="flex-1">
          <div className="h-1.5 bg-[#6B5CE7]/30 rounded-full w-full overflow-hidden">
            <motion.div
              className="h-full bg-[#6B5CE7] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "72%" }}
              transition={{ delay: 1.4, duration: 1.2, ease: "easeOut" }}
            />
          </div>
        </div>
        <span className="text-[10px] font-semibold text-[#6B5CE7]">Institutional Narratives</span>
      </motion.div>
    </motion.div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#F9F8FF] pt-16">
      <ThreeCanvas />

      {/* Gradient blobs */}
      <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-[#6B5CE7]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#1A3FBE]/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp} className="mb-4">
            <span className="text-[10px] tracking-[3px] uppercase text-[#6B5CE7] font-medium bg-[#EAE8FF] px-3 py-1.5 rounded-[3px]">
              HermesWorkspace Digital Presence
            </span>
          </motion.div>

          <motion.h1
              variants={fadeUp}
              className="text-[clamp(42px,6vw,68px)] font-black leading-[1.0] tracking-tight text-[#0D0D0F] mb-6"
              style={{ fontFamily: "var(--font-playfair, serif)" }}
            >
              Sharing the future
              <br />
              of institutional
              <br />
              communication
              <br />
              <span className="text-[#6B5CE7]">in real time.</span>
            </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-[15px] leading-[1.75] text-[#666] max-w-md mb-8"
          >
             HermesWorkspace uses digital platforms to share product development,
             operational thinking, infrastructure design, educational innovation,
             and founder-led insights shaping the future of modern institutions.
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center gap-3 flex-wrap">
            <motion.a
              href="#platform"
              whileHover={{ scale: 1.04, boxShadow: "0 8px 30px rgba(107,92,231,0.35)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-[#6B5CE7] text-white text-[13px] font-medium px-5 py-3 rounded-[5px] transition-all"
            >
              Explore Platforms
              <ArrowRight size={14} />
            </motion.a>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 text-[#0D0D0F] text-[13px] font-medium px-5 py-3 rounded-[5px] border border-[#D8D4CC] hover:border-[#6B5CE7] transition-all"
            >
              Contact Media Team
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right: analytics card */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex justify-center lg:justify-end"
        >
          <AnalyticsCard />
        </motion.div>
      </div>
    </section>
  );
}
