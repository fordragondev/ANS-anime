# Next.js Rendering Strategies Guide

This document explains the 4 rendering strategies used in this project, with code examples and implementation details.

---

## Overview

| Strategy | Page | Feature | When Data is Fetched |
|----------|------|---------|---------------------|
| **CSR** | `/` (Home) | Interactive dashboard with filters | In browser, after page loads |
| **SSG** | `/anime/[id]` | Individual anime detail pages | At build time |
| **SSR** | `/search` | Search results with query params | On server, every request |
| **Hybrid** | `/browse` | Browse catalog with filters | Server fetch + client interactivity |

---

## 1. CSR - Client-Side Rendering

### File: `src/app/page.tsx`

### Feature: Home Page Dashboard
The home page is a fully interactive dashboard with:
- Real-time search modal
- Type filters (TV, Movie, ONA, etc.)
- Load more pagination
- Multiple sections (Top Story, Top Picks, Latest News, Categories)

### Why CSR?
- Heavy user interaction (filters, search, pagination)
- Content updates based on user actions
- No SEO requirement for home page

### Key Code:

```tsx
// CSR STRATEGY
// ============
// The 'use client' directive makes this a Client Component.
// All code runs in the BROWSER, not on the server.

'use client';  // <-- This is what makes it CSR

import { useState, useMemo } from 'react';
import { useAnimeData } from '@/hooks/useAnimeData';

export default function Home() {
  // Data is fetched in the browser via custom hook
  // User sees a loading skeleton while this happens
  const { data, isLoading, error } = useAnimeData();

  // State management happens on the client
  const [selectedType, setSelectedType] = useState('All');

  // Filtering happens on the client
  const filteredData = useMemo(() => {
    return filterAnimeByType(data, selectedType);
  }, [data, selectedType]);

  // Loading state shown while fetching
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div>
      {/* Interactive filter - instant response */}
      <FilterDropdown
        value={selectedType}
        onChange={setSelectedType}  // No page reload!
      />
      {/* Content updates immediately */}
      <AnimeGrid items={filteredData} />
    </div>
  );
}
```

### How it Works:
1. Browser downloads JavaScript bundle
2. React hydrates the page
3. `useAnimeData` hook triggers fetch to API
4. Loading skeleton shown during fetch
5. Data arrives, component re-renders
6. User can now interact (filter, search, etc.)

---

## 2. SSG - Static Site Generation

### File: `src/app/anime/[id]/page.tsx`

### Feature: Anime Detail Pages
Pre-rendered pages for each anime with:
- Full anime information
- SEO-optimized metadata
- Fast load times (served from CDN)

### Why SSG?
- Content doesn't change frequently
- SEO is important for discoverability
- Same content for all users
- Maximum performance

### Key Code:

```tsx
// SSG STRATEGY
// ============
// No 'use client' = Server Component
// generateStaticParams() tells Next.js to pre-render these pages at BUILD time

import { fetchAnimeData } from '@/lib/api';

// This function runs at BUILD TIME
// It returns a list of all page params to pre-render
export async function generateStaticParams() {
  const anime = await fetchAnimeData();

  // Pre-render a page for each anime
  return anime.map((item) => ({
    id: item.id,  // Creates /anime/123, /anime/456, etc.
  }));
}

// Generate SEO metadata for each page
export async function generateMetadata({ params }) {
  const anime = await getAnimeById(params.id);
  return {
    title: `${anime.name} | Anime News`,
    description: `${anime.type} anime from ${anime.vintage}`,
  };
}

// ISR: Revalidate every hour (3600 seconds)
// After 1 hour, Next.js will regenerate the page in the background
export const revalidate = 3600;

// This component runs on the SERVER at build time
export default async function AnimeDetailPage({ params }) {
  const { id } = await params;

  // Data fetched at BUILD time, not request time
  const anime = await getAnimeById(id);

  if (!anime) {
    notFound();  // Returns 404 page
  }

  // This HTML is generated once and cached
  return (
    <article>
      <h1>{anime.name}</h1>
      <p>Type: {anime.type}</p>
      <p>Released: {anime.vintage}</p>
    </article>
  );
}
```

### How it Works:
1. `npm run build` is executed
2. `generateStaticParams()` returns list of IDs
3. Next.js renders each page to static HTML
4. HTML files stored, served instantly to users
5. After `revalidate` period, pages regenerate in background

---

## 3. SSR - Server-Side Rendering

### File: `src/app/search/page.tsx` (NEW)

### Feature: Search Results Page
Server-rendered search results with:
- SEO-friendly URLs (`/search?q=naruto`)
- Fresh results on every search
- Server-side filtering (faster)
- Shareable search links

### Why SSR?
- Search query comes from URL (dynamic)
- Results must be fresh (not cached)
- SEO important for search results
- Server can filter large datasets efficiently

### Key Code:

```tsx
// SSR STRATEGY
// ============
// No 'use client' = Server Component
// 'force-dynamic' tells Next.js to render on EVERY request

import { fetchAnimeData } from '@/lib/api';

// Force SSR - no caching, fresh render every time
export const dynamic = 'force-dynamic';

// Alternative: Use searchParams which automatically makes it SSR
// export const dynamic = 'auto'; // default

// Metadata generated per-request based on search query
export async function generateMetadata({ searchParams }) {
  const { q } = await searchParams;
  return {
    title: q ? `Search: ${q} | Anime News` : 'Search | Anime News',
  };
}

// This runs on the SERVER for EVERY request
export default async function SearchPage({ searchParams }) {
  // Get query from URL: /search?q=naruto
  const { q } = await searchParams;
  const query = q || '';

  // Fetch fresh data on every request
  const allAnime = await fetchAnimeData();

  // Filter on server (faster than sending all data to client)
  const results = query
    ? allAnime.filter(anime =>
        anime.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // This HTML is generated fresh for every request
  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      <p>Found {results.length} results</p>

      {/* Rendered on server with fresh data */}
      <ul>
        {results.map(anime => (
          <li key={anime.id}>
            <Link href={`/anime/${anime.id}`}>{anime.name}</Link>
          </li>
        ))}
      </ul>

      {/* Timestamp proves it's SSR - changes on every refresh */}
      <p>Rendered at: {new Date().toISOString()}</p>
    </div>
  );
}
```

### How it Works:
1. User visits `/search?q=naruto`
2. Request hits Next.js server
3. Server executes the component function
4. Data fetched and filtered on server
5. HTML generated and sent to browser
6. No JavaScript needed for initial content

---

## 4. Hybrid - Server + Client Components

### Files:
- `src/app/browse/page.tsx` (Server Component)
- `src/app/browse/BrowseClient.tsx` (Client Component)

### Feature: Browse Catalog Page
A browsable catalog with:
- Fast initial load (server-rendered)
- Interactive type filter (client-side)
- Load more pagination (client-side)
- SEO-friendly (server-rendered HTML)

### Why Hybrid?
- Need fast initial load with data (server)
- Need interactivity (client)
- Need SEO (server-rendered HTML)
- Best of both worlds

### Key Code:

**Server Component (fetches data):**

```tsx
// src/app/browse/page.tsx
// HYBRID STRATEGY - Server Part
// ==============================
// This is a Server Component (no 'use client')
// It fetches data and passes to Client Component

import { fetchAnimeData } from '@/lib/api';
import BrowseClient from './BrowseClient';

// Revalidate every hour
export const revalidate = 3600;

// SEO metadata
export const metadata = {
  title: 'Browse Anime | Anime News',
  description: 'Browse our collection of anime series and movies',
};

// Server Component: Fetches data at build/request time
export default async function BrowsePage() {
  // Data fetched on SERVER (fast, no loading spinner needed)
  const animeData = await fetchAnimeData();

  // Get unique types for filter options
  const types = ['All', ...new Set(animeData.map(a => a.type))];

  // Pass server data to client component for interactivity
  return (
    <div>
      <h1>Browse Anime</h1>

      {/*
        BrowseClient is a Client Component
        It receives server-fetched data as props
        Handles all interactivity (filters, pagination)
      */}
      <BrowseClient
        initialData={animeData}
        types={types}
      />
    </div>
  );
}
```

**Client Component (handles interactivity):**

```tsx
// src/app/browse/BrowseClient.tsx
// HYBRID STRATEGY - Client Part
// ==============================
// This is a Client Component ('use client')
// It receives server data and handles interactivity

'use client';

import { useState, useMemo } from 'react';
import { AnimeItem } from '@/types/anime';

interface BrowseClientProps {
  initialData: AnimeItem[];  // Data from server
  types: string[];
}

export default function BrowseClient({ initialData, types }: BrowseClientProps) {
  // Client-side state for interactivity
  const [selectedType, setSelectedType] = useState('All');
  const [itemsToShow, setItemsToShow] = useState(12);

  // Client-side filtering (instant, no server round-trip)
  const filteredData = useMemo(() => {
    if (selectedType === 'All') return initialData;
    return initialData.filter(anime => anime.type === selectedType);
  }, [initialData, selectedType]);

  const visibleData = filteredData.slice(0, itemsToShow);
  const hasMore = itemsToShow < filteredData.length;

  return (
    <div>
      {/* Interactive filter - works without page reload */}
      <select
        value={selectedType}
        onChange={(e) => {
          setSelectedType(e.target.value);
          setItemsToShow(12);  // Reset pagination on filter change
        }}
      >
        {types.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      {/* Grid of anime - no loading state needed! */}
      <div className="grid grid-cols-3 gap-4">
        {visibleData.map(anime => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>

      {/* Load more - client-side pagination */}
      {hasMore && (
        <button onClick={() => setItemsToShow(prev => prev + 12)}>
          Load More
        </button>
      )}

      <p>Showing {visibleData.length} of {filteredData.length}</p>
    </div>
  );
}
```

### How it Works:
1. User visits `/browse`
2. Server Component fetches all anime data
3. HTML rendered with initial data (fast, SEO-friendly)
4. Page sent to browser with data embedded
5. React hydrates the Client Component
6. User can now filter/paginate (instant, no loading)

---

## Comparison Summary

| Aspect | CSR | SSG | SSR | Hybrid |
|--------|-----|-----|-----|--------|
| **Initial Load** | Slow (JS + fetch) | Fastest (static HTML) | Fast (server HTML) | Fast (server HTML) |
| **SEO** | Poor | Excellent | Excellent | Good |
| **Data Freshness** | Real-time | Build time / ISR | Every request | Build time + client |
| **Interactivity** | Full | Limited | Limited | Full |
| **Server Load** | None | None (CDN) | High | Medium |
| **Use Case** | Dashboards | Blog posts | Search results | Catalogs |

---

## When to Use Each

- **CSR**: User dashboards, real-time data, heavy interactivity
- **SSG**: Blog posts, documentation, product pages, any static content
- **SSR**: Search results, personalized pages, always-fresh data + SEO
- **Hybrid**: Catalogs, listings with filters, best performance + interactivity
