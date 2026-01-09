# Anime News

A modern, responsive web application that displays the latest anime information from Anime News Network. Browse, search, and filter through anime titles with a clean, user-friendly interface.

## Features

- Browse latest anime with featured hero section
- Real-time search functionality
- Filter by anime type (TV, Movie, ONA, OVA, Special)
- Individual anime detail pages
- Responsive design for all devices
- Dark mode support
- Pagination with "Load More" functionality

## Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI library with React Compiler
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Anime News Network API** - Data source

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd anime-news
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and API
└── types/            # TypeScript type definitions
```

## API

This project uses the [Anime News Network Encyclopedia API](https://www.animenewsnetwork.com/encyclopedia/api.php) to fetch anime data.

## License

MIT
