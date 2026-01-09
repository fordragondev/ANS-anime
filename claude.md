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
├── src/
│   ├── app/
│   │   ├── anime/[id]/
│   │   │   ├── page.tsx          # Dynamic anime detail pages
│   │   │   └── not-found.tsx     # 404 page for anime
│   │   ├── api/
│   │   │   └── anime/
│   │   │       └── route.ts      # API route for anime data
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page
│   │   ├── globals.css           # Global styles
│   │   └── favicon.ico
│   ├── components/
│   │   ├── Header.tsx            # Navigation header with search
│   │   ├── FeaturedArticle.tsx   # Hero section with featured anime
│   │   ├── AnimeCard.tsx         # Individual anime card
│   │   ├── FilterDropdown.tsx    # Type filter dropdown
│   │   ├── SearchModal.tsx       # Search overlay
│   │   ├── LoadingCard.tsx       # Loading skeleton
│   │   └── ErrorBoundary.tsx     # Error boundary component
│   ├── hooks/
│   │   ├── useAnimeData.ts       # Fetch and cache anime data
│   │   └── useSearch.ts          # Search functionality
│   ├── lib/
│   │   ├── api.ts                # API functions
│   │   ├── utils.ts              # Utility functions
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

### User Interface
- Responsive design (mobile, tablet, desktop)
- Search modal with real-time filtering
- Filter by anime type (All, TV, Movie, ONA, OVA, Special)
- "Load More" pagination for better performance
- Loading states with skeleton cards
- Error handling with retry functionality
- Dark mode support (system preference)

### Performance
- Static page generation (SSG) for 55 anime pages
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

## Color Scheme

- **Primary**: #003DA5 (Blue)
- **Accent**: #DC2626 (Red)
- **Background**: #ffffff (Light) / #0a0a0a (Dark)
- **Foreground**: #171717 (Light) / #ededed (Dark)
- **Secondary**: #f5f5f5 (Light Gray)

## Build Information

Last successful build:
- 55 static pages generated
- 50 anime detail pages (SSG with 1h revalidation)
- TypeScript compilation passed
- No errors or warnings

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

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Private project

---

Generated with Claude Code
