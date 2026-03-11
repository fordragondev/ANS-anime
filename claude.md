# CLAUDE.md — Anime News Codebase Onboarding

> This file gives Claude (or any AI agent) the context it needs to navigate, understand, and contribute to this project effectively.

## Project Purpose

**Anime News** is a modern web app that displays anime data sourced from the [Anime News Network Encyclopedia API](https://www.animenewsnetwork.com/encyclopedia/api.php). It serves as both a functional anime news portal and a reference implementation showcasing **all four Next.js rendering strategies** (CSR, SSG, SSR, Hybrid) and **React 19 features** (React Compiler, `use()` API).

The app features **two swappable homepage designs** (V1 and V2) that users can toggle at runtime via a floating action button, each with its own components, hooks, and styling — but sharing the same API and data layer.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.1.1 | React framework with App Router |
| **React** | 19.2.3 | UI library, React Compiler enabled (`reactCompiler: true` in `next.config.ts`) |
| **TypeScript** | 5 | Strict mode (`"strict": true` in `tsconfig.json`) |
| **Tailwind CSS** | 4 | Styling — CSS-based config (no `tailwind.config.js`), uses `@theme inline` in `globals.css` |
| **SWR** | 2.x | Data fetching with caching, request deduplication, and retry |
| **Jest** | 30 | Test runner with `jest-environment-jsdom` |
| **React Testing Library** | 16.x | Component testing |
| **xml2js** | 0.6.2 | XML → JSON parsing for ANN API responses |
| **lucide-react** | 0.562 | Icons (V1 design) |
| **Material Symbols** | CDN | Icons (V2 design, loaded via Google Fonts CSS import) |

**Package manager:** npm (not yarn, pnpm, or bun)
**Path alias:** `@/*` → `./src/*` (configured in `tsconfig.json`)
**Fonts:** Geist, Geist Mono, Space Grotesk (via `next/font/google`)

---

## Project Structure

```
anime-news/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # Root layout — wraps everything in ThemeProvider → DesignProvider → HeaderToggle
│   │   ├── page.tsx                # Home entry — "design router" that lazy-loads V1 or V2 via next/dynamic
│   │   ├── globals.css             # Design tokens (CSS vars + @theme inline), dark mode, scrollbar, selection styles
│   │   ├── anime/[id]/page.tsx     # Anime detail page (SSG — pre-rendered at build time)
│   │   ├── browse/page.tsx         # Browse catalog (Hybrid — server data + client interactivity)
│   │   ├── search/page.tsx         # Search results (SSR — fresh on every request)
│   │   └── api/anime/route.ts      # API route — proxies ANN XML API, returns JSON
│   │
│   ├── features/                   # Feature-based modules (V1 and V2 are independent)
│   │   ├── home-v1/                # ── Design V1 (Light / News Portal) ──
│   │   │   ├── HomeV1.tsx          # V1 page component
│   │   │   ├── components/         # V1-only: Header, TopStory, TopPicks, LatestNews, CategorySection, LoadingSkeletons, SearchModalSwr
│   │   │   │   └── __tests__/      # 5 test suites for V1 components
│   │   │   └── hooks/
│   │   │       ├── useHomeV1Data.ts  # V1 data mapper — filtering, load-more, type selection
│   │   │       └── useSearch.ts      # Search logic
│   │   │
│   │   └── home-v2/                # ── Design V2 (Dark / Modern Glassmorphism) ──
│   │       ├── HomeV2.tsx          # V2 page component (wrapped in ErrorBoundary)
│   │       ├── components/         # V2-only: HeaderV2, FooterV2, HeroSection, NewsCard (compound), CategoryCard (compound)
│   │       │   └── __tests__/      # 3 test suites for V2 components
│   │       └── hooks/
│   │           └── useHomeV2Data.ts  # V2 data mapper — shapes data + assigns colors
│   │
│   ├── components/                 # Shared components (used by both designs and sub-pages)
│   │   ├── DesignProvider.tsx      # React Context for design toggle (v1/v2), persists to localStorage
│   │   ├── ThemeProvider.tsx       # Dark/light theme context (system pref in prod, manual toggle in dev)
│   │   ├── HeaderToggle.tsx        # Floating action button to swap V1 ↔ V2
│   │   ├── ErrorBoundary.tsx       # Class component error boundary with retry
│   │   ├── AnimeCard.tsx           # Reusable anime card (shared across pages)
│   │   ├── FilterDropdown.tsx      # Type filter dropdown
│   │   ├── SectionHeader.tsx       # Section title component
│   │   ├── SubPageHeader.tsx       # Header for non-home pages (browse, search, detail)
│   │   ├── SearchModal.tsx         # Original search modal
│   │   └── __tests__/             # 1 shared component test suite (AnimeCard)
│   │
│   ├── hooks/                      # Shared hooks
│   │   ├── useAnimeDataSwr.ts     # SWR-based anime list fetcher (dedup + retry) — core data hook
│   │   ├── useDetailsSwr.ts       # SWR-based detail enrichment (batch-fetches extra fields)
│   │   ├── useSectionData.ts      # ⚠️ DEAD CODE — legacy, pre-SWR
│   │   └── useSectionDataSwr.ts   # ⚠️ DEAD CODE — legacy, superseded by per-design data mappers
│   │
│   ├── lib/                        # Utilities
│   │   ├── api.ts                 # fetchAnimeData() — fetches ANN XML, parses to JSON, returns AnimeItem[]
│   │   ├── animeDetails.ts        # fetchAnimeDetails() — fetches detailed info for individual anime
│   │   ├── utils.ts               # getTypeBadgeColor() (V1), getTypeBadgeStyles() (V2), TYPE_COLORS map
│   │   └── constants.ts           # API_CONFIG, DETAIL_API_CONFIG, PAGINATION, SECTION_ALLOCATION, ANIME_TYPES
│   │
│   └── types/
│       └── anime.ts               # Shared types: AnimeItem, AnimeDetailItem, SectionData, AnimeType
│
├── public/                         # Static assets (favicon, SVG placeholder)
├── next.config.ts                 # React Compiler enabled, remote image patterns
├── tsconfig.json                  # Strict mode, @/* path alias
├── jest.config.js                 # next/jest setup, jsdom env, @/* alias
├── jest.setup.js                  # Imports @testing-library/jest-dom
├── eslint.config.mjs              # Flat config: next/core-web-vitals + next/typescript
├── postcss.config.mjs             # @tailwindcss/postcss
└── package.json                   # Scripts, dependencies
```

### Dead Code (TODO — safe to delete)

- `src/hooks/useSectionData.ts` — pre-SWR legacy hook
- `src/hooks/useSectionDataSwr.ts` — superseded by `useHomeV1Data` and `useHomeV2Data`
- `src/app/HomeV2 plainHtml.tsx` — old prototype
- `src/components/sections/` — empty directory
- `src/components/v2/` — empty directory

---

## Architecture & Data Flow

### Data Pipeline

```
ANN XML API (reports.xml / api.xml)
      ↓
/api/anime route (XML → JSON proxy)
      ↓
useAnimeDataSwr (SWR: fetch + cache + dedup)
      ↓
useDetailsSwr (batch enrichment: images, ratings, genres)
      ↓
┌─────────────────────────┬────────────────────────────┐
│   useHomeV1Data          │   useHomeV2Data             │
│   (V1 data mapper)       │   (V2 data mapper)          │
│   Outputs: SectionData   │   Outputs: SectionData      │
└─────────────┬───────────┘────────────┬─────────────────┘
              ↓                        ↓
         HomeV1 components        HomeV2 components
```

### Design Toggle System

1. **`DesignProvider`** — React Context using React 19 `use()` API, stores `"v1"` or `"v2"` in `localStorage`
2. **`page.tsx`** (home) — Reads `activeDesign` from context, lazy-loads the active design's bundle with `next/dynamic` + `<Suspense>`
3. **`HeaderToggle`** — FAB button (bottom-right) that calls `toggleDesign()`
4. **Code-splitting guarantee** — Client only downloads JS for the active design

### Rendering Strategy per Route

| Route | Strategy | Key Detail |
|---|---|---|
| `/` | CSR | Client-side design toggle, SWR data fetching |
| `/anime/[id]` | SSG | `generateStaticParams` pre-renders ~100 pages at build time |
| `/search` | SSR | Server-rendered on each request, shareable URL-based queries |
| `/browse` | Hybrid | Server component fetches data, client component handles filters/pagination |
| `/api/anime` | API Route | Proxies ANN XML → JSON |

### Key Patterns

- **Feature-based organization**: V1 and V2 are fully independent in `src/features/`, each with own components, hooks, and tests
- **Compound components** (V2): `NewsCard` and `CategoryCard` use Provider/Frame/Content sub-component patterns
- **Centralized design tokens**: CSS custom properties in `globals.css` `:root`, mapped to Tailwind via `@theme inline`
- **Unified color system**: `TYPE_COLORS` map in `utils.ts` drives both `getTypeBadgeColor()` (V1 solid) and `getTypeBadgeStyles()` (V2 translucent)
- **Error boundaries**: Both V1 and V2 are wrapped in `<ErrorBoundary>` for graceful degradation

---

## How to Work on This Project

### Commands

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Run all tests (193 tests across 9 suites)
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Lint (ESLint with Next.js core-web-vitals + TypeScript rules)
npm run lint

# Production build (also validates types)
npm run build

# Start production server (after build)
npm start
```

### Verifying Changes

After making changes, run these to validate:

1. **Type check** — `npm run build` (Next.js build includes TypeScript compilation, or run the tsc portion)
2. **Tests** — `npm test` (all 193 tests should pass)
3. **Lint** — `npm run lint`
4. **Dev server** — `npm run dev` and check http://localhost:3000 visually

### Conventions to Follow

- **TypeScript strict mode** — No `any` types, no type errors
- **Named exports** for components (e.g., `export function HomeV1()`, not `export default`)
- **Server Components by default** — Only add `"use client"` when the component needs interactivity, hooks, or browser APIs
- **`next/image`** for all images, **`next/link`** for navigation
- **Functional components** only — No class components (except `ErrorBoundary`)
- **async/await** over `.then()` chains
- **Early returns** for guard clauses
- **Tailwind-first styling** — Use utility classes, avoid writing custom CSS classes
- **CSS variables** only for branding colors and design tokens (defined in `globals.css`)

### When Modifying V1 or V2

- V1 components live in `src/features/home-v1/components/` — **do not import V2 code and vice versa**
- Shared logic (hooks, types, utils) goes in `src/hooks/`, `src/types/`, or `src/lib/`
- Each design has its own data mapper hook (`useHomeV1Data`, `useHomeV2Data`) that outputs the shared `SectionData` type
- Tests for design-specific components live in `src/features/home-v{1,2}/components/__tests__/`

### API Details

- **List endpoint**: `https://www.animenewsnetwork.com/encyclopedia/reports.xml?id=155&type=anime&nlist=100&nskip=100`
- **Detail endpoint**: `https://cdn.animenewsnetwork.com/encyclopedia/api.xml?anime=<id>`
- Responses are **XML**, parsed to JSON with `xml2js` (`parseStringPromise`)
- API proxy route: `src/app/api/anime/route.ts`
- Cache: 1-hour revalidation (`next: { revalidate: 3600 }`)

### Configuration Files

| File | Purpose |
|---|---|
| `next.config.ts` | React Compiler enabled, allowed remote image domains |
| `tsconfig.json` | Strict mode, `@/*` path alias, bundler module resolution |
| `jest.config.js` | next/jest, jsdom env, `@/*` alias mapping |
| `eslint.config.mjs` | Flat ESLint config: core-web-vitals + typescript |
| `postcss.config.mjs` | @tailwindcss/postcss plugin |
| `globals.css` | Design tokens, dark mode, Tailwind `@theme inline` |

### Known Issues & TODOs

- Dead code to clean up: `useSectionData.ts`, `useSectionDataSwr.ts`, `HomeV2 plainHtml.tsx`
- Some remaining ESLint errors to fix
- Dark mode toggle on HomeV2 needs verification
- `ThemeProvider` localStorage persistence is dev-only (not yet enabled for production)