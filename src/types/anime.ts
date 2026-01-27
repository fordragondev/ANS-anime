export interface AnimeItem {
  id: string;
  type: string;
  name: string;
  vintage: string;
}

export type AnimeType = 'All' | 'ONA' | 'TV' | 'Movie' | 'OVA' | 'Special';

// Detailed anime data from api.xml endpoint
export interface AnimeDetailItem extends AnimeItem {
  description: string;      // From <info type="Plot Summary">
  imageUrl: string;         // From <info type="Picture">
  director: string;         // From <staff task="Director">
  rating: number;           // From <ratings weighted_score>
  voteCount: number;        // From <ratings nb_votes>
  genres: string[];         // From <info type="Genres">
  themes: string[];         // From <info type="Themes">
  episodeCount?: number;    // From <episode> count
}

// Section data structure for organizing content
export interface SectionData {
  topStory: AnimeDetailItem;
  topPicks: AnimeDetailItem[];
  latestNews: AnimeDetailItem[];
  categories: {
    [key: string]: {
      featured: AnimeDetailItem;
      links: AnimeDetailItem[];
    };
  };
}
