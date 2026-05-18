"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { CheckCircle, Lock, Server } from "lucide-react";

interface AlertItem {
  text: string;
  sub: string;
  type: "alert" | "normal" | "critical";
}

const alerts: AlertItem[] = [
  {
    text: "Emergency Notice Published",
    sub: "Delivered to students, parents, and faculty",
    type: "critical",
  },
  {
    text: "Parent Meeting Reminder",
    sub: "Scheduled notice shared with Class 10 guardians",
    type: "normal",
  },
  {
    text: "Exam Schedule Updated",
    sub: "Academic timetable synchronized institution-wide",
    type: "alert",
  },
  {
    text: "Faculty Coordination Update",
    sub: "Department-wide announcement successfully distributed",
    type: "normal",
  },
];

export default function Realtime() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setActiveIndex((v) => (v + 1) % alerts.length), 2000);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section ref={ref} className="relative py-28 overflow-hidden" style={{ background: "var(--dark)" }}>
      {/* Ambient effects */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(90,95,232,0.14) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(168,85,247,0.08) 0%, transparent 70%)" }}
      />

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none animate-grid" style={{
        backgroundImage: "linear-gradient(rgba(90,95,232,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(90,95,232,0.04) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        {/* Text */}
        <div>
          <motion.div
            className="flex items-center gap-2 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
          >
            <motion.span
              className="w-2 h-2 rounded-full"
              style={{ background: "var(--green)" }}
              animate={{ scale: [1, 1.6, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest font-syne">
              Platform Status: Live
            </span>
          </motion.div>

          <motion.h2
            className="font-display leading-[1.05] tracking-[-0.035em] text-white mb-6"
            style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Keep every{" "}
            <span className="shimmer-text-dark">classroom, department, and parent</span>
            <br />Connected
          </motion.h2>

          <motion.p
            className="text-[14px] font-body leading-[1.75] mb-10 max-w-[400px]"
            style={{ color: "rgba(255,255,255,0.5)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.22 }}
          >
            Coordinate communication across admin, teachers, students, and parents
through a secure and structured institutional platform.
          </motion.p>

          <div className="space-y-3.5">
            {[
              { icon: <CheckCircle className="w-4 h-4" />, label: "Centralized School Announcements", color: "#22C55E" },
              { icon: <Lock className="w-4 h-4" />, label: "Secure Role-Based Access Control", color: "var(--brand-light)" },
              { icon: <Server className="w-4 h-4" />, label: "Scalable Cloud Infrastructure", color: "#a855f7" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  style={{ color: item.color }}
                >
                  {item.icon}
                </motion.div>
                <span className="text-[12px] font-semibold font-body" style={{ color: item.color }}>
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, x: 50, y: 20 }}
          animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "#161b22",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(90,95,232,0.1)",
            }}
          >
            {/* Window chrome */}
            <div className="flex items-center gap-1.5 px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
                <motion.div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full cursor-pointer"
                  style={{ background: c }}
                  whileHover={{ scale: 1.3 }}
                />
              ))}
              <span className="text-[9px] font-body ml-3" style={{ color: "rgba(255,255,255,0.25)" }}>
                LIVE COMMUNICATION SYSTEM · CAMPUS-WIDE COORDINATION ACTIVE
              </span>
            </div>

            <div className="p-4 space-y-2.5">
              {alerts.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.55 + i * 0.13 }}
                  className="flex items-start gap-3 p-3.5 rounded-xl relative overflow-hidden"
                  style={{
                    background:
                      a.type === "critical"
                        ? "var(--brand)"
                        : a.type === "alert"
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(255,255,255,0.03)",
                    border:
                      a.type === "critical"
                        ? "1px solid rgba(255,255,255,0.15)"
                        : "1px solid rgba(255,255,255,0.04)",
                    boxShadow: activeIndex === i ? "0 0 0 2px var(--brand)" : "none",
                    transition: "box-shadow 0.3s",
                  }}
                >
                  {a.type === "critical" && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }}
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                  )}
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                    style={{
                      background:
                        a.type === "critical" ? "#fff" : a.type === "alert" ? "#F59E0B" : "rgba(255,255,255,0.3)",
                    }}
                    animate={activeIndex === i ? { scale: [1, 1.5, 1] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <div>
                    <div
                      className="text-[10px] font-semibold font-body"
                      style={{ color: a.type === "critical" ? "#fff" : "rgba(255,255,255,0.85)" }}
                    >
                      {a.text}
                    </div>
                    <div
                      className="text-[9px] font-body mt-0.5"
                      style={{ color: a.type === "critical" ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)" }}
                    >
                      {a.sub}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Status bar */}
            <div
              className="px-4 py-3 flex items-center gap-2"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#22C55E" }}
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
              <span className="text-[8px] font-syne" style={{ color: "rgba(255,255,255,0.3)" }}>
                LIVE STREAM ACTIVE · 4 CLUSTERS CONNECTED
              </span>
            </div>
          </div>

          {/* Glow */}
          <div
            className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(90,95,232,0.35) 0%, transparent 70%)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
