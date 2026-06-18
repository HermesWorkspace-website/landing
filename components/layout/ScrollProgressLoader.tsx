"use client";

import dynamic from "next/dynamic";

/**
 * Thin client-component shell that owns the `ssr: false` dynamic import.
 * `ssr: false` is only permitted inside Client Components; the root layout
 * is a Server Component, so this wrapper is the correct boundary.
 */
const ScrollProgress = dynamic(
  () => import("@/components/layout/ScrollProgress"),
  { ssr: false }
);

export default function ScrollProgressLoader() {
  return <ScrollProgress />;
}
