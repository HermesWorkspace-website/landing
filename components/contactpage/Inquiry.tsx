"use client";
import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  IconChevronDown,
  IconCircleCheck,
  IconSend,
  IconMapPin,
  IconClock,
  IconMail,
  IconBolt,
  IconAlertCircle,
} from "@tabler/icons-react";
import { InquirySchema, INQUIRY_TYPES, type InquiryFieldErrors } from "@/lib/validations/inquiry";
import AnimatedCounter from "./AnimatedCounter";

// ── Types ─────────────────────────────────────────────────────────────────────
type FormState = {
  fullName: string;
  institution: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
};

type FieldKey = keyof FormState;

const INITIAL_FORM: FormState = {
  fullName: "",
  institution: "",
  email: "",
  phone: "",
  inquiryType: "Demo Request",
  message: "",
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function Inquiry() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [focused, setFocused] = useState<FieldKey | null>(null);
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState<InquiryFieldErrors>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // ── Client-side validation helpers ───────────────────────────────────────
  /** Run full schema and return a flat map of first error per field */
  const validateAll = (data: FormState): InquiryFieldErrors => {
    const result = InquirySchema.safeParse(data);
    if (result.success) return {};
    const flat = result.error.flatten().fieldErrors;
    const out: InquiryFieldErrors = {};
    (Object.keys(flat) as FieldKey[]).forEach((k) => {
      const msgs = flat[k as keyof typeof flat];
      if (msgs && msgs.length > 0) out[k] = msgs[0];
    });
    return out;
  };

  /** Validate a single field against the full schema */
  const validateSingle = (key: FieldKey, nextForm: FormState) => {
    const result = InquirySchema.safeParse(nextForm);
    if (result.success) {
      setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
    } else {
      const flat = result.error.flatten().fieldErrors;
      const msgs = flat[key as keyof typeof flat];
      setFieldErrors((prev) => ({
        ...prev,
        [key]: msgs && msgs.length > 0 ? msgs[0] : undefined,
      }));
    }
  };

  const handleChange = (key: FieldKey, value: string) => {
    const next = { ...form, [key]: value };
    setForm(next);
    // Only show live errors once the field has been blurred at least once
    if (touched[key]) validateSingle(key, next);
  };

  const handleBlur = (key: FieldKey) => {
    setFocused(null);
    setTouched((prev) => ({ ...prev, [key]: true }));
    validateSingle(key, form);
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSend = async () => {
    // Touch everything and run client validation before hitting the network
    const allTouched = Object.fromEntries(
      (Object.keys(form) as FieldKey[]).map((k) => [k, true])
    ) as Partial<Record<FieldKey, boolean>>;
    setTouched(allTouched);

    const clientErrors = validateAll(form);
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      setGlobalError("Please fix the highlighted errors before submitting.");
      return;
    }

    setLoading(true);
    setFieldErrors({});
    setGlobalError(null);

    try {
      const res = await fetch("/api/send_inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.status === 422) {
        // Map server field errors (arrays) to single strings
        const serverErrors: InquiryFieldErrors = {};
        if (data.errors) {
          (Object.keys(data.errors) as FieldKey[]).forEach((k) => {
            const msgs = data.errors[k];
            if (Array.isArray(msgs) && msgs.length > 0) serverErrors[k] = msgs[0];
          });
        }
        setFieldErrors(serverErrors);
        setGlobalError(data.message ?? "Please fix the errors above.");
      } else if (!res.ok || !data.success) {
        setGlobalError(data.message ?? "Something went wrong. Please try again.");
      } else {
        setSent(true);
        setForm(INITIAL_FORM);
        setTouched({});
        setTimeout(() => setSent(false), 4500);
      }
    } catch {
      setGlobalError("Network error — check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Style helpers ─────────────────────────────────────────────────────────
  const inputStyle = (name: FieldKey): React.CSSProperties => ({
    width: "100%",
    border: `1px solid ${
      fieldErrors[name]
        ? "#EF4444"
        : focused === name
        ? "var(--brand)"
        : "var(--ink-12)"
    }`,
    boxShadow: fieldErrors[name]
      ? "0 0 0 3px rgba(239,68,68,0.10)"
      : focused === name
      ? "0 0 0 3px rgba(90,95,232,0.12)"
      : "none",
    borderRadius: 12,
    padding: "10px 14px",
    fontSize: 12,
    fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
    fontWeight: 500,
    color: "var(--ink)",
    background: "#fff",
    transition: "all 0.2s",
    outline: "none",
  });

  const label = (text: string, required = true) => (
    <span
      className="block mb-1.5 uppercase tracking-widest font-body font-bold"
      style={{ fontSize: 9.5, color: "var(--ink-35)" }}
    >
      {text}
      {required && (
        <span style={{ color: "#EF4444", marginLeft: 2 }}>*</span>
      )}
    </span>
  );

  const errMsg = (name: FieldKey) =>
    fieldErrors[name] ? (
      <motion.p
        key={fieldErrors[name]}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-1 flex items-center gap-1 text-[10px] font-medium"
        style={{ color: "#EF4444" }}
      >
        <IconAlertCircle size={10} />
        {fieldErrors[name]}
      </motion.p>
    ) : null;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <section
      ref={ref}
      id="inquiry"
      className="py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #fff 0%, rgba(90,95,232,0.02) 100%)" }}
    >
      <div
        className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(90,95,232,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 font-inter">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8" style={{ background: "var(--brand)" }} />
            <span
              className="text-[9px] font-bold font-body uppercase tracking-widest"
              style={{ color: "var(--brand)" }}
            >
              Direct Channel
            </span>
          </div>
          <h2
            className="text-[2.5rem] font-black font-display tracking-tight"
            style={{ color: "var(--ink)" }}
          >
            Send an Inquiry
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-start">
          {/* ── Form ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {/* Name + Institution */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                {label("Full Name")}
                <input
                  placeholder="John Doe"
                  value={form.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  onFocus={() => setFocused("fullName")}
                  onBlur={() => handleBlur("fullName")}
                  style={inputStyle("fullName")}
                />
                {errMsg("fullName")}
              </div>
              <div>
                {label("Institution")}
                <input
                  placeholder="Global Tech University"
                  value={form.institution}
                  onChange={(e) => handleChange("institution", e.target.value)}
                  onFocus={() => setFocused("institution")}
                  onBlur={() => handleBlur("institution")}
                  style={inputStyle("institution")}
                />
                {errMsg("institution")}
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              {label("Email Address")}
              <input
                type="email"
                placeholder="john@institution.edu"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onFocus={() => setFocused("email")}
                onBlur={() => handleBlur("email")}
                style={inputStyle("email")}
              />
              {errMsg("email")}
            </div>

            {/* Phone (optional) */}
            <div className="mb-4">
              {label("Phone Number", false)}
              <input
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                onFocus={() => setFocused("phone")}
                onBlur={() => handleBlur("phone")}
                style={inputStyle("phone")}
              />
              {errMsg("phone")}
            </div>

            {/* Inquiry Type */}
            <div className="mb-4">
              {label("Inquiry Type")}
              <div className="relative">
                <select
                  value={form.inquiryType}
                  onChange={(e) => handleChange("inquiryType", e.target.value)}
                  onFocus={() => setFocused("inquiryType")}
                  onBlur={() => handleBlur("inquiryType")}
                  style={{
                    ...inputStyle("inquiryType"),
                    appearance: "none",
                    paddingRight: 36,
                    cursor: "pointer",
                  }}
                >
                  {INQUIRY_TYPES.map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
                <IconChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  size={14}
                  style={{ color: "var(--ink-35)" }}
                />
              </div>
              {errMsg("inquiryType")}
            </div>

            {/* Message */}
            <div className="mb-4">
              {label("Message")}
              <textarea
                rows={4}
                placeholder="How can we assist your institution?"
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                onFocus={() => setFocused("message")}
                onBlur={() => handleBlur("message")}
                style={{ ...inputStyle("message"), resize: "none" }}
              />
              <div className="flex justify-between items-start mt-1">
                <div>{errMsg("message")}</div>
                <span
                  className="text-[9px] font-mono shrink-0 ml-2"
                  style={{
                    color: form.message.length > 1900 ? "#EF4444" : "var(--ink-35)",
                  }}
                >
                  {form.message.length}/2000
                </span>
              </div>
            </div>

            {/* Global error banner */}
            <AnimatePresence>
              {globalError && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mb-4 px-4 py-3 rounded-xl flex items-start gap-2.5 text-[11px] font-medium"
                  style={{
                    background: "rgba(239,68,68,0.07)",
                    color: "#EF4444",
                    border: "1px solid rgba(239,68,68,0.18)",
                  }}
                >
                  <IconAlertCircle size={14} className="shrink-0 mt-px" />
                  {globalError}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              onClick={handleSend}
              disabled={loading || sent}
              whileHover={
                !loading && !sent
                  ? { scale: 1.02, boxShadow: "0 12px 36px rgba(90,95,232,0.35)" }
                  : {}
              }
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 rounded-xl text-[13px] font-bold font-body text-white flex items-center justify-center gap-2.5 relative overflow-hidden"
              style={{
                background: sent ? "#22C55E" : "var(--brand)",
                transition: "background 0.5s",
              }}
            >
              {/* Shimmer */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
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
                    <IconCircleCheck size={16} /> Inquiry Dispatched!
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    Dispatch Inquiry <IconSend size={16} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>

          {/* ── Info Panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6 font-inter"
          >
            {[
              {
                icon: <IconMapPin size={16} />,
                title: "Headquarters",
                body: "HermesWorkspace, Ranchi\nJharkhand, India",
              },
              {
                icon: <IconClock size={16} />,
                title: "Support Hours",
                body: "Mon – Fri, 9:00 AM – 8:00 PM IST\n24/7 Priority Support for Enterprise",
              },
              {
                icon: <IconMail size={16} />,
                title: "Email",
                body: "support@hermesworkspace.com",
              },
              {
                icon: <IconBolt size={16} />,
                title: "Response Time",
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
                  <div
                    className="text-[12px] font-bold mb-0.5"
                    style={{ color: "var(--ink)" }}
                  >
                    {item.title}
                  </div>
                  <div
                    className="text-[11px] font-body leading-[1.65] whitespace-pre-line"
                    style={{ color: "var(--ink-60)" }}
                  >
                    {item.body}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Live stats */}
            <div
              className="mt-6 pt-6 grid grid-cols-2 gap-4"
              style={{ borderTop: "1px solid var(--ink-06)" }}
            >
              {[
                { val: 5, label: "Core Platform Modules", suffix: "" },
  { val: 3, label: "Connected Experiences", suffix: "" },
              ].map((s: { val: number; label: string; suffix: string; decimals?: number }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.75 + i * 0.1 }}
                >
                  <div
                    className="text-[2rem] font-black font-display leading-none"
                    style={{ color: "var(--ink)" }}
                  >
                    <AnimatedCounter
                      target={s.val}
                      suffix={s.suffix}
                      decimals={s.decimals ?? 0}
                      delay={800 + i * 100}
                    />
                  </div>
                  <div
                    className="text-[9px] uppercase tracking-widest font-body mt-1"
                    style={{ color: "var(--ink-35)" }}
                  >
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
