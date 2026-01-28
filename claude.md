# Anime News

A modern Next.js application that displays anime information from the Anime News Network API.

## Tech Stack

- **Framework**: Next.js 16.1.1 with App Router
- **React**: 19.2.3 with React Compiler enabled
- **TypeScript**: Strict mode enabled
- **Styling**: Tailwind CSS 4
- **API**: Anime News Network Encyclopedia API
- **XML Parsing**: xml2js
- **Icons**: lucide-react

## Project Structure

```
anime-news/
├── public/
│   └── placeholder-anime.svg    # Default placeholder image for missing images
├── src/
│   ├── app/
│   │   ├── anime/[id]/
│   │   │   ├── page.tsx          # Anime detail pages (SSG)
│   │   │   └── not-found.tsx     # 404 page for anime
│   │   ├── api/
│   │   │   └── anime/
│   │   │       └── route.ts      # API route for anime data
│   │   ├── browse/
│   │   │   ├── page.tsx          # Browse catalog (Hybrid - Server Component)
│   │   │   └── BrowseClient.tsx  # Browse interactivity (Hybrid - Client Component)
│   │   ├── search/
│   │   │   └── page.tsx          # Search results (SSR)
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page (CSR)
│   │   ├── globals.css           # Global styles
│   │   └── favicon.ico
│   ├── components/
│   │   ├── sections/             # Section components
│   │   │   ├── TopStory.tsx      # Hero section with featured anime
│   │   │   ├── TopPicks.tsx      # Top picks grid (3-column)
│   │   │   ├── LatestNews.tsx    # Latest news list with filters
│   │   │   ├── CategorySection.tsx # Category section with featured + links
│   │   │   └── LoadingSkeletons.tsx # Loading skeleton components
│   │   ├── Header.tsx            # Navigation header with search
│   │   ├── SectionHeader.tsx     # Reusable section header with divider
│   │   ├── AnimeCard.tsx         # Individual anime card
│   │   ├── FilterDropdown.tsx    # Type filter dropdown
│   │   ├── SearchModal.tsx       # Search overlay
│   │   ├── ErrorBoundary.tsx     # Error boundary component
│   │   └── ThemeProvider.tsx     # Theme state management
│   ├── hooks/
│   │   ├── useAnimeData.ts       # Fetch and cache anime data
│   │   ├── useSearch.ts          # Search functionality
│   │   └── useSectionData.ts     # Section data organization
│   ├── lib/
│   │   ├── api.ts                # API functions (fetchAnimeData)
│   │   ├── animeDetails.ts       # Fetch detailed anime info
│   │   ├── utils.ts              # Utility functions + image helpers
│   │   └── constants.ts          # App constants
│   └── types/
│       └── anime.ts              # TypeScript types
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── eslint.config.mjs
```

## Features

### Core Functionality
- Fetches anime data from Anime News Network API
- Displays featured anime in hero section
- Grid layout of anime cards with type, name, and vintage
- Individual anime detail pages with dynamic routing
- Client-side data caching (1 hour revalidation)

### Pages
- **Home** (`/`): Interactive dashboard with sections, filters, search modal
- **Anime Detail** (`/anime/[id]`): Pre-rendered anime information pages
- **Search** (`/search?q=...`): Server-rendered search results with shareable URLs
- **Browse** (`/browse`): Full anime catalog with type filtering and pagination

### User Interface
- Responsive design (mobile, tablet, desktop)
- Navigation header with Browse link and search
- Search modal (home) and dedicated search page (shareable URLs)
- Filter by anime type (All, TV, Movie, ONA, OVA, Special)
- "Load More" pagination for better performance
- Loading states with skeleton cards
- Error handling with retry functionality
- Dark mode support (system preference + manual toggle in dev mode)
- Dev-only dark mode toggle (manual theme switching for testing)

### Performance
- Multiple rendering strategies for optimal performance
- Static page generation (SSG) for 100 anime detail pages
- React Compiler enabled for automatic memoization
- Optimized re-renders with useMemo hooks
- 1-hour cache revalidation on API requests

## Setup Instructions

### Prerequisites
- Node.js 20+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd anime-news
```

2. Install dependencies
```bash
npm install
```

3. Run development server
```bash
npm run dev
```

4. Open browser at http://localhost:3000

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## API Information

**Endpoint**: https://www.animenewsnetwork.com/encyclopedia/reports.xml

**Parameters**:
- `id=155` - Report ID for anime list
- `type=anime` - Content type
- `nlist=50` - Number of items to fetch

**Response Format**: XML (parsed to JSON)

**Data Structure**:
```typescript
interface AnimeItem {
  id: string;
  type: string;      // TV, Movie, ONA, OVA, Special
  name: string;
  vintage: string;   // Release year/season
}
```

## Build Information

Last successful build:
- 106 static pages generated
- 100 anime detail pages (SSG with 1h revalidation)
- TypeScript compilation passed
- No errors or warnings

### Route Types (from build output)
```
○  /           - Static (CSR)
●  /anime/[id] - SSG (100 pre-rendered pages)
○  /browse     - Static (Hybrid)
ƒ  /search     - Dynamic (SSR)
```

## Rendering Strategies

This project demonstrates all 4 Next.js rendering strategies. See `RenderingSg.md` for detailed examples.

| Strategy | Page | Description |
|----------|------|-------------|
| **CSR** | `/` | Client-Side Rendering - Interactive dashboard with filters and search |
| **SSG** | `/anime/[id]` | Static Site Generation - Pre-rendered detail pages with ISR |
| **SSR** | `/search` | Server-Side Rendering - Fresh search results on every request |
| **Hybrid** | `/browse` | Server + Client Components - Server fetches data, client handles interactivity |

### When to Use Each
- **CSR**: Heavy interactivity, real-time updates, user-specific state
- **SSG**: Static content, SEO critical, maximum performance
- **SSR**: Dynamic URLs, always-fresh data, SEO + personalization
- **Hybrid**: Best of both - fast initial load + client interactivity

## Styling Architecture

### Approach
- **Tailwind-first**: Use Tailwind utility classes for all component styling
- **Component-level**: Avoid global CSS classes, rely on component-specific Tailwind classes
- **CSS Variables**: Only for branding colors (primary, accent, background, foreground)
- **Minimal globals.css**: ~80 lines (branding colors, scrollbar, selection styles)

### Color System
- **Primary**: #003DA5 (Blue) - `bg-primary`
- **Accent**: #DC2626 (Red) - `bg-accent`
- **Tailwind Colors**: `bg-white dark:bg-gray-900`, `text-gray-600 dark:text-gray-400`
- **No custom semantic colors**: Removed card-bg, hover-bg, text-muted in favor of Tailwind

### Dark Mode
- **Tailwind CSS v4**: Automatic support for both `@media (prefers-color-scheme: dark)` and `.dark` class
- **Class-based toggle**: ThemeProvider adds/removes `dark` class on `<html>` element
- **Production**: Respects system preference only
- **Development**: Manual toggle button in header for easy testing

## Future Enhancements

- Add anime descriptions and images
- Implement favorites/bookmarking
- Add sorting options (by name, date, type)
- Infinite scroll option
- Export anime list to CSV/JSON
- User preferences persistence (localStorage)
- Advanced filtering (by year, season)
- Share anime links
- Anime comparison feature

## Development Notes

- Uses Next.js 16 App Router with Server/Client Components
- React 19 features enabled
- TypeScript strict mode enforced
- Tailwind CSS 4 with inline theme configuration
- Git repository initialized (master branch)

### Recent Optimizations (2026-01)
- Cleaned globals.css: Reduced from ~220 lines to ~80 lines (68% reduction)
- Standardized to Tailwind color system across all components
- Removed redundant CSS and unused utility classes
- Added dev-only dark mode toggle for easier theme testing
- Removed unused components (FeaturedArticle, LoadingCard, dataTransform)
- Added section components (TopStory, TopPicks, LatestNews, CategorySection)
- Category sections grid layout: 3-column (desktop), 2-column (tablet), 1-column (mobile)
- Local SVG placeholder image instead of external placehold.co service
- Image utility functions (getImageUrl, isPlaceholderImage) for consistent image handling
- Implemented all 4 Next.js rendering strategies (CSR, SSG, SSR, Hybrid)
- Added `/search` page with server-side rendering and shareable URLs
- Added `/browse` page with hybrid rendering (server data + client interactivity)
- Updated Header with navigation links and Browse button

## Configuration

### Next.js Config
- React Compiler enabled
- Local SVG placeholder for missing images (no external dependencies)

### Tailwind CSS
- Version 4 (PostCSS-based)
- Dark mode: Automatic (supports both class and media query)
- No config file needed (CSS-based configuration)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Private project

---

Generated with Claude Code