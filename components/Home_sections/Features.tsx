"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MessageSquare, Video, Bell, Users, Activity,
  Calendar, Presentation, ShieldCheck, Globe2,
  BookOpen, Zap
} from "lucide-react";
import {
  MessagesMock, ClassesMock, MeetingsMock, WebinarsMock,
  MembersMock, NoticeMock, ActivityMock
} from "./FeatureMocks";

const features = [
  {
    icon: <MessageSquare className="size-5" />,
    title: "Messages",
    desc: "Parent–teacher, staff room, and class group chats — all in one place with read receipts and instant delivery.",
    color: "bg-purple-500/[0.07] text-purple-600",
    size: "col-span-2",
    mock: <MessagesMock />,
  },
  {
    icon: <Activity className="size-5" />,
    title: "Activity",
    desc: "Real-time activity feed — track assignments, attendance, notices, and every action across your school.",
    color: "bg-brand/[0.07] text-brand",
    size: "col-span-1",
    mock: <ActivityMock />,
  },
  {
    icon: <Calendar className="size-5" />,
    title: "Meetings",
    desc: "Schedule and manage staff meetings, PTA sessions, and board reviews — with calendar sync and reminders.",
    color: "bg-amber-500/[0.07] text-amber-600",
    size: "col-span-1",
    mock: <MeetingsMock />,
  },
  {
    icon: <Presentation className="size-5" />,
    title: "Webinars",
    desc: "Host large-scale webinars for career guidance, parent orientations, and guest lectures — with registration and recordings.",
    color: "bg-rose-500/[0.07] text-rose-600",
    size: "col-span-2",
    mock: <WebinarsMock />,
  },
  {
    icon: <Users className="size-5" />,
    title: "Members",
    desc: "Manage students, teachers, admins, and alumni — all with role-based access, profiles, and bulk onboarding.",
    color: "bg-green-500/[0.07] text-green-600",
    size: "col-span-2",
    mock: <MembersMock />,
  },
  {
    icon: <Bell className="size-5" />,
    title: "Notice",
    desc: "Push school announcements to every parent's phone in seconds — with delivery tracking and priority tags.",
    color: "bg-blue-500/[0.07] text-blue-600",
    size: "col-span-1",
    mock: <NoticeMock />,
  },
  {
    icon: <Video className="size-5" />,
    title: "Classes",
    desc: "HD video classes at 360p SFU quality — run 30 concurrent sessions serving 150 students each.",
    color: "bg-brand/[0.07] text-brand",
    size: "col-span-3",
    mock: <ClassesMock />,
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function Features() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} id="features" className="relative py-section overflow-hidden">
      <div className="container-page">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[560px] mb-14"
        >
          <span className="section-eyebrow">Features</span>
          <h2 className="font-display text-display-xl font-extrabold text-brand-ink mt-3 tracking-[-0.03em]">
            Everything a school needs.{" "}
            <span className="gradient-text-brand">Nothing it doesn&apos;t.</span>
          </h2>
          <p className="mt-4 text-body-lg text-brand-muted font-body leading-relaxed">
            One subscription. Every tool your teachers, students, and parents rely on daily.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              variants={item}
              className={`bento p-6 flex flex-col gap-4 ${
                f.size === "col-span-2" ? "md:col-span-2 lg:col-span-2" : 
                f.size === "col-span-3" ? "md:col-span-2 lg:col-span-3" : ""
              }`}
            >
              {/* Icon + title row */}
              <div className="flex items-start gap-3">
                <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${f.color}`}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-display text-[1.0625rem] font-bold text-brand-ink tracking-tight mb-1">
                    {f.title}
                  </h3>
                  <p className="text-body-sm text-brand-muted font-body leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>

              {/* Mock UI preview */}
              <div className="mt-1">
                {f.mock}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-brand-muted font-body"
        >
          {[
            { icon: <ShieldCheck className="size-4 text-green-600" />, label: "DPDPA Compliant" },
            { icon: <Globe2 className="size-4 text-brand" />, label: "Hosted in India" },
            { icon: <Zap className="size-4 text-amber-500" />, label: "99.9% Uptime SLA" },
            { icon: <BookOpen className="size-4 text-purple-600" />, label: "CBSE / ICSE / State Ready" },
          ].map((t) => (
            <div key={t.label} className="flex items-center gap-2">
              {t.icon}
              <span>{t.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
