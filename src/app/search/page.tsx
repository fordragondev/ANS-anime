/**
 * SEARCH RESULTS PAGE - Server-Side Rendering (SSR)
 *
 * RENDERING STRATEGY: SSR (Server-Side Rendering)
 *
 * How it works:
 * 1. `dynamic = 'force-dynamic'` forces fresh render on every request
 * 2. Server reads the ?q= query parameter from the URL
 * 3. Server fetches data and filters results
 * 4. Complete HTML is sent to browser (no loading state needed)
 *
 * Why SSR for this page:
 * - Shareable URLs: Users can share /search?q=naruto with friends
 * - SEO for searches: Search engines can index popular search results
 * - Server-side filtering: More efficient for large datasets
 * - Fresh results: Every request gets current data
 *
 * Trade-offs:
 * + Full content in HTML (great for SEO)
 * + Shareable/bookmarkable search URLs
 * + No loading state needed (content ready on arrival)
 * + Server handles heavy filtering (better for slow devices)
 * - Slower than static pages (server must render each request)
 * - Server load increases with traffic
 * - Page refresh required for new searches
 *
 * @see /page.tsx for CSR example
 * @see /anime/[id]/page.tsx for SSG example
 * @see /browse/page.tsx for Hybrid example
 */
import Link from 'next/link';
import { Search } from 'lucide-react';
import { fetchAnimeData } from '@/lib/api';
import { searchAnimeByName, getTypeColor } from '@/lib/utils';
import { SubPageHeader } from '@/components/SubPageHeader';

// SSR: Force dynamic rendering - page is rendered fresh on every request
// This ensures search results always use the latest data
export const dynamic = 'force-dynamic';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

/**
 * SSR: generateMetadata runs on the server for each request.
 * Creates dynamic SEO metadata based on search query.
 */
export async function generateMetadata({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || '';

  return {
    title: query ? `Search: "${query}" | Anime News` : 'Search Anime | Anime News',
    description: query
      ? `Search results for "${query}" - Find anime on Anime News`
      : 'Search for anime by name on Anime News',
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  // SSR: Read query parameter from URL (runs on server for each request)
  const { q } = await searchParams;
  const query = q || '';

  // SSR: Fetch and filter data on server
  // This is more efficient than sending all data to client
  const allAnime = await fetchAnimeData();
  const results = query ? searchAnimeByName(allAnime, query) : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <SubPageHeader />

      {/* Search Form */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <form action="/search" method="GET" className="max-w-2xl mx-auto">
            <label htmlFor="search-input" className="sr-only">
              Search anime
            </label>
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                id="search-input"
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search anime by name..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1.5 rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Results */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {query ? (
          <>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Search Results
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {results.length} result{results.length !== 1 ? 's' : ''} for &quot;{query}&quot;
            </p>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {results.map((anime) => (
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
            ) : (
              <div className="text-center py-12">
                <Search className="mx-auto text-gray-400 mb-4" size={48} />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  No results found
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Try a different search term or browse all anime
                </p>
                <Link
                  href="/browse"
                  className="inline-block mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Browse All Anime
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Search className="mx-auto text-gray-400 mb-4" size={48} />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Search Anime
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Enter a search term above to find anime
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-500">Try:</span>
              {['Naruto', 'One Piece', 'Dragon'].map((term) => (
                <Link
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="text-primary hover:underline text-sm"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
