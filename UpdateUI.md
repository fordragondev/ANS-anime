# Anime News Website - feature UI Plan
Help mme to implement changes for UI update to the Anime news sections. Goal is to copy as close a posible the sections UI appearance of the news site call KTL

## Sections changes
Create classes with section names "top_story",  "top_picks", "queue_nm" and "sections". The following are the desire changes:

1. Change "FeaturedArticle" section to match "TOP_STORY" (Hero Section)

2. Chance "new section" to match "TOP_PICKS"

3. Change "Grid of AnimeCard" to match "QUEUE_MN" (Latest News)

4. Create an Additional Sections that match "Category sections"

---

# Sections Details of KTL a news site

## 1. TOP_STORY Section (Hero/Featured Article)

### Visual Characteristics:
- **Layout**: Full-width hero section
- **Position**: Top of the page, immediately after navigation
- **Background**: White/light gray

### Structure:
```html
<section class="top_story">
  <div class="container">
    <!-- Large Featured Image -->
    <div class="featured-image-wrapper">
      <img src="large-image.jpg" alt="Featured article" />
    </div>
    
    <!-- Headline Overlay (Dark overlay on right side) -->
    <div class="headline-overlay">
      <h1 class="headline">2 killed, 6 others injured in shooting at Salt Lake church parking lot</h1>
      <p class="description">
        Two people were killed and six were injured in a shooting in Salt Lake City on Wednesday 
        evening when a fight broke out in a church parking lot outside a funeral.
      </p>
    </div>
  </div>
</section>
```

### Key Features:
- **Image**: Large, high-quality photo (typically 1200x600px or larger)
- **Headline**: Large, bold text (typically 32-48px)
- **Description**: 2-3 sentence summary
- **Layout Pattern**: Image on left (60-70%), dark overlay with white text on right (30-40%)
- **Colors**: 
  - Background overlay: Dark gray/black (#2a2a2a or similar)
  - Text: White (#ffffff)
  - Accent: None or red underline

### CSS Patterns:
- Full-width container
- Flexbox or Grid layout
- Responsive: Stacks vertically on mobile
- Image uses object-fit: cover
- Overlay uses position: absolute or z-index layering

---

## 2. TOP_PICKS Section

### Visual Characteristics:
- **Layout**: 3-column grid on desktop
- **Position**: Directly below hero section
- **Background**: White

### Structure:
```html
<section class="top_picks">
  <div class="container">
    <!-- No section header visible -->
    
    <div class="picks-grid">
      <!-- Pick 1 -->
      <article class="pick-card">
        <a href="/article/123">
          <div class="image-wrapper">
            <img src="thumbnail.jpg" alt="Article title" />
          </div>
          <div class="card-content">
            <p class="byline">
              <span class="author">Curtis Booker, KSL</span>
              <span class="comment-count">1</span>
            </p>
            <h3 class="title">Draper boy's love of penguins leads to New Zealand adventure</h3>
          </div>
        </a>
      </article>
      
      <!-- Pick 2 -->
      <article class="pick-card">
        <!-- Same structure as Pick 1 -->
      </article>
      
      <!-- Pick 3 -->
      <article class="pick-card">
        <!-- Same structure as Pick 3 -->
      </article>
    </div>
  </div>
</section>
```

### Key Features:
- **Grid**: 3 columns on desktop (33.33% each), 1 column on mobile
- **Images**: Medium rectangles (approx 400x250px)
- **Headline**: Medium size (18-24px)
- **Byline**: Small text with author and comment count
- **Colors**:
  - Background: White
  - Text: Dark gray (#333333)
  - Byline: Medium gray (#666666)
  - Comment icon: Blue accent

### CSS Patterns:
- Display: grid or flex
- Grid-template-columns: repeat(3, 1fr)
- Gap: 20-30px
- Card has subtle hover effect
- Images maintain aspect ratio
- Responsive breakpoint at ~768px

---

## 3. QUEUE_MN Section (Latest News & Features)

### Visual Characteristics:
- **Layout**: Vertical list with alternating left/right images
- **Position**: Below top picks
- **Background**: Light gray (#f5f5f5)
- **Header**: "Latest News & Features" with "Customize" button

### Structure:
```html
<section class="queue_mn">
  <div class="container">
    <!-- Section Header -->
    <div class="section-header">
      <h2>Latest News & Features</h2>
      <button class="customize-btn">
        <span class="icon">⚙️</span> Customize
      </button>
    </div>
    
    <!-- Article List -->
    <div class="article-list">
      <!-- Article Item -->
      <article class="article-item">
        <a href="/article/123" class="article-link">
          <!-- Image (alternates left/right) -->
          <div class="article-image">
            <img src="thumbnail.jpg" alt="Article title" />
          </div>
          
          <!-- Content -->
          <div class="article-content">
            <h3 class="title">
              The right side of this 6-year-old's body is shrinking. 
              Her family is raising money to find out why.
            </h3>
            
            <div class="meta">
              <span class="author">Kaitlyn Hart, EastIdahoNews.com</span>
              <span class="separator">|</span>
              <span class="date">Posted Jan. 19 - 4:53 p.m.</span>
              <span class="separator">|</span>
              <button class="save-btn">Save Story</button>
            </div>
            
            <p class="description">
              Doctors in multiple states are searching for answers for a local 
              6-year-old girl, as the right side of her body appears to be shrinking.
            </p>
          </div>
        </a>
      </article>
      
      <!-- More articles... -->
    </div>
    
    <!-- Load More Button -->
    <button class="load-more">Load More Stories</button>
  </div>
</section>
```

### Key Features:
- **Layout**: Horizontal flex (image + content)
- **Images**: Thumbnail size (200x150px approximately)
- **Image Position**: Alternates left/right OR all on left side
- **Spacing**: Consistent padding between articles
- **Meta Information**: Author, timestamp, save button
- **Description**: 1-2 sentence excerpt
- **Load More**: Blue button at bottom

### CSS Patterns:
- Each article-item uses flexbox
- Image: flex-shrink: 0
- Content: flex: 1
- Borders: Top border or subtle divider
- Hover state on entire article
- "Save Story" button styled as link/button hybrid

---

## 4. ADDITIONAL SECTIONS (Simplified)


### Category Sections (Sports, Features, etc.)
```html
<section class="category-section">
  <div class="container">
    <div class="section-header">
      <h2>Sports <a href="/sports" class="view-more">»</a></h2>
    </div>
    
    <div class="section-grid">
      <!-- Top Story (larger) -->
      <article class="category-featured">
        <img src="featured.jpg" />
        <h3>Featured Article Title</h3>
      </article>
      
      <!-- List of Links -->
      <ul class="category-links">
        <li><a href="#">Article Link 1</a></li>
        <li><a href="#">Article Link 2</a></li>
        <li><a href="#">Article Link 3</a></li>
      </ul>
    </div>
  </div>
</section>
```


## Common Design Patterns Across All Sections

### Typography:
- **Headlines (H1)**: 36-48px, Bold, Dark color
- **Subheadings (H2)**: 28-32px, Bold
- **Article Titles (H3)**: 18-24px, Bold
- **Body Text**: 14-16px, Regular
- **Meta/Byline**: 12-14px, Medium gray

### Colors (KSL Color Scheme):
- **Primary Navy**: #003DA5 (or similar deep blue)
- **Text**: #1a1a1a or #333333
- **Gray**: #666666 (meta text)
- **Light Gray BG**: #f5f5f5
- **White**: #ffffff
- **Accent Red**: #d32f2f (for highlights)
- **Link Blue**: #0066cc

### Spacing:
- **Section Padding**: 40-60px vertical
- **Container Max-width**: 1200-1400px
- **Grid Gap**: 20-30px
- **Article Item Padding**: 20px vertical

### Responsive Breakpoints:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

### Common Components:
1. **Image Aspect Ratios**:
   - Hero: 16:9 or 21:9
   - Cards: 16:9 or 4:3
   - Thumbnails: 4:3 or 16:9

2. **Hover States**:
   - Subtle scale transform (scale: 1.02)
   - Box shadow increase
   - Color change on titles

3. **Buttons**:
   - Rounded corners (4-8px)
   - Padding: 12px 24px
   - Transition on hover

---

## Implementation Tips for React/Next.js:

1. **Component Structure**:
```typescript
components/
├── sections/
│   ├── HeroSection.tsx (top_story)
│   ├── TopPicksSection.tsx (top_picks)
│   ├── NewsQueueSection.tsx (queue_mn)
│   ├── CategorySection.tsx
│   └── NewsletterSection.tsx
├── cards/
│   ├── ArticleCard.tsx
│   ├── HeroCard.tsx
│   └── ThumbnailCard.tsx
└── ui/
    ├── Button.tsx
    └── Container.tsx
```

2. **Tailwind Classes Reference**:
```typescript
// Hero Section
"relative w-full h-[600px] bg-gray-100"

// Top Picks Grid
"grid grid-cols-1 md:grid-cols-3 gap-6"

// Queue Section
"flex flex-col gap-4 bg-gray-50 p-8"

// Article Item
"flex gap-4 border-t border-gray-200 pt-4"
```

3. **Data Structure**:
```typescript
interface Article {
  id: string;
  title: string;
  description: string;
  author: string;
  date: string;
  image: string;
  category: string;
  commentCount?: number;
  sponsored?: boolean;
}
```