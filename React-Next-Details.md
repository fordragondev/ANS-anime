# Learn React & Next.js - Anime News Project Guide

## Table of Contents
1. [React Basics](#react-basics)
2. [Next.js Fundamentals](#nextjs-fundamentals)
3. [Understanding Our Hooks](#understanding-our-hooks)
4. [Understanding Our Components](#understanding-our-components)
5. [Routing in Next.js](#routing-in-nextjs)
6. [Data Flow in Our Application](#data-flow-in-our-application)
7. [State Management](#state-management)

---

## React Basics

### What is React?
React is a JavaScript library for building user interfaces. It lets you create reusable components that manage their own state.

### Key Concepts

#### 1. Components
Components are the building blocks of React applications. They're like JavaScript functions that return HTML (JSX).

```tsx
// Simple Component
function Welcome() {
  return <h1>Hello, World!</h1>;
}
```

#### 2. JSX (JavaScript XML)
JSX lets you write HTML-like code in JavaScript:

```tsx
const element = <h1>Hello!</h1>;
const name = "John";
const greeting = <h1>Hello, {name}!</h1>; // Use {} for JavaScript expressions
```

#### 3. Props
Props (properties) are how you pass data from parent to child components:

```tsx
// Parent Component
<AnimeCard anime={animeData} />

// Child Component
function AnimeCard({ anime }) {
  return <div>{anime.name}</div>;
}
```

**In our project example:**
```tsx
// src/components/AnimeCard.tsx
interface AnimeCardProps {
  anime: AnimeItem; // TypeScript type definition
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  return <div>{anime.name}</div>; // Using the anime prop
}
```

#### 4. State
State is data that changes over time. When state changes, React re-renders the component.

```tsx
import { useState } from 'react';

function Counter() {
  // useState returns [currentValue, functionToUpdateValue]
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

#### 5. Effects
Effects let you perform side effects (data fetching, subscriptions, etc.):

```tsx
import { useEffect } from 'react';

function DataFetcher() {
  useEffect(() => {
    // This code runs after the component renders
    fetchData();
  }, []); // Empty array = run once when component mounts
}
```

---

## Next.js Fundamentals

### What is Next.js?
Next.js is a React framework that provides:
- **File-based routing** - Create files to create routes
- **Server-side rendering** - Faster initial page loads
- **API routes** - Backend endpoints in the same project
- **Image optimization** - Automatic image optimization

### Key Features in Our Project

#### 1. App Router (Next.js 13+)
The `app/` directory structure creates routes:

```
app/
  page.tsx          → "/" (homepage)
  layout.tsx        → Wraps all pages
  anime/
    [id]/
      page.tsx      → "/anime/123" (dynamic route)
```

#### 2. Client vs Server Components

**Server Components (default):**
- Run on the server
- Can directly access databases/APIs
- Smaller bundle size
- Cannot use useState, useEffect

```tsx
// Server Component (default)
export default async function Page() {
  const data = await fetchData(); // Can be async
  return <div>{data}</div>;
}
```

**Client Components:**
- Run in the browser
- Can use hooks (useState, useEffect)
- Need `'use client'` directive

```tsx
'use client'; // This makes it a client component

import { useState } from 'react';

export default function Page() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

#### 3. Data Fetching

**In Server Components:**
```tsx
export default async function Page() {
  const data = await fetch('https://api.example.com/data');
  return <div>{data}</div>;
}
```

**In Client Components:**
```tsx
'use client';

export default function Page() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);
}
```

---

## Understanding Our Hooks

Hooks are reusable functions that let you use React features. We created two custom hooks:

### 1. useAnimeData Hook
**File:** `src/hooks/useAnimeData.ts`

**What it does:** Fetches anime data from our API with loading and error states.

```tsx
'use client';

import { useState, useEffect } from 'react';

export function useAnimeData() {
  const [data, setData] = useState([]); // Stores anime data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    fetchData();
  }, []); // Run once when component mounts

  return { data, isLoading, error, refetch };
}
```

**How to use it:**
```tsx
function MyComponent() {
  const { data, isLoading, error, refetch } = useAnimeData();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <div>{data.map(anime => <div>{anime.name}</div>)}</div>;
}
```

**Key concepts:**
- `useState` - Stores data, loading, and error states
- `useEffect` - Fetches data when component first renders
- **Retry logic** - If fetch fails, it retries up to 2 times
- Returns an object with data and helper functions

### 2. useSearch Hook
**File:** `src/hooks/useSearch.ts`

**What it does:** Provides search functionality with debouncing (delays search until user stops typing).

```tsx
export function useSearch(data, debounceMs = 300) {
  const [query, setQuery] = useState(''); // What user typed
  const [debouncedQuery, setDebouncedQuery] = useState(''); // Delayed query

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query); // Update after 300ms delay
    }, debounceMs);

    return () => clearTimeout(timer); // Cleanup
  }, [query]);

  const results = useMemo(() => {
    return searchAnimeByName(data, debouncedQuery);
  }, [data, debouncedQuery]);

  return { query, setQuery, results, clearSearch, isSearching };
}
```

**How it works:**
1. User types "naruto" in search box
2. `query` updates immediately
3. After 300ms of no typing, `debouncedQuery` updates
4. `useMemo` recalculates filtered results
5. Component re-renders with new results

**Why debouncing?**
Without debouncing, searching would happen on every keystroke, which is inefficient.

**useMemo explained:**
```tsx
const results = useMemo(() => {
  return expensiveCalculation(data);
}, [data]); // Only recalculate when 'data' changes
```

---

## Understanding Our Components

### 1. Header Component
**File:** `src/components/Header.tsx`

```tsx
'use client';

interface HeaderProps {
  onSearchClick: () => void; // Function type
}

export default function Header({ onSearchClick }: HeaderProps) {
  return (
    <header className="bg-primary text-white">
      <button onClick={onSearchClick}>
        <Search size={24} />
      </button>
    </header>
  );
}
```

**Key concepts:**
- **Props with TypeScript:** `HeaderProps` defines what props this component accepts
- **Function props:** `onSearchClick` is a function passed from parent
- **Event handlers:** `onClick` triggers when button is clicked
- **Tailwind classes:** `className="bg-primary"` applies styles

### 2. AnimeCard Component
**File:** `src/components/AnimeCard.tsx`

```tsx
import Link from 'next/link';
import Image from 'next/image';

export default function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <Link href={`/anime/${anime.id}`}>
      <article>
        <Image
          src={`https://placehold.co/400x225`}
          alt={anime.name}
          fill
        />
        <h3>{anime.name}</h3>
        <p>{formatDate(anime.vintage)}</p>
      </article>
    </Link>
  );
}
```

**Key concepts:**
- **Next.js Link:** Client-side navigation (no page reload)
- **Next.js Image:** Automatic optimization and lazy loading
- **Template literals:** `` `/anime/${anime.id}` `` creates dynamic URLs
- **Utility functions:** `formatDate()` from our utils

### 3. SearchModal Component
**File:** `src/components/SearchModal.tsx`

```tsx
'use client';

export default function SearchModal({ isOpen, onClose, query, onQueryChange, results }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus(); // Focus input when modal opens
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null; // Don't render if closed

  return (
    <div className="fixed inset-0">
      <div onClick={onClose} /> {/* Backdrop */}
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      {results.map(anime => <AnimeCard key={anime.id} anime={anime} />)}
    </div>
  );
}
```

**Key concepts:**
- **useRef:** Access DOM elements directly (`inputRef.current.focus()`)
- **Conditional rendering:** `if (!isOpen) return null`
- **Event listeners:** `addEventListener` for keyboard shortcuts
- **Cleanup:** Return function in useEffect removes event listeners
- **Controlled input:** `value={query}` and `onChange` make React control the input

### 4. FilterDropdown Component
**File:** `src/components/FilterDropdown.tsx`

```tsx
export default function FilterDropdown({ types, selectedType, onTypeChange }) {
  return (
    <select
      value={selectedType}
      onChange={(e) => onTypeChange(e.target.value)}
    >
      {types.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
}
```

**Key concepts:**
- **Controlled select:** Value controlled by React state
- **Array.map():** Creates option elements from array
- **Key prop:** React needs unique `key` for list items

---

## Routing in Next.js

### File-Based Routing

```
app/
  page.tsx                    → "/"
  layout.tsx                  → Wraps all pages
  anime/
    [id]/
      page.tsx                → "/anime/:id" (dynamic)
      not-found.tsx           → 404 page
  api/
    anime/
      route.ts                → "/api/anime" endpoint
```

### Static vs Dynamic Routes

**Static Route:**
```
app/about/page.tsx → "/about"
```

**Dynamic Route:**
```
app/anime/[id]/page.tsx → "/anime/123", "/anime/456", etc.
```

### Our Detail Page
**File:** `src/app/anime/[id]/page.tsx`

```tsx
interface AnimeDetailPageProps {
  params: Promise<{ id: string }>; // Next.js passes route params
}

export default async function AnimeDetailPage({ params }: AnimeDetailPageProps) {
  const { id } = await params; // Extract ID from URL
  const anime = await fetchAnimeById(id); // Fetch data

  if (!anime) {
    notFound(); // Show 404 page
  }

  return <div>{anime.name}</div>;
}
```

**Key concepts:**
- **Server Component:** Can be `async` and fetch data directly
- **params:** Next.js provides URL parameters
- **notFound():** Next.js function to show 404 page
- **generateStaticParams:** Pre-renders pages at build time

### Navigation

**Link Component (Client-side):**
```tsx
import Link from 'next/link';

<Link href="/anime/123">Go to anime</Link>
```

**useRouter Hook (Programmatic):**
```tsx
'use client';
import { useRouter } from 'next/navigation';

function MyComponent() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/anime/123');
  };
}
```

---

## Data Flow in Our Application

### 1. Homepage Flow

```
User visits "/"
  ↓
page.tsx renders (Client Component)
  ↓
useAnimeData hook runs
  ↓
Fetches from "/api/anime"
  ↓
API route (route.ts) runs
  ↓
Calls fetchAnimeData() from lib/api.ts
  ↓
Fetches XML from AnimNewsNetwork
  ↓
Parses XML to JSON
  ↓
Returns data to hook
  ↓
Hook sets data in state
  ↓
Component re-renders with data
  ↓
Shows FeaturedArticle and AnimeCards
```

### 2. Search Flow

```
User clicks search icon
  ↓
Header calls onSearchClick()
  ↓
page.tsx sets isSearchOpen = true
  ↓
SearchModal renders
  ↓
User types in search box
  ↓
Input calls onQueryChange()
  ↓
useSearch updates query state
  ↓
After 300ms delay...
  ↓
debouncedQuery updates
  ↓
useMemo recalculates filtered results
  ↓
SearchModal re-renders with results
```

### 3. Filter Flow

```
User selects filter (e.g., "TV")
  ↓
FilterDropdown calls onTypeChange("TV")
  ↓
page.tsx sets selectedType = "TV"
  ↓
useMemo recalculates filteredData
  ↓
Only TV anime shown
  ↓
itemsToShow resets to initial count
```

### 4. Load More Flow

```
User clicks "Load More Stories"
  ↓
handleLoadMore() runs
  ↓
setItemsToShow(current + 5)
  ↓
useMemo recalculates displayedData
  ↓
Shows 5 more anime cards
```

---

## State Management

State management is how we organize, store, and update data that changes over time in our application. Good state management makes your app predictable and easy to debug.

### What is State?

**State** is any data that:
- Changes over time
- Affects what users see
- Needs to persist during a session

```tsx
// Examples of state
const [isLoading, setIsLoading] = useState(true);    // UI state
const [animeData, setAnimeData] = useState([]);       // Server data
const [searchQuery, setSearchQuery] = useState('');   // User input
const [selectedType, setSelectedType] = useState('All'); // Filter selection
```

### Types of State in Our Application

| State Type | Description | Example | Where Managed |
|------------|-------------|---------|---------------|
| **Server State** | Data from API | Anime list | `useAnimeData` hook |
| **UI State** | Visual states | Loading, modal open | Component `useState` |
| **Form State** | User inputs | Search query | `useSearch` hook |
| **Derived State** | Calculated from other state | Filtered list | `useMemo` |

### Homepage State Architecture

Our homepage (`src/app/page.tsx`) manages these state variables:

```tsx
// 1. SERVER STATE - from useAnimeData hook
const { data, isLoading, error, refetch } = useAnimeData();

// 2. UI STATE - local component state
const [selectedType, setSelectedType] = useState('All');      // Filter selection
const [itemsToShow, setItemsToShow] = useState(10);           // Pagination
const [isSearchOpen, setIsSearchOpen] = useState(false);      // Modal visibility

// 3. SEARCH STATE - from useSearch hook
const { query, setQuery, results, clearSearch } = useSearch(data);

// 4. DERIVED STATE - calculated with useMemo
const filteredData = useMemo(() => {
  return filterAnimeByType(data, selectedType);
}, [data, selectedType]);

const displayedData = useMemo(() => {
  return filteredData.slice(1, itemsToShow + 1);
}, [filteredData, itemsToShow]);

const uniqueTypes = useMemo(() => getUniqueTypes(data), [data]);
```

### State Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         HOMEPAGE                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────┐     ┌──────────────────┐                  │
│  │  useAnimeData()  │     │   useSearch()    │                  │
│  │  ──────────────  │     │  ──────────────  │                  │
│  │  data           ─┼─────┼→ input data      │                  │
│  │  isLoading       │     │  query           │                  │
│  │  error           │     │  results         │                  │
│  │  refetch()       │     │  clearSearch()   │                  │
│  └──────────────────┘     └──────────────────┘                  │
│           │                        │                             │
│           ▼                        ▼                             │
│  ┌─────────────────────────────────────────────────┐            │
│  │              LOCAL STATE (useState)              │            │
│  │  ─────────────────────────────────────────────  │            │
│  │  selectedType   →  Filter dropdown selection    │            │
│  │  itemsToShow    →  Pagination count             │            │
│  │  isSearchOpen   →  Modal visibility             │            │
│  └─────────────────────────────────────────────────┘            │
│           │                                                      │
│           ▼                                                      │
│  ┌─────────────────────────────────────────────────┐            │
│  │            DERIVED STATE (useMemo)               │            │
│  │  ─────────────────────────────────────────────  │            │
│  │  filteredData   = filterByType(data, type)      │            │
│  │  displayedData  = filteredData.slice(0, count)  │            │
│  │  uniqueTypes    = getUniqueTypes(data)          │            │
│  └─────────────────────────────────────────────────┘            │
│           │                                                      │
│           ▼                                                      │
│  ┌─────────────────────────────────────────────────┐            │
│  │                   RENDER                         │            │
│  │  FeaturedArticle | FilterDropdown | AnimeCards  │            │
│  └─────────────────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────────────┘
```

### Custom Hooks for State Management

#### useAnimeData Hook

Encapsulates all server state logic:

```tsx
// src/hooks/useAnimeData.ts
export function useAnimeData() {
  const [data, setData] = useState<AnimeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (retryCount = 0) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/anime');
      const result = await response.json();
      setData(result);
      setIsLoading(false);  // Only set false on success
    } catch (err) {
      if (retryCount < 2) {
        // Retry with exponential backoff
        setTimeout(() => fetchData(retryCount + 1), 1000 * (retryCount + 1));
        // Note: isLoading stays TRUE during retries
      } else {
        setError(err);
        setIsLoading(false);  // Only set false after all retries fail
      }
    }
  };

  useEffect(() => { fetchData(); }, []);

  return { data, isLoading, error, refetch: fetchData };
}
```

**Key Design Decisions:**
- Loading stays `true` during retries (no UI flicker)
- Automatic retry with exponential backoff (1s, 2s delays)
- Manual `refetch()` for user-triggered reload

#### useSearch Hook

Encapsulates search state with debouncing:

```tsx
// src/hooks/useSearch.ts
export function useSearch(data: AnimeItem[], debounceMs = 300) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce: wait for user to stop typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  // Filter results using debounced query
  const results = useMemo(() => {
    return searchAnimeByName(data, debouncedQuery);
  }, [data, debouncedQuery]);

  return {
    query,           // Current input value (immediate)
    setQuery,        // Update function
    results,         // Filtered results (debounced)
    clearSearch: () => { setQuery(''); setDebouncedQuery(''); },
    isSearching: query.length > 0
  };
}
```

**Why Two Query States?**
```
User types: "n" → "na" → "nar" → "naru" → "narut" → "naruto"

query:      "n"   "na"   "nar"   "naru"   "narut"   "naruto"  (immediate)
                                                        ↓ 300ms delay
debouncedQuery:                                      "naruto"  (triggers search)
```

Without debouncing, search would run 6 times. With debouncing, it runs once.

### State Update Patterns

#### 1. Filter Change

```tsx
// When user selects a new type filter
const handleTypeChange = (type: string) => {
  setSelectedType(type);           // Update filter
  setItemsToShow(INITIAL_ITEMS);   // Reset pagination
  // filteredData automatically recalculates via useMemo
};
```

#### 2. Load More

```tsx
// When user clicks "Load More"
const handleLoadMore = () => {
  setItemsToShow(prev => prev + LOAD_MORE_COUNT);
  // displayedData automatically includes more items via useMemo
};
```

#### 3. Search Open/Close

```tsx
// Open search modal
const handleSearchOpen = () => setIsSearchOpen(true);

// Close search modal (with cleanup)
const handleSearchClose = () => {
  setIsSearchOpen(false);
  clearSearch();  // Reset search query
};
```

### Why useMemo for Derived State?

```tsx
// WITHOUT useMemo - recalculates on EVERY render
const filteredData = filterAnimeByType(data, selectedType);

// WITH useMemo - only recalculates when dependencies change
const filteredData = useMemo(() => {
  return filterAnimeByType(data, selectedType);
}, [data, selectedType]);
```

**When useMemo runs:**
| Event | `data` changes? | `selectedType` changes? | useMemo recalculates? |
|-------|-----------------|------------------------|----------------------|
| Initial load | Yes | No | Yes |
| Filter change | No | Yes | Yes |
| Load more | No | No | No |
| Modal open | No | No | No |

### State Management Best Practices

#### 1. Keep State Close to Where It's Used

```tsx
// ❌ BAD - State in parent when only child needs it
function Parent() {
  const [inputValue, setInputValue] = useState('');
  return <Child value={inputValue} onChange={setInputValue} />;
}

// ✅ GOOD - State in the component that uses it
function Child() {
  const [inputValue, setInputValue] = useState('');
  return <input value={inputValue} onChange={e => setInputValue(e.target.value)} />;
}
```

#### 2. Lift State When Needed

```tsx
// State needed by Header AND SearchModal - lift to parent
function Page() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <Header onSearchClick={() => setIsSearchOpen(true)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
```

#### 3. Use Custom Hooks for Reusable Logic

```tsx
// Encapsulate complex state logic in hooks
function useAnimeData() { /* ... */ }
function useSearch(data) { /* ... */ }

// Components stay clean
function Page() {
  const { data, isLoading } = useAnimeData();
  const { query, results } = useSearch(data);
  // ...
}
```

#### 4. Derive State Instead of Syncing

```tsx
// ❌ BAD - Syncing state (error-prone)
const [data, setData] = useState([]);
const [filteredData, setFilteredData] = useState([]);

useEffect(() => {
  setFilteredData(data.filter(/* ... */));
}, [data, selectedType]);

// ✅ GOOD - Derived state (always in sync)
const [data, setData] = useState([]);
const filteredData = useMemo(() => {
  return data.filter(/* ... */);
}, [data, selectedType]);
```

### Debugging State

Use React DevTools to inspect state:

1. Install React DevTools browser extension
2. Open DevTools → Components tab
3. Click on a component to see its state and props

```tsx
// Add console logs during development
useEffect(() => {
  console.log('State changed:', { data, selectedType, itemsToShow });
}, [data, selectedType, itemsToShow]);
```

---

## Common React Patterns in Our Project

### 1. Lifting State Up
When multiple components need the same state, move it to their common parent:

```tsx
function Parent() {
  const [isOpen, setIsOpen] = useState(false); // Shared state

  return (
    <>
      <Header onSearchClick={() => setIsOpen(true)} />
      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
```

### 2. Controlled Components
React controls the input value:

```tsx
const [query, setQuery] = useState('');

<input
  value={query} // React controls this
  onChange={(e) => setQuery(e.target.value)} // Update state on change
/>
```

### 3. Conditional Rendering

```tsx
{isLoading ? (
  <LoadingCard />
) : error ? (
  <ErrorMessage />
) : (
  <DataDisplay />
)}
```

### 4. List Rendering

```tsx
{animeList.map((anime) => (
  <AnimeCard key={anime.id} anime={anime} />
))}
```

**Always include `key` prop for lists!**

### 5. Props Drilling vs Custom Hooks

**Props Drilling (passing props through many layers):**
```tsx
<Parent data={data}>
  <Child data={data}>
    <GrandChild data={data} />
  </Child>
</Parent>
```

**Custom Hook (better solution):**
```tsx
// Any component can use the hook
function AnyComponent() {
  const { data } = useAnimeData();
}
```

---

## TypeScript Basics

### Why TypeScript?
TypeScript adds types to JavaScript, catching errors before runtime.

### Common Types in Our Project

```tsx
// Primitive types
const name: string = "Naruto";
const age: number = 16;
const isActive: boolean = true;

// Array type
const numbers: number[] = [1, 2, 3];
const names: string[] = ["Naruto", "Sasuke"];

// Object type (Interface)
interface AnimeItem {
  id: string;
  name: string;
  type: string;
  vintage: string;
}

// Using the interface
const anime: AnimeItem = {
  id: "123",
  name: "Naruto",
  type: "TV",
  vintage: "2002-10-03"
};

// Function type
function formatDate(date: string): string {
  return date;
}

// Component props type
interface CardProps {
  title: string;
  onClick: () => void; // Function that returns nothing
}
```

---

## Common Mistakes & How to Avoid Them

### 1. Forgetting to add dependencies to useEffect

```tsx
// ❌ BAD - Missing dependency
useEffect(() => {
  fetchData(userId);
}, []); // Should include userId

// ✅ GOOD
useEffect(() => {
  fetchData(userId);
}, [userId]); // Re-run when userId changes
```

### 2. Mutating state directly

```tsx
// ❌ BAD
const [items, setItems] = useState([1, 2, 3]);
items.push(4); // DON'T mutate directly

// ✅ GOOD
setItems([...items, 4]); // Create new array
```

### 3. Not using keys in lists

```tsx
// ❌ BAD
{items.map(item => <div>{item}</div>)}

// ✅ GOOD
{items.map(item => <div key={item.id}>{item}</div>)}
```

### 4. Using hooks conditionally

```tsx
// ❌ BAD
if (condition) {
  const [state, setState] = useState(0);
}

// ✅ GOOD
const [state, setState] = useState(0);
if (condition) {
  // use state here
}
```

---

## Quick Reference

### React Hooks Cheat Sheet

```tsx
// State
const [value, setValue] = useState(initialValue);

// Effect (side effects)
useEffect(() => {
  // code here
  return () => {
    // cleanup code
  };
}, [dependencies]);

// Memoization (performance)
const memoizedValue = useMemo(() => expensiveCalculation(), [deps]);

// Ref (DOM access)
const ref = useRef(initialValue);

// Callback (performance)
const memoizedCallback = useCallback(() => {
  // function code
}, [deps]);
```

### Next.js Cheat Sheet

```tsx
// Navigation
import Link from 'next/link';
<Link href="/path">Link</Link>

// Images
import Image from 'next/image';
<Image src="/image.png" alt="Alt" width={500} height={300} />

// Metadata (SEO)
export const metadata = {
  title: 'Page Title',
  description: 'Page description'
};

// API Route
export async function GET(request) {
  return Response.json({ data: 'hello' });
}

// Redirect
import { redirect } from 'next/navigation';
redirect('/new-path');

// Not Found
import { notFound } from 'next/navigation';
notFound();
```

---

## Next Steps for Learning

### Practice Exercises

1. **Add a "favorite" feature**
   - Add a heart icon to anime cards
   - Store favorites in state
   - Filter to show only favorites

2. **Add sorting**
   - Sort by name (A-Z, Z-A)
   - Sort by date (newest, oldest)
   - Use a dropdown to select sort option

3. **Add pagination**
   - Replace "Load More" with page numbers
   - Add "Previous" and "Next" buttons

4. **Improve search**
   - Search by type AND name
   - Add search history

### Resources

**Official Docs:**
- React: https://react.dev
- Next.js: https://nextjs.org/docs
- TypeScript: https://www.typescriptlang.org/docs

**Interactive Tutorials:**
- React: https://react.dev/learn
- Next.js: https://nextjs.org/learn

---

## Summary

You've learned:
- ✅ React basics (components, props, state, effects)
- ✅ Next.js features (routing, server/client components, API routes)
- ✅ Custom hooks (useAnimeData, useSearch)
- ✅ Component patterns (controlled components, conditional rendering)
- ✅ TypeScript basics
- ✅ Data flow in our application

**Remember:** The best way to learn is by building! Try modifying the project, breaking things, and fixing them. That's how you truly understand React and Next.js.
