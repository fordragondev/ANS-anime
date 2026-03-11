'use client';

import { createContext, use, useEffect, useState, useSyncExternalStore, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

// Subscribe to a no-op store — we only need the server/client snapshot distinction
const emptySubscribe = () => () => { };

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // useSyncExternalStore: server always returns false, client returns true.
  // Avoids the "setState in useEffect" lint error for mount detection.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,  // client snapshot
    () => false  // server snapshot
  );

  const [theme, setTheme] = useState<Theme>(() => {
    // Lazy initializer: reads from localStorage on the client only
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      const stored = localStorage.getItem('theme') as Theme;
      if (stored) return stored;
    }
    return 'system';
  });

  // Determine if dark mode should be active
  const isDark = mounted && (() => {
    if (theme === 'dark') return true;
    if (theme === 'light') return false;
    // System preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  })();

  // Apply dark/light class to html element
  useEffect(() => {
    if (!mounted) return;

    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
      html.classList.remove('light');
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
    }
  }, [isDark, mounted]);

  // Save theme to localStorage (dev only)
  useEffect(() => {
    if (!mounted) return;
    if (process.env.NODE_ENV === 'development') {
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  const toggleDarkMode = useCallback(() => {
    setTheme(prev => {
      if (prev === 'dark') return 'light';
      if (prev === 'light') return 'dark';
      // From system, check current state and toggle
      const currentlyDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return currentlyDark ? 'light' : 'dark';
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = use(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
