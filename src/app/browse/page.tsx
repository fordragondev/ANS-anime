/**
 * BROWSE PAGE - Hybrid Rendering (Server + Client Components)
 *
 * RENDERING STRATEGY: Hybrid (Server Component + Client Component)
 *
 * How it works:
 * 1. This Server Component fetches all anime data at request time
 * 2. Data is passed as props to BrowseClient (a Client Component)
 * 3. Client Component handles interactivity (filters, pagination)
 * 4. Initial HTML includes all data (no loading spinner needed)
 *
 * Why Hybrid for this page:
 * - Fast initial load: Data is already in HTML
 * - Interactive filtering: Type filters work without page reload
 * - Best of both worlds: Server efficiency + client interactivity
 * - SEO friendly: Full content in initial HTML
 *
 * Trade-offs:
 * + No loading spinner (data pre-loaded on server)
 * + Instant filter/pagination response (client-side)
 * + SEO friendly (full content in HTML)
 * + Server handles data fetching (secure, efficient)
 * - Slightly more complex architecture (two components)
 * - Full dataset sent to client (memory consideration for huge datasets)
 *
 * @see /page.tsx for CSR example
 * @see /anime/[id]/page.tsx for SSG example
 * @see /search/page.tsx for SSR example
 */
import { fetchAnimeData } from '@/lib/api';
import BrowseClient from './BrowseClient';

// Hybrid: Server Component fetches data (this runs on the server)
export default async function BrowsePage() {
  // Server-side data fetching - this happens before any HTML is sent
  const animeData = await fetchAnimeData();

  return (
    // Hybrid: Pass server-fetched data to Client Component as props
    // BrowseClient handles all client-side interactivity
    <BrowseClient initialData={animeData} />
  );
}

// Metadata is generated on the server (standard Next.js pattern)
export const metadata = {
  title: 'Browse All Anime | Anime News',
  description: 'Browse and filter the complete anime catalog. Filter by type: TV, Movie, ONA, OVA, Special.',
};
