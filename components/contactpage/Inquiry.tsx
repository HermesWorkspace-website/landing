"use client";
import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle, Send, MapPin, Clock, Mail, Zap } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

export default function Inquiry() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [focused, setFocused] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    }, 1500);
  };

  const field = (name: string) => ({
    onFocus: () => setFocused(name),
    onBlur: () => setFocused(null),
    style: {
      width: "100%",
      border: `1px solid ${focused === name ? "var(--brand)" : "var(--ink-12)"}`,
      boxShadow: focused === name ? "0 0 0 3px rgba(90,95,232,0.12)" : "none",
      borderRadius: 12,
      padding: "10px 14px",
      fontSize: 12,
      fontFamily: "Instrument Sans, sans-serif",
      fontWeight: 500,
      color: "var(--ink)",
      background: "#fff",
      transition: "all 0.2s",
      outline: "none",
    } as React.CSSProperties,
  });

  const label = (text: string) => (
    <span
      className="block mb-1.5 uppercase tracking-widest font-syne font-bold"
      style={{ fontSize: 8, color: "var(--ink-35)" }}
    >
      {text}
    </span>
  );

  return (
    <section
      ref={ref} id="inquiry"
      className="py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #fff 0%, rgba(90,95,232,0.02) 100%)" }}
    >
      {/* BG decoration */}
      <div
        className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(90,95,232,0.04) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8" style={{ background: "var(--brand)" }} />
            <span className="text-[9px] font-bold font-syne uppercase tracking-widest" style={{ color: "var(--brand)" }}>
              Direct Channel
            </span>
          </div>
          <h2 className="text-[2.5rem] font-black font-display tracking-tight" style={{ color: "var(--ink)" }}>
            Send an Inquiry
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                {label("Full Name")}
                <input placeholder="John Doe" {...field("name")} />
              </div>
              <div>
                {label("Institution")}
                <input placeholder="Global Tech University" {...field("inst")} />
              </div>
            </div>
            <div className="mb-4">
              {label("Email Address")}
              <input type="email" placeholder="john@institution.edu" {...field("email")} />
            </div>
            <div className="mb-4">
              {label("Phone Number")}
              <input placeholder="+91 98765 43210" {...field("phone")} />
            </div>
            <div className="mb-4">
              {label("Inquiry Type")}
              <div className="relative">
                <select
                  {...field("type")}
                  style={{ ...field("type").style, appearance: "none", paddingRight: 36, cursor: "pointer" }}
                >
                  {["General Inquiry", "Partnership", "Technical Support", "Onboarding", "Demo Request"].map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
                  style={{ color: "var(--ink-35)" }}
                />
              </div>
            </div>
            <div className="mb-6">
              {label("Message")}
              <textarea
                rows={4}
                placeholder="How can we assist your institution?"
                {...field("msg")}
                style={{ ...field("msg").style, resize: "none" }}
              />
            </div>

            <motion.button
              onClick={handleSend}
              disabled={loading || sent}
              whileHover={!loading && !sent ? { scale: 1.02, boxShadow: "0 12px 36px rgba(90,95,232,0.35)" } : {}}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 rounded-xl text-[13px] font-bold font-body text-white flex items-center justify-center gap-2.5 relative overflow-hidden"
              style={{ background: sent ? "#22C55E" : "var(--brand)", transition: "background 0.5s" }}
            >
              {/* Shimmer sweep on hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
                }}
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />

              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    />
                    Sending...
                  </motion.div>
                ) : sent ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" /> Inquiry Dispatched!
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    Dispatch Inquiry <Send className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            {[
              {
                icon: <MapPin className="w-4 h-4" />,
                title: "Headquarters",
                body: "HermesWorkspace, Ranchi\nJharkhand, India",
              },
              {
                icon: <Clock className="w-4 h-4" />,
                title: "Support Hours",
                body: "Mon – Fri, 9:00 AM – 8:00 PM IST\n24/7 Priority Support for Enterprise",
              },
              {
                icon: <Mail className="w-4 h-4" />,
                title: "Email",
                body: "apurav@hermesworkspace.com\nhello@hermesworkspace.com",
              },
              {
                icon: <Zap className="w-4 h-4" />,
                title: "Response SLA",
                body: "Initial response within 2 academic hours.\nTier 1 resolution within 12 hours.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex gap-4 group"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.1 }}
              >
                <motion.div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "rgba(90,95,232,0.08)", color: "var(--brand)" }}
                  whileHover={{ scale: 1.1, background: "rgba(90,95,232,0.14)" }}
                >
                  {item.icon}
                </motion.div>
                <div>
                  <div className="text-[12px] font-bold font-syne mb-0.5" style={{ color: "var(--ink)" }}>
                    {item.title}
                  </div>
                  <div className="text-[11px] font-body leading-[1.65] whitespace-pre-line" style={{ color: "var(--ink-60)" }}>
                    {item.body}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Live stats */}
            <div className="mt-6 pt-6 grid grid-cols-2 gap-4" style={{ borderTop: "1px solid var(--ink-06)" }}>
              {[
                { val: 128, label: "Active Nodes", suffix: "" },
                { val: 0.4, label: "System Latency", suffix: "ms", decimals: 1 },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.75 + i * 0.1 }}
                >
                  <div className="text-[2rem] font-black font-display leading-none" style={{ color: "var(--ink)" }}>
                    <AnimatedCounter target={s.val} suffix={s.suffix} decimals={s.decimals ?? 0} delay={800 + i * 100} />
                  </div>
                  <div className="text-[8px] uppercase tracking-widest font-syne mt-1" style={{ color: "var(--ink-35)" }}>
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
