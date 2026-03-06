'use client';

import { useState, useMemo } from 'react';
import { useAnimeData } from '@/hooks/useAnimeData';
import { useDetailsSwr } from '@/hooks/useDetailsSwr';
import { filterAnimeByType, getUniqueTypes } from '@/lib/utils';
import { SECTION_ALLOCATION } from '@/lib/constants';
import { AnimeType } from '@/types/anime';

export function useHomeV1Data() {
    // 1. Fetch raw anime data from shared API
    const { data, isLoading, error, refetch } = useAnimeData();

    // 2. Fetch detailed stats via SWR
    const { sectionData, isLoadingDetails } = useDetailsSwr(data);

    // 3. V1-specific UI state
    const [selectedType, setSelectedType] = useState<AnimeType>('All');
    const [latestNewsCount, setLatestNewsCount] = useState(SECTION_ALLOCATION.LATEST_NEWS_INITIAL);

    const uniqueTypes = useMemo(() => getUniqueTypes(data), [data]);

    // Filter latest news by type
    const filteredLatestNews = useMemo(() => {
        if (!sectionData) return [];
        const filtered = filterAnimeByType(sectionData.latestNews, selectedType);
        return filtered.slice(0, latestNewsCount);
    }, [sectionData, selectedType, latestNewsCount]);

    const hasMoreNews = useMemo(() => {
        if (!sectionData) return false;
        const totalFiltered = filterAnimeByType(sectionData.latestNews, selectedType).length;
        return latestNewsCount < totalFiltered;
    }, [sectionData, selectedType, latestNewsCount]);

    const handleLoadMore = () => {
        setLatestNewsCount((prev) => prev + SECTION_ALLOCATION.LATEST_NEWS_LOAD_MORE);
    };

    const handleTypeChange = (type: string) => {
        setSelectedType(type as AnimeType);
        setLatestNewsCount(SECTION_ALLOCATION.LATEST_NEWS_INITIAL);
    };

    // Combined loading state
    const showLoading = isLoading || (data.length > 0 && isLoadingDetails && !sectionData);

    return {
        sectionData,
        filteredLatestNews,
        showLoading,
        error,
        refetch,
        uniqueTypes,
        selectedType,
        handleTypeChange,
        handleLoadMore,
        hasMoreNews,
        isLoadingDetails,
    };
}
