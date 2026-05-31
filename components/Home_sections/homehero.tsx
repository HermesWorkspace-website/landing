"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowRight, Star, MessageSquare, Video, FileText,
  Bell, Users, BookOpen, Zap, Presentation, User, CalendarDays,
  Mic, MicOff, Monitor, PhoneCall, ChevronLeft, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as THREE from "three";


/* ---------------------------------------------
   FLOATING CARD
--------------------------------------------- */
function FloatingCard({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`glass rounded-2xl px-4 py-3 shadow-[0_8px_40px_rgba(96,99,238,0.12),0_2px_8px_rgba(0,0,0,0.06)] border border-white/80 backdrop-blur-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------
   COUNTER ANIMATION
--------------------------------------------- */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / 60;
    const id = setInterval(() => {
      start = Math.min(start + step, target);
      setVal(Math.floor(start));
      if (start >= target) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [target]);
  return <>{val.toLocaleString()}{suffix}</>;
}

/* ---------------------------------------------
   LIVE TIMER
--------------------------------------------- */
function LiveTimer() {
  const [secs, setSecs] = useState(2535);
  useEffect(() => {
    const id = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const h = String(Math.floor(secs / 3600)).padStart(2, "0");
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return <span className="font-mono">{h}:{m}:{s}</span>;
}

/* ---------------------------------------------
   OVERVIEW VISUAL
--------------------------------------------- */
function OverviewVisual() {
  const stats = [
    { label: "Students", value: 1842, gradient: "from-blue-500/10 to-brand/10" },
    { label: "Live Classes", value: 12, gradient: "from-purple-500/10 to-pink-500/10" },
    { label: "Engagement", value: 94, suffix: "%", gradient: "from-green-500/10 to-emerald-500/10" },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 h-full">
      <div className="col-span-2 grid grid-cols-3 gap-3">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className={`rounded-2xl bg-gradient-to-br ${s.gradient} border border-black/[0.03] p-4 cursor-default`}
          >
            <div className="text-2xl font-bold text-brand-ink tracking-tight">
              <AnimatedCounter target={s.value} suffix={s.suffix} />
            </div>
            <div className="text-[10px] text-brand-ink/50 mt-1 font-semibold uppercase tracking-wider">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="rounded-2xl bg-white border border-black/[0.05] p-4 shadow-sm"
      >
        <div className="text-sm font-semibold text-brand-ink mb-3">Academic Calendar</div>
        <div className="space-y-2.5">
          {[100, 65, 45].map((w, i) => (
            <motion.div
              key={i}
              initial={{ width: 0 }}
              animate={{ width: `${w}%` }}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.8, ease: "easeOut" }}
              className="h-2 rounded-full bg-gradient-to-r from-brand/20 to-brand/5"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="rounded-2xl bg-white border border-black/[0.05] p-4 shadow-sm"
      >
        <div className="text-sm font-semibold text-brand-ink mb-3">Live Sessions</div>
        {[
          { subject: "Physics · Class X", color: "red" },
          { subject: "Maths · Class XII", color: "brand" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + i * 0.12 }}
            className={`flex items-center gap-2 rounded-xl px-3 py-2 mb-2 ${
              item.color === "red"
                ? "bg-red-500/[0.05] border border-red-500/10"
                : "bg-brand/[0.05] border border-brand/10"
            }`}
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className={`w-1.5 h-1.5 rounded-full ${item.color === "red" ? "bg-red-500" : "bg-brand"}`}
            />
            <span className={`text-[10px] font-bold ${item.color === "red" ? "text-red-500" : "text-brand"}`}>
              {item.subject}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/* ---------------------------------------------
   COMMUNICATION VISUAL
--------------------------------------------- */
function CommunicationVisual() {
  const messages = [
    { text: "Physics notes for Chapter 12 have been uploaded.", delay: 0.2 },
    { text: "Tomorrow's PTM timing updated to 3:30 PM.", delay: 0.5 },
    { text: "Assignment deadline extended to Friday.", delay: 0.8 },
    { text: "New circular from principal's office.", delay: 1.1 },
  ];

  return (
    <div className="h-full flex rounded-2xl overflow-hidden border border-black/[0.05] bg-white">
      {/* Workspace switcher */}
      <div className="w-[48px] bg-[#FAFAFA] border-r border-black/[0.05] flex flex-col items-center py-3 gap-2">
        {["10", "11", "T", "SC"].map((w, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.1 }}
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-[10px] font-bold cursor-pointer transition-all ${
              i === 0 ? "bg-brand text-white shadow-lg shadow-brand/30" : "bg-black/[0.05] text-brand-ink/40 hover:bg-black/10"
            }`}
          >
            {w}
          </motion.div>
        ))}
      </div>
      {/* Channel list */}
      <div className="w-[160px] border-r border-black/[0.05] bg-[#FCFCFC] p-3">
        <div className="text-xs font-bold text-brand-ink mb-3">Class 10</div>
        {["10A", "10B", "General", "Science"].map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.07 }}
            className={`px-2 py-1.5 rounded-lg text-xs mb-1 cursor-pointer transition-all ${
              i === 0 ? "bg-brand/[0.09] text-brand font-semibold" : "text-brand-ink/50 hover:bg-black/[0.03] hover:text-brand-ink/70"
            }`}
          >
            # {c}
          </motion.div>
        ))}
      </div>
      {/* Messages */}
      <div className="flex-1 p-4 flex flex-col justify-end gap-3 overflow-hidden">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12, x: -6 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ delay: m.delay, ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
            className="flex gap-2 items-start"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: m.delay, type: "spring", stiffness: 260, damping: 20 }}
              className="w-7 h-7 rounded-full bg-brand/[0.08] flex-shrink-0"
            />
            <div className="rounded-2xl rounded-tl-md bg-black/[0.03] px-4 py-2.5 text-xs text-brand-ink leading-relaxed max-w-[85%]">
              {m.text}
            </div>
          </motion.div>
        ))}
        {/* Typing indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="flex gap-2 items-center"
        >
          <div className="w-7 h-7 rounded-full bg-brand/[0.08]" />
          <div className="rounded-2xl rounded-tl-md bg-black/[0.03] px-4 py-2.5 flex gap-1 items-center">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }}
                className="w-1.5 h-1.5 rounded-full bg-brand-ink/25"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------------------------------------------
   ONLINE CLASSES VISUAL
--------------------------------------------- */
function ClassesVisual() {
  const participants = [
    { name: "Aditi R.", mic: true },
    { name: "Karan J.", mic: false },
    { name: "Sanya M.", mic: true },
    { name: "Rahul V.", mic: true },
    { name: "Priya K.", mic: false },
  ];
  return (
    <div className="h-full flex gap-3">
      {/* Video feed */}
      <div className="flex-1 rounded-2xl bg-[#0F172A] relative overflow-hidden">
        {/* Animated glow */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-br from-brand/25 to-purple-900/40 mix-blend-overlay"
        />
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-40 h-40 bg-brand/20 rounded-full blur-3xl"
        />
        {/* Teacher */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-md"
          >
            <Users className="w-7 h-7 text-white/70" />
          </motion.div>
          <span className="text-white/50 text-[10px] font-bold tracking-widest uppercase">
            Dr. Satish Kumar
          </span>
        </div>
        {/* HUD top */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-red-500 rounded-full px-2.5 py-1">
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-white"
            />
            <span className="text-[9px] font-bold text-white">LIVE</span>
          </div>
          <div className="bg-black/50 backdrop-blur-md rounded-full px-2.5 py-1 text-[9px] font-mono text-white/80">
            <LiveTimer />
          </div>
        </div>
        {/* HUD bottom */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <div>
            <div className="text-white text-xs font-bold">Quantum Mechanics Basics</div>
            <div className="text-white/50 text-[10px] mt-0.5">Class 12-B · Science</div>
          </div>
          <div className="flex gap-1.5">
            {[<Mic key="mic" className="w-3 h-3" />, <Monitor key="monitor" className="w-3 h-3" />, <PhoneCall key="phone" className="w-3 h-3" />].map(
              (icon, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.15, backgroundColor: "rgba(255,255,255,0.2)" }}
                  className="w-7 h-7 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-white/60 cursor-pointer backdrop-blur-md"
                >
                  {icon}
                </motion.div>
              )
            )}
          </div>
        </div>
      </div>
      {/* Participants */}
      <div className="w-[116px] flex-shrink-0 rounded-2xl bg-[#FAFAFA] border border-black/[0.05] p-3 flex flex-col">
        <div className="text-[9px] font-bold text-brand-ink/40 uppercase tracking-wider mb-2">
          Participants (42)
        </div>
        <div className="flex-1 space-y-1.5 overflow-hidden">
          {participants.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ x: -2 }}
              className="flex items-center justify-between p-2 rounded-xl bg-white border border-black/[0.04] shadow-sm"
            >
              <span className="text-[10px] font-medium text-brand-ink truncate">{p.name}</span>
              <motion.div
                animate={p.mic ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${p.mic ? "bg-green-500" : "bg-brand-ink/15"}`}
              />
            </motion.div>
          ))}
        </div>
        <motion.div
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="mt-2 h-8 rounded-xl bg-brand text-white text-[10px] font-bold flex items-center justify-center cursor-pointer shadow-md shadow-brand/25"
        >
          + Invite
        </motion.div>
      </div>
    </div>
  );
}

/* ---------------------------------------------
   MEETINGS VISUAL
--------------------------------------------- */
function MeetingsVisual() {
  const meetings = [
    { title: "Staff Sync", time: "10:30 AM", type: "Internal" },
    { title: "Parent Meeting", time: "11:45 AM", type: "External" },
    { title: "Curriculum Review", time: "02:00 PM", type: "Board" },
    { title: "IT Infrastructure", time: "04:30 PM", type: "Internal" },
  ];
  return (
    <div className="h-full grid grid-cols-12 gap-3">
      {/* Schedule */}
      <div className="col-span-4 rounded-2xl bg-[#F8FAFC] border border-black/[0.05] p-3">
        <div className="text-[10px] font-bold text-brand-ink/40 uppercase tracking-wider mb-3">
          Today's Schedule
        </div>
        {meetings.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ x: 3, backgroundColor: "white" }}
            className="p-2.5 rounded-xl bg-white border border-black/[0.03] shadow-sm mb-2 cursor-pointer transition-all"
          >
            <div className="text-[11px] font-bold text-brand-ink truncate">{m.title}</div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[9px] text-brand-muted">{m.time}</span>
              <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-brand/[0.07] text-brand font-semibold">
                {m.type}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Active meeting */}
      <div className="col-span-8 rounded-2xl bg-white border border-black/[0.05] p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-green-500"
            />
            <span className="text-sm font-bold text-brand-ink">Weekly Faculty Sync</span>
          </div>
          <div className="flex -space-x-2">
            {["#6063EE", "#A855F7", "#22C55E", "#F59E0B", "#3B82F6"].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.06 }}
                className="w-6 h-6 rounded-full border-2 border-white"
                style={{ background: c }}
              />
            ))}
            <div className="w-6 h-6 rounded-full border-2 border-white bg-black/[0.05] flex items-center justify-center text-[8px] text-brand-muted">
              +8
            </div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex-1 rounded-xl bg-brand/[0.02] border border-dashed border-brand/20 flex flex-col items-center justify-center gap-2 relative overflow-hidden"
        >
          <motion.div
            animate={{ opacity: [0.03, 0.07, 0.03] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-br from-brand/10 to-transparent"
          />
          <div className="w-10 h-10 rounded-xl bg-brand/[0.08] flex items-center justify-center">
            <Monitor className="w-4 h-4 text-brand" />
          </div>
          <div className="text-[11px] text-brand-ink/60 font-semibold">Screen Sharing Active</div>
          <div className="text-[10px] text-brand-muted italic">"Reviewing Q3 Academic Progress"</div>
        </motion.div>
        <div className="mt-3 flex gap-2">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="h-9 flex-1 rounded-xl bg-brand text-white text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-brand/20"
          >
            <PhoneCall className="w-3.5 h-3.5" /> Join Audio
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.07)" }}
            className="h-9 w-10 rounded-xl bg-black/[0.04] flex items-center justify-center cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-ink/20" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------
   WEBINARS VISUAL
--------------------------------------------- */
function WebinarsVisual() {
  const statBars = [
    { label: "Students", val: 840, max: 1200, color: "bg-brand" },
    { label: "Teachers", val: 320, max: 1200, color: "bg-purple-500" },
    { label: "Parents", val: 120, max: 1200, color: "bg-green-500" },
  ];
  const qaItems = [
    { q: "How will this affect board exams?", from: "Rahul S." },
    { q: "Is there a certificate issued?", from: "Priya M." },
    { q: "Can parents attend too?", from: "Ajay T." },
  ];
  return (
    <div className="h-full flex flex-col gap-3">
      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="h-28 rounded-2xl relative overflow-hidden flex-shrink-0"
        style={{ background: "linear-gradient(135deg,#5052d0,#7C3AED)" }}
      >
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[-30%] right-[-10%] w-52 h-52 bg-white/10 rounded-full blur-2xl"
        />
        <div className="relative z-10 p-5">
          <div className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-1">
            Featured Webinar
          </div>
          <div className="text-lg font-extrabold text-white leading-tight max-w-[220px]">
            The Future of AI in Indian Education
          </div>
          <div className="mt-2 flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-white/80 text-[10px]">
              <Users className="w-3 h-3" /> 1,240 Registered
            </div>
            <motion.div
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-5 px-2.5 rounded-full bg-white/20 backdrop-blur-md text-[9px] font-bold text-white flex items-center"
            >
              LIVE SOON
            </motion.div>
          </div>
        </div>
      </motion.div>
      {/* Cards */}
      <div className="flex-1 grid grid-cols-2 gap-3">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl bg-white border border-black/[0.05] p-4"
        >
          <div className="text-xs font-bold text-brand-ink mb-4">Registration Stats</div>
          {statBars.map((s, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between text-[9px] mb-1">
                <span className="text-brand-muted">{s.label}</span>
                <span className="font-bold text-brand-ink">{s.val.toLocaleString()}</span>
              </div>
              <div className="h-1.5 w-full bg-black/[0.04] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(s.val / s.max) * 100}%` }}
                  transition={{ duration: 1.1, delay: 0.4 + i * 0.15, ease: "easeOut" }}
                  className={`h-full ${s.color} rounded-full`}
                />
              </div>
            </div>
          ))}
        </motion.div>
        {/* Live Q&A */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl bg-white border border-black/[0.05] p-4 flex flex-col"
        >
          <div className="text-xs font-bold text-brand-ink mb-3">Live Q&A</div>
          <div className="flex-1 space-y-2 overflow-hidden">
            {qaItems.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.15 }}
                className="p-2 rounded-xl bg-[#F8FAFC] border border-black/[0.03]"
              >
                <div className="text-[10px] font-bold text-brand-ink leading-tight">{q.q}</div>
                <div className="text-[8px] text-brand-muted mt-1">From {q.from}</div>
              </motion.div>
            ))}
          </div>
          <div className="mt-2 pt-2 border-t border-black/[0.04] flex items-center justify-between">
            <span className="text-[9px] text-brand-muted">Active Speakers: 3</span>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------------------------------------------
   INSTITUTION VISUAL
--------------------------------------------- */
function InstitutionVisual() {
  const departments = ["Administration", "Teaching Staff", "Medical Wing", "Transport"];
  return (
    <div className="h-full flex gap-3">
      {/* Directory */}
      <div className="w-48 flex-shrink-0 rounded-2xl bg-white border border-black/[0.05] p-4 flex flex-col">
        <div className="text-sm font-bold text-brand-ink mb-3">Directory</div>
        {departments.map((d, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.09 }}
            whileHover={i !== 0 ? { x: 4, color: "var(--brand)" } : {}}
            className={`px-3 py-2 rounded-xl text-[11px] font-medium mb-1 cursor-pointer transition-all ${
              i === 0
                ? "bg-brand text-white shadow-lg shadow-brand/25"
                : "text-brand-muted hover:bg-black/[0.03]"
            }`}
          >
            {d}
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-auto p-3 rounded-xl bg-brand/[0.05] border border-brand/10 text-center"
        >
          <div className="text-[9px] font-bold text-brand uppercase tracking-tight">Campus Status</div>
          <div className="text-xs font-bold text-brand-ink mt-1">Operational</div>
        </motion.div>
      </div>
      {/* Profile */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex-1 rounded-2xl bg-white border border-black/[0.05] p-5 flex flex-col"
      >
        <div className="flex items-center gap-4 mb-5">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand/10 to-brand/25 border border-brand/10 flex items-center justify-center"
          >
            <Users className="w-7 h-7 text-brand" />
          </motion.div>
          <div>
            <div className="text-base font-bold text-brand-ink">Dr. Ananya Sharma</div>
            <div className="text-xs text-brand-muted">Senior Administrator · Academic Head</div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 text-[9px] font-bold">
                ONLINE
              </span>
              <span className="text-[10px] text-brand-muted">Available for queries</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 flex-1">
          {[
            { label: "Office Location", val: "Admin Block · Level 2" },
            { label: "Contact Extension", val: "EXT-402" },
            { label: "Department", val: "Academic Administration" },
            { label: "Working Hours", val: "9:00 AM – 5:00 PM" },
          ].map((info, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="p-3 rounded-2xl bg-[#F8FAFC] border border-black/[0.03]"
            >
              <div className="text-[9px] font-bold text-brand-muted uppercase mb-1">{info.label}</div>
              <div className="text-xs font-bold text-brand-ink">{info.val}</div>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 flex gap-3">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="h-10 flex-1 rounded-xl bg-brand/[0.07] border border-brand/15 flex items-center justify-center text-[11px] font-bold text-brand cursor-pointer gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" /> Message Admin
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="h-10 w-12 rounded-xl bg-black/[0.04] flex items-center justify-center cursor-pointer"
          >
            <Bell className="w-4 h-4 text-brand-ink/30" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------------------------------------------
   EVENTS VISUAL
--------------------------------------------- */
function EventsVisual() {
  const eventDays = [12, 15, 24, 28];
  const today = 24;
  return (
    <div className="h-full grid grid-cols-12 gap-3">
      {/* Calendar */}
      <div className="col-span-7 rounded-2xl bg-white border border-black/[0.05] p-4 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-bold text-brand-ink">October 2026</div>
          <div className="flex gap-1">
            {[<ChevronLeft key="left" className="w-3 h-3" />, <ChevronRight key="right" className="w-3 h-3" />].map((icon, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.15, backgroundColor: "rgba(96,99,238,0.1)" }}
                className="w-5 h-5 rounded-md bg-black/[0.04] flex items-center justify-center text-brand-ink/50 cursor-pointer"
              >
                {icon}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-7 mb-1">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <div key={i} className="text-[9px] font-bold text-brand-muted text-center py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
              <motion.div
                key={d}
                whileHover={{ scale: 1.12 }}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center text-[10px] relative cursor-pointer transition-all ${
                  d === today
                    ? "bg-brand text-white font-bold shadow-md shadow-brand/30"
                    : eventDays.includes(d) && d !== today
                    ? "text-brand font-bold bg-brand/[0.04]"
                    : "text-brand-ink/35 hover:bg-black/[0.04]"
                }`}
              >
                {d}
                {eventDays.includes(d) && d !== today && (
                  <motion.div
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: d * 0.1 }}
                    className="absolute bottom-0.5 w-1 h-1 rounded-full bg-brand"
                  />
                )}
                {d === today && (
                  <div className="absolute bottom-0.5 w-1 h-1 rounded-full bg-white/80" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* Event details */}
      <div className="col-span-5 flex flex-col gap-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1 rounded-2xl bg-[#F8FAFC] border border-black/[0.05] p-4"
        >
          <div className="text-[9px] font-bold text-brand-ink/40 uppercase tracking-wider mb-3">
            Today's Highlight
          </div>
          <motion.div
            whileHover={{ y: -2 }}
            className="p-3 rounded-2xl bg-white border border-black/[0.04] shadow-sm cursor-pointer"
          >
            <div className="w-7 h-7 rounded-xl bg-amber-500/10 flex items-center justify-center mb-2 text-base">
              🏆
            </div>
            <div className="text-xs font-bold text-brand-ink mb-1">Annual Sports Meet</div>
            <div className="text-[10px] text-brand-muted leading-tight">
              Registration closes by 4:00 PM. Main ground.
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="rounded-2xl bg-brand p-4 text-white"
        >
          <div className="text-[9px] font-bold opacity-70 uppercase tracking-widest mb-1">Next Event</div>
          <div className="text-sm font-bold">Foundation Day Celebration</div>
          <div className="text-[10px] opacity-60 mt-0.5">3 Days Left · Main Auditorium</div>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------------------------------------------
   NOTICES VISUAL
--------------------------------------------- */
function NoticesVisual() {
  const notices = [
    { title: "Winter Break Schedule Released", date: "Oct 24", urgency: "High", color: "#EF4444" },
    { title: "Updated Uniform Policy 2025-26", date: "Oct 23", urgency: "Normal", color: "#6063EE" },
    { title: "Annual Science Exhibition", date: "Oct 22", urgency: "Info", color: "#3B82F6" },
  ];
  return (
    <div className="h-full flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-bold text-brand-ink">Official Notice Board</div>
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="px-3 py-1 rounded-full bg-brand/[0.09] text-brand text-[10px] font-bold"
        >
          7 NEW TODAY
        </motion.div>
      </div>
      <div className="flex-1 grid grid-cols-3 gap-3">
        {notices.map((n, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -5, boxShadow: "0 12px 32px rgba(0,0,0,0.08)" }}
            className="rounded-2xl bg-white border border-black/[0.06] p-4 flex flex-col relative overflow-hidden cursor-pointer shadow-sm"
          >
            <div
              className="absolute top-0 left-0 w-1 h-full rounded-tl-2xl rounded-bl-2xl"
              style={{ background: n.color }}
            />
            <div className="text-[9px] font-bold text-brand-muted uppercase mb-1">{n.date}</div>
            <div className="text-xs font-bold text-brand-ink leading-snug flex-1">{n.title}</div>
            <div className="mt-3 flex items-center justify-between">
              <span
                className="text-[9px] font-bold uppercase tracking-wide"
                style={{ color: n.urgency === "High" ? "#EF4444" : "#6B7280" }}
              >
                {n.urgency}
              </span>
              <motion.div
                whileHover={{ x: 3 }}
                className="w-5 h-5 rounded-lg bg-black/[0.04] flex items-center justify-center"
              >
                <ArrowRight className="w-2.5 h-2.5 text-brand-ink/30" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="h-11 rounded-2xl bg-brand/[0.03] border border-dashed border-brand/20 flex items-center px-4 justify-between"
      >
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-brand"
          />
          <span className="text-[10px] font-medium text-brand-ink/60">
            Pinned: Transport route update for Sector 4 residents…
          </span>
        </div>
        <span className="text-[9px] font-bold text-brand">VIEW ALL</span>
      </motion.div>
    </div>
  );
}

/* ---------------------------------------------
   DASHBOARD MOCK
--------------------------------------------- */
function DashboardMock() {
  const [activeSection, setActiveSection] = useState("Overview");
  const [prevSection, setPrevSection] = useState<string | null>(null);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const navItems = [
    { icon: <BookOpen className="w-3.5 h-3.5" />, label: "Overview" },
    { icon: <MessageSquare className="w-3.5 h-3.5" />, label: "Communication" },
    { icon: <Video className="w-3.5 h-3.5" />, label: "Online Classes" },
    { icon: <User className="w-3.5 h-3.5" />, label: "Meetings" },
    { icon: <Presentation className="w-3.5 h-3.5" />, label: "Webinars" },
    { icon: <Users className="w-3.5 h-3.5" />, label: "Institution" },
    { icon: <CalendarDays className="w-3.5 h-3.5" />, label: "Events" },
    { icon: <Bell className="w-3.5 h-3.5" />, label: "Notices" },
  ];

  const handleNav = (label: string) => {
    setPrevSection(activeSection);
    setActiveSection(label);
  };

  const visuals: Record<string, React.ReactNode> = {
    Overview: <OverviewVisual />,
    Communication: <CommunicationVisual />,
    "Online Classes": <ClassesVisual />,
    Meetings: <MeetingsVisual />,
    Webinars: <WebinarsVisual />,
    Institution: <InstitutionVisual />,
    Events: <EventsVisual />,
    Notices: <NoticesVisual />,
  };

  return (
    <div className="mock-window w-full max-w-[820px] mx-auto relative">
      {/* Title bar */}
      <div className="mock-topbar">
        <div className="mock-dot bg-[#FFDAD6]" />
        <div className="mock-dot bg-[#FDE047]" />
        <div className="mock-dot bg-[#BBF7D0]" />
        <div className="flex-1 mx-3">
          <div className="mock-bar w-44 mx-auto" />
        </div>
      </div>

      {/* Body */}
      <div className="flex min-h-[440px]">
        {/* Sidebar */}
        <motion.div
          onHoverStart={() => setIsSidebarExpanded(true)}
          onHoverEnd={() => setIsSidebarExpanded(false)}
          animate={{ width: isSidebarExpanded ? 176 : 52 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="border-r border-black/[0.05] bg-[#FAFAFA] flex flex-col gap-0.5 pt-3 px-1.5 shrink-0 overflow-hidden"
        >
          {navItems.map((item, i) => {
            const isActive = activeSection === item.label;
            return (
              <motion.button
                key={i}
                onClick={() => handleNav(item.label)}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-2.5 rounded-xl px-2 py-2 transition-all duration-200 w-full text-left ${
                  isActive
                    ? "bg-brand/[0.09] text-brand"
                    : "text-brand-ink/35 hover:text-brand-ink/60 hover:bg-black/[0.03]"
                }`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <motion.span
                  animate={{ opacity: isSidebarExpanded ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[11px] font-medium font-body whitespace-nowrap overflow-hidden"
                  style={{ width: isSidebarExpanded ? "auto" : 0 }}
                >
                  {item.label}
                </motion.span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0 p-4 md:p-5 bg-[#FCFCFC] relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 24, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -24, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              {visuals[activeSection]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------
   HERO SECTION — ROOT
--------------------------------------------- */
export default function Hero() {
  const router = useRouter();
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
  
    const words = ["Connect", "Collaborate", "Coordinate"];
  
    const [wordIndex, setWordIndex] = useState(0);
  
    useEffect(() => {
      const id = setInterval(() => {
        setWordIndex((v) => (v + 1) % words.length);
      }, 2800);
  
      return () => clearInterval(id);
    }, []);
  
    // Three.js particles
    useEffect(() => {
      if (!canvasRef.current) return;
  
      const canvas = canvasRef.current;
  
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      });
  
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
  
      const scene = new THREE.Scene();
  
      const camera = new THREE.PerspectiveCamera(
        60,
        canvas.offsetWidth / canvas.offsetHeight,
        0.1,
        100
      );
  
      camera.position.z = 5;
  
      // particles
      const count = 120;
  
      const positions = new Float32Array(count * 3);
  
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 14;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
      }
  
      const geo = new THREE.BufferGeometry();
  
      geo.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
  
      // ONLY particles are red
      const mat = new THREE.PointsMaterial({
        color: 0x6063ee,
        size: 0.032,
        opacity: 0.37,
        transparent: true,

      });
  
      const points = new THREE.Points(geo, mat);
  
      scene.add(points);
  
      // grid
      const gridHelper = new THREE.GridHelper(
        20,
        20,
        0x1f2235,
        0x1f2235
      );
  
      (gridHelper.material as THREE.LineBasicMaterial).transparent = true;
      (gridHelper.material as THREE.LineBasicMaterial).opacity = 0.035;
  
      gridHelper.rotation.x = Math.PI / 2;
  
      gridHelper.position.z = -2;
  
      scene.add(gridHelper);
  
      let raf: number;
  
      const animate = () => {
        raf = requestAnimationFrame(animate);
  
        points.rotation.z += 0.00018;
        points.rotation.y += 0.00008;
  
        renderer.render(scene, camera);
      };
  
      animate();
  
      const handleResize = () => {
        if (!canvas.parentElement) return;
  
        const w = canvas.parentElement.offsetWidth;
        const h = canvas.parentElement.offsetHeight;
  
        renderer.setSize(w, h);
  
        camera.aspect = w / h;
  
        camera.updateProjectionMatrix();
      };
  
      window.addEventListener("resize", handleResize);

      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", handleResize);
        renderer.dispose();
      };
    }, []);


  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <canvas
    ref={canvasRef}
    className="absolute inset-0 w-full h-full z-[1] pointer-events-none"
  />

      {/* Ultra-lightweight CSS grid mesh and soft ambient radial glows (Zero CPU/GPU overhead) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.25] z-[2]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% -20%, rgba(90,95,232,0.15) 0%, transparent 50%),
            radial-gradient(circle at 100% 80%, rgba(168,85,247,0.1) 0%, transparent 40%),
            linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 100% 100%, 48px 48px, 48px 48px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)",
        }}
      />

      {/* -- Hero copy (one full screen) -- */}
      <div className="hero-intro-screen relative z-10">
      <div className="container-page flex flex-col items-center text-center">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge variant="brand" className="mb-3 gap-2 py-1 px-4">
            <Zap className="w-3 h-3 fill-brand text-brand" />
            v1.0.1 Live Now
          </Badge>
        </motion.div>

        {/* Headline */}
        <h1 className="font-display text-[clamp(2.6rem,6vw,5.2rem)] font-extrabold leading-[1.04] tracking-[-0.04em] text-brand-ink max-w-[900px]">
          {["Every school.", "Connected Through", "One Platform."].map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-3">
              <motion.span
                className={`inline-block ${i >= 1 ? "gradient-text-brand" : ""}`}
                initial={{ y: 56, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.18, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 max-w-[560px] text-[1.0625rem] text-brand-muted leading-[1.75] font-body"
        >
          HermesWorkspace centralizes communication, notices, online classes, meetings, 
          events, and academic coordination — built for the way Indian schools actually work.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.7 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
           <Link href="/contact?scroll=inquiry">
  <Button
    variant="default"
    size="lg"
    className="gap-2 shadow-[0_4px_24px_rgba(96,99,238,0.35)] hover:shadow-[0_8px_36px_rgba(96,99,238,0.45)]"
  >
    Request Live Demo
    <ArrowRight className="w-4 h-4" />
  </Button>
</Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
            <Button 
            onClick={() => {
              const target = document.getElementById("features");
              if (target) {
                const headerOffset = 60;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth"
                });
              }
            }}
            variant="outline" size="lg" className="gap-2">
              <Video className="w-4 h-4 text-brand" /> Explore Platform
            </Button>
          </motion.div>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.35 }}
          className="my-5 flex items-center gap-2.5 text-sm text-brand-muted font-body"
        >
          <div className="flex -space-x-2">
            {["#6063EE", "#A855F7", "#22C55E", "#F59E0B"].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 + i * 0.07 }}
                className="w-7 h-7 rounded-full border-2 border-white"
                style={{ background: c }}
              />
            ))}
          </div>
          <span>Built around real workflows used by Indian schools</span>
        </motion.div>
      </div>
      </div>

      {/* -- Dashboard mock (revealed on scroll) -- */}
      <motion.div
        initial={{ opacity: 0, y: 70, scale: 0.93, rotateX: 12 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        transition={{ delay: 1.6, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ perspective: 1200 }}
        className="hero-visual container-page relative z-10 mt-16 pb-20 w-full"
      >
        <div className="relative">
          <DashboardMock />

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-16 rounded-b-[14px] pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent, var(--bg))" }} />

          {/* Floating card — Live class */}
          <div className="float-card absolute -top-5 -left-4 md:-left-10 hidden md:block z-20">
            <FloatingCard className="flex items-center gap-3" delay={2}>
              <div className="w-9 h-9 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                <Video className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-brand-ink font-body">Online Session Active</div>
                <div className="text-[10px] text-brand-muted font-body">Physics · Class X</div>
              </div>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-red-500 ml-1 flex-shrink-0"
              />
            </FloatingCard>
          </div>

          {/* Floating card — Message */}
          <div className="float-card absolute top-10 -right-4 md:-right-12 hidden md:block z-20">
            <FloatingCard className="flex items-center gap-3 max-w-[220px]" delay={2.15}>
              <div className="w-9 h-9 rounded-full mock-avatar flex-shrink-0 bg-brand/10" />
              <div className="min-w-0">
                <div className="text-[11px] font-semibold text-brand-ink font-body">Administrative Notice</div>
                <div className="text-[10px] text-brand-muted font-body truncate">Transport schedule updated…</div>
              </div>
            </FloatingCard>
          </div>

          {/* Floating card — Attendance */}
          <div className="float-card absolute -bottom-5 right-8 md:right-20 hidden md:block z-20">
            <FloatingCard className="flex items-center gap-3" delay={2.3}>
              <div className="w-9 h-9 rounded-xl bg-brand/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-brand" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-brand-ink font-body">Attendance Today</div>
                <div className="text-base font-display font-extrabold text-brand">96.4%</div>
              </div>
            </FloatingCard>
          </div>

          {/* Floating card — Webinar */}
          <div className="float-card absolute top-[45%] -left-4 md:-left-14 hidden lg:block z-20">
            <FloatingCard className="flex items-center gap-3" delay={2.45}>
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                <Presentation className="w-4 h-4 text-purple-500" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-brand-ink font-body">Upcoming Webinar</div>
                <div className="text-[10px] text-brand-muted font-body">1,240 registered</div>
              </div>
            </FloatingCard>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
