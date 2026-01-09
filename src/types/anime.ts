export interface AnimeItem {
  id: string;
  type: string;
  name: string;
  vintage: string;
}

export interface AnimeResponse {
  report: {
    item: AnimeItem[];
  };
}

export interface FilterOption {
  value: string;
  label: string;
}

export type AnimeType = 'All' | 'ONA' | 'TV' | 'Movie' | 'OVA' | 'Special';
