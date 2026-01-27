'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import TopStory from '@/components/sections/TopStory';
import TopPicks from '@/components/sections/TopPicks';
import LatestNews from '@/components/sections/LatestNews';
import CategorySection from '@/components/sections/CategorySection';
import {
  TopStorySkeleton,
  TopPicksSkeleton,
  LatestNewsSkeleton,
  CategorySectionSkeleton,
} from '@/components/sections/LoadingSkeletons';
import SearchModal from '@/components/SearchModal';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useAnimeData } from '@/hooks/useAnimeData';
import { useSectionData } from '@/hooks/useSectionData';
import { useSearch } from '@/hooks/useSearch';
import { filterAnimeByType, getUniqueTypes } from '@/lib/utils';
import { SECTION_ALLOCATION } from '@/lib/constants';
import { AnimeType } from '@/types/anime';

export default function Home() {
  const { data, isLoading, error, refetch } = useAnimeData();
  const { sectionData, isLoadingDetails } = useSectionData(data);
  const [selectedType, setSelectedType] = useState<AnimeType>('All');
  const [latestNewsCount, setLatestNewsCount] = useState(SECTION_ALLOCATION.LATEST_NEWS_INITIAL);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { query, setQuery, results, clearSearch } = useSearch(data);

  const uniqueTypes = useMemo(() => getUniqueTypes(data), [data]);

  // Filter latest news by type
  const filteredLatestNews = useMemo(() => {
    if (!sectionData) return [];
    const filtered = filterAnimeByType(sectionData.latestNews, selectedType);
    return filtered.slice(0, latestNewsCount);
  }, [sectionData, selectedType, latestNewsCount]);

  const handleLoadMore = () => {
    setLatestNewsCount((prev) => prev + SECTION_ALLOCATION.LATEST_NEWS_LOAD_MORE);
  };

  const hasMoreNews = useMemo(() => {
    if (!sectionData) return false;
    const totalFiltered = filterAnimeByType(sectionData.latestNews, selectedType).length;
    return latestNewsCount < totalFiltered;
  }, [sectionData, selectedType, latestNewsCount]);

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    clearSearch();
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type as AnimeType);
    setLatestNewsCount(SECTION_ALLOCATION.LATEST_NEWS_INITIAL);
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

  const showLoading = isLoading || (data.length > 0 && isLoadingDetails && !sectionData);

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
        <SearchModal
          isOpen={isSearchOpen}
          onClose={handleSearchClose}
          query={query}
          onQueryChange={setQuery}
          results={results}
        />
      </div>
    </ErrorBoundary>
  );
}
