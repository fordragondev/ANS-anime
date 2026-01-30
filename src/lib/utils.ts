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

export function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    ONA: 'bg-blue-600',
    TV: 'bg-green-600',
    Movie: 'bg-purple-600',
    OVA: 'bg-orange-600',
    Special: 'bg-pink-600',
  };
  return colors[type] || 'bg-gray-600';
}
