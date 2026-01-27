import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { AnimeDetailItem } from '@/types/anime';
import { truncateText } from '@/lib/utils';
import SectionHeader from '@/components/SectionHeader';

interface CategorySectionProps {
  title: string;
  featured: AnimeDetailItem;
  links: AnimeDetailItem[];
}

export default function CategorySection({ title, featured, links }: CategorySectionProps) {
  if (!featured && links.length === 0) return null;

  return (
    <div className="category-section mb-8">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-primary">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        <Link
          href={`/category/${title.toLowerCase()}`}
          className="text-primary hover:underline font-bold text-xl"
        >
          »
        </Link>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Featured Article (Left) */}
        {featured && (
          <Link
            href={`/anime/${featured.id}`}
            className="block focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg"
          >
            <article className="group">
              <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-3">
                <Image
                  src={featured.imageUrl || `https://placehold.co/400x250/003DA5/FFFFFF?text=${encodeURIComponent(truncateText(featured.name, 20))}`}
                  alt={featured.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-primary transition-colors">
                {featured.name}
              </h3>
              {featured.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                  {featured.description}
                </p>
              )}
            </article>
          </Link>
        )}

        {/* Links List (Right) */}
        {links.length > 0 && (
          <ul className="flex flex-col gap-3">
            {links.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/anime/${item.id}`}
                  className="group flex items-start gap-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  <ChevronRight className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                  <span className="line-clamp-2 font-medium group-hover:underline">
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
