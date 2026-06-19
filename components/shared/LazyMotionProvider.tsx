"use client";

import { LazyMotion, domAnimation } from "motion/react";

export default function LazyMotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
