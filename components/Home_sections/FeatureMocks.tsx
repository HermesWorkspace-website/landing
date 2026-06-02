"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { gsap } from "gsap";
import * as THREE from "three";
import {
  MessageSquare, Video, Users, Bell, Activity,
  Send, Mic, MicOff, VideoOff, Monitor,
  GraduationCap, Shield, BookOpen, UserCheck,
  Pin, Clock, Calendar, Presentation, FileText,
  ArrowRight, Sparkles, Zap, Globe,
} from "lucide-react";

/* -----------------------------------------------------
   THREE.JS PARTICLE BACKGROUND
----------------------------------------------------- */
function ParticleBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Particles
    const count = 800;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 80;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.15,
      color: 0x6366f1,
      transparent: true,
      opacity: 0.4,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // Mouse interaction
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 0.5;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      particles.rotation.y = t * 0.04 + mouse.x;
      particles.rotation.x = t * 0.02 + mouse.y;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

/* -----------------------------------------------------
   GSAP MAGNETIC BUTTON
----------------------------------------------------- */
function MagneticButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    xTo.current = gsap.quickTo(ref.current, "x", { duration: 0.4, ease: "power3" });
    yTo.current = gsap.quickTo(ref.current, "y", { duration: 0.4, ease: "power3" });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    xTo.current?.((e.clientX - cx) * 0.35);
    yTo.current?.((e.clientY - cy) * 0.35);
  };

  const handleMouseLeave = () => {
    xTo.current?.(0);
    yTo.current?.(0);
  };

  return (
    <button
      type="button"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </button>
  );
}

/* -----------------------------------------------------
   GSAP TEXT SCRAMBLE
----------------------------------------------------- */
function ScrambleText({ text, trigger }: { text: string; trigger: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  useEffect(() => {
    if (!trigger || !ref.current) return;
    let iteration = 0;
    const interval = setInterval(() => {
      if (!ref.current) return;
      ref.current.innerText = text
        .split("")
        .map((char, idx) => {
          if (idx < iteration) return text[idx];
          if (char === " ") return " ";
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");
      if (iteration >= text.length) clearInterval(interval);
      iteration += 0.5;
    }, 30);
    return () => clearInterval(interval);
  }, [trigger, text]);

  return <span ref={ref}>{text}</span>;
}

/* -----------------------------------------------------
   CURSOR GLOW
----------------------------------------------------- */
function CursorGlow() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      className="fixed pointer-events-none z-50 mix-blend-screen"
      style={{
        left: springX,
        top: springY,
        width: 320,
        height: 320,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}

/* -----------------------------------------------------
   SHARED HELPERS
----------------------------------------------------- */
const Avatar = ({ color = "mock-avatar", size = "size-7" }: { color?: string; size?: string }) => (
  <div className={`${size} rounded-full ${color} shrink-0`} />
);
const MockBar = ({ w = "w-full" }: { w?: string }) => (
  <div className={`mock-bar ${w}`} style={{ height: 6 }} />
);

// Stagger container
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const fadeIn = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

/* -----------------------------------------------------
   ANIMATED FEATURE CARD WRAPPER
----------------------------------------------------- */
function FeatureCard({
  children,
  label,
  icon: Icon,
  accent,
  delay = 0,
}: {
  children: React.ReactNode;
  label: string;
  icon: React.ElementType;
  accent: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  // Mouse tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const sRotateX = useSpring(rotateX, { stiffness: 180, damping: 24 });
  const sRotateY = useSpring(rotateY, { stiffness: 180, damping: 24 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotateX.set(((e.clientY - cy) / rect.height) * -10);
    rotateY.set(((e.clientX - cx) / rect.width) * 10);
  };
  const handleMouseLeave = () => { rotateX.set(0); rotateY.set(0); setHovered(false); };

  return (
    <motion.div
      ref={ref}
      variants={fadeIn}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
      style={{
        rotateX: sRotateX,
        rotateY: sRotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative group"
    >
      {/* Glow border on hover */}
      <motion.div
        className="absolute -inset-px rounded-2xl pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `linear-gradient(135deg, ${accent}40, transparent 60%)`,
          borderRadius: "inherit",
        }}
      />

      {/* Label pill */}
      <motion.div
        className="absolute -top-3 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black/[0.08] shadow-sm"
        animate={{ y: hovered ? -2 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Icon className="size-3" style={{ color: accent }} />
        <span className="text-[9px] font-bold text-brand-ink tracking-wide font-body">{label}</span>
      </motion.div>

      {children}
    </motion.div>
  );
}

/* -----------------------------------------------------
   FLOATING BADGE (micro-animation)
----------------------------------------------------- */
function FloatingBadge({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}

/* -----------------------------------------------------
   1. MESSAGES MOCK (animated)
----------------------------------------------------- */
const WORKSPACES = [{ name: "X" }, { name: "XI" }, { name: "OPS" }, { name: "Nova" }];

const SCHOOL_NOTICES = [
  { title: "Board Examination Schedule Released", priority: "Important", time: "2h ago" },
  { title: "PTM Scheduled For Senior Wing", priority: "Update", time: "1d ago" },
  { title: "Winter Break Begins From Dec 24", priority: "General", time: "3d ago" },
];

type Message = { sender: string; role: string; text: string; time: string; teacher?: boolean };
type Member = { name: string; role: string; online: boolean };
type ChannelData = { resources: string[]; members: Member[]; messages: Message[] };
type Channel = { type: "chat" | "notice"; data: ChannelData };
type Workspace = { channels: Record<string, Channel> };
type WorkspaceData = Record<string, Workspace>;

export function MessagesMock() {

  const workspaceData: WorkspaceData = {
    X: {
      channels: {
        "Class-XA": {
          type: "chat",
          data: {
            resources: ["Exam Hub", "Session Recordings", "PYQ Archive"],
            members: [
              { name: "Aarush Mehta", role: "Teacher", online: true },
              { name: "Kiara Sinha", role: "Student", online: true },
            ],
            messages: [
              { sender: "Dr. Mehra", role: "Teacher", text: "Mathematics worksheets for tomorrow uploaded.", time: "09:12", teacher: true },
              { sender: "Kiara Sinha", role: "Student", text: "Sir, should we also complete Exercise 4B?", time: "09:14" },
            ],
          },
        },
        "Class-XB": {
          type: "chat",
          data: {
            resources: ["Assignments", "Physics Notes"],
            members: [{ name: "Arpit Kumar", role: "Student", online: true }, { name: "NovaCat", role: "Student", online: false }],
            messages: [{ sender: "Ms. Kapoor", role: "Teacher", text: "Physics numericals discussion starts at 11 AM.", time: "10:02", teacher: true }],
          },
        },
        Broadcast: {
          type: "notice",
          data: {
            resources: ["Circulars", "Schedules"],
            members: [{ name: "Operations Desk", role: "Admin", online: true }],
            messages: [],
          },
        },
      },
    },
    XI: {
      channels: {
        Science: {
          type: "chat",
          data: {
            resources: ["Chemistry Lab", "Board Prep"],
            members: [{ name: "Anaya Kapoor", role: "Teacher", online: true }],
            messages: [{ sender: "Ms. Kapoor", role: "Teacher", text: "Chemistry practical dates updated.", time: "11:12", teacher: true }],
          },
        },
        Commerce: {
          type: "chat",
          data: {
            resources: ["Economics Notes", "Business Studies"],
            members: [{ name: "Reyansh Shah", role: "Student", online: true }],
            messages: [{ sender: "Anand Sir", role: "Teacher", text: "Balance sheet assignment due tomorrow.", time: "01:12", teacher: true }],
          },
        },
        Announcements: {
          type: "notice",
          data: {
            resources: ["Updates"],
            members: [{ name: "Institution Admin", role: "Admin", online: true }],
            messages: [],
          },
        },
      },
    },
    OPS: {
      channels: {
        Transport: {
          type: "chat",
          data: {
            resources: ["Bus Routes", "Driver Logs"],
            members: [{ name: "Ritika Sen", role: "Coordinator", online: true }],
            messages: [{ sender: "Operations Desk", role: "Admin", text: "Route 4 timing updated for tomorrow.", time: "07:30", teacher: true }],
          },
        },
        Faculty: {
          type: "chat",
          data: {
            resources: ["Meeting Notes", "Schedules"],
            members: [{ name: "Arjun Sir", role: "Faculty", online: true }],
            messages: [{ sender: "Principal Office", role: "Admin", text: "Faculty meeting scheduled at 4 PM.", time: "09:00", teacher: true }],
          },
        },
        Admin: {
          type: "chat",
          data: {
            resources: ["Reports"],
            members: [{ name: "Admin HQ", role: "Admin", online: true }],
            messages: [{ sender: "Admin HQ", role: "Admin", text: "Monthly institution report generated.", time: "06:45", teacher: true }],
          },
        },
      },
    },
    Nova: {
      channels: {
        Launch: {
          type: "chat",
          data: {
            resources: ["Brand Kit", "Launch Assets"],
            members: [{ name: "PixelCat", role: "Designer", online: true }],
            messages: [{ sender: "PixelCat", role: "Designer", text: "Updated onboarding visuals for mobile.", time: "02:15", teacher: true }],
          },
        },
        Creative: {
          type: "chat",
          data: {
            resources: ["Motion Files", "UI Drafts"],
            members: [{ name: "NovaFox", role: "Creative", online: true }],
            messages: [{ sender: "NovaFox", role: "Creative", text: "Gradient motion feels smoother now.", time: "03:12", teacher: true }],
          },
        },
        Pulse: {
          type: "chat",
          data: {
            resources: ["Pulse Feed"],
            members: [{ name: "OrbitDog", role: "Ops", online: false }],
            messages: [{ sender: "OrbitDog", role: "Ops", text: "Deployment preview ready for review.", time: "04:10", teacher: true }],
          },
        },
      },
    },
  };

  const [activeWorkspace, setActiveWorkspace] = useState("X");
  const [activeChannel, setActiveChannel] = useState("Class-XA");

  const currentWorkspace = workspaceData[activeWorkspace] || workspaceData["X"];
  const currentChannel = currentWorkspace.channels[activeChannel] || Object.values(currentWorkspace.channels)[0];
  const channelData = currentChannel?.data;

  return (
    <div className="rounded-xl border border-black/[0.06] overflow-hidden bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
      <div className="flex h-[340px]">
        {/* Workspace Rail */}
        <div className="w-[52px] bg-[#FAFAFA] border-r border-black/[0.05] flex flex-col items-center py-2 gap-2">
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="size-8 rounded-2xl bg-brand flex items-center justify-center text-white text-[10px] font-bold cursor-pointer"
          >
            HW
          </motion.div>
          {WORKSPACES.map((w, i) => (
            <motion.div
              key={w.name}
              whileHover={{ scale: 1.1, rotate: 3 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => {
                setActiveWorkspace(w.name);
                const firstChannel = Object.keys(workspaceData[w.name].channels)[0];
                setActiveChannel(firstChannel);
              }}
              className={`size-9 rounded-xl flex items-center justify-center text-[10px] font-semibold transition-colors cursor-pointer
                ${activeWorkspace === w.name ? "bg-brand text-white" : "bg-black/[0.04] text-brand-ink/50 hover:bg-brand/[0.08]"}`}
            >
              {w.name}
            </motion.div>
          ))}
          <motion.div
            whileHover={{ scale: 1.15, borderColor: "rgba(99,102,241,0.4)" }}
            className="mt-auto size-8 rounded-xl border border-dashed border-black/[0.08] flex items-center justify-center text-brand-ink/30 text-xs cursor-pointer"
          >
            +
          </motion.div>
        </div>

        {/* Channels Sidebar */}
        <div className="w-[180px] bg-[#FCFCFC] border-r border-black/[0.05] p-3 flex flex-col overflow-y-auto">
          <div>
            <div className="text-[11px] font-bold text-brand-ink font-body">School</div>
            <div className="text-[8px] text-brand-ink/40 mt-0.5 font-body">class communication workspace</div>
          </div>
          <div className="mt-3 rounded-lg bg-black/[0.04] px-2.5 py-2 text-[8px] text-brand-ink/30 font-body">Search channels...</div>
          <div className="mt-3">
            <div className="flex items-center gap-2 text-[8px] text-brand-ink/70 font-body mb-2">
              <Bell className="size-3 text-brand/70" />
              Notices
            </div>
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="space-y-1.5">
              {SCHOOL_NOTICES.map((notice, i) => (
                <motion.div
                  key={notice.title}
                  variants={fadeUp}
                  whileHover={{ x: 2, scale: 1.01 }}
                  className="rounded-lg bg-brand/[0.04] border border-brand/[0.06] px-2 py-1.5 cursor-pointer"
                >
                  <div className="text-[7px] font-semibold text-brand-ink leading-snug">{notice.title}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-[6px] text-brand">{notice.priority}</span>
                    <span className="text-[6px] text-brand-ink/30">{notice.time}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div className="mt-5">
            <div className="text-[7px] tracking-[0.18em] text-brand-ink/30 font-semibold mb-2 font-body">TEXT CHANNELS</div>
            <div className="space-y-1">
              {Object.keys(currentWorkspace.channels).map((channel, i) => (
                <motion.div
                  key={`item-${i}`}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveChannel(channel)}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-[8px] font-medium transition-colors cursor-pointer
                    ${activeChannel === channel ? "bg-brand/[0.08] text-brand" : "text-brand-ink/50 hover:bg-black/[0.03]"}`}
                >
                  <span>#</span>
                  <span>{channel}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="mt-5">
            <div className="text-[7px] tracking-[0.18em] text-brand-ink/30 font-semibold mb-2 font-body">RESOURCES</div>
            <div className="space-y-1.5">
              {channelData.resources.map((r, i) => (
                <motion.div
                  key={`item-${i}`}
                  whileHover={{ x: 2 }}
                  className="flex items-center gap-2 text-[8px] text-brand-ink/50 px-2 py-1 rounded-lg hover:bg-black/[0.03] cursor-pointer"
                >
                  <FileText className="size-2.5" />
                  {r}
                </motion.div>
              ))}
            </div>
          </div>
          <div className="mt-auto pt-3 border-t border-black/[0.05] flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="size-6 rounded-full bg-brand text-white flex items-center justify-center text-[8px] font-semibold"
            >
              AK
            </motion.div>
            <div>
              <div className="text-[8px] font-semibold text-brand-ink font-body">Apurav</div>
              <div className="text-[7px] text-green-500 font-body">Online</div>
            </div>
          </div>
        </div>

        {/* Main Chat */}
        <div className="flex-1 flex flex-col bg-[#FEFEFE]">
          <div className="h-[42px] border-b border-black/[0.05] px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-brand text-sm">#</span>
              <span className="text-[10px] font-semibold text-brand-ink font-body">{activeChannel}</span>
            </div>
            <div className="rounded-lg bg-black/[0.03] px-3 py-1.5 text-[8px] text-brand-ink/30 font-body w-[180px]">Search messages...</div>
          </div>
          <div className="flex-1 p-4 space-y-3 overflow-hidden">
            <AnimatePresence>
              {channelData.messages.map((m, i) => (
                <motion.div
                  key={`${activeChannel}-${i}`}
                  initial={{ opacity: 0, x: -16, y: 8 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-2"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`size-7 rounded-full flex items-center justify-center text-[8px] font-semibold shrink-0
                      ${m.teacher ? "bg-amber-100 text-amber-700" : "bg-brand/[0.08] text-brand"}`}
                  >
                    {m.sender.charAt(0)}
                  </motion.div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[8px] font-semibold text-brand-ink font-body">{m.sender}</span>
                      <span className={`text-[6px] px-1 py-0.5 rounded-full font-semibold ${m.teacher ? "bg-amber-100 text-amber-700" : "bg-black/[0.04] text-brand-ink/40"}`}>
                        {m.role}
                      </span>
                      <span className="text-[6px] text-brand-ink/30">{m.time}</span>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="mt-1 rounded-2xl rounded-tl-md bg-black/[0.03] px-3 py-2 text-[8px] text-brand-ink leading-relaxed max-w-[240px]"
                    >
                      {m.text}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="rounded-xl border border-brand/[0.08] bg-brand/[0.04] p-3 flex items-start gap-2 max-w-[320px]"
            >
              <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 2 }}>
                <Bell className="size-3 text-brand mt-0.5 shrink-0" />
              </motion.div>
              <div>
                <div className="text-[8px] font-semibold text-brand font-body">Homework Reminder</div>
                <div className="text-[7px] text-brand-ink/60 mt-1 leading-relaxed font-body">
                  Physics assignment submission closes tomorrow at 9:00 AM.
                </div>
              </div>
            </motion.div>
          </div>
          <div className="border-t border-black/[0.05] p-3 flex items-center gap-2">
            <div className="flex-1 rounded-xl bg-black/[0.03] px-3 py-2 text-[8px] text-brand-ink/30 font-body">
              Message #{activeChannel}
            </div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.92 }}
              className="size-7 rounded-lg bg-brand text-white flex items-center justify-center cursor-pointer"
            >
              <MessageSquare className="size-3" />
            </motion.div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="hidden lg:flex w-[170px] border-l border-black/[0.05] bg-[#FAFAFA] p-3 flex-col overflow-hidden">
          <div className="text-[9px] font-semibold text-brand-ink/50 uppercase tracking-wide font-body">Class Info</div>
          
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 rounded-xl bg-white border border-black/[0.05] p-3 shadow-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-[16px] font-bold text-brand font-display leading-none"
            >
              94%
            </motion.div>
            <div className="text-[8px] text-brand-ink/50 font-body mt-0.5">Attendance Today</div>
          </motion.div>

          <div className="mt-4 overflow-hidden">
            <div className="text-[8px] font-semibold text-brand-ink mb-2 font-body">Online Members</div>
            <div className="space-y-2">
              {channelData.members.slice(0, 2).map((m, i) => (
                <motion.div
                  key={`item-${i}`}
                  initial={{ opacity: 0, x: 6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-2"
                >
                  <div className="relative shrink-0">
                    <div className="size-6 rounded-full bg-black/[0.05]" />
                    {m.online && (
                      <motion.span
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute bottom-0 right-0 size-2 rounded-full bg-green-500 border border-white"
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[7px] font-semibold text-brand-ink truncate font-body">{m.name}</div>
                    <div className="text-[6px] text-brand-ink/40 font-body">{m.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 rounded-xl bg-brand/[0.06] border border-brand/[0.08] p-3"
          >
            <div className="text-[8px] font-semibold text-brand font-body">Next Class</div>
            <div className="text-[7px] text-brand-ink/60 mt-1 font-body">Mathematics · 10:30 AM</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------
   2. CLASSES MOCK (animated)
----------------------------------------------------- */
export function ClassesMock() {
  return (
    <div className="rounded-xl border border-white/[0.06] overflow-hidden bg-[#1A1C1D] shadow-[0_1px_4px_rgba(0,0,0,0.4)] relative">
      <div className="flex flex-col p-3 md:p-5 h-[400px] md:h-[480px]">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-start gap-2">
            <div className="mt-1 size-3.5 rounded-full border border-white/20 flex items-center bg-gradient-to-br from-brand/30 to-purple-500/30 justify-center text-[7px] text-white/50 font-bold">i</div>
            <div>
              <div className="text-[8px] uppercase tracking-[0.15em] text-white/40 font-semibold mb-0.5">Class Mode</div>
              <div className="text-[14px] font-bold text-white font-body leading-tight">Physics — Class X</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex items-center gap-1.5 rounded-full bg-green-500/10 px-2 py-1"
            >
              <span className="size-1 rounded-full bg-green-500" />
              <span className="text-[8px] font-bold text-green-500 uppercase">Live</span>
            </motion.div>
          </div>
        </div>

        <div className="flex-1 flex gap-3 min-h-0 relative">
          {/* Teacher Card */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="flex-1 rounded-xl border border-white/5 bg-[#2A2D31] p-1.5 flex flex-col shadow-sm min-w-0"
          >
            <div className="flex-1 rounded-lg relative overflow-hidden flex items-center justify-center">
              <div className="absolute top-2.5 left-2.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[8px] font-medium text-white z-10">
                Teacher control view
              </div>
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center z-10"
              >
                <div className="w-[40px] h-[40px] md:w-[56px] md:h-[56px] rounded-full bg-gradient-to-br from-brand to-purple-500 flex items-center justify-center text-white text-base md:text-lg font-bold shadow-lg" />
              </motion.div>
              <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-black/80 to-transparent z-0" />
              <div className="absolute bottom-2.5 left-3 z-10">
                <div className="text-[12px] font-bold text-white tracking-wide">Albert</div>
                <div className="text-[8px] text-white/50 mt-0.5">You · HOST</div>
              </div>
              <div className="absolute bottom-2.5 right-2.5 flex gap-1.5 z-10">
                {[<MicOff key="micoff" className="size-3" />, <VideoOff key="videooff" className="size-3" />].map((ic, i) => (
                  <motion.div
                    key={`item-${i}`}
                    whileHover={{ scale: 1.15 }}
                    className="size-6 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white cursor-pointer"
                  >
                    {ic}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Student sidebar */}
          <div className="basis-[22%] min-w-[100px] max-w-[140px] rounded-xl border border-white/5 bg-white/[0.04] backdrop-blur-sm p-2 flex flex-col shadow-sm shrink-0">
            <div className="flex flex-col gap-1.5 mb-2">
              <div className="text-[7px] font-bold text-white/40 uppercase tracking-[0.2em] leading-tight">Visible Seats</div>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="h-[80px] rounded-lg relative overflow-hidden bg-[#E2E8F0]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent z-0" />
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="size-10 rounded-full bg-gradient-to-br from-[#1E3A8A] text-white text-[13px] font-bold flex items-center justify-center shadow-md" />
              </div>
              <div className="absolute bottom-2 left-2 text-[8px] font-semibold text-white z-20">Arpit Kumar</div>
              <div className="absolute bottom-1.5 right-1.5 size-5 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg z-20">
                <MicOff className="size-2.5" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Controls — flex centered, no absolute positioning */}
        <div className="flex justify-center pt-2">
          <motion.div
            initial={{ y: 12, opacity: 0, scale: 0.95 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring", stiffness: 240, damping: 24 }}
            className="rounded-full bg-[#2A2D31] px-2 py-1.5 flex items-center gap-1 shadow-[0_4px_20px_rgba(0,0,0,0.35)] border border-white/[0.06]"
          >
            {["🎤", "📹", "🖥️", "✋", "⛶", "⋯"].map((icon, i) => (
              <motion.button
                key={`item-${i}`}
                whileHover={{ scale: 1.18, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.15 }}
                className="size-7 rounded-full bg-white/5 flex items-center justify-center text-[10px] text-white/70"
              >
                {icon}
              </motion.button>
            ))}
            <motion.button
              whileHover={{ scale: 1.06, backgroundColor: "#E0352B" }}
              whileTap={{ scale: 0.94 }}
              transition={{ duration: 0.15 }}
              className="ml-1 px-4 h-7 rounded-full bg-[#FF3B30] text-white text-[10px] font-bold"
            >
              Leave
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------
   3. MEETINGS MOCK
----------------------------------------------------- */
const MEETING_PARTICIPANTS = [
  { name: "Mr. Sharma", role: "Teacher", speaking: true },
  { name: "Aarav P.", role: "Student", speaking: false },
  { name: "Priya K.", role: "Student", speaking: false },
  { name: "Rohan S.", role: "Student", speaking: false },
];

export function MeetingsMock() {
  return (
    <div className="rounded-xl border border-black/[0.06] overflow-hidden bg-[#1a1c1d] shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
      <div className="p-2.5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="size-1.5 rounded-full bg-red-500"
            />
            <span className="text-[8px] font-semibold text-red-400 font-body">LIVE</span>
            <span className="text-[8px] text-white/40 font-body ml-1">Class X – Physics</span>
          </div>
          <span className="text-[7px] text-white/30 font-body">34 students</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {MEETING_PARTICIPANTS.map((p, i) => (
            <motion.div
              key={`item-${i}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ scale: 1.03, zIndex: 10 }}
              className={`rounded-lg overflow-hidden relative ${i === 0 ? "bg-gradient-to-br from-brand/30 to-purple-500/30" : "bg-white/[0.06]"} aspect-[4/3] flex items-center justify-center`}
            >
              <Avatar size="size-8" color={i === 0 ? "bg-gradient-to-br from-brand to-purple-500" : "bg-white/10"} />
              <div className="absolute bottom-1 left-1.5 flex items-center gap-1">
                <span className="text-[7px] text-white/80 font-body">{p.name}</span>
                {p.speaking && (
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
                    <Mic className="size-2 text-green-400" />
                  </motion.div>
                )}
              </div>
              {i > 0 && <MicOff className="absolute top-1 right-1 size-2 text-white/30" />}
            </motion.div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-3 mt-2.5 pt-2 border-t border-white/[0.06]">
          {[
            { icon: <Mic className="size-3" />, active: true },
            { icon: <Video className="size-3" />, active: true },
            { icon: <Monitor className="size-3" />, active: false },
          ].map((c, i) => (
            <motion.div
              key={`item-${i}`}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className={`size-6 rounded-full flex items-center justify-center cursor-pointer ${c.active ? "bg-white/10 text-white" : "bg-white/[0.06] text-white/30"}`}
            >
              {c.icon}
            </motion.div>
          ))}
          <motion.div
            whileHover={{ scale: 1.12, backgroundColor: "#e02020" }}
            whileTap={{ scale: 0.9 }}
            className="size-6 rounded-full bg-red-500 flex items-center justify-center cursor-pointer"
          >
            <VideoOff className="size-3 text-white" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------
   4. WEBINARS MOCK
----------------------------------------------------- */
export function WebinarsMock() {
  return (
    <div className="rounded-xl border border-black/[0.06] overflow-hidden bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
      <div className="bg-gradient-to-br from-[#1a1c1d] to-[#2d2f30] p-3 relative">
        <div className="flex items-center gap-1.5 mb-2">
          <Presentation className="size-3 text-brand" />
          <span className="text-[8px] font-semibold text-white/80 font-body">Career Guidance Webinar</span>
          <span className="ml-auto flex items-center gap-1 text-[7px] text-red-400 font-body">
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="size-1.5 rounded-full bg-red-500"
            />
            LIVE
          </span>
        </div>
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="rounded-lg bg-white/[0.06] aspect-[16/7] flex items-center justify-center relative overflow-hidden"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Avatar size="size-10" color="bg-gradient-to-br from-brand to-purple-500" />
          </motion.div>
          <div className="absolute bottom-1.5 left-2 text-[7px] text-white/60 font-body">Dr. Priya Mehta – IIT Delhi</div>
          <div className="absolute top-1.5 right-2 flex items-center gap-1 bg-black/40 rounded-full px-2 py-0.5">
            <Users className="size-2 text-white/60" />
            <span className="text-[7px] text-white/70 font-body">342 watching</span>
          </div>
        </motion.div>
      </div>
      <div className="p-2.5 space-y-1.5">
        <div className="text-[8px] font-semibold text-brand-ink/50 uppercase tracking-wider font-body">Upcoming</div>
        {[
          { title: "CBSE Board Prep Tips", date: "Dec 5", speakers: 2 },
          { title: "Digital Literacy Workshop", date: "Dec 12", speakers: 1 },
        ].map((w, i) => (
          <motion.div
            key={`item-${i}`}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ x: 2 }}
            className="flex items-center gap-2 p-1.5 rounded-lg bg-black/[0.02] cursor-pointer"
          >
            <Calendar className="size-3 text-brand/50" />
            <div className="flex-1">
              <div className="text-[7px] font-semibold text-brand-ink font-body">{w.title}</div>
              <div className="text-[6px] text-brand-ink/40 font-body">{w.date} · {w.speakers} speaker{w.speakers > 1 ? "s" : ""}</div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(99,102,241,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="text-[6px] bg-brand/10 text-brand px-2 py-0.5 rounded-full font-semibold font-body"
            >
              Register
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* -----------------------------------------------------
   5. MEMBERS MOCK
----------------------------------------------------- */
export function MembersMock() {
  const tabConfig = [
    { label: "Students", icon: <GraduationCap className="size-2.5" />, count: 1842 },
    { label: "Teachers", icon: <BookOpen className="size-2.5" />, count: 86 },
    { label: "Admin", icon: <Shield className="size-2.5" />, count: 12 },
    { label: "Alumni", icon: <UserCheck className="size-2.5" />, count: 340 },
  ];

  const memberData: Record<string, { name: string; role: string; status: string; color: string }[]> = {
    Students: [
      { name: "Aarav Patel", role: "Class X-A", status: "Active", color: "bg-green-400" },
      { name: "Sneha Iyer", role: "Class X-B", status: "Active", color: "bg-green-400" },
      { name: "Rohan Joshi", role: "Class IX-A", status: "Absent", color: "bg-red-400" },
      { name: "Priya Sharma", role: "Class X-A", status: "Active", color: "bg-green-400" },
    ],
    Teachers: [
      { name: "Mrs. Kapoor", role: "Science Dept.", status: "Active", color: "bg-green-400" },
      { name: "Mr. Verma", role: "Mathematics", status: "Active", color: "bg-green-400" },
      { name: "Mrs. Gupta", role: "English Dept.", status: "On Leave", color: "bg-amber-400" },
    ],
    Admin: [
      { name: "Mr. Singh", role: "Principal", status: "Active", color: "bg-green-400" },
      { name: "Mrs. Rao", role: "Vice Principal", status: "Active", color: "bg-green-400" },
      { name: "Mr. Das", role: "Accountant", status: "Active", color: "bg-green-400" },
    ],
    Alumni: [
      { name: "Rahul Khanna", role: "Batch 2020", status: "Verified", color: "bg-green-400" },
      { name: "Ananya Bose", role: "Batch 2021", status: "Verified", color: "bg-green-400" },
      { name: "Dev Sharma", role: "Batch 2022", status: "Pending", color: "bg-amber-400" },
    ],
  };

  const [activeTab, setActiveTab] = useState("Students");
  const members = memberData[activeTab] ?? [];

  return (
    <div className="rounded-xl border border-black/[0.06] overflow-hidden bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)] p-3">
      <div className="flex gap-1 mb-3 overflow-hidden">
        {tabConfig.map((t) => (
          <motion.button
            key={t.label}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(t.label)}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[7px] font-semibold font-body transition-colors border-none
              ${activeTab === t.label ? "bg-brand/10 text-brand" : "bg-transparent text-brand-ink/40 hover:bg-black/[0.03]"}`}
          >
            {t.icon}
            <span>{t.label}</span>
            <span className={`text-[6px] px-1 py-0.5 rounded-full ${activeTab === t.label ? "bg-brand/20" : "bg-black/[0.05]"}`}>
              {t.count.toLocaleString()}
            </span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
          className="space-y-1.5"
        >
          {members.map((m, i) => (
            <motion.div
              key={`item-${i}`}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ x: 3, backgroundColor: "rgba(0,0,0,0.015)" }}
              className="flex items-center gap-2 rounded-lg p-1.5 transition-colors cursor-pointer"
            >
              <Avatar size="size-5" />
              <div className="flex-1 min-w-0">
                <div className="text-[8px] font-semibold text-brand-ink font-body">{m.name}</div>
                <div className="text-[7px] text-brand-ink/40 font-body">{m.role}</div>
              </div>
              <div className="flex items-center gap-1">
                <motion.span
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  className={`size-1.5 rounded-full ${m.color}`}
                />
                <span className="text-[7px] text-brand-ink/40 font-body">{m.status}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* -----------------------------------------------------
   6. NOTICE MOCK
----------------------------------------------------- */
export function NoticeMock() {
  const notices = [
    { title: "Annual Sports Day – Nov 28", priority: "Important", pinned: true, time: "2h ago", color: "text-red-500 bg-red-50" },
    { title: "Winter Vacation: Dec 24 – Jan 2", priority: "General", pinned: true, time: "1d ago", color: "text-brand bg-brand/[0.08]" },
    { title: "PTM Schedule for Class IX & X", priority: "Action Required", pinned: false, time: "3d ago", color: "text-amber-600 bg-amber-50" },
  ];

  return (
    <div className="rounded-xl border border-black/[0.06] overflow-hidden bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)] p-3">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5">
          <motion.div
            animate={{ rotate: [0, -15, 15, -8, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Bell className="size-3 text-brand" />
          </motion.div>
          <span className="text-[9px] font-semibold text-brand-ink font-body">Notice Board</span>
        </div>
        <motion.span
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="badge badge-brand text-[7px] py-0.5"
        >
          3 New
        </motion.span>
      </div>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="space-y-2">
        {notices.map((n, i) => (
          <motion.div
            key={`item-${i}`}
            variants={fadeUp}
            whileHover={{ x: 3, scale: 1.01 }}
            className="rounded-lg p-2 bg-black/[0.015] border border-black/[0.04] cursor-pointer"
          >
            <div className="flex items-start gap-2">
              {n.pinned && (
                <motion.div animate={{ rotate: [0, -5, 5, 0] }} transition={{ duration: 3, repeat: Infinity, delay: i }}>
                  <Pin className="size-2.5 text-brand/50 mt-0.5 shrink-0" />
                </motion.div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-[8px] font-semibold text-brand-ink font-body">{n.title}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[6px] font-semibold px-1.5 py-0.5 rounded-full ${n.color} font-body`}>{n.priority}</span>
                  <span className="text-[6px] text-brand-ink/30 font-body">{n.time}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/* -----------------------------------------------------
   7. ACTIVITY MOCK
----------------------------------------------------- */
export function ActivityMock() {
  const activities = [
    { action: "Assignment submitted", user: "Aarav Patel", detail: "Mathematics – Ch.7", time: "2 min", icon: <Activity className="size-2.5" />, color: "bg-green-500/10 text-green-600" },
    { action: "Attendance marked", user: "Mrs. Gupta", detail: "Class X-A – 94%", time: "15 min", icon: <UserCheck className="size-2.5" />, color: "bg-brand/10 text-brand" },
    { action: "Notice published", user: "Admin", detail: "Annual Sports Day", time: "1 hr", icon: <Bell className="size-2.5" />, color: "bg-amber-500/10 text-amber-600" },
    { action: "Meeting scheduled", user: "Principal", detail: "PTA – Dec 5", time: "2 hr", icon: <Calendar className="size-2.5" />, color: "bg-purple-500/10 text-purple-600" },
    { action: "New student added", user: "Admin", detail: "Rohan Joshi – IX-A", time: "3 hr", icon: <Users className="size-2.5" />, color: "bg-blue-500/10 text-blue-600" },
  ];

  return (
    <div className="rounded-xl border border-black/[0.06] overflow-hidden bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)] p-3">
      <div className="text-[9px] font-semibold text-brand-ink font-body mb-2.5">Recent Activity</div>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="space-y-0.5">
        {activities.map((a, i) => (
          <motion.div
            key={`item-${i}`}
            variants={fadeUp}
            whileHover={{ x: 4 }}
            className="flex items-start gap-2 py-1.5 relative cursor-pointer"
          >
            {i < activities.length - 1 && (
              <div className="absolute left-[9px] top-[22px] w-px h-[calc(100%-6px)] bg-black/[0.06]" />
            )}
            <motion.div
              whileHover={{ scale: 1.2, rotate: 5 }}
              className={`w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0 relative z-10 ${a.color}`}
            >
              {a.icon}
            </motion.div>
            <div className="flex-1 min-w-0">
              <div className="text-[8px] font-body">
                <span className="font-semibold text-brand-ink">{a.action}</span>
                <span className="text-brand-ink/40"> by {a.user}</span>
              </div>
              <div className="text-[7px] text-brand-ink/40 font-body">{a.detail} · {a.time} ago</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/* -----------------------------------------------------
   FEATURES SECTION DATA
----------------------------------------------------- */
const features = [
  {
    id: "messages",
    label: "Messages",
    icon: MessageSquare,
    accent: "#6366f1",
    headline: "Real-time school communication",
    sub: "Channels, notices, and direct messaging — all in one organized workspace.",
    mock: MessagesMock,
    span: "lg:col-span-2",
  },
  {
    id: "classes",
    label: "Classes",
    icon: Video,
    accent: "#8b5cf6",
    headline: "Live virtual classrooms",
    sub: "SFU-powered video at 360p with teacher controls and student management.",
    mock: ClassesMock,
    span: "lg:col-span-1",
  },
  {
    id: "meetings",
    label: "Meetings",
    icon: Users,
    accent: "#06b6d4",
    headline: "HD faculty meetings",
    sub: "PTMs, staff meetings, and parent calls — professional and seamless.",
    mock: MeetingsMock,
    span: "lg:col-span-1",
  },
  {
    id: "webinars",
    label: "Webinars",
    icon: Presentation,
    accent: "#f59e0b",
    headline: "School-wide broadcasts",
    sub: "Career guidance, board prep, and large-scale events for 300+ attendees.",
    mock: WebinarsMock,
    span: "lg:col-span-1",
  },
  {
    id: "members",
    label: "Members",
    icon: GraduationCap,
    accent: "#10b981",
    headline: "Full institution directory",
    sub: "Students, teachers, admin, and alumni — all managed from one dashboard.",
    mock: MembersMock,
    span: "lg:col-span-1",
  },
  {
    id: "notice",
    label: "Notice Board",
    icon: Bell,
    accent: "#ef4444",
    headline: "Smart notice delivery",
    sub: "Pinned announcements with priority levels reach the right people instantly.",
    mock: NoticeMock,
    span: "lg:col-span-1",
  },
  {
    id: "activity",
    label: "Activity",
    icon: Activity,
    accent: "#8b5cf6",
    headline: "Live institution feed",
    sub: "Every action logged, timestamped, and visible for full transparency.",
    mock: ActivityMock,
    span: "lg:col-span-1",
  },
];

/* -----------------------------------------------------
   SECTION HEADER with scroll parallax
----------------------------------------------------- */
function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const [scramble, setScramble] = useState(false);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setScramble(true), 200);
      return () => clearTimeout(t);
    }
  }, [inView]);

  return (
    <motion.div ref={ref} style={{ y }} className="text-center mb-20 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/[0.08] border border-brand/[0.12] mb-6"
      >
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
          <Sparkles className="size-3.5 text-brand" />
        </motion.div>
        <span className="text-[11px] font-bold text-brand tracking-widest uppercase">Platform Features</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-4xl md:text-5xl font-bold text-brand-ink font-display leading-tight"
      >
        <ScrambleText text="Every school." trigger={scramble} />
        <br />
        <span className="text-brand">One platform.</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mt-4 text-brand-ink/50 text-base max-w-xl mx-auto font-body leading-relaxed"
      >
        HermesWorkspace brings communication, classes, and administration under one roof — built specifically for Indian schools.
      </motion.p>

      {/* Animated stats row */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex items-center justify-center gap-8 mt-8"
      >
        {[
          { value: "2000+", label: "Students per school" },
          { value: "30", label: "Concurrent meetings" },
          { value: "360p", label: "SFU video quality" },
        ].map((s, i) => (
          <FloatingBadge key={`item-${i}`} delay={i * 0.3}>
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-ink font-display">{s.value}</div>
              <div className="text-[11px] text-brand-ink/40 font-body">{s.label}</div>
            </div>
          </FloatingBadge>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* -----------------------------------------------------
   MAIN FEATURES SECTION
----------------------------------------------------- */
export function FeaturesSection() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <CursorGlow />

      {/* Three.js background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <ParticleBackground />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeader />

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {features.map((f, i) => {
            const MockComp = f.mock;
            return (
              <FeatureCard
                key={f.id}
                label={f.label}
                icon={f.icon}
                accent={f.accent}
                delay={i * 0.07}
                // @ts-ignore
                className={f.span}
              >
                <motion.div
                  className={`rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm pt-6 ${f.span}`}
                  whileHover={{ y: -3, boxShadow: `0 12px 40px ${f.accent}18` }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Feature header */}
                  <div className="mb-4">
                    <h3 className="text-[15px] font-bold text-brand-ink font-body">{f.headline}</h3>
                    <p className="text-[11px] text-brand-ink/50 font-body mt-1 leading-relaxed">{f.sub}</p>
                  </div>

                  {/* Mock */}
                  <MockComp />

                  {/* Learn more */}
                  <motion.div
                    className="mt-4 flex items-center gap-1 text-[11px] font-semibold cursor-pointer group"
                    style={{ color: f.accent }}
                    whileHover={{ x: 4 }}
                  >
                    <span>Learn more</span>
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="size-3" />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </FeatureCard>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-20"
        >
          <MagneticButton className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand text-white font-bold text-sm shadow-lg hover:shadow-brand/30 transition-shadow">
            <Zap className="size-4" />
            Get early access
            <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ArrowRight className="size-4" />
            </motion.div>
          </MagneticButton>
          <p className="text-[11px] text-brand-ink/30 mt-3 font-body">Now onboarding CBSE schools in Ranchi</p>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturesSection;
