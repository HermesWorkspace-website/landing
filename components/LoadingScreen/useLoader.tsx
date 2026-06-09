"use client";

/**
 * useLoader.tsx — WithLoader wrapper
 * components/LoadingScreen/useLoader.tsx
 *
 * Usage in layout.tsx:
 *   import { WithLoader } from "@/components/LoadingScreen/useLoader"
 *   <WithLoader>{children}</WithLoader>
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "./LoadingScreen";

const SESSION_KEY = "__hw_loaded";

interface WithLoaderProps {
  children: React.ReactNode;
  /** Pass alwaysShow during dev to force loader every reload */
  alwaysShow?: boolean;
}

export function WithLoader({ children, alwaysShow = false }: WithLoaderProps) {
  const [mounted, setMounted] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setMounted(true);
    if (!alwaysShow && sessionStorage.getItem(SESSION_KEY)) {
      setShowLoader(false);
    }
  }, [alwaysShow]);

  const handleComplete = () => {
    if (!alwaysShow) sessionStorage.setItem(SESSION_KEY, "1");
    setShowLoader(false);
  };

  const isLoaderActive = !mounted || showLoader;

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoaderActive && (
          <LoadingScreen onComplete={handleComplete} />
        )}
      </AnimatePresence>

      {/*
       * KEY FIX: `initial` only fires on first mount, never again.
       * `animate` always drives toward opacity:1 and never goes back to 0.
       * This means soft navigations (router.push) that trigger re-renders
       * will NOT re-trigger the opacity-0 → opacity-1 animation, so the
       * wrapper never becomes invisible/non-interactive mid-session.
       */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}