export function HeaderV2() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-v2-border-dark bg-v2-background-dark/95 backdrop-blur-sm px-5 py-3 lg:px-10">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-v2-primary text-white">
                        <span className="material-symbols-outlined text-[24px]">movie_filter</span>
                    </div>
                    <h2 className="hidden text-xl font-bold leading-tight tracking-tight text-white sm:block">Anime News Hub</h2>
                </div>
                <nav className="hidden items-center gap-8 md:flex">
                    <a className="text-sm font-medium text-slate-300 hover:text-v2-primary transition-colors" href="#">News</a>
                    <a className="text-sm font-medium text-slate-300 hover:text-v2-primary transition-colors" href="#">Seasonal</a>
                    <a className="text-sm font-medium text-slate-300 hover:text-v2-primary transition-colors" href="#">Reviews</a>
                    <a className="text-sm font-medium text-slate-300 hover:text-v2-primary transition-colors" href="#">Community</a>
                </nav>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex relative h-10 w-64 items-center rounded-lg bg-v2-surface-dark border border-v2-border-dark">
                        <span className="material-symbols-outlined absolute left-3 text-slate-400">search</span>
                        <input className="h-full w-full bg-transparent pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-v2-primary rounded-lg border-none" placeholder="Search anime..." type="text" />
                    </div>
                    <button className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-v2-surface-dark text-slate-300">
                        <span className="material-symbols-outlined">bookmarks</span>
                    </button>
                    <button className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-v2-border-dark hover:border-v2-primary transition-colors">
                        <img alt="User Avatar" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvY1I3vg-6kVP9NisfozAA8ARbaQ3oO_vgo4TJrIY2x4MK28MTg9rIiNjWS3fhjg4fbH29G8ul-Dg8jNc895stLEHaneIi0mS1akpHRvJzoGhfsl0z47jDcbritfuFbE10_8v5iu3j1sk7i6O08T49W0KZXbipYgjMJn74gzOKAW4eRCQ7ghabASRZTGOC1hAn9bdOit_FTmlxIap4_2by2z9hcmsR-nyd0YGG_weT8Kik4zV0AYF6czsjfECyOfZk0FKa7VoF3cOc" />
                    </button>
                </div>
            </div>
        </header>
    );
}
