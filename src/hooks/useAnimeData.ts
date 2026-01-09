'use client';

import { useState, useEffect } from 'react';
import { AnimeItem } from '@/types/anime';

export function useAnimeData() {
  const [data, setData] = useState<AnimeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (retryCount = 0) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/anime');

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');

      // Retry logic (max 2 retries)
      if (retryCount < 2) {
        setTimeout(() => fetchData(retryCount + 1), 1000 * (retryCount + 1));
      } else {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, isLoading, error, refetch };
}
