# Anime News

A modern web application that displays anime information from the Anime News Network API. Built with Next.js 16 and React 19. Features **two swappable homepage designs** that users can toggle between at runtime.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)

## Features

- **Dual Homepage Designs** — Two independent home page designs (V1 & V2) with a floating toggle button to switch between them
- **Browse Catalog** — Full anime catalog with type filtering and pagination (`/browse`)
- **Search Page** — Server-rendered search with shareable URLs (`/search?q=...`)
- **Anime Details** — Pre-rendered detail pages for each anime (`/anime/[id]`)
- **Filter by Type** — Filter anime by type (TV, Movie, ONA, OVA, Special)
- **Dark Mode** — Automatic dark mode based on system preference
- **Responsive Design** — Optimized for mobile, tablet, and desktop

## Design Toggle (Component Swapping)

The app supports two fully independent homepage designs that share the same API but have their own components, hooks, and data mappers.

### How It Works

```
┌─────────────┐     ┌──────────────────┐     ┌───────────────┐
│  layout.tsx  │────▶│  DesignProvider   │────▶│  HeaderToggle │
│  (wraps app) │     │  (React Context)  │     │  (FAB button) │
└─────────────┘     └──────────────────┘     └───────────────┘
                           │
                    reads activeDesign
                           │
                    ┌──────┴──────┐
                    ▼             ▼
              ┌──────────┐  ┌──────────┐
              │  HomeV1   │  │  HomeV2   │
              │ (dynamic) │  │ (dynamic) │
              └──────────┘  └──────────┘
```

1. **`DesignProvider`** — A React Context provider that stores the active design (`v1` or `v2`) in `localStorage` for persistence across reloads
2. **`page.tsx`** — The entry point acts as a router, using `next/dynamic` to lazily load only the active design's bundle
3. **`HeaderToggle`** — A floating action button (bottom-right corner) that calls `toggleDesign()` to swap between V1 and V2

**Key benefit**: `next/dynamic` ensures the client only downloads the JavaScript bundle for the design they're viewing — V2's code is never shipped if the user stays on V1, and vice versa.

### Design V1 — News Portal (Light Theme)

A classic news portal layout inspired by KSL.com, featuring:
- **TopStory** — Hero section with featured anime
- **TopPicks** — 3-column grid of popular picks
- **LatestNews** — Filterable news feed with load-more pagination
- **CategorySection** — Genre-based category grids
- **SearchModalSwr** — Compound component search modal
- Own data mapper: `useHomeV1Data` (encapsulates filtering, load-more, type selection)

### Design V2 — Dark Modern (Dark Theme)

A sleek, dark-themed design with glassmorphism and Material Symbols icons:
- **HeroSection** — Large featured story with gradient overlay
- **NewsCard** — Compound component (Provider/Frame/Image/Content/Badge/Title/Excerpt/Meta/Bookmark)
- **CategoryCard** — Compound component (Provider/Frame/Hero/List)
- **HeaderV2 / FooterV2** — Dark-themed navigation and footer
- Own data mapper: `useHomeV2Data` (maps API data into V2-specific shapes with color assignment)

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.1 | React framework with App Router |
| React | 19.2.3 | UI library with React Compiler |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Styling |
| SWR | - | Data fetching for detail enrichment |
| xml2js | 0.6.2 | XML parsing |
| lucide-react | 0.562.0 | Icons (V1) |

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/fordragondev/ANS-anime.git
cd ANS-anime

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run Jest tests (175 tests) |

## Project Structure

```
src/
├── app/
│   ├── anime/[id]/          # Anime detail pages (SSG)
│   ├── browse/              # Browse catalog (Hybrid)
│   ├── search/              # Search results (SSR)
│   ├── api/anime/           # API route
│   ├── layout.tsx           # Root layout (providers + toggle)
│   ├── page.tsx             # Home entry point (design router)
│   └── globals.css          # Global styles + V2 theme tokens
│
├── features/                # Feature-based modules
│   ├── home-v1/             # ── Design V1 ──────────────────
│   │   ├── HomeV1.tsx       # V1 page component (CSR)
│   │   ├── components/      # V1-only components
│   │   │   ├── Header.tsx
│   │   │   ├── TopStory.tsx
│   │   │   ├── TopPicks.tsx
│   │   │   ├── LatestNews.tsx
│   │   │   ├── CategorySection.tsx
│   │   │   ├── LoadingSkeletons.tsx
│   │   │   ├── SearchModalSwr.tsx
│   │   │   └── __tests__/   # Component tests
│   │   └── hooks/
│   │       ├── useHomeV1Data.ts  # V1 data mapper
│   │       └── useSearch.ts     # Search logic
│   │
│   └── home-v2/             # ── Design V2 ──────────────────
│       ├── HomeV2.tsx       # V2 page component (CSR)
│       ├── types.ts         # V2-specific TypeScript types
│       ├── components/      # V2-only components
│       │   ├── HeaderV2.tsx
│       │   ├── FooterV2.tsx
│       │   ├── HeroSection.tsx
│       │   ├── NewsCard.tsx     # Compound component
│       │   └── CategoryCard.tsx # Compound component
│       └── hooks/
│           └── useHomeV2Data.ts # V2 data mapper
│
├── components/              # Shared components
│   ├── DesignProvider.tsx   # Design toggle context
│   ├── HeaderToggle.tsx     # FAB toggle button
│   ├── ThemeProvider.tsx    # Dark/light theme context
│   ├── ErrorBoundary.tsx
│   ├── AnimeCard.tsx
│   ├── FilterDropdown.tsx
│   ├── SectionHeader.tsx
│   └── SearchModal.tsx
│
├── hooks/                   # Shared hooks
│   ├── useAnimeData.ts     # Fetch anime list from API
│   └── useDetailsSwr.ts    # SWR-based detail enrichment
│
├── lib/                     # Utilities
│   ├── api.ts              # API functions (XML → JSON)
│   ├── animeDetails.ts     # Detail fetching
│   ├── utils.ts            # Utilities + image helpers
│   └── constants.ts        # App constants
│
└── types/
    └── anime.ts            # Shared TypeScript types
```

## API

This project uses the [Anime News Network Encyclopedia API](https://www.animenewsnetwork.com/encyclopedia/api.php).

**Endpoints used:**
- `reports.xml` — List of anime
- `api.xml` — Detailed anime information

**Data flow:**
```
ANN API (XML) → /api/anime route (JSON) → useAnimeData → useDetailsSwr → useHomeV1Data / useHomeV2Data
```

Both V1 and V2 consume the same `useAnimeData` hook and `useDetailsSwr` for detail enrichment, but each has its own data mapper hook that shapes the data for its specific UI components.

## Rendering Strategies

This project demonstrates all 4 Next.js rendering strategies:

| Strategy | Route | Description |
|----------|-------|-------------|
| **CSR** | `/` | Client-Side Rendering — Interactive home with design toggle |
| **SSG** | `/anime/[id]` | Static Site Generation — 100 pre-rendered detail pages |
| **SSR** | `/search` | Server-Side Rendering — Fresh search results each request |
| **Hybrid** | `/browse` | Server + Client — Server data with client interactivity |

See [RenderingSg.md](./RenderingSg.md) for detailed code examples.

## Performance

- **Code splitting** — `next/dynamic` loads only the active design's bundle
- **Static Site Generation (SSG)** — 100+ pages pre-rendered at build time
- **React Compiler** — Automatic memoization enabled
- **SWR caching** — Efficient data fetching with stale-while-revalidate
- **1-hour cache revalidation** — Fresh data with efficient caching
- **next/image** — Optimized image loading with responsive sizing

## Testing

```bash
npm test
```

175 unit tests covering all V1 components (TopStory, TopPicks, LatestNews, CategorySection, LoadingSkeletons) and shared components (AnimeCard).

## Documentation

- **[CLAUDE.md](./CLAUDE.md)** — Detailed project documentation and architecture
- **[RenderingSg.md](./RenderingSg.md)** — Next.js rendering strategies guide

## TODO

- [ ] Fix remaining ESLint errors
- [ ] Check dark mode toggle on HomeV2
- [ ] Fix HomeV2 search, icons, and spacing

## License

MIT

---

Built with [Next.js](https://nextjs.org)
