import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle } from 'lucide-react';
import { AnimeDetailItem } from '@/types/anime';
import { truncateText } from '@/lib/utils';

interface TopPicksProps {
  items: AnimeDetailItem[];
}

function PickCard({ anime }: { anime: AnimeDetailItem }) {
  return (
    <Link
      href={`/anime/${anime.id}`}
      className="block focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      // className="rounded-lg"
    >
      <article className="group bg-white dark:bg-gray-900 overflow-hidden transition-all duration-300"
        // Commented out: rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary/30 shadow-md hover:shadow-xl
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={anime.imageUrl || `https://placehold.co/400x250/003DA5/FFFFFF?text=${encodeURIComponent(truncateText(anime.name, 20))}`}
            alt={anime.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {/* Type Badge */}
          <span className="absolute top-2 left-2 bg-accent text-white text-xs font-semibold px-2 py-1 rounded">
            {anime.type}
          </span>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Byline */}
          <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span className="truncate">{anime.director || 'Anime News Staff'}</span>
            <span className="text-gray-400 dark:text-gray-500">•</span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {anime.voteCount || 0}
            </span>
          </p>

          {/* Headline */}
          <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-primary transition-colors">
            {anime.name}
          </h3>
        </div>
      </article>
    </Link>
  );
}

export default function TopPicks({ items }: TopPicksProps) {
  if (items.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {items.map((anime) => (
        <PickCard key={anime.id} anime={anime} />
      ))}
    </div>
  );
}
