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

  // On the server, we want to render the markup with the loader visible initially
  const isLoaderActive = !mounted || showLoader;

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoaderActive && (
          <LoadingScreen onComplete={handleComplete} />
        )}
      </AnimatePresence>

      <motion.div
        initial={isLoaderActive ? { opacity: 0 } : { opacity: 1 }}
        animate={isLoaderActive ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}