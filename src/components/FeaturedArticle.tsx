import Link from 'next/link';
import Image from 'next/image';
import { AnimeItem } from '@/types/anime';
import { formatDate, truncateText } from '@/lib/utils';

interface FeaturedArticleProps {
  anime: AnimeItem;
}

export default function FeaturedArticle({ anime }: FeaturedArticleProps) {
  return (
    <Link href={`/anime/${anime.id}`}>
      <article className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow cursor-pointer mb-8">
        <Image
          src={`https://placehold.co/1200x500/003DA5/FFFFFF?text=${encodeURIComponent(truncateText(anime.name, 30))}`}
          alt={anime.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
          <span className="inline-block bg-accent text-white text-sm font-semibold px-3 py-1 rounded mb-3">
            {anime.type}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">
            {anime.name}
          </h2>
          <p className="text-lg opacity-90">{formatDate(anime.vintage)}</p>
        </div>
      </article>
    </Link>
  );
}
