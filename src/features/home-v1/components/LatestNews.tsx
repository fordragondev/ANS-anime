'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Settings, Bookmark } from 'lucide-react';
import { AnimeDetailItem } from '@/types/anime';
import { formatDate, getImageUrl, isPlaceholderImage, sanitizeHtml } from '@/lib/utils';
import FilterDropdown from '@/components/FilterDropdown';

interface LatestNewsProps {
  items: AnimeDetailItem[];
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading?: boolean;
  types: string[];
  selectedType: string;
  onTypeChange: (type: string) => void;
}

function NewsItem({ anime }: { anime: AnimeDetailItem }) {
  return (
    <Link
      href={`/anime/${anime.id}`}
      className="block focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg"
    >
      <article className="group flex flex-col sm:flex-row gap-4 py-4 px-2 -mx-2">
        {/* Thumbnail */}
        <div className="relative w-full sm:w-48 h-36 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={getImageUrl(anime.imageUrl)}
            unoptimized={isPlaceholderImage(getImageUrl(anime.imageUrl))}
            alt={anime.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, 200px"
          />
          {/* Type Badge */}
          <span className="absolute top-2 left-2 bg-accent text-white text-xs font-semibold px-2 py-1 rounded">
            {anime.type}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center pb-4 news-item-divider">
          {/* Headline */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-primary transition-colors mb-2">
            {anime.name}
          </h3>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>{anime.director || 'Anime News Staff'}</span>
            <span className="text-gray-400 dark:text-gray-500">|</span>
            <span>{formatDate(anime.vintage)}</span>
            <span className="text-gray-400 dark:text-gray-500">|</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="flex items-center gap-1 text-primary hover:underline"
            >
              <Bookmark className="w-4 h-4" />
              Save
            </button>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(anime.description) }}
          />

          {/* Rating */}
          {anime.rating > 0 && (
            <div className="flex items-center gap-1 mt-2 text-sm">
              <span className="text-yellow-500">★</span>
              <span className="text-gray-600 dark:text-gray-400">
                {anime.rating.toFixed(1)} ({anime.voteCount} votes)
              </span>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}

export default function LatestNews({
  items,
  onLoadMore,
  hasMore,
  isLoading,
  types,
  selectedType,
  onTypeChange,
}: LatestNewsProps) {
  return (
    <div className="bg-[#f5f5f5] dark:bg-gray-800 p-6 md:p-8 rounded-lg">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
          Latest News & Features
        </h2>
        <div className="flex items-center gap-4">
          <FilterDropdown
            types={types}
            selectedType={selectedType}
            onTypeChange={onTypeChange}
          />
          <button className="flex items-center gap-2 text-primary hover:underline text-sm font-medium">
            <Settings className="w-4 h-4" />
            Customize
          </button>
        </div>
      </div>

      {/* Article List */}
      <div className="flex flex-col">
        {items.map((anime) => (
          <NewsItem key={anime.id} anime={anime} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={onLoadMore}
            disabled={isLoading}
            className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            {isLoading ? 'Loading...' : 'Load More Stories'}
          </button>
        </div>
      )}

      {items.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          No anime found matching your filter.
        </p>
      )}
    </div>
  );
}
