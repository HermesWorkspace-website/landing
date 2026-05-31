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
  const [showLoader, setShowLoader]       = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    if (!alwaysShow && sessionStorage.getItem(SESSION_KEY)) {
      // Already shown this session — skip straight to content
      setShowLoader(false);
      setContentVisible(true);
    }
  }, [alwaysShow]);

  const handleComplete = () => {
    if (!alwaysShow) sessionStorage.setItem(SESSION_KEY, "1");
    setShowLoader(false);
    setTimeout(() => setContentVisible(true), 60);
  };

  return (
    <>
      {showLoader && <LoadingScreen onComplete={handleComplete} />}

      <AnimatePresence>
        {contentVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}