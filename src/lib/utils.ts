import { AnimeItem } from '@/types/anime';

export function filterAnimeByType<T extends AnimeItem>(anime: T[], type: string): T[] {
  if (type === 'All') {
    return anime;
  }
  return anime.filter((item) => item.type === type);
}

export function searchAnimeByName(anime: AnimeItem[], query: string): AnimeItem[] {
  if (!query.trim()) {
    return anime;
  }

  const lowercaseQuery = query.toLowerCase();
  return anime.filter((item) =>
    item.name.toLowerCase().includes(lowercaseQuery)
  );
}

export function getUniqueTypes(anime: AnimeItem[]): string[] {
  const types = anime.map((item) => item.type);
  return ['All', ...Array.from(new Set(types)).sort()];
}

export function formatDate(dateString: string): string {
  if (!dateString) return 'Date TBA';

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Default placeholder image (no dynamic text to avoid encoding issues)
export const PLACEHOLDER_IMAGE = '/placeholder-anime.svg';

export function getImageUrl(imageUrl: string | undefined): string {
  return imageUrl || PLACEHOLDER_IMAGE;
}

export function isPlaceholderImage(url: string): boolean {
  return url === PLACEHOLDER_IMAGE || url.includes('placehold.co');
}

/**
 * Centralized color definitions for anime types.
 * Each type maps to both V1 (solid badge) and V2 (text + translucent bg) styles.
 */
const TYPE_COLORS: Record<string, { badge: string; colorClass: string; bgClass: string }> = {
  tv: { badge: 'bg-green-600', colorClass: 'text-v2-primary', bgClass: 'bg-v2-primary/10' },
  ona: { badge: 'bg-blue-600', colorClass: 'text-blue-400', bgClass: 'bg-blue-500/10' },
  movie: { badge: 'bg-purple-600', colorClass: 'text-green-400', bgClass: 'bg-green-500/10' },
  ova: { badge: 'bg-orange-600', colorClass: 'text-purple-400', bgClass: 'bg-purple-500/10' },
  special: { badge: 'bg-pink-600', colorClass: 'text-yellow-400', bgClass: 'bg-yellow-500/10' },
};

const DEFAULT_COLORS = { badge: 'bg-gray-600', colorClass: 'text-slate-400', bgClass: 'bg-slate-500/10' };

function resolveTypeColors(type: string) {
  const key = type?.toLowerCase() ?? '';
  const match = Object.keys(TYPE_COLORS).find((k) => key.includes(k));
  return match ? TYPE_COLORS[match] : DEFAULT_COLORS;
}

/**
 * V1 badge color — returns a single solid background class (e.g. "bg-green-600").
 * Used by search, browse, and detail pages for opaque type badges.
 */
export function getTypeBadgeColor(type: string): string {
  return resolveTypeColors(type).badge;
}

/**
 * V2 badge styles — returns text color + translucent background classes.
 * Used by V2 components for the dark-theme badge styling.
 */
export function getTypeBadgeStyles(type: string): { colorClass: string; bgClass: string } {
  const { colorClass, bgClass } = resolveTypeColors(type);
  return { colorClass, bgClass };
}

/**
 * Sanitize HTML from API responses — only allows safe inline formatting tags.
 * Strips everything except: <i>, <b>, <em>, <strong>, <br>
 * Use with dangerouslySetInnerHTML to render italic/bold text from the ANN API.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return '';
  // Remove all tags except whitelisted inline formatting tags
  return html.replace(/<\/?(?!(?:i|b|em|strong|br)\b)[^>]*>/gi, '');
}
