/**
 * BROWSE CLIENT COMPONENT - Hybrid Rendering (Client Part)
 *
 * This is the Client Component counterpart to the Server Component (page.tsx).
 * It receives pre-fetched data as props and handles all client-side interactivity.
 *
 * Responsibilities:
 * - Type filtering (All, TV, Movie, ONA, OVA, Special)
 * - Pagination ("Load More" functionality)
 * - Instant UI updates (no server round-trips for filtering)
 *
 * The 'use client' directive is required because this component:
 * - Uses React hooks (useState, useMemo)
 * - Handles user interactions (button clicks)
 * - Needs client-side state management
 */
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Filter } from 'lucide-react';
import { AnimeItem, AnimeType } from '@/types/anime';
import { filterAnimeByType, getUniqueTypes, getTypeColor } from '@/lib/utils';
import { ANIME_TYPES } from '@/lib/constants';
import { SubPageHeader } from '@/components/SubPageHeader';

interface BrowseClientProps {
  // Hybrid: Data comes from Server Component, no loading state needed
  initialData: AnimeItem[];
}

const ITEMS_PER_PAGE = 20;

export default function BrowseClient({ initialData }: BrowseClientProps) {
  // Client state for interactivity
  const [selectedType, setSelectedType] = useState<AnimeType>('All');
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  // Get available types from data
  const availableTypes = useMemo(() => getUniqueTypes(initialData), [initialData]);

  // Filter data client-side (instant, no server request)
  const filteredData = useMemo(
    () => filterAnimeByType(initialData, selectedType),
    [initialData, selectedType]
  );

  // Paginate filtered results
  const displayedData = useMemo(
    () => filteredData.slice(0, displayCount),
    [filteredData, displayCount]
  );

  const hasMore = displayCount < filteredData.length;

  const handleTypeChange = (type: AnimeType) => {
    setSelectedType(type);
    setDisplayCount(ITEMS_PER_PAGE); // Reset pagination on filter change
  };

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
  };

  // Count anime by type for the filter badges
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { All: initialData.length };
    initialData.forEach((item) => {
      counts[item.type] = (counts[item.type] || 0) + 1;
    });
    return counts;
  }, [initialData]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <SubPageHeader
        rightContent={
          <Link
            href="/search"
            className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            Search
          </Link>
        }
      />

      {/* Filter Bar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Filter size={18} />
              <span className="text-sm font-medium">Filter:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {ANIME_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => handleTypeChange(type)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedType === type
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {type}
                  <span className="ml-1.5 text-xs opacity-75">
                    ({typeCounts[type] || 0})
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Browse Anime
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Showing {displayedData.length} of {filteredData.length}
          </p>
        </div>

        {/* Anime Grid - No loading spinner needed (data pre-loaded) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayedData.map((anime) => (
            <Link
              key={anime.id}
              href={`/anime/${anime.id}`}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 border border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h2 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
                  {anime.name}
                </h2>
                <span
                  className={`${getTypeColor(anime.type)} text-white text-xs font-semibold px-2 py-0.5 rounded shrink-0`}
                >
                  {anime.type}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {anime.vintage || 'Date TBA'}
              </p>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={handleLoadMore}
              className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Load More ({filteredData.length - displayCount} remaining)
            </button>
          </div>
        )}

        {/* Empty State */}
        {displayedData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No anime found with type &quot;{selectedType}&quot;
            </p>
            <button
              onClick={() => handleTypeChange('All')}
              className="mt-4 text-primary hover:underline"
            >
              Show all anime
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
