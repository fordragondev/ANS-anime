import { parseStringPromise } from 'xml2js';
import { AnimeItem, AnimeDetailItem } from '@/types/anime';
import { DETAIL_API_CONFIG } from './constants';
import { PLACEHOLDER_IMAGE } from './utils';

interface AnimeDetailResponse {
  ann: {
    anime?: {
      id: string;
      type: string;
      name: string;
      info?: Array<{ type: string; _: string; src?: string }> | { type: string; _: string; src?: string };
      staff?: Array<{ task: string; person: { _: string } }> | { task: string; person: { _: string } };
      ratings?: { nb_votes: string; weighted_score: string };
      episode?: Array<unknown> | unknown;
    };
  };
}

function extractFromInfo(
  info: Array<{ type: string; _: string; src?: string }> | { type: string; _: string; src?: string } | undefined,
  type: string
): string {
  if (!info) return '';
  const infoArray = Array.isArray(info) ? info : [info];
  const found = infoArray.find((i) => i.type === type);
  return found?._ || found?.src || '';
}

function extractMultipleFromInfo(
  info: Array<{ type: string; _: string }> | { type: string; _: string } | undefined,
  type: string
): string[] {
  if (!info) return [];
  const infoArray = Array.isArray(info) ? info : [info];
  return infoArray.filter((i) => i.type === type).map((i) => i._);
}

function extractDirector(
  staff: Array<{ task: string; person: { _: string } }> | { task: string; person: { _: string } } | undefined
): string {
  if (!staff) return '';
  const staffArray = Array.isArray(staff) ? staff : [staff];
  const director = staffArray.find((s) => s.task === 'Director');
  return director?.person?._ || '';
}

function extractImageUrl(
  info: Array<{ type: string; _: string; src?: string }> | { type: string; _: string; src?: string } | undefined
): string {
  if (!info) return '';
  const infoArray = Array.isArray(info) ? info : [info];
  const picture = infoArray.find((i) => i.type === 'Picture');
  return picture?.src || '';
}

export async function fetchAnimeDetails(id: string): Promise<Partial<AnimeDetailItem> | null> {
  try {
    const url = `${DETAIL_API_CONFIG.BASE_URL}?title=${id}`;

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error(`Failed to fetch details for anime ${id}: ${response.statusText}`);
      return null;
    }

    const xmlData = await response.text();
    const parsedData: AnimeDetailResponse = await parseStringPromise(xmlData, {
      explicitArray: false,
      mergeAttrs: true,
    });

    const anime = parsedData?.ann?.anime;
    if (!anime) {
      return null;
    }

    const info = anime.info;
    const staff = anime.staff;
    const ratings = anime.ratings;
    const episodes = anime.episode;

    return {
      description: extractFromInfo(info, 'Plot Summary'),
      imageUrl: extractImageUrl(info),
      director: extractDirector(staff),
      rating: ratings?.weighted_score ? parseFloat(ratings.weighted_score) : 0,
      voteCount: ratings?.nb_votes ? parseInt(ratings.nb_votes, 10) : 0,
      genres: extractMultipleFromInfo(info, 'Genres'),
      themes: extractMultipleFromInfo(info, 'Themes'),
      episodeCount: episodes ? (Array.isArray(episodes) ? episodes.length : 1) : undefined,
    };
  } catch (error) {
    console.error(`Error fetching details for anime ${id}:`, error);
    return null;
  }
}

export async function fetchMultipleAnimeDetails(
  items: AnimeItem[]
): Promise<Map<string, Partial<AnimeDetailItem>>> {
  const detailsMap = new Map<string, Partial<AnimeDetailItem>>();

  // Fetch details in parallel with a concurrency limit
  const batchSize = 5;
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const results = await Promise.all(
      batch.map(async (item) => {
        const details = await fetchAnimeDetails(item.id);
        return { id: item.id, details };
      })
    );

    results.forEach(({ id, details }) => {
      if (details) {
        detailsMap.set(id, details);
      }
    });
  }

  return detailsMap;
}

export function mergeAnimeWithDetails(
  item: AnimeItem,
  details: Partial<AnimeDetailItem> | undefined
): AnimeDetailItem {
  return {
    ...item,
    description: details?.description || `${item.name} is a ${item.type} anime.`,
    imageUrl: details?.imageUrl || PLACEHOLDER_IMAGE,
    director: details?.director || 'Unknown',
    rating: details?.rating || 0,
    voteCount: details?.voteCount || 0,
    genres: details?.genres || [],
    themes: details?.themes || [],
    episodeCount: details?.episodeCount,
  };
}
