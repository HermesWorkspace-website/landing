"use client";

/**
 * MobileContactPage.tsx — Lightweight mobile-only view for the Contact page.
 *
 * HOW TO USE (zero changes to desktop files):
 *   In your contact/page.tsx:
 *
 *   import { MobileContactPage } from "@/components/contact/MobileContactPage";
 *
 *   return (
 *     <>
 *       <div className="hidden md:block">
 *         <ContactPage />   // your existing desktop component
 *       </div>
 *       <div className="block md:hidden">
 *         <MobileContactPage />
 *       </div>
 *     </>
 *   );
 *
 * What's removed vs desktop:
 *  - Three.js canvas (contacthero) — biggest perf cost, gone
 *  - GSAP parallax / ScrollTrigger — unnecessary on mobile
 *  - useMagnetic hook — mouse-only effect, not applicable
 *  - Animated word cycling in hero — simplified to static text
 *  - Realtime dark section heavy ambient/grid background effects
 *  - Heavy framer-motion scroll parallax
 *  - AnimatedCounter (still works but uses simpler CSS trigger)
 *
 * What's kept:
 *  - All brand CSS variables (--brand, --ink, --dark, etc.)
 *  - Full inquiry form with validation + API call (identical logic)
 *  - FAQ accordion
 *  - All content: Hero → Features → Inquiry Form → Realtime → FAQ → CTA
 *  - Active tap feedback on all buttons
 */

import React, { useState, useRef, useEffect, ReactNode } from "react";
import { AnimatePresence, m } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Shield,
  Globe,
  Zap,
  Clock,
  CheckCircle,
  Users,
  Handshake,
  Newspaper,
  Sparkles,
  Plus,
  Minus,
  Server,
  Lock,
} from "lucide-react";
import {
  IconChevronDown,
  IconCircleCheck,
  IconSend,
  IconMapPin,
  IconClock,
  IconMail,
  IconBolt,
  IconAlertCircle,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* ─────────────────────────────────────────────
   These imports come from your existing codebase
   ───────────────────────────────────────────── */
import { InquirySchema, INQUIRY_TYPES, type InquiryFieldErrors } from "@/lib/validations/inquiry";

/* ─────────────────────────────────────────────
   Tiny visibility hook (CSS-only animations)
   ───────────────────────────────────────────── */
function useVisible(rootMargin = "-30px") {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const marginRef = useRef(rootMargin);

  useEffect(() => {
    marginRef.current = rootMargin;
  }, [rootMargin]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { rootMargin: marginRef.current }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ─────────────────────────────────────────────
   Fade-up wrapper — CSS transition, zero JS lib
   ───────────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = "" }: {
  children: ReactNode; delay?: number; className?: string;
}) {
  const { ref, visible } = useVisible();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const scrollToInquiry = () => {
  const el = document.getElementById("m-inquiry");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* ══════════════════════════════════════════════
    1. HERO
    ══════════════════════════════════════════════ */
function MobileHero() {
  const router = useRouter();

  return (
    <section className="relative overflow-x-hidden bg-white px-5 pt-[96px] pb-10">
      {/* Static gradient blob — replaces Three.js canvas */}
      <div
        className="pointer-events-none absolute right-0 top-0 size-72 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(96,99,238,0.06) 0%, transparent 70%)" }}
      />
      {/* Faint grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "linear-gradient(rgba(100,100,100,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(100,100,100,0.2) 1px, transparent 1px)",
          backgroundSize: "78px 78px",
        }}
      />

      <div className="relative z-10 w-full min-w-0 max-w-full">
        <div className="flex w-full min-w-0 max-w-full flex-col items-start text-left">
          {/* Badge */}
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2"
            style={{ background: "rgba(96,99,238,0.08)", border: "1px solid rgba(96,99,238,0.2)" }}
          >
            <span
              className="size-1.5 animate-pulse rounded-full"
              style={{ background: "var(--brand)" }}
            />
            <span
              className="text-[10px] font-bold font-display uppercase tracking-[0.18em]"
              style={{ color: "var(--brand)" }}
            >
              Contact Support
            </span>
          </m.div>

          {/* Headline — stacked like desktop mobile hero */}
          <div className="mb-5 w-full min-w-0 max-w-full">
            <h1
              className="font-display w-full max-w-full break-words leading-[1.02] tracking-[-0.04em]"
              style={{ fontSize: "clamp(2rem, 8.2vw, 3.25rem)", color: "var(--ink)" }}
            >
              <span style={{ color: "var(--brand)" }}>Connect</span>
              <br />
              With
              <br />
              <span className="shimmer-text">Institutional</span>
              <br />
              <span style={{ opacity: 0.18 }}>Precision.</span>
            </h1>
          </div>

          <p
            className="mb-8 w-full max-w-full text-[clamp(0.875rem,3.8vw,0.9375rem)] font-body leading-[1.75]"
            style={{ color: "var(--ink-60)" }}
          >
            Built for academic coordination. Reach the HermesWorkspace team for
            onboarding, partnerships, institutional support, and platform inquiries.
          </p>

          {/* CTAs */}
          <div className="mb-8 flex w-full flex-col gap-3">
            <button type="button"
              onClick={scrollToInquiry}
              className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl text-[13px] font-bold font-body text-white active:scale-[0.98] transition-transform"
              style={{ background: "var(--brand)" }}
            >
              Request Demo
              <ArrowRight className="size-4 shrink-0" />
            </button>
            <a
              href="mailto:support@hermesworkspace.com"
              className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border text-[13px] font-bold font-body active:scale-[0.98] transition-transform"
              style={{
                background: "rgba(96,99,238,0.08)",
                borderColor: "rgba(96,99,238,0.25)",
                color: "var(--ink)",
              }}
            >
              <Mail className="size-4 shrink-0" style={{ color: "var(--brand)" }} />
              Contact Support
            </a>
          </div>

          {/* Trust bar */}
          <div
            className="flex w-full min-w-0 max-w-full flex-col gap-3 border-t pt-6"
            style={{ borderColor: "var(--ink-06)" }}
          >
            {[
              { icon: <Shield className="size-3.5 shrink-0" />, label: "Secure Institutional Access" },
              { icon: <Globe className="size-3.5 shrink-0" />, label: "Web & Mobile Accessibility" },
              { icon: <Zap className="size-3.5 shrink-0" />, label: "Built for Academic Coordination" },
            ].map((item, i) => (
              <div key={item.label} className="flex w-full min-w-0 max-w-full items-start gap-1.5">
                <span className="mt-0.5 shrink-0" style={{ color: "var(--brand)" }}>{item.icon}</span>
                <span className="min-w-0 text-[11px] font-semibold font-body leading-snug" style={{ color: "var(--ink-60)" }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Contact info cards — stacked */}
          <div className="mt-8 flex w-full min-w-0 flex-col gap-3">
        {/* Partnerships */}
        <div
          className="bg-white rounded-2xl p-4 shadow-sm"
          style={{ border: "1px solid var(--ink-06)" }}
        >
          <div className="flex items-start gap-3">
            <div
              className="size-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(96,99,238,0.08)" }}
            >
              <Globe className="size-4" style={{ color: "var(--brand)" }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[13px] font-bold" style={{ color: "var(--ink)" }}>
                  Institutional Partnerships
                </p>
                <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-500">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </span>
              </div>
              <p className="text-[12px] leading-relaxed mb-2" style={{ color: "var(--ink-60)" }}>
                Collaborating with schools focused on modernizing communication and infrastructure.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["Education", "Operations", "Infrastructure"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(96,99,238,0.07)", color: "var(--brand)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Email */}
        <div
          className="bg-white rounded-2xl p-4 shadow-sm"
          style={{ border: "1px solid var(--ink-06)" }}
        >
          <div className="flex items-start gap-3">
            <div
              className="size-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(96,99,238,0.08)" }}
            >
              <Mail className="size-4" style={{ color: "var(--brand)" }} />
            </div>
            <div>
              <p className="text-[13px] font-bold mb-1" style={{ color: "var(--ink)" }}>
                Institutional Inquiries
              </p>
              <p className="text-[12px] mb-1.5" style={{ color: "var(--ink-60)" }}>
                Partnerships, onboarding, and platform inquiries.
              </p>
              <a
                href="mailto:connect@hermesworkspace.com"
                className="text-[13px] font-bold"
                style={{ color: "var(--brand)" }}
              >
                connect@hermesworkspace.com
              </a>
            </div>
          </div>
        </div>

        {/* Response time */}
        <div
          className="bg-white rounded-2xl p-4 shadow-sm"
          style={{ border: "1px solid var(--ink-06)" }}
        >
          <div className="flex items-start gap-3">
            <div
              className="size-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(96,99,238,0.08)" }}
            >
              <Clock className="size-4" style={{ color: "var(--brand)" }} />
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-bold mb-1" style={{ color: "var(--ink)" }}>
                Response Time
              </p>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {[
                  { label: "Inquiry", time: "24hrs" },
                  { label: "Email", time: "24hrs" },
                  { label: "Demo", time: "1-2 Days" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl p-2 text-center"
                    style={{ background: "rgba(96,99,238,0.05)" }}
                  >
                    <p className="text-[11px] font-bold" style={{ color: "var(--brand)" }}>
                      {s.time}
                    </p>
                    <p className="text-[9px] mt-0.5" style={{ color: "var(--ink-60)" }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust checkmarks */}
        <div className="flex flex-col gap-2 px-1 mt-1">
          {[
            "No sales pressure — just honest answers",
            "Supporting modern institutional operations",
            "Free Demo available for qualifying institutions",
          ].map((text, i) => (
            <div key={text} className="flex items-center gap-2">
              <CheckCircle className="size-3.5 shrink-0 text-emerald-500" />
              <span className="text-[12px]" style={{ color: "var(--ink-60)" }}>
                {text}
              </span>
            </div>
          ))}
        </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   2. FEATURES
   ══════════════════════════════════════════════ */
const FEATURES = [
  {
    icon: <Users className="size-4" />,
    color: "#6063EE",
    title: "Structured School Communication",
    desc: "Role-based channels for administrators, teachers, students, and parents across classes and departments.",
  },
  {
    icon: <Handshake className="size-4" />,
    color: "#6063EE",
    title: "Academic Operations",
    desc: "Manage meetings, notices, events, and institutional coordination from one centralized platform.",
  },
  {
    icon: <Newspaper className="size-4" />,
    color: "#6063EE",
    title: "Secure Digital Infrastructure",
    desc: "Verified notice delivery, secure access control, and scalable cloud infrastructure.",
  },
];

function MobileFeatures() {
  return (
    <section className="px-5 py-14 bg-white">
      <FadeUp>
        <div
          className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full"
          style={{ background: "rgba(96,99,238,0.07)", border: "1px solid rgba(96,99,238,0.15)" }}
        >
          <Sparkles className="size-3" style={{ color: "var(--brand)" }} />
          <span
            className="text-[9px] font-bold font-display uppercase tracking-[0.18em]"
            style={{ color: "var(--brand)" }}
          >
            What we offer
          </span>
        </div>
        <h2
          className="text-[1.7rem] font-black font-display tracking-tight mb-8"
          style={{ color: "var(--ink)" }}
        >
          Everything your school needs
        </h2>
      </FadeUp>

      <div className="flex flex-col gap-4">
        {FEATURES.map((card, i) => (
          <FadeUp key={card.title} delay={i * 70}>
            <div
              className="rounded-2xl p-5 bg-white"
              style={{ border: "1px solid var(--ink-06)", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}
            >
              <div
                className="size-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${card.color}12`, color: card.color }}
              >
                {card.icon}
              </div>
              <h3 className="text-[14px] font-bold font-display mb-2" style={{ color: "var(--ink)" }}>
                {card.title}
              </h3>
              <p className="text-[12.5px] font-body leading-[1.65]" style={{ color: "var(--ink-60)" }}>
                {card.desc}
              </p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   3. INQUIRY FORM
   Full form logic preserved — same API call
   ══════════════════════════════════════════════ */
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

const FieldLabel = ({ text, required = true }: { text: string; required?: boolean }) => (
  <span
    className="block mb-1.5 uppercase tracking-widest font-body font-bold"
    style={{ fontSize: 9.5, color: "var(--ink-35)" }}
  >
    {text}
    {required && <span style={{ color: "#EF4444", marginLeft: 2 }}>*</span>}
  </span>
);

const ErrMsg = ({ name, fieldErrors }: { name: FieldKey; fieldErrors: InquiryFieldErrors }) =>
  fieldErrors[name] ? (
    <p
      className="mt-1 flex items-center gap-1 text-[10px] font-medium"
      style={{ color: "#EF4444" }}
    >
      <IconAlertCircle size={10} />
      {fieldErrors[name]}
    </p>
  ) : null;

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

function MobileInquiry() {
  const [focused, setFocused] = useState<FieldKey | null>(null);
  const touchedRef = useRef<Partial<Record<FieldKey, boolean>>>({});
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState<InquiryFieldErrors>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateSingle = (key: FieldKey, nextForm: FormState) => {
    const result = InquirySchema.safeParse(nextForm);
    if (result.success) {
      setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
    } else {
      const flat = result.error.flatten().fieldErrors;
      const msgs = flat[key as keyof typeof flat];
      setFieldErrors((prev) => ({ ...prev, [key]: msgs?.[0] }));
    }
  };

  const handleChange = (key: FieldKey, value: string) => {
    const next = { ...form, [key]: value };
    setForm(next);
    if (touchedRef.current[key]) validateSingle(key, next);
  };

  const handleBlur = (key: FieldKey) => {
    setFocused(null);
    touchedRef.current = { ...touchedRef.current, [key]: true };
    validateSingle(key, form);
  };

  const handleSend = async () => {
    const allTouched = Object.fromEntries(
      (Object.keys(form) as FieldKey[]).map((k) => [k, true])
    ) as Partial<Record<FieldKey, boolean>>;
    touchedRef.current = allTouched;
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
        touchedRef.current = {};
        setTimeout(() => setSent(false), 4500);
      }
    } catch {
      setGlobalError("Network error — check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (name: FieldKey): React.CSSProperties => ({
    width: "100%",
    border: `1px solid ${fieldErrors[name] ? "#EF4444" : focused === name ? "var(--brand)" : "var(--ink-12)"}`,
    boxShadow: fieldErrors[name]
      ? "0 0 0 3px rgba(239,68,68,0.10)"
      : focused === name
      ? "0 0 0 3px rgba(96,99,238,0.12)"
      : "none",
    borderRadius: 12,
    padding: "11px 14px",
    fontSize: 13,
    fontFamily: "var(--font-body, Inter, sans-serif)",
    fontWeight: 500,
    color: "var(--ink)",
    background: "#fff",
    transition: "all 0.2s",
    outline: "none",
    WebkitAppearance: "none",
  });

  return (
    <section
      id="m-inquiry"
      className="px-5 py-14 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #fff 0%, rgba(96,99,238,0.02) 100%)" }}
    >
      <FadeUp>
        <div className="flex items-center gap-2 mb-2">
          <div className="h-px w-6" style={{ background: "var(--brand)" }} />
          <span
            className="text-[9px] font-bold font-body uppercase tracking-widest"
            style={{ color: "var(--brand)" }}
          >
            Get in Touch
          </span>
        </div>
        <h2
          className="text-[1.65rem] font-black font-display tracking-tight mb-1"
          style={{ color: "var(--ink)" }}
        >
          Send an Inquiry
        </h2>
        <p className="text-[12px] font-body mb-7" style={{ color: "var(--ink-60)" }}>
          We respond to every institutional inquiry within one business day.
        </p>
      </FadeUp>

      {/* Form */}
      <FadeUp delay={80}>
        <div>
          {/* Name + Institution */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <FieldLabel text="Full Name" />
              <input
                type="text"
                placeholder="Your name"
                aria-label="Full Name"
                value={form.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                onFocus={() => setFocused("fullName")}
                onBlur={() => handleBlur("fullName")}
                style={inputStyle("fullName")}
              />
              <ErrMsg name="fullName" fieldErrors={fieldErrors} />
            </div>
            <div>
              <FieldLabel text="Institution" />
              <input
                type="text"
                placeholder="School name"
                aria-label="Institution"
                value={form.institution}
                onChange={(e) => handleChange("institution", e.target.value)}
                onFocus={() => setFocused("institution")}
                onBlur={() => handleBlur("institution")}
                style={inputStyle("institution")}
              />
              <ErrMsg name="institution" fieldErrors={fieldErrors} />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <FieldLabel text="Email" />
            <input
              type="email"
              placeholder="you@school.edu"
              aria-label="Email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onFocus={() => setFocused("email")}
              onBlur={() => handleBlur("email")}
              style={inputStyle("email")}
            />
            <ErrMsg name="email" fieldErrors={fieldErrors} />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <FieldLabel text="Phone" required={false} />
            <input
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              aria-label="Phone"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              onFocus={() => setFocused("phone")}
              onBlur={() => handleBlur("phone")}
              style={inputStyle("phone")}
            />
            <ErrMsg name="phone" fieldErrors={fieldErrors} />
          </div>

          {/* Inquiry Type */}
          <div className="mb-4">
            <FieldLabel text="Inquiry Type" />
            <div className="relative">
              <select
                aria-label="Inquiry Type"
                value={form.inquiryType}
                onChange={(e) => handleChange("inquiryType", e.target.value)}
                onFocus={() => setFocused("inquiryType")}
                onBlur={() => handleBlur("inquiryType")}
                style={{ ...inputStyle("inquiryType"), paddingRight: 36, cursor: "pointer" }}
              >
                {INQUIRY_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <IconChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                size={14}
                style={{ color: "var(--ink-35)" }}
              />
            </div>
            <ErrMsg name="inquiryType" fieldErrors={fieldErrors} />
          </div>

          {/* Message */}
          <div className="mb-4">
            <FieldLabel text="Message" />
              <textarea
                rows={4}
                placeholder="How can we assist your institution?"
                aria-label="Message"
                value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              onFocus={() => setFocused("message")}
              onBlur={() => handleBlur("message")}
              style={{ ...inputStyle("message"), resize: "none" }}
            />
            <div className="flex justify-between items-start mt-1">
              <ErrMsg name="message" fieldErrors={fieldErrors} />
              <span
                className="text-[9px] font-body shrink-0 ml-2"
                style={{ color: form.message.length > 1900 ? "#EF4444" : "var(--ink-35)" }}
              >
                {form.message.length}/2000
              </span>
            </div>
          </div>

          {/* Global error */}
          <AnimatePresence>
            {globalError && (
              <m.div
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
              </m.div>
            )}
          </AnimatePresence>

          {/* Submit */}
          <button type="button"
            onClick={handleSend}
            disabled={loading || sent}
            className="w-full py-3.5 rounded-xl text-[13px] font-bold font-body text-white flex items-center justify-center gap-2.5 active:scale-95 transition-transform"
            style={{
              background: sent ? "#1E8B4C" : "var(--brand)",
              transition: "background 0.5s, transform 0.1s",
            }}
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <m.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <div
                    className="size-4 rounded-full border-2 border-white/30 border-t-white anim-spin"
                  />
                  Sending...
                </m.div>
              ) : sent ? (
                <m.div key="sent" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <IconCircleCheck size={16} /> Inquiry Dispatched!
                </m.div>
              ) : (
                <m.div key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  Dispatch Inquiry <IconSend size={16} />
                </m.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </FadeUp>

      {/* Contact info panel */}
      <FadeUp delay={120} className="mt-10">
        <div
          className="pt-8 flex flex-col gap-5"
          style={{ borderTop: "1px solid var(--ink-06)" }}
        >
          {[
            { icon: <IconMapPin size={15} />, title: "Headquarters", body: "HermesWorkspace, Ranchi\nJharkhand, India" },
            { icon: <IconClock size={15} />, title: "Support Hours", body: "Mon – Fri, 9:00 AM – 8:00 PM IST\n24/7 Priority Support for Enterprise" },
            { icon: <IconMail size={15} />, title: "Email", body: "support@hermesworkspace.com" },
            { icon: <IconBolt size={15} />, title: "Response Time", body: "Initial response within 2 academic hours.\nTier 1 resolution within 12 hours." },
          ].map((item, i) => (
            <div key={item.title} className="flex gap-3">
              <div
                className="size-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: "rgba(96,99,238,0.08)", color: "var(--brand)" }}
              >
                {item.icon}
              </div>
              <div>
                <div className="text-[12px] font-bold mb-0.5" style={{ color: "var(--ink)" }}>
                  {item.title}
                </div>
                <div
                  className="text-[11px] font-body leading-[1.65] whitespace-pre-line"
                  style={{ color: "var(--ink-60)" }}
                >
                  {item.body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}

/* ══════════════════════════════════════════════
   4. REALTIME — simplified dark section
   No heavy ambient blobs or animated grid bg
   ══════════════════════════════════════════════ */
const ALERTS = [
  { text: "Emergency Notice Published", sub: "Delivered to students, parents, and faculty", type: "critical" as const },
  { text: "Parent Meeting Reminder", sub: "Scheduled notice shared with Class 10 guardians", type: "normal" as const },
  { text: "Exam Schedule Updated", sub: "Academic timetable synchronized institution-wide", type: "alert" as const },
  { text: "Faculty Coordination Update", sub: "Department-wide announcement successfully distributed", type: "normal" as const },
];

function MobileRealtime() {
  const { ref, visible } = useVisible("-40px");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => setActiveIndex((v) => (v + 1) % ALERTS.length), 2000);
    return () => clearInterval(id);
  }, [visible]);

  return (
    <section
      ref={ref as any}
      className="relative py-16 px-5 overflow-hidden"
      style={{ background: "var(--dark)" }}
    >
      {/* Minimal ambient — no heavy blurs */}
      <div
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(96,99,238,0.12) 0%, transparent 70%)" }}
      />

      {/* Live badge */}
      <div
        className="flex items-center gap-2 mb-6"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s" }}
      >
        <span
          className="size-2 rounded-full animate-pulse"
          style={{ background: "#6063EE" }}
        />
        <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest font-display">
          Platform Status: Live
        </span>
      </div>

      <h2
        className="font-display leading-[1.05] tracking-[-0.035em] text-white mb-5"
        style={{
          fontSize: "clamp(1.7rem,8vw,2.2rem)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s 0.1s, transform 0.7s 0.1s",
        }}
      >
        Keep every classroom,
        <br />
        department, and parent
        <br />
        <span className="shimmer-text-dark">Connected</span>
      </h2>

      <p
        className="text-[13px] font-body leading-[1.75] mb-8"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        Coordinate communication across admin, teachers, students, and parents
        through a secure and structured institutional platform.
      </p>

      {/* Feature bullets */}
      <div className="space-y-3 mb-8">
        {[
          { icon: <CheckCircle className="size-4" />, label: "Centralized School Announcements", color: "#6063EE" },
          { icon: <Lock className="size-4" />, label: "Secure Role-Based Access Control", color: "var(--brand-light)" },
          { icon: <Server className="size-4" />, label: "Scalable Cloud Infrastructure", color: "#6063EE" },
        ].map((item, i) => (
          <div key={item.label} className="flex items-center gap-3">
            <span style={{ color: item.color }}>{item.icon}</span>
            <span className="text-[12px] font-semibold font-body" style={{ color: item.color }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Terminal window — simplified */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "#161b22",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
        }}
      >
        {/* Chrome bar */}
        <div
          className="flex items-center gap-1.5 px-4 py-2.5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
            <div key={c} className="size-2.5 rounded-full" style={{ background: c }} />
          ))}
          <span className="text-[8px] font-body ml-2" style={{ color: "rgba(255,255,255,0.2)" }}>
            LIVE · CAMPUS-WIDE COORDINATION ACTIVE
          </span>
        </div>

        <div className="p-3 space-y-2">
          {ALERTS.map((a, i) => (
            <div
              key={a.text}
              className="flex items-start gap-2.5 p-3 rounded-xl"
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
                outline: activeIndex === i ? "2px solid var(--brand)" : "none",
                transition: "outline 0.3s",
              }}
            >
              <div
                className="size-1.5 rounded-full mt-1.5 shrink-0"
                style={{
                  background:
                    a.type === "critical" ? "#fff" : a.type === "alert" ? "#F59E0B" : "rgba(255,255,255,0.3)",
                }}
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
            </div>
          ))}
        </div>

        <div
          className="px-4 py-2.5 flex items-center gap-2"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <span
            className="size-1.5 rounded-full animate-pulse"
            style={{ background: "#6063EE" }}
          />
          <span className="text-[8px] font-display" style={{ color: "rgba(255,255,255,0.3)" }}>
            LIVE · 4 CLUSTERS CONNECTED
          </span>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   5. FAQ
   ══════════════════════════════════════════════ */
const FAQS = [
  { q: "How can schools get started with HermesWorkspace?", a: "Institutions can contact our team through the inquiry form to discuss onboarding, platform setup, and operational requirements." },
  { q: "Do you provide onboarding assistance for institutions?", a: "Yes. We assist schools with platform onboarding, deployment guidance, and initial operational coordination." },
  { q: "Can we request a platform walkthrough or demo?", a: "Yes. Schools and academic institutions can request guided product walkthroughs and platform demonstrations through the contact page." },
  { q: "Who is HermesWorkspace designed for?", a: "HermesWorkspace is built for schools and educational institutions looking to improve communication, coordination, notices, meetings, and academic operations." },
  { q: "Is HermesWorkspace accessible on mobile devices?", a: "Yes. HermesWorkspace is accessible across web, Android, and iOS platforms for administrators, teachers, students, and families." },
  { q: "How does HermesWorkspace support institutional communication?", a: "The platform helps schools manage announcements, meetings, notices, academic coordination, and structured communication through a centralized system." },
];

function FAQItem({ q, a, open, toggle }: { q: string; a: string; open: boolean; toggle: () => void }) {
  return (
    <button type="button" className="w-full text-left p-0 bg-transparent border-0 border-b cursor-pointer" style={{ borderColor: "var(--ink-06)" }} onClick={toggle}>
      <div className="py-4 flex items-start justify-between gap-3">
        <h3 className="font-body font-medium text-[14px] pr-3" style={{ color: "var(--ink)" }}>{q}</h3>
        <div
          className="size-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-all"
          style={{
            borderColor: open ? "var(--brand)" : "var(--ink-12)",
            background: open ? "rgba(96,99,238,0.1)" : "transparent",
            color: open ? "var(--brand)" : "var(--ink-35)",
            transform: open ? "rotate(45deg)" : "none",
          }}
        >
          {open ? <Minus className="size-3" /> : <Plus className="size-3" />}
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-[13px] font-body leading-relaxed pr-6" style={{ color: "var(--ink-60)" }}>
              {a}
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </button>
  );
}

function MobileFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section className="py-14 px-5 bg-white">
      <FadeUp>
        <span
          className="text-[9px] font-bold font-display uppercase tracking-widest block mb-2"
          style={{ color: "var(--brand)" }}
        >
          FAQ
        </span>
        <h2
          className="text-[1.65rem] font-black font-display tracking-tight mb-8"
          style={{ color: "var(--ink)" }}
        >
          Questions? <span className="gradient-text-brand">Answered.</span>
        </h2>
      </FadeUp>
      <FadeUp delay={80}>
        {FAQS.map((f, i) => (
          <FAQItem
            key={f.q}
            q={f.q}
            a={f.a}
            open={openIdx === i}
            toggle={() => setOpenIdx(openIdx === i ? null : i)}
          />
        ))}
      </FadeUp>
    </section>
  );
}

/* ══════════════════════════════════════════════
   6. CTA
   No useMagnetic (mouse-only), no rotating rings
   ══════════════════════════════════════════════ */
function MobileCTA() {
  const router = useRouter();

  return (
    <section className="px-5 pb-20 pt-4">
      <FadeUp>
        <div
          className="relative rounded-3xl px-6 py-14 text-center overflow-hidden"
          style={{ background: "var(--dark)" }}
        >
          {/* Top glow line */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 h-px pointer-events-none"
            style={{
              width: "60%",
              background: "linear-gradient(90deg, transparent, rgba(96,99,238,0.6), transparent)",
            }}
          />
          {/* Subtle radial */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(96,99,238,0.18) 0%, transparent 60%)" }}
          />

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full"
            style={{ background: "rgba(96,99,238,0.15)", border: "1px solid rgba(96,99,238,0.3)" }}
          >
            <Sparkles className="size-3" style={{ color: "var(--brand-light)" }} />
            <span
              className="text-[9px] font-bold font-display uppercase tracking-widest"
              style={{ color: "var(--brand-light)" }}
            >
              Every School. One Platform.
            </span>
          </div>

          <h2
            className="font-display text-white leading-[1.08] tracking-[-0.03em] mb-4 text-[1.65rem] font-black"
          >
            Ready To Modernize{" "}
            <span className="shimmer-text-dark">Institutional</span>{" "}
            Communication?
          </h2>

          <p
            className="text-[13px] font-body mb-8 max-w-[280px] mx-auto"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Join forward-thinking schools across India that have unified their
            operations with HermesWorkspace.
          </p>

          <div className="flex flex-col gap-3">
            <button type="button"
              onClick={scrollToInquiry}
              className="w-full py-3.5 rounded-xl text-[13px] font-bold font-body active:scale-95 transition-transform"
              style={{ background: "#fff", color: "var(--ink)" }}
            >
              Schedule Consultation
            </button>
            <button type="button"
              onClick={() => router.push("/?scroll=pricing")}
              className="w-full py-3.5 rounded-xl text-[13px] font-bold font-body text-white active:scale-95 transition-transform"
              style={{ border: "1px solid rgba(255,255,255,0.2)" }}
            >
              View All Plans
            </button>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}

/* ══════════════════════════════════════════════
   ROOT EXPORT
   ══════════════════════════════════════════════ */
export function MobileContactPage() {
  return (
    <main className="w-full overflow-x-hidden bg-white contact-page">
      <MobileHero />
      <MobileFeatures />
      <MobileInquiry />
      <MobileRealtime />
      <MobileFAQ />
      <MobileCTA />
    </main>
  );
}