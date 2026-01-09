import Link from 'next/link';
import Image from 'next/image';
import { AnimeItem } from '@/types/anime';
import { formatDate, truncateText } from '@/lib/utils';

interface AnimeCardProps {
  anime: AnimeItem;
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      ONA: 'bg-blue-600',
      TV: 'bg-green-600',
      Movie: 'bg-purple-600',
      OVA: 'bg-orange-600',
      Special: 'bg-pink-600',
    };
    return colors[type] || 'bg-gray-600';
  };

  return (
    <Link href={`/anime/${anime.id}`}>
      <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col">
        <div className="relative w-full aspect-video bg-secondary">
          <Image
            src={`https://placehold.co/400x225/003DA5/FFFFFF?text=${encodeURIComponent(truncateText(anime.name, 20))}`}
            alt={anime.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <span
            className={`absolute top-2 right-2 ${getTypeColor(anime.type)} text-white text-xs font-semibold px-2 py-1 rounded`}
          >
            {anime.type}
          </span>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-bold text-lg mb-2 text-foreground line-clamp-2">
            {anime.name}
          </h3>
          <p className="text-sm text-gray-600 mt-auto">
            {formatDate(anime.vintage)}
          </p>
        </div>
      </article>
    </Link>
  );
}
