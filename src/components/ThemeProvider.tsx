'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  // Client-only mount detection — required for SSR/hydration in Next.js.
  useEffect(() => {
    setMounted(true);
    // Load theme from localStorage (dev only)
    if (process.env.NODE_ENV === 'development') {
      const stored = localStorage.getItem('theme') as Theme;
      if (stored) {
        setTheme(stored);
      }
    }
  }, []);

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

  const toggleDarkMode = () => {
    setTheme(prev => {
      if (prev === 'dark') return 'light';
      if (prev === 'light') return 'dark';
      // From system, check current state and toggle
      const currentlyDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return currentlyDark ? 'light' : 'dark';
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
