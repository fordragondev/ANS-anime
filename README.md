# Anime News

A modern web application that displays anime information from the Anime News Network API. Built with Next.js 16 and React 19.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)

## Features

- **Home Dashboard** - Interactive home with featured sections, filters, and search modal
- **Browse Catalog** - Full anime catalog with type filtering and pagination (`/browse`)
- **Search Page** - Server-rendered search with shareable URLs (`/search?q=...`)
- **Anime Details** - Pre-rendered detail pages for each anime (`/anime/[id]`)
- **Filter by Type** - Filter anime by type (TV, Movie, ONA, OVA, Special)
- **Dark Mode** - Automatic dark mode based on system preference
- **Responsive Design** - Optimized for mobile, tablet, and desktop

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.1 | React framework with App Router |
| React | 19.2.3 | UI library with React Compiler |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Styling |
| xml2js | 0.6.2 | XML parsing |
| lucide-react | 0.562.0 | Icons |

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

## Project Structure

```
src/
├── app/
│   ├── anime/[id]/      # Anime detail pages (SSG)
│   ├── browse/          # Browse catalog (Hybrid)
│   ├── search/          # Search results (SSR)
│   ├── api/anime/       # API route
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page (CSR)
│   └── globals.css      # Global styles
├── components/
│   ├── sections/        # Page section components
│   │   ├── TopStory.tsx
│   │   ├── TopPicks.tsx
│   │   ├── LatestNews.tsx
│   │   ├── CategorySection.tsx
│   │   └── LoadingSkeletons.tsx
│   ├── Header.tsx       # Navigation with search
│   ├── SectionHeader.tsx # Reusable section header
│   ├── AnimeCard.tsx
│   ├── FilterDropdown.tsx
│   ├── SearchModal.tsx
│   ├── ErrorBoundary.tsx
│   └── ThemeProvider.tsx
├── hooks/
│   ├── useAnimeData.ts  # Fetch and cache anime
│   ├── useSearch.ts     # Search functionality
│   └── useSectionData.ts # Section data organization
├── lib/
│   ├── api.ts           # API functions
│   ├── animeDetails.ts  # Detail fetching
│   ├── utils.ts         # Utilities + image helpers
│   └── constants.ts     # App constants
└── types/
    └── anime.ts         # TypeScript types
public/
└── placeholder-anime.svg # Default placeholder image
```

## API

This project uses the [Anime News Network Encyclopedia API](https://www.animenewsnetwork.com/encyclopedia/api.php).

**Endpoints used:**
- `reports.xml` - List of anime
- `api.xml` - Detailed anime information

## Rendering Strategies

This project demonstrates all 4 Next.js rendering strategies:

| Strategy | Route | Description |
|----------|-------|-------------|
| **CSR** | `/` | Client-Side Rendering - Interactive home with search modal |
| **SSG** | `/anime/[id]` | Static Site Generation - 100 pre-rendered detail pages |
| **SSR** | `/search` | Server-Side Rendering - Fresh search results each request |
| **Hybrid** | `/browse` | Server + Client - Server data with client interactivity |

See [RenderingSg.md](./RenderingSg.md) for detailed code examples.

## Performance

- **Multiple rendering strategies** - Optimal strategy per page
- **Static Site Generation (SSG)** - 100+ pages pre-rendered at build time
- **React Compiler** - Automatic memoization enabled
- **1-hour cache revalidation** - Fresh data with efficient caching

## Documentation

- **[CLAUDE.md](./CLAUDE.md)** - Detailed project documentation and architecture
- **[RenderingSg.md](./RenderingSg.md)** - Next.js rendering strategies guide

## License

MIT

---

Built with [Next.js](https://nextjs.org)
