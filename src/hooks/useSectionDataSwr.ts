'use client';

import { useMemo } from 'react';
import useSWR from 'swr';
import { AnimeItem, AnimeDetailItem, SectionData } from '@/types/anime';
import { fetchMultipleAnimeDetails, mergeAnimeWithDetails } from '@/lib/animeDetails';
import { SECTION_ALLOCATION } from '@/lib/constants';

// SWR fetcher
const fetcher = async (items: AnimeItem[]) => {
    return await fetchMultipleAnimeDetails(items);
};

export function useSectionDataSwr(data: AnimeItem[]) {
    // Calculate which items need details
    const itemsNeedingDetails = useMemo(() => {
        if (data.length === 0) return [];
        const count = SECTION_ALLOCATION.TOP_STORY + SECTION_ALLOCATION.TOP_PICKS + SECTION_ALLOCATION.LATEST_NEWS_INITIAL;
        return data.slice(0, Math.min(count, data.length));
    }, [data]);

    // Create a cache key using the IDs to ensure deduplication via SWR
    // Only create a key if we have items, otherwise null to prevent fetch
    const cacheKey = itemsNeedingDetails.length > 0
        ? `anime-details-${itemsNeedingDetails.map(item => item.id).join('-')}`
        : null;

    const { data: detailsMap, isLoading: isLoadingDetails } = useSWR(
        cacheKey,
        () => fetcher(itemsNeedingDetails),
        {
            revalidateOnFocus: false, // Prevents unnecessary refetching on window focus
            dedupingInterval: 60000, // Deduplicate requests within 1 minute
        }
    );

    // Create section data from the fetched items and details
    const sectionData = useMemo((): SectionData | null => {
        if (data.length === 0) return null;

        const enrichItem = (item: AnimeItem): AnimeDetailItem => {
            // If SWR hasn't returned detailsMap yet, default to undefined
            return mergeAnimeWithDetails(item, detailsMap?.get(item.id));
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
