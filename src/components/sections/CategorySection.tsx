import Link from 'next/link';
import Image from 'next/image';
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
    <div className="category-section">
      {/* Section Header */}
      <SectionHeader
        title={title}
        linkHref={`/category/${title.toLowerCase()}`}
      />

      {/* Featured Article */}
      {featured && (
        <Link
          href={`/anime/${featured.id}`}
          className="block mb-4 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg"
        >
          <article className="group section-divider pb-4">
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-2">
              <Image
                src={featured.imageUrl || `https://placehold.co/400x225/003DA5/FFFFFF?text=${encodeURIComponent(truncateText(featured.name, 20))}`}
                alt={featured.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-primary transition-colors">
              {featured.name}
            </h3>
          </article>
        </Link>
      )}

      {/* Links List */}
      {links.length > 0 && (
        <ul className="flex flex-col gap-2">
          {links.map((item) => (
            <li key={item.id} className="flex items-start gap-1">
              <span className="text-primary flex-shrink-0">•</span>
              <Link
                href={`/anime/${item.id}`}
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:underline transition-colors line-clamp-1"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
