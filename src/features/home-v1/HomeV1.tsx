/**
 * HOME PAGE V1 - Client-Side Rendering (CSR) Strategy
 *
 * RENDERING STRATEGY: CSR (Client-Side Rendering)
 *
 * How it works:
 * 1. The 'use client' directive marks this as a Client Component
 * 2. Initial HTML is sent with a loading skeleton (no data)
 * 3. React hydrates in the browser and fetches data via useHomeV1Data() hook
 * 4. UI updates dynamically as data arrives
 *
 * Why CSR for this page:
 * - Highly interactive (search, filters, load more, modals)
 * - Real-time updates needed (type filters change view instantly)
 * - User-specific state (search queries, filter selections)
 * - SEO less critical for home page (detail pages handle SEO)
 *
 * Trade-offs:
 * + Fast initial page load (minimal HTML)
 * + Smooth interactivity (no page reloads)
 * + Can show loading states with skeletons
 * - Content not visible until JS executes
 * - Search engines may not see full content
 * - Slower time-to-content on slow connections
 *
 * @see /anime/[id]/page.tsx for SSG example
 * @see /search/page.tsx for SSR example
 * @see /browse/page.tsx for Hybrid example
 */
'use client';

import { useState } from 'react';
import Header from '@/features/home-v1/components/Header';
import TopStory from '@/features/home-v1/components/TopStory';
import TopPicks from '@/features/home-v1/components/TopPicks';
import LatestNews from '@/features/home-v1/components/LatestNews';
import CategorySection from '@/features/home-v1/components/CategorySection';
import {
    TopStorySkeleton,
    TopPicksSkeleton,
    LatestNewsSkeleton,
    CategorySectionSkeleton,
} from '@/features/home-v1/components/LoadingSkeletons';
import { SearchModalSwr } from '@/features/home-v1/components/SearchModalSwr';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useHomeV1Data } from '@/features/home-v1/hooks/useHomeV1Data';
import { useSearch } from '@/features/home-v1/hooks/useSearch';
import { useAnimeData } from '@/hooks/useAnimeDataSwr';

export function HomeV1() {
    const {
        sectionData,
        filteredLatestNews,
        showLoading,
        error,
        refetch,
        uniqueTypes,
        selectedType,
        handleTypeChange,
        handleLoadMore,
        hasMoreNews,
        isLoadingDetails,
    } = useHomeV1Data();

    // Search needs raw anime data for searching across all items
    const { data } = useAnimeData();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { query, setQuery, results, clearSearch } = useSearch(data);

    const handleSearchClose = () => {
        setIsSearchOpen(false);
        clearSearch();
    };

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-8 max-w-md w-full text-center mx-4">
                    <h2 className="text-2xl font-bold text-accent mb-4">
                        Failed to Load Data
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">{error.message}</p>
                    <button
                        onClick={refetch}
                        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <ErrorBoundary>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
                <Header onSearchClick={() => setIsSearchOpen(true)} />

                <main>
                    {showLoading ? (
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                            <TopStorySkeleton />
                            <div className="mt-8">
                                <TopPicksSkeleton />
                            </div>
                            <div className="mt-8">
                                <LatestNewsSkeleton />
                            </div>
                            <div className="mt-8">
                                <CategorySectionSkeleton />
                            </div>
                        </div>
                    ) : sectionData ? (
                        <>
                            {/* TOP_STORY - Hero section */}
                            <section className="top_story container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                                <TopStory anime={sectionData.topStory} />
                            </section>

                            {/* TOP_PICKS - 3 column grid */}
                            <section className="top_picks container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                                <TopPicks items={sectionData.topPicks} />
                            </section>

                            {/* QUEUE_MN - Latest News with filter */}
                            <section className="queue_mn container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                                <LatestNews
                                    items={filteredLatestNews}
                                    onLoadMore={handleLoadMore}
                                    hasMore={hasMoreNews}
                                    isLoading={isLoadingDetails}
                                    types={uniqueTypes}
                                    selectedType={selectedType}
                                    onTypeChange={handleTypeChange}
                                />
                            </section>

                            {/* CATEGORY SECTIONS */}
                            {Object.keys(sectionData.categories).length > 0 && (
                                <section className="sections container mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                                        {Object.entries(sectionData.categories).map(([category, categoryData]) => (
                                            <CategorySection
                                                key={category}
                                                title={category}
                                                featured={categoryData.featured}
                                                links={categoryData.links}
                                            />
                                        ))}
                                    </div>
                                </section>
                            )}
                        </>
                    ) : (
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                            <p className="text-center text-gray-500 dark:text-gray-400">No data available</p>
                        </div>
                    )}
                </main>

                {/* Search Modal */}
                <SearchModalSwr.Root isOpen={isSearchOpen} onClose={handleSearchClose}>
                    <SearchModalSwr.Input query={query} onQueryChange={setQuery} />
                    <SearchModalSwr.Results query={query} results={results} />
                </SearchModalSwr.Root>
            </div>
        </ErrorBoundary>
    );
}
