/**
 * V2-specific data types for the HomeV2 page components.
 * These represent the mapped/transformed shapes produced by useHomeV2Data,
 * NOT the raw API types (which live in @/types/anime.ts).
 */

export interface V2Featured {
    title: string;
    excerpt: string;
    ago: string;
    comments: number;
    image: string;
}

export interface V2TopPick {
    id: string;
    type: string;
    typeColor: string;
    title: string;
    image: string;
}

export interface V2NewsItem {
    id: string;
    category: string;
    title: string;
    excerpt: string;
    ago: string;
    colorClass: string;
    bgClass: string;
    image: string;
}

export interface V2Category {
    id: number;
    title: string;
    heroImage: string;
    mainStory: string;
    substories: string[];
}

export interface V2PageData {
    featured: V2Featured;
    topPicks: V2TopPick[];
    latestNews: V2NewsItem[];
    categories: V2Category[];
}
