import React from "react";
import { Clapperboard } from 'lucide-react';

export function FooterV2() {
    return (
        <footer className="bg-v2-surface-dark border-t border-v2-border-dark mt-20 py-12 px-5 lg:px-10">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-v2-primary text-white">
                            <Clapperboard size={24} />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">Anime News Hub</span>
                    </div>
                    <div className="flex gap-8">
                        <a className="text-slate-400 hover:text-white transition-colors" href="#"><span className="sr-only">Twitter</span><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg></a>
                        <a className="text-slate-400 hover:text-white transition-colors" href="#"><span className="sr-only">Instagram</span><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg></a>
                        <a className="text-slate-400 hover:text-white transition-colors" href="#"><span className="sr-only">YT</span><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg></a>
                    </div>
                </div>
                <div className="mt-10 border-t border-v2-border-dark pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <div className="flex gap-8">
                        <a className="hover:text-white transition-colors" href="#">Terms of Service</a>
                        <a className="hover:text-white transition-colors" href="#">Privacy Policy</a>
                        <a className="hover:text-white transition-colors" href="#">Contact Us</a>
                    </div>
                    <p>© 2024 Anime News Hub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
