export const API_CONFIG = {
  BASE_URL: 'https://www.animenewsnetwork.com/encyclopedia/reports.xml',
  PARAMS: {
    id: 155,
    type: 'anime',
    nlist: 100,
    nskip: 100
  },
};

export const DETAIL_API_CONFIG = {
  BASE_URL: 'https://cdn.animenewsnetwork.com/encyclopedia/api.xml',
} as const;

export const PAGINATION = {
  INITIAL_ITEMS: 10,
  LOAD_MORE_COUNT: 5,
};

export const SECTION_ALLOCATION = {
  TOP_STORY: 1,
  TOP_PICKS: 3,
  LATEST_NEWS_INITIAL: 10,
  LATEST_NEWS_LOAD_MORE: 5,
  CATEGORY_LINKS_MAX: 4,
};

export const ANIME_TYPES = ['All', 'ONA', 'TV', 'Movie', 'OVA', 'Special'] as const;
