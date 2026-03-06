import Link from 'next/link';
import Image from 'next/image';
import { AnimeDetailItem } from '@/types/anime';
import { formatDate, getImageUrl, isPlaceholderImage } from '@/lib/utils';
import SectionHeader from '@/components/SectionHeader';

interface TopStoryProps {
  anime: AnimeDetailItem;
  title?: string;
}

export default function TopStory({ anime, title = 'Anime Breaking News' }: TopStoryProps) {
  return (
    <>
      <SectionHeader title={title} />
      <Link
      href={`/anime/${anime.id}`}
      className="block focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4"
    >
      <article className="relative w-full min-h-[400px] md:min-h-[500px] flex flex-col md:flex-row overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer">
        {/* Image Section - Left side (60-70% on desktop) */}
        <div className="relative w-full md:w-[65%] h-[250px] md:h-auto md:min-h-[500px]">
          <Image
            src={getImageUrl(anime.imageUrl)}
            unoptimized={isPlaceholderImage(getImageUrl(anime.imageUrl))}
            alt={anime.name}
            fill
            className="object-cover"
            priority
            loading="eager"
            sizes="(max-width: 768px) 100vw, 65vw"
          />
        </div>

        {/* Content Overlay - Right side (30-40% on desktop) */}
        <div className="w-full md:w-[35%] bg-[#2a2a2a] dark:bg-gray-900 p-6 md:p-8 flex flex-col justify-center">
          {/* Type Badge */}
          <span className="inline-block w-fit bg-accent text-white text-sm font-semibold px-3 py-1 rounded mb-4">
            {anime.type}
          </span>

          {/* Headline */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            {anime.name}
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-200 mb-4 line-clamp-4">
            {anime.description}
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
            <span>{formatDate(anime.vintage)}</span>
            {anime.director && (
              <>
                <span className="text-gray-500">|</span>
                <span>Dir: {anime.director}</span>
              </>
            )}
            {anime.rating > 0 && (
              <>
                <span className="text-gray-500">|</span>
                <span className="text-yellow-400">★ {anime.rating.toFixed(1)}</span>
              </>
            )}
          </div>

          {/* Genres/Themes */}
          {(anime.genres.length > 0 || anime.themes.length > 0) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {[...anime.genres.slice(0, 2), ...anime.themes.slice(0, 2)].map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
    </>
  );
}
