# Anime News

A modern web application that displays anime information from the [Anime News Network API](https://www.animenewsnetwork.com/encyclopedia/api.php). Built with Next.js 16 and React 19. Features **two swappable homepage designs** that users can toggle between at runtime.

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

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.1.1 | React framework with App Router |
| React | 19.2.3 | UI library with React Compiler |
| TypeScript | 5 | Type safety (strict mode) |
| Tailwind CSS | 4 | Styling |
| SWR | 2.x | Data fetching & caching |
| Jest | 30 | Testing (193 tests across 9 suites) |

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm

### Installation

```bash
git clone https://github.com/fordragondev/ANS-anime.git
cd ANS-anime
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |

## Project Structure

```
src/
├── app/                  # Next.js App Router (pages, layouts, API routes)
├── features/
│   ├── home-v1/          # Design V1 — Light news portal (components, hooks, tests)
│   └── home-v2/          # Design V2 — Dark modern glassmorphism (components, hooks, tests)
├── components/           # Shared components (DesignProvider, ThemeProvider, ErrorBoundary, etc.)
├── hooks/                # Shared data hooks (SWR-based fetching & enrichment)
├── lib/                  # Utilities (API functions, constants, color helpers)
└── types/                # Shared TypeScript types
```

> For detailed architecture, data flow diagrams, coding conventions, and API details, see [CLAUDE.md](./claude.md).

## Rendering Strategies

This project demonstrates all four Next.js rendering strategies:

| Strategy | Route | Description |
|---|---|---|
| **CSR** | `/` | Client-Side Rendering — Interactive home with design toggle |
| **SSG** | `/anime/[id]` | Static Site Generation — Pre-rendered detail pages |
| **SSR** | `/search` | Server-Side Rendering — Fresh search results each request |
| **Hybrid** | `/browse` | Server + Client — Server data with client interactivity |

## License

MIT

---

Built with [Next.js](https://nextjs.org)
