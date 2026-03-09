"use client";

import { useMemo } from "react";
import { useAnimeData } from "@/hooks/useAnimeDataSwr";
import { useDetailsSwr } from "@/hooks/useDetailsSwr";
import { AnimeDetailItem } from "@/types/anime";
import { V2PageData } from "@/features/home-v2/types";
import { getTypeBadgeStyles } from "@/lib/utils";

export function useHomeV2Data() {
    // 1. Fetch raw anime data (shared)
    const { data: rawAnime, isLoading: isFetchingRaw, error } = useAnimeData();

    // 2. Fetch detailed stats via SWR (shared utility)
    const { sectionData, isLoadingDetails } = useDetailsSwr(rawAnime);

    // 3. Map to exactly the shape the V2 Components expect
    const mappedData = useMemo((): V2PageData | null => {
        if (!sectionData) return null;

        const getImageUrl = (item: AnimeDetailItem) => item.imageUrl || "";

        return {
            featured: {
                title: sectionData.topStory.name,
                excerpt: sectionData.topStory.description || "No description available.",
                ago: sectionData.topStory.vintage ? `Since ${sectionData.topStory.vintage}` : "Recently Added",
                comments: sectionData.topStory.voteCount,
                image: getImageUrl(sectionData.topStory)
            },
            topPicks: sectionData.topPicks.map((pick) => {
                const { colorClass } = getTypeBadgeStyles(pick.type);
                return {
                    id: pick.id,
                    type: pick.type || "Anime",
                    typeColor: colorClass,
                    title: pick.name,
                    image: getImageUrl(pick)
                };
            }),
            latestNews: sectionData.latestNews.map((news) => {
                const { colorClass, bgClass } = getTypeBadgeStyles(news.type);
                return {
                    id: news.id,
                    category: news.type || "Update",
                    title: news.name,
                    excerpt: news.description,
                    ago: news.vintage || "New",
                    colorClass,
                    bgClass,
                    image: getImageUrl(news)
                };
            }),
            categories: Object.entries(sectionData.categories).map(([categoryName, data], index) => {
                return {
                    id: index,
                    title: categoryName,
                    heroImage: getImageUrl(data.featured),
                    mainStory: data.featured.name,
                    substories: data.links.map(link => link.name)
                };
            })
        };
    }, [sectionData]);

    return {
        data: mappedData,
        isLoading: isFetchingRaw || (rawAnime.length > 0 && isLoadingDetails && !sectionData),
        error
    };
}
