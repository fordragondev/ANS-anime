# Anime News

A modern web application that displays anime information from the Anime News Network API. Built with Next.js 16 and React 19.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)

## Features

- **Browse Anime** - View anime data fetched from Anime News Network API
- **Search** - Real-time search modal with filtering
- **Filter by Type** - Filter anime by type (TV, Movie, ONA, OVA, Special)
- **Anime Details** - Individual pages with detailed anime information
- **Dark Mode** - Automatic dark mode based on system preference
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Pagination** - Load more functionality for browsing

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
git clone https://github.com/yourusername/anime-news.git
cd anime-news

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
│   ├── anime/[id]/      # Dynamic anime detail pages
│   ├── api/anime/       # API route
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/
│   ├── Header.tsx       # Navigation with search
│   ├── AnimeCard.tsx    # Anime card component
│   ├── FilterDropdown.tsx
│   ├── SearchModal.tsx
│   ├── SectionHeader.tsx
│   ├── ErrorBoundary.tsx
│   └── ThemeProvider.tsx
├── hooks/
│   ├── useAnimeData.ts  # Fetch and cache anime
│   ├── useSearch.ts     # Search functionality
│   └── useSectionData.ts
├── lib/
│   ├── api.ts           # API functions
│   ├── animeDetails.ts  # Detail fetching
│   ├── utils.ts         # Utilities
│   └── constants.ts     # App constants
└── types/
    └── anime.ts         # TypeScript types
```

## API

This project uses the [Anime News Network Encyclopedia API](https://www.animenewsnetwork.com/encyclopedia/api.php).

**Endpoints used:**
- `reports.xml` - List of anime
- `api.xml` - Detailed anime information

## Performance

- **Static Site Generation (SSG)** - 100+ pages pre-rendered at build time
- **React Compiler** - Automatic memoization enabled
- **1-hour cache revalidation** - Fresh data with efficient caching

## License

MIT

---

Built with [Next.js](https://nextjs.org)
