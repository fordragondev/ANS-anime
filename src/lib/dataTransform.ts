import { AnimeItem, AnimeDetailItem, SectionData } from '@/types/anime';
import { SECTION_ALLOCATION } from './constants';
import { fetchMultipleAnimeDetails, mergeAnimeWithDetails } from './animeDetails';

export async function createSectionData(items: AnimeItem[]): Promise<SectionData | null> {
  if (items.length === 0) {
    return null;
  }

  // Calculate how many items need details for each section
  const topStoryItems = items.slice(0, SECTION_ALLOCATION.TOP_STORY);
  const topPicksItems = items.slice(
    SECTION_ALLOCATION.TOP_STORY,
    SECTION_ALLOCATION.TOP_STORY + SECTION_ALLOCATION.TOP_PICKS
  );
  const latestNewsItems = items.slice(
    SECTION_ALLOCATION.TOP_STORY + SECTION_ALLOCATION.TOP_PICKS,
    SECTION_ALLOCATION.TOP_STORY + SECTION_ALLOCATION.TOP_PICKS + SECTION_ALLOCATION.LATEST_NEWS_INITIAL
  );
  const categoryItems = items.slice(
    SECTION_ALLOCATION.TOP_STORY + SECTION_ALLOCATION.TOP_PICKS + SECTION_ALLOCATION.LATEST_NEWS_INITIAL
  );

  // Fetch details for items that need them (top story, top picks, latest news)
  const itemsNeedingDetails = [...topStoryItems, ...topPicksItems, ...latestNewsItems];
  const detailsMap = await fetchMultipleAnimeDetails(itemsNeedingDetails);

  // Enrich items with details
  const enrichItem = (item: AnimeItem): AnimeDetailItem => {
    return mergeAnimeWithDetails(item, detailsMap.get(item.id));
  };

  // Create section data
  const topStory = enrichItem(topStoryItems[0]);
  const topPicks = topPicksItems.map(enrichItem);
  const latestNews = latestNewsItems.map(enrichItem);

  // Group category items by type
  const categories: SectionData['categories'] = {};
  const typeGroups = categoryItems.reduce(
    (acc, item) => {
      if (!acc[item.type]) acc[item.type] = [];
      acc[item.type].push(item);
      return acc;
    },
    {} as Record<string, AnimeItem[]>
  );

  // For categories, we use basic data without fetching details to reduce API calls
  Object.entries(typeGroups).forEach(([type, typeItems]) => {
    if (typeItems.length > 0) {
      categories[type] = {
        featured: mergeAnimeWithDetails(typeItems[0], undefined),
        links: typeItems.slice(1, SECTION_ALLOCATION.CATEGORY_LINKS_MAX + 1).map((item) =>
          mergeAnimeWithDetails(item, undefined)
        ),
      };
    }
  });

  return {
    topStory,
    topPicks,
    latestNews,
    categories,
  };
}

export function segmentAnimeDataSync(
  items: AnimeItem[],
  detailsMap: Map<string, Partial<AnimeDetailItem>>
): SectionData | null {
  if (items.length === 0) {
    return null;
  }

  const topStoryItems = items.slice(0, SECTION_ALLOCATION.TOP_STORY);
  const topPicksItems = items.slice(
    SECTION_ALLOCATION.TOP_STORY,
    SECTION_ALLOCATION.TOP_STORY + SECTION_ALLOCATION.TOP_PICKS
  );
  const latestNewsItems = items.slice(
    SECTION_ALLOCATION.TOP_STORY + SECTION_ALLOCATION.TOP_PICKS,
    SECTION_ALLOCATION.TOP_STORY + SECTION_ALLOCATION.TOP_PICKS + SECTION_ALLOCATION.LATEST_NEWS_INITIAL
  );
  const categoryItems = items.slice(
    SECTION_ALLOCATION.TOP_STORY + SECTION_ALLOCATION.TOP_PICKS + SECTION_ALLOCATION.LATEST_NEWS_INITIAL
  );

  const enrichItem = (item: AnimeItem): AnimeDetailItem => {
    return mergeAnimeWithDetails(item, detailsMap.get(item.id));
  };

  const topStory = enrichItem(topStoryItems[0]);
  const topPicks = topPicksItems.map(enrichItem);
  const latestNews = latestNewsItems.map(enrichItem);

  const categories: SectionData['categories'] = {};
  const typeGroups = categoryItems.reduce(
    (acc, item) => {
      if (!acc[item.type]) acc[item.type] = [];
      acc[item.type].push(item);
      return acc;
    },
    {} as Record<string, AnimeItem[]>
  );

  Object.entries(typeGroups).forEach(([type, typeItems]) => {
    if (typeItems.length > 0) {
      categories[type] = {
        featured: mergeAnimeWithDetails(typeItems[0], undefined),
        links: typeItems.slice(1, SECTION_ALLOCATION.CATEGORY_LINKS_MAX + 1).map((item) =>
          mergeAnimeWithDetails(item, undefined)
        ),
      };
    }
  });

  return {
    topStory,
    topPicks,
    latestNews,
    categories,
  };
}
