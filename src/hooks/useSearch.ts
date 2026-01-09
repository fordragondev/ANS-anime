'use client';

import { useState, useEffect, useMemo } from 'react';
import { AnimeItem } from '@/types/anime';
import { searchAnimeByName } from '@/lib/utils';

export function useSearch(data: AnimeItem[], debounceMs = 300) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  const results = useMemo(() => {
    return searchAnimeByName(data, debouncedQuery);
  }, [data, debouncedQuery]);

  const clearSearch = () => {
    setQuery('');
    setDebouncedQuery('');
  };

  return {
    query,
    setQuery,
    results,
    clearSearch,
    isSearching: query.length > 0,
  };
}
