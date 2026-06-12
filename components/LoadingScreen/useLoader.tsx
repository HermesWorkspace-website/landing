"use client";

/**
 * useLoader.tsx — WithLoader wrapper
 * components/LoadingScreen/useLoader.tsx
 *
 * Usage in layout.tsx:
 *   import { WithLoader } from "@/components/LoadingScreen/useLoader"
 *   <WithLoader>{children}</WithLoader>
 */

import { useState, useCallback, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";

const SESSION_KEY = "__hw_loaded";

interface WithLoaderProps {
  children: React.ReactNode;
  /** Pass alwaysShow during dev to force loader every reload */
  alwaysShow?: boolean;
}

export function WithLoader({ children, alwaysShow = false }: WithLoaderProps) {
  const [dismissed, setDismissed] = useState(true);
  const [pending, setPending] = useState(true);

  const handleComplete = useCallback(() => {
    if (!alwaysShow) {
      try { sessionStorage.setItem(SESSION_KEY, "1"); } catch {}
    }
    setDismissed(true);
    setPending(false);
  }, [alwaysShow]);

  useEffect(() => {
    if (alwaysShow) {
      setDismissed(false);
      return;
    }
    try {
      if (!sessionStorage.getItem(SESSION_KEY)) {
        setDismissed(false);
      }
    } catch {
      setDismissed(false);
    }
    setPending(false);
  }, [alwaysShow]);

  const isLoaderActive = !dismissed;

  return (
    <>
      {isLoaderActive && (
        <LoadingScreen onComplete={handleComplete} />
      )}

      <div>
        {children}
      </div>
    </>
  );
}