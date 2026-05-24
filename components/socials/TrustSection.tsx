"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, fadeUp, slideLeft, slideRight } from "@/components/socials/motion-variants";

// Animated 3D orb background
function OrbCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animId: number;
    (async () => {
      const THREE = await import("three");
      const canvas = canvasRef.current;
      if (!canvas) return;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100);
      camera.position.z = 4;

      // Wireframe sphere
      const geo = new THREE.IcosahedronGeometry(1.4, 2);
      const mat = new THREE.MeshBasicMaterial({
        color: 0x6b5ce7,
        wireframe: true,
        opacity: 0.12,
        transparent: true,
      });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);

      let t = 0;
      const animate = () => {
        t += 0.003;
        mesh.rotation.x = t * 0.4;
        mesh.rotation.y = t * 0.6;
        renderer.render(scene, camera);
        animId = requestAnimationFrame(animate);
      };
      animate();
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

const PILLARS = [
  "Institutional Communication",
  "Operational Coordination",
  "Modern Educational Infrastructure",
];

export function TrustSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="trust" className="py-28 bg-[#F9F8FF] overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: manifesto */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.h2
            variants={slideLeft}
            className="text-[clamp(36px,5vw,60px)] font-black text-[#0D0D0F] leading-[1.05] tracking-tight mb-6"
          >
            Building systems that improve
             <br />
            institutional{" "}
            <span className="text-[#6B5CE7]">clarity.</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-[14px] leading-[1.8] text-[#666] mb-8 max-w-sm">
            HermesWorkspace was created to simplify how institutions communicate,
            coordinate, and operate. We believe modern educational environments
            deserve connected systems designed specifically for academic workflows
            rather than fragmented generic tools.
          </motion.p>

          <motion.ul variants={staggerContainer} className="space-y-3">
            {PILLARS.map((pillar, i) => (
              <motion.li
                key={pillar}
                variants={fadeUp}
                className="flex items-center gap-3 text-[13px] font-medium text-[#0D0D0F] tracking-wide"
              >
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.4, origin: "left" }}
                  className="block w-3 h-px bg-[#6B5CE7] origin-left"
                />
                <span className="text-[10px] tracking-[2px] uppercase">{pillar}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Right: quote card */}
        <motion.div
          variants={slideRight}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="relative"
        >
          {/* Orb bg */}
          <div className="absolute -top-20 -right-20 w-64 h-64 opacity-60 pointer-events-none">
            <OrbCanvas />
          </div>

          <motion.div
            whileHover={{ y: -4, boxShadow: "0 30px 80px rgba(107,92,231,0.12)" }}
            transition={{ type: "spring", stiffness: 280 }}
            className="relative bg-white rounded-3xl border border-[#E8E5F0] p-10 shadow-xl shadow-[#6B5CE7]/6"
          >
            {/* Quote mark */}
            <div
              className="text-[64px] leading-none text-[#6B5CE7] opacity-20 mb-4 select-none"
              style={{ fontFamily: "Georgia, serif" }}
            >
              "
            </div>

            <motion.blockquote
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-[20px] leading-[1.55] font-medium text-[#0D0D0F] mb-8"
              style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontStyle: "italic" }}
            >
              We believe institutional technology should reduce complexity —
              helping educators and organizations focus on people,
              communication, and long-term growth.
            </motion.blockquote>

            {/* Author */}
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
                className="w-10 h-10 rounded-full bg-[#EAE8FF] flex items-center justify-center"
              >
                <span className="text-[11px] font-black text-[#6B5CE7]">HW</span>
              </motion.div>
              <div>
                <p className="text-[13px] font-semibold text-[#0D0D0F]">Founding Members</p>
                <p className="text-[11px] text-[#9896A4]">HermesWorkspace</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
