"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import LoadingScreen from "./LoadingScreen";

const SESSION_KEY = "__hw_loaded";

interface WithLoaderProps {
  children: React.ReactNode;
  alwaysShow?: boolean;
}

function subscribeSession() {
  return () => {};
}

function getSessionDismissed() {
  try {
    if (typeof window === "undefined") return true;
    return !!sessionStorage.getItem(SESSION_KEY);
  } catch {
    return false;
  }
}

export function WithLoader({ children, alwaysShow = false }: WithLoaderProps) {
  const sessionDismissed = useSyncExternalStore(subscribeSession, getSessionDismissed, () => true);
  const [manuallyDismissed, setManuallyDismissed] = useState(false);
  const pendingRef = useRef(true);

  const dismissed = alwaysShow ? false : (manuallyDismissed || sessionDismissed);

  const handleComplete = useCallback(() => {
    if (!alwaysShow) {
      try { sessionStorage.setItem(SESSION_KEY, "1"); } catch {}
    }
    setManuallyDismissed(true);
    pendingRef.current = false;
  }, [alwaysShow]);

  useEffect(() => {
    pendingRef.current = false;
  }, []);

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