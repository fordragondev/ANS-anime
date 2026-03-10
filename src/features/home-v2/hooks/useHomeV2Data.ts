"use client";

import { useAnimeData } from "@/hooks/useAnimeDataSwr";
import { useDetailsSwr } from "@/hooks/useDetailsSwr";

/**
 * V2 data hook — now returns the same SectionData as V1.
 * Both pages share identical data fetching; only the UI differs.
 */
export function useHomeV2Data() {
    const { data: rawAnime, isLoading: isFetchingRaw, error } = useAnimeData();
    const { sectionData, isLoadingDetails } = useDetailsSwr(rawAnime);

    return {
        sectionData,
        isLoading: isFetchingRaw || (rawAnime.length > 0 && isLoadingDetails && !sectionData),
        error
    };
}
