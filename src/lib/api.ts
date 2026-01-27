import { parseStringPromise } from 'xml2js';
import { API_CONFIG } from './constants';
import { AnimeItem } from '@/types/anime';

export async function fetchAnimeData(): Promise<AnimeItem[]> {
  try {
    const url = new URL(API_CONFIG.BASE_URL);
    Object.entries(API_CONFIG.PARAMS).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });

    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch anime data: ${response.statusText}`);
    }

    const xmlData = await response.text();
    const parsedData = await parseStringPromise(xmlData, {
      explicitArray: false,
      mergeAttrs: true,
    });

    // Handle both single item and array of items
    const items = parsedData?.report?.item;
    if (!items) {
      return [];
    }

    // Convert to array if it's a single item
    const itemsArray = Array.isArray(items) ? items : [items];

    return itemsArray.map((item: any) => ({
      id: item.id || '',
      type: item.type || 'Unknown',
      name: item.name || 'Untitled',
      vintage: item.vintage || '',
    }));
  } catch (error) {
    console.error('Error fetching anime data:', error);
    throw error;
  }
}
