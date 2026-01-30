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
- `src/app/` - App Router pages and layouts
- `src/components/` - Reusable React components
- `src/lib/` - Utility functions and shared code
- `src/hooks/` - Custom React hooks
- `public/` - Static assets

## Conventions
- Use Server Components by default, add 'use client' only when needed
- Prefer named exports for components
- Follow the Next.js file-based routing conventions
- Use next/image for optimized images
- Use next/link for client-side navigation

## Code Style
- Use functional components with TypeScript
- Prefer async/await over .then() chains
- Use early returns for cleaner code
- Keep components small and focused

## Configuration
- Local SVG placeholder for missing images (no external dependencies)
- Tailwind CSS: No config file needed (CSS-based configuration in v4)
- Dark Mode: ThemeProvider manages `dark` class on `<html>` (system preference in prod, manual toggle in dev)

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
- Dark mode support (system preference + dev-only manual toggle)

### Performance
- Multiple rendering strategies (see Rendering Strategies section)
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

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Private project

---

Generated with Claude Code