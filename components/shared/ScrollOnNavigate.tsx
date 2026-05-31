"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  cleanUrlAfterScroll,
  getScrollIdFromLocation,
  scrollToSection,
  stripHashFromUrl,
} from "@/lib/scroll-to-section";

function scrollWithRetry(maxAttempts = 30, intervalMs = 100): void {
  const id = getScrollIdFromLocation();
  if (!id) return;

  let attempts = 0;
  const tryScroll = () => {
    if (scrollToSection(id)) {
      cleanUrlAfterScroll();
      return;
    }
    if (attempts++ < maxAttempts) {
      setTimeout(tryScroll, intervalMs);
    }
  };

  tryScroll();
}

export default function ScrollOnNavigate() {
  const pathname = usePathname();

  useEffect(() => {
    const timer = window.setTimeout(() => scrollWithRetry(), 150);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => {
      const id = window.location.hash.slice(1);
      if (!id) return;
      if (scrollToSection(id)) {
        stripHashFromUrl();
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
