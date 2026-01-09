'use client';
//import Image from "next/image";
import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import FeaturedArticle from '@/components/FeaturedArticle';
import AnimeCard from '@/components/AnimeCard';
import FilterDropdown from '@/components/FilterDropdown';
import SearchModal from '@/components/SearchModal';
import LoadingCard from '@/components/LoadingCard';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useAnimeData } from '@/hooks/useAnimeData';
import { useSearch } from '@/hooks/useSearch';
import { filterAnimeByType, getUniqueTypes } from '@/lib/utils';
import { PAGINATION } from '@/lib/constants';

export default function Home() {
  const { data, isLoading, error, refetch } = useAnimeData();
  const [selectedType, setSelectedType] = useState('All');
  const [itemsToShow, setItemsToShow] = useState(PAGINATION.INITIAL_ITEMS);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { query, setQuery, results, clearSearch } = useSearch(data);

  const filteredData = useMemo(() => {
    return filterAnimeByType(data, selectedType);
  }, [data, selectedType]);

  const displayedData = useMemo(() => {
    return filteredData.slice(1, itemsToShow + 1); // Skip first item (featured)
  }, [filteredData, itemsToShow]);

  const uniqueTypes = useMemo(() => getUniqueTypes(data), [data]);

  const handleLoadMore = () => {
    setItemsToShow((prev) => prev + PAGINATION.LOAD_MORE_COUNT);
  };

  const hasMore = itemsToShow < filteredData.length - 1;

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    clearSearch();
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-accent mb-4">
            Failed to Load Data
          </h2>
          <p className="text-gray-600 mb-6">{error.message}</p>
          <button
            onClick={refetch}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-secondary">
        <Header onSearchClick={() => setIsSearchOpen(true)} />

        <main className="container mx-auto px-4 py-8">
          {isLoading ? (
            <>
              <div className="h-[400px] md:h-[500px] bg-gray-300 rounded-lg animate-pulse mb-8" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <LoadingCard key={i} />
                ))}
              </div>
            </>
          ) : data.length > 0 ? (
            <>
              {/* Featured Article */}
              {filteredData[0] && <FeaturedArticle anime={filteredData[0]} />}

              {/* Filter */}
              <FilterDropdown
                types={uniqueTypes}
                selectedType={selectedType}
                onTypeChange={(type) => {
                  setSelectedType(type);
                  setItemsToShow(PAGINATION.INITIAL_ITEMS);
                }}
              />

              {/* Grid of Cards */}
              {displayedData.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {displayedData.map((anime) => (
                      <AnimeCard key={anime.id} anime={anime} />
                    ))}
                  </div>

                  {/* Load More Button */}
                  {hasMore && (
                    <div className="text-center">
                      <button
                        onClick={handleLoadMore}
                        className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                      >
                        Load More Stories
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-center text-gray-500 py-8">
                  No anime found for the selected type.
                </p>
              )}
            </>
          ) : (
            <p className="text-center text-gray-500 py-8">No data available</p>
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
