"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { staggerContainer, scaleIn } from "@/components/socials/motion-variants";

// Placeholder gradient images with architectural grid feel
const IMAGES = [
  {
    label: "Infrastructure Lab",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    pattern: { cols: 6, rows: 8, color: "#6B5CE7" },
    aspect: "aspect-[4/5]",
  },
  {
    label: "Network Topology",
    gradient: "linear-gradient(135deg, #0D0D0F 0%, #1a0533 50%, #2d1066 100%)",
    pattern: { cols: 4, rows: 6, color: "#8B7FE8" },
    aspect: "aspect-[4/5]",
  },
  {
    label: "Urban Data Systems",
    gradient: "linear-gradient(135deg, #0a2548 0%, #1A3FBE 60%, #0d47a1 100%)",
    pattern: { cols: 5, rows: 7, color: "#64B5F6" },
    aspect: "aspect-[4/5]",
  },
];

function GridImage({ img, index }: { img: (typeof IMAGES)[0]; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      whileHover={{ scale: 1.02, zIndex: 10 }}
      transition={{ type: "spring", stiffness: 200 }}
      className={`relative ${img.aspect} rounded-2xl overflow-hidden group cursor-pointer`}
      style={{ background: img.gradient }}
    >
      {/* Grid pattern */}
      <motion.div style={{ y }} className="absolute inset-0">
        <svg className="w-full h-full opacity-20" viewBox="0 0 200 300">
          {Array.from({ length: img.pattern.cols }).map((_, c) =>
            Array.from({ length: img.pattern.rows }).map((_, r) => (
              <rect
                key={`${c}-${r}`}
                x={c * (200 / img.pattern.cols) + 2}
                y={r * (300 / img.pattern.rows) + 2}
                width={200 / img.pattern.cols - 4}
                height={300 / img.pattern.rows - 4}
                fill="none"
                stroke={img.pattern.color}
                strokeWidth="0.8"
                rx="2"
              />
            ))
          )}
        </svg>
      </motion.div>

      {/* Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse at 50% 50%, ${img.pattern.color}22 0%, transparent 70%)` }}
      />

      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <span className="text-[11px] tracking-[2px] uppercase text-white/80 font-medium">{img.label}</span>
      </div>
    </motion.div>
  );
}

export function ImageGallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="bg-white py-5" ref={ref}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="grid grid-cols-3 gap-4 container-page py-16"
      >
        {IMAGES.map((img, i) => (
          <GridImage key={img.label} img={img} index={i} />
        ))}
      </motion.div>
    </section>
  );
}
