"use client";

import { useEffect, useRef } from "react";
import { m, useInView } from "framer-motion";
import { staggerContainer, fadeUp } from "@/components/socials/motion-variants";
import { useCountUp } from "@/components/socials/useCountUp";

function DarkCanvas() {
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
      const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100);
      camera.position.z = 6;

      // Large wireframe torus
      const geo = new THREE.TorusGeometry(2.5, 0.8, 8, 32);
      const mat = new THREE.MeshBasicMaterial({
        color: 0x6063ee,
        wireframe: true,
        opacity: 0.08,
        transparent: true,
      });
      const torus = new THREE.Mesh(geo, mat);
      scene.add(torus);

      // Floating particles
      const pGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(120 * 3);
      for (let i = 0; i < 120 * 3; i++) positions[i] = (Math.random() - 0.5) * 16;
      pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0x6063ee, size: 0.06, transparent: true, opacity: 0.3 })));

      let t = 0;
      const animate = () => {
        if (!active) return;
        t += 0.004;
        torus.rotation.x = t * 0.3;
        torus.rotation.y = t * 0.5;
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

interface StatCounterProps {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  started: boolean;
}

function StatCounter({ value, suffix, label, sublabel, started }: StatCounterProps) {
  const count = useCountUp(value, 2200, started);
  return (
    <m.div variants={fadeUp} className="text-center">
      <m.p
        className="text-[clamp(40px,6vw,72px)] font-black text-white leading-none tracking-tight"
      >
        {count.toFixed(1).replace(/\.0$/, "")}{suffix}
      </m.p>
      <p className="text-[11px] tracking-[2px] uppercase text-[#9896A4] mt-3 mb-1">{label}</p>
      <p className="text-[12px] text-[#666] max-w-[160px] mx-auto leading-relaxed">{sublabel}</p>
    </m.div>
  );
}

const STATS = [
  {
    value: 1,
    suffix: "",
    label: "CONNECTED PLATFORM",
    sublabel:
      "One unified system for communication, meetings, notices, and institutional coordination.",
  },

  {
    value: 24,
    suffix: "+",
    label: "OPERATIONAL WORKFLOWS",
    sublabel:
      "Designed to simplify academic operations across administrators, teachers, students, and institutions.",
  },

  {
    value: 100,
    suffix: "%",
    label: "FOCUSED ON EDUCATION",
    sublabel:
      "Built specifically for modern educational environments rather than adapted from generic workplace software.",
  },
];

export function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-28 bg-[#0D0D0F] overflow-hidden" ref={ref}>
      <DarkCanvas />

      {/* Gradient vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0F]/80 via-transparent to-[#0D0D0F]/80 pointer-events-none" />

      <div className="relative container-page">
        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {/* Headline */}
          <m.div variants={fadeUp} className="text-center mb-16">
            <h2
              className="text-[clamp(36px,5.5vw,72px)] font-black text-white leading-[1.05] tracking-tight font-display"
            >
              Designed for modern institutions.
              <br />
              Built for long-term operational clarity.
            </h2>
          </m.div>

          {/* Stats */}
          <m.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16"
          >
            {STATS.map((stat) => (
              <StatCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                sublabel={stat.sublabel}
                started={inView}
              />
            ))}
          </m.div>

          {/* CTA */}
          <m.div variants={fadeUp} className="flex justify-center">
            <m.a
              href="/contact"
              whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(96,99,238,0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#6063EE] text-white text-[13px] font-semibold px-8 py-3.5 rounded-full tracking-wide"
            >
              Join the Network
            </m.a>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
