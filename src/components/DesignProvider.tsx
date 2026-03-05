"use client";

import { createContext, use, useState, ReactNode, useEffect } from "react";

type DesignVersion = "v1" | "v2";

const DesignContext = createContext<{
  activeDesign: DesignVersion;
  toggleDesign: () => void;
} | null>(null);

export function DesignProvider({ children }: { children: ReactNode }) {
  const [activeDesign, setActiveDesign] = useState<DesignVersion>("v1");
  const [mounted, setMounted] = useState(false);

  // Use localStorage to remember the user's choice across reloads
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("selectedDesign");
    if (saved === "v1" || saved === "v2") {
      setActiveDesign(saved);
    }
  }, []);

  const toggleDesign = () => {
    setActiveDesign((prev) => {
      const nextDesign = prev === "v1" ? "v2" : "v1";
      localStorage.setItem("selectedDesign", nextDesign);
      return nextDesign;
    });
  };

  // Prevent hydration mismatch by optionally rendering children only after mount, 
  // or just returning the default (v1) on the server.
  if (!mounted) {
    return (
      <DesignContext.Provider value={{ activeDesign: "v1", toggleDesign }}>
        <div style={{ visibility: "hidden" }}>{children}</div>
      </DesignContext.Provider>
    );
  }

  return (
    <DesignContext.Provider value={{ activeDesign, toggleDesign }}>
      {children}
    </DesignContext.Provider>
  );
}

export const useDesign = () => {
  const context = use(DesignContext);
  if (!context) throw new Error("useDesign must be used within DesignProvider");
  return context;
};
