'use client';

import React, { createContext, useContext, useEffect, useRef } from 'react';
import { X, Search } from 'lucide-react';
import { AnimeItem } from '@/types/anime';
import AnimeCard from '@/components/AnimeCard';

interface SearchModalContextType {
    isOpen: boolean;
    onClose: () => void;
}

const SearchModalContext = createContext<SearchModalContextType | undefined>(undefined);

function useSearchModalContext() {
    const context = useContext(SearchModalContext);
    if (!context) {
        throw new Error('SearchModal components must be used within a SearchModalSwr.Root');
    }
    return context;
}

export function Root({
    isOpen,
    onClose,
    children,
}: {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <SearchModalContext.Provider value={{ isOpen, onClose }}>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={onClose}
                />
                <div className="relative min-h-screen flex items-start justify-center p-4 pt-20">
                    <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-4xl">
                        {children}
                    </div>
                </div>
            </div>
        </SearchModalContext.Provider>
    );
}

export function Input({
    query,
    onQueryChange,
}: {
    query: string;
    onQueryChange: (query: string) => void;
}) {
    const { onClose } = useSearchModalContext();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Focus when mounted
        inputRef.current?.focus();
    }, []);

    return (
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 rounded-t-lg z-10">
            <div className="flex items-center gap-3">
                <Search className="text-gray-400 dark:text-gray-500" size={24} />
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    placeholder="Search anime by name..."
                    className="flex-1 text-lg outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                />
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"
                    aria-label="Close search"
                >
                    <X size={24} />
                </button>
            </div>
        </div>
    );
}

export function Results({
    query,
    results,
}: {
    query: string;
    results: AnimeItem[];
}) {
    return (
        <div className="p-6 max-h-[60vh] overflow-y-auto">
            {query && results.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                    No results found for &ldquo;{query}&rdquo;
                </p>
            ) : query && results.length > 0 ? (
                <>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Found {results.length} result{results.length !== 1 ? 's' : ''}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {results.map((anime) => (
                            <AnimeCard key={anime.id} anime={anime} />
                        ))}
                    </div>
                </>
            ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                    Start typing to search anime...
                </p>
            )}
        </div>
    );
}

// Export as a compounded object
export const SearchModalSwr = {
    Root,
    Input,
    Results,
};
