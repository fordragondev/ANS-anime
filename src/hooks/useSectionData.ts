'use client';

import { useState, useEffect, useMemo } from 'react';
import { AnimeItem, AnimeDetailItem, SectionData } from '@/types/anime';
import { fetchMultipleAnimeDetails, mergeAnimeWithDetails } from '@/lib/animeDetails';
import { SECTION_ALLOCATION } from '@/lib/constants';

export function useSectionData(data: AnimeItem[]) {
  const [detailsMap, setDetailsMap] = useState<Map<string, Partial<AnimeDetailItem>>>(new Map());
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  // Calculate which items need details
  const itemsNeedingDetails = useMemo(() => {
    if (data.length === 0) return [];
    const count = SECTION_ALLOCATION.TOP_STORY + SECTION_ALLOCATION.TOP_PICKS + SECTION_ALLOCATION.LATEST_NEWS_INITIAL;
    return data.slice(0, Math.min(count, data.length));
  }, [data]);

  // Fetch details for items that need them
  useEffect(() => {
    if (itemsNeedingDetails.length === 0) return;

    const fetchDetails = async () => {
      setIsLoadingDetails(true);
      try {
        const details = await fetchMultipleAnimeDetails(itemsNeedingDetails);
        setDetailsMap(details);
      } catch (error) {
        console.error('Failed to fetch anime details:', error);
      } finally {
        setIsLoadingDetails(false);
      }
    };

    fetchDetails();
  }, [itemsNeedingDetails]);

  // Create section data from the fetched items and details
  const sectionData = useMemo((): SectionData | null => {
    if (data.length === 0) return null;

    const enrichItem = (item: AnimeItem): AnimeDetailItem => {
      return mergeAnimeWithDetails(item, detailsMap.get(item.id));
    };

    const topStoryItems = data.slice(0, SECTION_ALLOCATION.TOP_STORY);
    const topPicksItems = data.slice(
      SECTION_ALLOCATION.TOP_STORY,
      SECTION_ALLOCATION.TOP_STORY + SECTION_ALLOCATION.TOP_PICKS
    );
    const latestNewsItems = data.slice(
      SECTION_ALLOCATION.TOP_STORY + SECTION_ALLOCATION.TOP_PICKS,
      SECTION_ALLOCATION.TOP_STORY + SECTION_ALLOCATION.TOP_PICKS + SECTION_ALLOCATION.LATEST_NEWS_INITIAL
    );
    const categoryItems = data.slice(
      SECTION_ALLOCATION.TOP_STORY + SECTION_ALLOCATION.TOP_PICKS + SECTION_ALLOCATION.LATEST_NEWS_INITIAL
    );

    const topStory = topStoryItems[0] ? enrichItem(topStoryItems[0]) : null;
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

    if (!topStory) return null;

    return {
      topStory,
      topPicks,
      latestNews,
      categories,
    };
  }, [data, detailsMap]);

  return {
    sectionData,
    isLoadingDetails,
  };
}
