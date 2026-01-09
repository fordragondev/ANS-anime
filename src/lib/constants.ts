export const API_CONFIG = {
  BASE_URL: 'https://www.animenewsnetwork.com/encyclopedia/reports.xml',
  PARAMS: {
    id: '155',
    type: 'anime',
    nlist: '50',
  },
} as const;

export const PAGINATION = {
  INITIAL_ITEMS: 10,
  LOAD_MORE_COUNT: 5,
};

export const ANIME_TYPES = ['All', 'ONA', 'TV', 'Movie', 'OVA', 'Special'] as const;
