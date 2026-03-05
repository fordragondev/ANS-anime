"use client";

export function HomeV2() {
    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 font-serif pt-16 flex flex-col items-center justify-center">
            <div className="text-center px-4">
                <h1 className="text-5xl md:text-7xl font-light tracking-widest text-emerald-400 mb-6 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]">
                    MODERN ANIME
                </h1>
                <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl mx-auto italic">
                    Welcome to the alternate viewing experience. This is Page V2, ready for a completely different layout and design system.
                </p>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {/* Skeleton placeholders for V2 design */}
                    <div className="h-64 bg-neutral-900 border border-neutral-800 rounded-lg hover:border-emerald-500/50 transition-colors"></div>
                    <div className="h-64 bg-neutral-900 border border-neutral-800 rounded-lg hover:border-emerald-500/50 transition-colors"></div>
                    <div className="h-64 bg-neutral-900 border border-neutral-800 rounded-lg hover:border-emerald-500/50 transition-colors"></div>
                </div>
            </div>
        </div>
    );
}
