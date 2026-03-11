"use client";

import { createContext, use, useState, ReactNode, useCallback, useSyncExternalStore } from "react";

type DesignVersion = "v1" | "v2";

const DesignContext = createContext<{
  activeDesign: DesignVersion;
  toggleDesign: () => void;
} | null>(null);

// Subscribe to a no-op store — we only need the server/client snapshot distinction
const emptySubscribe = () => () => { };

export function DesignProvider({ children }: { children: ReactNode }) {
  // useSyncExternalStore avoids the "setState in useEffect" lint error
  // and prevents hydration mismatch: server always returns false, client returns true.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,  // client snapshot
    () => false  // server snapshot
  );

  const [activeDesign, setActiveDesign] = useState<DesignVersion>(() => {
    // Lazy initializer: runs only on the client after hydration.
    // On the server, typeof window is undefined so we return the default.
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("selectedDesign");
      if (saved === "v1" || saved === "v2") return saved;
    }
    return "v1";
  });

  const toggleDesign = useCallback(() => {
    setActiveDesign((prev) => {
      const nextDesign = prev === "v1" ? "v2" : "v1";
      localStorage.setItem("selectedDesign", nextDesign);
      return nextDesign;
    });
  }, []);

  // Before mount, render with default value to match server HTML
  const value = {
    activeDesign: mounted ? activeDesign : "v1" as DesignVersion,
    toggleDesign,
  };

  return (
    <DesignContext value={value}>
      {children}
    </DesignContext>
  );
}

export const useDesign = () => {
  const context = use(DesignContext);
  if (!context) throw new Error("useDesign must be used within DesignProvider");
  return context;
};
