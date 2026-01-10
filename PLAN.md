# Anime News Website - Implementation Plan

## Project Overview
Build a news aggregator website consuming the AnimNewsNetwork API with KSL.com-inspired design using Next.js 15, TypeScript, and Tailwind CSS.

---

## Phase 1: Project Initialization

### Step 1.1: Create Next.js Project
```bash
npx create-next-app@latest anime-news --typescript --tailwind --eslint --app --turbopack
cd anime-news
```

### Step 1.2: Install Dependencies
```bash
npm install xml2js lucide-react
npm install -D @types/xml2js
npm install -D @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom
```

### Step 1.3: Configure Tailwind with Custom Colors
Update `\src\app\globals.css`:
- Primary: Deep blue (#003DA5)
- Secondary: White/light gray
- Accent: Red (#DC2626)
- Text: Dark gray/black

---

## Phase 2: Project Structure Setup

### Step 2.1: Create Directory Structure
```
/app
  /page.tsx                    # Homepage
  /anime/[id]/page.tsx         # Detail page
  /api/anime/route.ts          # API route
/components
  /Header.tsx                  # Top navigation
  /AnimeCard.tsx              # Article card component
  /FeaturedArticle.tsx        # Hero section
  /SearchModal.tsx            # Search overlay
  /FilterDropdown.tsx         # Type filter
  /LoadingCard.tsx            # Skeleton loader
  /ErrorBoundary.tsx          # Error handling
/lib
  /api.ts                     # API fetching logic
  /utils.ts                   # Helper functions
  /constants.ts               # Constants (API URL, etc.)
/types
  /anime.ts                   # TypeScript interfaces
/hooks
  /useAnimeData.ts           # Custom data fetching hook
  /useSearch.ts              # Search functionality hook
```

### Step 2.2: Setup TypeScript Types
Create `types/anime.ts`:
```typescript
export interface AnimeItem {
  id: string;
  type: string;
  name: string;
  vintage: string;
}

export interface AnimeResponse {
  report: {
    item: AnimeItem[];
  };
}
```

### Step 2.3: Setup constants
Create `lib/constants.ts`:
- API configuration, pagination settings, anime types
---

## Phase 3: API Integration

### Step 3.1: Create API Utility Functions
File: `lib/api.ts`
- Function: `fetchAnimeData()` - Fetch and parse XML
- Use `xml2js` to parse XML response
- Implement error handling with try-catch
- Add response type checking

### Step 3.2: Create API Route for Caching
File: `app/api/anime/route.ts`
- Implement GET handler
- Use Next.js cache with revalidation (e.g., 3600 seconds)
- Parse XML and return JSON
- Handle errors with appropriate status codes

### Step 3.3: Create Custom Hooks
File: `hooks/useAnimeData.ts`
- Fetch data from API route
- Implement loading states
- Implement error states
- Add retry logic

File: `hooks/useSearch.ts`
- Debounced search functionality

### Step 3.4: Create Utils helper functions
File: `lib/utils.ts`
-  filtering, searching, date formatting, text truncation
---

## Phase 4: UI Components

### Step 4.1: Header Component
File: `components/Header.tsx`
- Logo/title (left)
- Search icon (right side)
- User icon (right side)
- Mobile responsive menu
- Sticky navigation
- Deep blue background (#003DA5)

### Step 4.2: Featured Article Component
File: `components/FeaturedArticle.tsx`
- Large card layout
- Placeholder image (use Next.js Image with placeholder)
- Title overlay
- Type badge
- Vintage date
- Link to detail page

### Step 4.3: Anime Card Component
File: `components/AnimeCard.tsx`
- Thumbnail placeholder (16:9 ratio)
- Title (truncate if too long)
- Type badge with color coding
- Vintage date
- Hover effects
- Click to navigate to detail page

### Step 4.4: Filter Dropdown Component
File: `components/FilterDropdown.tsx`
- Dropdown with anime types (All, ONA, TV, Movie, etc.)
- Extract unique types from data
- Update filtered results on selection
- Styled with Tailwind

### Step 4.5: Search Modal Component
File: `components/SearchModal.tsx`
- Modal overlay (opens on search icon click)
- Input field for search query
- Close button
- Escape key to close
- Filter anime by name
- Display results in grid

### Step 4.6: Loading Skeleton Component
File: `components/LoadingCard.tsx`
- Shimmer animation
- Match AnimeCard layout
- Use Tailwind animate-pulse

### Step 4.7: Error Boundary Component
File: `components/ErrorBoundary.tsx`
- Error handling component

---

## Phase 5: Page Implementation

### Step 5.1: Homepage
File: `app/page.tsx`

Features:
- Fetch anime data on load
- Display featured article (first item)
- Grid layout (3 columns desktop, 2 tablet, 1 mobile)
- Filter dropdown
- Initial display: 10 items
- "Load More Stories" button (loads 5 more)
- Search integration
- Loading states
- Error handling

Layout:
```
- Header
- Featured Article (hero)
- Filter Dropdown
- Grid (AnimeCard components)
- Load More Button
```

### Step 5.2: Detail Page
File: `app/anime/[id]/page.tsx`

Features:
- Dynamic route with anime ID
- Fetch all anime data and find by ID
- Display full anime information
- Placeholder image
- Title, type, vintage, description placeholder
- Back to homepage link
- 404 handling for invalid IDs
- Generate static params for known IDs

---

## Phase 6: Styling

### Step 6.1: Global Styles
File: `app/globals.css`
- KSL.com inspired color scheme
- Typography settings
- Responsive breakpoints
- Custom scrollbar styling

### Step 6.2: Component-Specific Styles
- Use Tailwind utility classes
- Create reusable component variants
- Ensure consistent spacing and sizing
- Add hover/focus states for accessibility

### Step 6.3: Responsive Design
Breakpoints:
- Mobile: < 640px (1 column)
- Tablet: 640px - 1024px (2 columns)
- Desktop: > 1024px (3 columns)

---

## Phase 7: State Management

### Step 7.1: Homepage State
- `animeData`: All fetched anime
- `filteredData`: After applying filters
- `displayedData`: Paginated subset
- `currentType`: Selected filter
- `itemsToShow`: Number of items to display
- `isSearchOpen`: Search modal state
- `searchQuery`: Search input value
- `isLoading`: Loading state
- `error`: Error state

### Step 7.2: Custom Hooks Implementation
File: `hooks/useSearch.ts`
- Debounced search input
- Filter logic
- Return filtered results

---

## Phase 8: Testing

### Step 8.1: Setup Jest Configuration
File: `jest.config.js`
- Configure test environment
- Setup module paths
- Add transform for TypeScript

### Step 8.2: Component Tests
Files to create:
- `__tests__/AnimeCard.test.tsx`
- `__tests__/FilterDropdown.test.tsx`
- `__tests__/SearchModal.test.tsx`

Test cases:
- Component renders correctly
- Props are displayed
- Click handlers work
- Filter logic works
- Search functionality works

---

## Phase 9: Performance Optimization

### Step 9.1: Implement Caching
- Next.js route caching (API route)
- React Query or SWR (optional enhancement)
- Static generation for detail pages

### Step 9.2: Image Optimization
- Use Next.js Image component
- Placeholder images with proper sizing
- Lazy loading for below-fold images

### Step 9.3: Code Splitting
- Dynamic imports for SearchModal
- Lazy load components when needed

---

## Phase 10: Accessibility & SEO

### Step 10.1: Accessibility
- Semantic HTML (header, main, article, nav)
- ARIA labels for icons
- Keyboard navigation support
- Focus management in modal
- Alt text for images
- Proper heading hierarchy

### Step 10.2: SEO
- Metadata for each page
- Open Graph tags
- Structured data (JSON-LD)
- Dynamic page titles

---

## Phase 11: Error Handling & Edge Cases

### Step 11.1: Error Boundaries
File: `components/ErrorBoundary.tsx`
- Catch React errors
- Display user-friendly error message
- Retry functionality

### Step 11.2: Edge Cases
- Empty API response
- Network failures
- Invalid anime ID
- No search results
- Slow network (loading states)

---

## Phase 12: Documentation

### Step 12.1: README.md
Sections:
- Project description
- Prerequisites
- Installation instructions
- Running the development server
- Building for production
- Running tests
- Environment variables (if any)
- Project structure
- Technologies used
- Features list

### Step 12.2: Code Documentation
- JSDoc comments for complex functions
- Component prop interfaces
- API function documentation

---

## Phase 13: Final Testing & Deployment

### Step 13.1: Manual Testing Checklist
- [ ] Homepage loads correctly
- [ ] Featured article displays
- [ ] Grid layout is responsive
- [ ] Filter dropdown works
- [ ] Load More button works
- [ ] Search functionality works
- [ ] Detail page navigation works
- [ ] Back button works
- [ ] Mobile responsive design
- [ ] Loading states display
- [ ] Error handling works

### Step 13.2: Build & Deploy
```bash
npm run build
npm run start
```

### Step 13.3: Deployment Options
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify

---

## Implementation Order Summary

1. **Day 1**: Setup & Structure
   - Initialize project
   - Install dependencies
   - Create folder structure
   - Setup TypeScript types

2. **Day 2**: API Integration
   - Create API utilities
   - Implement API route
   - Test XML parsing
   - Create custom hooks

3. **Day 3**: Core Components
   - Header
   - AnimeCard
   - FeaturedArticle
   - Loading states

4. **Day 4**: Homepage
   - Layout implementation
   - Data fetching
   - Filter functionality
   - Load More functionality

5. **Day 5**: Search & Detail Page
   - SearchModal
   - Detail page
   - Navigation

6. **Day 6**: Styling & Responsiveness
   - Apply KSL.com design
   - Mobile responsiveness
   - Polish UI/UX

7. **Day 7**: Testing & Documentation
   - Write tests
   - Create README
   - Final bug fixes

---

## Key Technical Decisions

### 1. XML Parsing
**Choice**: `xml2js` library
**Reason**: Mature, well-maintained, easy to use with TypeScript

### 2. Caching Strategy
**Choice**: Next.js API route with built-in cache
**Reason**: Simple, requires no additional dependencies, leverages Next.js features

### 3. State Management
**Choice**: React hooks (useState, useEffect, useMemo)
**Reason**: Sufficient for this app size, no need for Redux/Zustand complexity

### 4. Styling
**Choice**: Tailwind CSS utility classes
**Reason**: Fast development, consistent design, small bundle size

### 5. Icons
**Choice**: Lucide React
**Reason**: Modern, tree-shakeable, consistent design

### 6. Image Placeholders
**Choice**: Next.js Image with placeholder prop
**Reason**: Automatic optimization, blur placeholder, lazy loading

---

## Success Criteria

- [ ] Project builds without errors
- [ ] All pages are responsive (mobile, tablet, desktop)
- [ ] API integration works with proper caching
- [ ] Search and filter functionality work correctly
- [ ] Loading and error states are implemented
- [ ] Basic tests pass
- [ ] Code follows TypeScript best practices
- [ ] Accessible (keyboard navigation, ARIA labels)
- [ ] Clean, production-ready code
- [ ] README with clear setup instructions

---

## Next Steps

Start with Phase 1 and proceed sequentially. Each phase builds upon the previous one, ensuring a solid foundation before adding complexity.

---

## TODO-TOASK

check AnimeType vs ANIME_TYPES
change mayus to camel naming ??
explain ErrorBoundary
move api.ts to src\app\api\anime ??
Client-side data caching (1 hour revalidation)
Search modal with real-time filtering
Loading states with skeleton cards
Error handling with retry functionality
Dark mode support (system preference)
- Static page generation (SSG) for 55 anime pages
- React Compiler enabled for automatic memoization
- Optimized re-renders with useMemo hooks