'use client';

import useSWR from 'swr';
import { AnimeItem } from '@/types/anime';

const fetcher = async (url: string): Promise<AnimeItem[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }
  return response.json();
};

export function useAnimeData() {
  const { data, isLoading, error, mutate } = useSWR<AnimeItem[]>(
    '/api/anime',
    fetcher,
    {
      errorRetryCount: 2,
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  return {
    data: data ?? [],
    isLoading,
    error: error ?? null,
    refetch: () => mutate(),
  };
}

