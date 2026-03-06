'use client';

import Link from 'next/link';
import { Search, User, Moon, Sun, LayoutGrid } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

interface HeaderProps {
  onSearchClick: () => void;
}

export default function Header({ onSearchClick }: HeaderProps) {
  const { isDark, toggleDarkMode } = useTheme();
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <header className="bg-primary text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold hover:opacity-90 transition-opacity">
          Anime News
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Search - opens modal on home, links to /search elsewhere */}
          <button
            onClick={onSearchClick}
            className="p-2 hover:bg-white/10 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-white/50"
            aria-label="Search"
          >
            <Search size={24} />
          </button>

          {/* Browse Link */}
          <Link
            href="/browse"
            className="flex items-center gap-1.5 p-2 hover:bg-white/10 rounded-full sm:rounded sm:px-3 sm:py-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-white/50"
            aria-label="Browse anime"
          >
            <LayoutGrid size={24} className="sm:w-4 sm:h-4" />
            <span className="hidden sm:inline text-sm font-medium">Browse</span>
          </Link>

          {/* Dev-only dark mode toggle */}
          {isDevelopment && (
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-white/10 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-white/50"
              aria-label="Toggle dark mode"
              title={`Toggle dark mode (Dev Only) - Currently ${isDark ? 'Dark' : 'Light'}`}
            >
              {isDark ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          )}

          <button
            className="p-2 hover:bg-white/10 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-white/50"
            aria-label="User account"
          >
            <User size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
