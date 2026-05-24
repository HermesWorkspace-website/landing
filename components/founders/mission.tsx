"use client";

import { motion } from "framer-motion";

const FEATURES = [
  {
    num: "01",
    title: "Institutional Communication",
    text: "Structured announcements, notices, meetings, and real-time coordination across educational institutions.",
  },
  {
    num: "02",
    title: "Academic Operations",
    text: "Online classes, academic workflows, scheduling, and institutional coordination integrated into one system.",
  },
  {
    num: "03",
    title: "Scalable Infrastructure",
    text: "Infrastructure engineered for long-term reliability, institutional scalability, and operational performance.",
  },
];

export default function MissionSection() {
  return (
    <section
      id="mission"
      className="relative overflow-hidden border-t border-black/[0.04] bg-[#FAFAFA] py-28"
      style={{ fontFamily: "var(--font-body, 'Inter', sans-serif)" }}
    >
      {/* Ambient gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[12%] h-[320px] w-[320px] rounded-full bg-indigo-100/40 blur-3xl" />
        <div className="absolute right-[-8%] bottom-[0%] h-[280px] w-[280px] rounded-full bg-violet-100/30 blur-3xl" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-16 lg:px-24">


        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <h2 className="max-w-4xl text-[clamp(2rem,4vw,4rem)] font-black leading-[0.98] tracking-[-0.06em] text-black">
            Infrastructure Designed For{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
              Modern
            </span>{" "}
            Educational Operations.
          </h2>

          <p className="mt-8 max-w-2xl text-[17px] leading-[1.9] text-zinc-600">
            HermesWorkspace centralizes communication, academic coordination,
            operational workflows, and institutional infrastructure into one
            unified platform for modern schools.
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[28px] border border-black/[0.05] bg-black/[0.04] sm:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.num}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="group relative bg-white p-10 transition-all duration-500 hover:bg-zinc-50"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute left-1/2 top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-100/40 blur-3xl" />
              </div>

              <div className="relative z-10">
                <p className="mb-6 text-[11px] font-medium tracking-[0.24em] text-zinc-300">
                  {f.num}
                </p>

                <h3 className="mb-4 text-[1.35rem] font-bold leading-tight tracking-[-0.03em] text-black">
                  {f.title}
                </h3>

                <p className="text-[15px] leading-8 text-zinc-600">
                  {f.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}