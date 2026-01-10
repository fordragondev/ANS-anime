'use client';

import { Search, User } from 'lucide-react';

interface HeaderProps {
  onSearchClick: () => void;
}

export default function Header({ onSearchClick }: HeaderProps) {
  return (
    <header className="bg-primary text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Anime News</h1>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={onSearchClick}
            className="p-2 hover:bg-white/10 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-white/50"
            aria-label="Search"
          >
            <Search size={24} />
          </button>
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
