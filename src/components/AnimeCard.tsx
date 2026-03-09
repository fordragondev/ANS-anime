import Link from 'next/link';
import Image from 'next/image';
import { AnimeItem } from '@/types/anime';
import { formatDate, getTypeBadgeColor, PLACEHOLDER_IMAGE } from '@/lib/utils';

interface AnimeCardProps {
  anime: AnimeItem;
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <Link href={`/anime/${anime.id}`} className="focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
      <article className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col border border-transparent hover:border-primary/20">
        <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-800">
          <Image
            src={PLACEHOLDER_IMAGE}
            unoptimized
            alt={anime.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <span
            className={`absolute top-2 right-2 ${getTypeBadgeColor(anime.type)} text-white text-xs font-semibold px-2 py-1 rounded`}
          >
            {anime.type}
          </span>
        </div>

        <div className="p-4 flex-1 flex flex-col gap-2">
          <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 line-clamp-2">
            {anime.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-auto">
            {formatDate(anime.vintage)}
          </p>
        </div>
      </article>
    </Link>
  );
}
