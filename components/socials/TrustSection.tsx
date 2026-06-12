"use client";

import { useEffect, useRef } from "react";
import { m, useInView } from "framer-motion";
import { staggerContainer, fadeUp, slideLeft, slideRight } from "@/components/socials/motion-variants";

// Animated 3D orb background
function OrbCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let active = true;
    let animId: number;
    let renderer: any = null;

    (async () => {
      const THREE = await import("three");
      if (!active) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100);
      camera.position.z = 4;

      // Wireframe sphere
      const geo = new THREE.IcosahedronGeometry(1.4, 2);
      const mat = new THREE.MeshBasicMaterial({
        color: 0x6063ee,
        wireframe: true,
        opacity: 0.12,
        transparent: true,
      });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);

      let t = 0;
      const animate = () => {
        if (!active) return;
        t += 0.003;
        mesh.rotation.x = t * 0.4;
        mesh.rotation.y = t * 0.6;
        renderer.render(scene, camera);
        animId = requestAnimationFrame(animate);
      };
      animate();
    })();

    return () => {
      active = false;
      cancelAnimationFrame(animId);
      if (renderer) {
        renderer.dispose();
      }
    };
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
      <div className="container-page grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: manifesto */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <m.h2
            variants={slideLeft}
            className="text-[clamp(36px,5vw,60px)] font-black text-[#0D0D0F] leading-[1.05] tracking-tight mb-6"
          >
            Building systems that improve
             <br />
            institutional{" "}
            <span className="text-[#6063EE]">clarity.</span>
          </m.h2>

          <m.p variants={fadeUp} className="text-[14px] leading-[1.8] text-[#666] mb-8 max-w-sm">
            HermesWorkspace was created to simplify how institutions communicate,
            coordinate, and operate. We believe modern educational environments
            deserve connected systems designed specifically for academic workflows
            rather than fragmented generic tools.
          </m.p>

          <m.ul variants={staggerContainer} className="space-y-3">
            {PILLARS.map((pillar, i) => (
              <m.li
                key={pillar}
                variants={fadeUp}
                className="flex items-center gap-3 text-[13px] font-medium text-[#0D0D0F] tracking-wide"
              >
                <m.span
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                  className="block w-3 h-px bg-[#6063EE] origin-left"
                />
                <span className="text-[10px] tracking-[2px] uppercase">{pillar}</span>
              </m.li>
            ))}
          </m.ul>
        </m.div>

        {/* Right: quote card */}
        <m.div
          variants={slideRight}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="relative"
        >
          {/* Orb bg */}
          <div className="absolute -top-20 -right-20 size-64 opacity-60 pointer-events-none">
            <OrbCanvas />
          </div>

          <m.div
            whileHover={{ y: -4, boxShadow: "0 30px 80px rgba(96,99,238,0.12)" }}
            transition={{ type: "spring", stiffness: 280 }}
            className="relative bg-white rounded-3xl border border-[#E8E5F0] p-10 shadow-xl shadow-[#6063EE]/6"
          >
            {/* Quote mark */}
            <div
              className="text-[64px] leading-none text-[#6063EE] opacity-20 mb-4 select-none"
              style={{ fontFamily: "Georgia, serif" }}
            >
              "
            </div>

            <m.blockquote
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-[20px] leading-[1.55] font-medium text-[#0D0D0F] mb-8 font-display italic"
            >
              We believe institutional technology should reduce complexity —
              helping educators and organizations focus on people,
              communication, and long-term growth.
            </m.blockquote>

            {/* Author */}
            <div className="flex items-center gap-3">
              <m.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
                className="size-10 rounded-full bg-[#EAE8FF] flex items-center justify-center"
              >
                <span className="text-[11px] font-black text-[#6063EE]">HW</span>
              </m.div>
              <div>
                <p className="text-[13px] font-semibold text-[#0D0D0F]">Founding Members</p>
                <p className="text-[11px] text-[#9896A4]">HermesWorkspace</p>
              </div>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
