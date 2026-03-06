import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TopStory from '@/features/home-v1/components/TopStory';
import { AnimeDetailItem } from '@/types/anime';

// Mock next/link
jest.mock('next/link', () => {
  const MockLink = ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

// Mock next/image - filter out Next.js specific props
jest.mock('next/image', () => {
  const MockImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} data-testid="anime-image" />
  );
  MockImage.displayName = 'MockImage';
  return MockImage;
});

// Mock SectionHeader
jest.mock('@/components/SectionHeader', () => {
  const MockSectionHeader = ({ title }: { title: string }) => (
    <div data-testid="section-header">{title}</div>
  );
  MockSectionHeader.displayName = 'MockSectionHeader';
  return MockSectionHeader;
});

const createMockAnime = (overrides: Partial<AnimeDetailItem> = {}): AnimeDetailItem => ({
  id: '12345',
  type: 'TV',
  name: 'Attack on Titan',
  vintage: '2023-04-01',
  description: 'A thrilling anime about humanity fighting against titans.',
  imageUrl: 'https://example.com/aot.jpg',
  director: 'Tetsuro Araki',
  rating: 9.2,
  voteCount: 15000,
  genres: ['Action', 'Drama', 'Fantasy'],
  themes: ['Military', 'Survival', 'Post-apocalyptic'],
  episodeCount: 25,
  ...overrides,
});

describe('TopStory', () => {
  describe('Happy Paths', () => {
    it('renders the anime name as heading', () => {
      const anime = createMockAnime();
      render(<TopStory anime={anime} />);

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Attack on Titan');
    });

    it('renders the default section title', () => {
      const anime = createMockAnime();
      render(<TopStory anime={anime} />);

      expect(screen.getByTestId('section-header')).toHaveTextContent('Anime Breaking News');
    });

    it('renders custom section title when provided', () => {
      const anime = createMockAnime();
      render(<TopStory anime={anime} title="Featured Anime" />);

      expect(screen.getByTestId('section-header')).toHaveTextContent('Featured Anime');
    });

    it('renders the anime image with correct src and alt', () => {
      const anime = createMockAnime();
      render(<TopStory anime={anime} />);

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', 'https://example.com/aot.jpg');
      expect(image).toHaveAttribute('alt', 'Attack on Titan');
    });

    it('renders the anime type badge', () => {
      const anime = createMockAnime({ type: 'Movie' });
      render(<TopStory anime={anime} />);

      expect(screen.getByText('Movie')).toBeInTheDocument();
    });

    it('renders the anime description', () => {
      const anime = createMockAnime();
      render(<TopStory anime={anime} />);

      expect(screen.getByText(/A thrilling anime about humanity/)).toBeInTheDocument();
    });

    it('renders formatted date from vintage', () => {
      const anime = createMockAnime({ vintage: '2023-04-15' });
      render(<TopStory anime={anime} />);

      // Date formatting may vary by timezone, so we check for the year and month
      expect(screen.getByText(/Apr.*2023/)).toBeInTheDocument();
    });

    it('renders director information when available', () => {
      const anime = createMockAnime({ director: 'Hayao Miyazaki' });
      render(<TopStory anime={anime} />);

      expect(screen.getByText('Dir: Hayao Miyazaki')).toBeInTheDocument();
    });

    it('renders rating when greater than zero', () => {
      const anime = createMockAnime({ rating: 8.5 });
      render(<TopStory anime={anime} />);

      expect(screen.getByText('★ 8.5')).toBeInTheDocument();
    });

    it('renders genres and themes tags', () => {
      const anime = createMockAnime({
        genres: ['Action', 'Comedy', 'Romance'],
        themes: ['School', 'Slice of Life', 'Music'],
      });
      render(<TopStory anime={anime} />);

      // Should show first 2 genres and first 2 themes
      expect(screen.getByText('Action')).toBeInTheDocument();
      expect(screen.getByText('Comedy')).toBeInTheDocument();
      expect(screen.getByText('School')).toBeInTheDocument();
      expect(screen.getByText('Slice of Life')).toBeInTheDocument();

      // Third items should not be rendered
      expect(screen.queryByText('Romance')).not.toBeInTheDocument();
      expect(screen.queryByText('Music')).not.toBeInTheDocument();
    });

    it('links to the correct anime detail page', () => {
      const anime = createMockAnime({ id: '99999' });
      render(<TopStory anime={anime} />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/anime/99999');
    });
  });

  describe('Edge Cases', () => {
    it('does not render director when not provided', () => {
      const anime = createMockAnime({ director: '' });
      render(<TopStory anime={anime} />);

      expect(screen.queryByText(/Dir:/)).not.toBeInTheDocument();
    });

    it('does not render rating when zero', () => {
      const anime = createMockAnime({ rating: 0 });
      render(<TopStory anime={anime} />);

      expect(screen.queryByText(/★/)).not.toBeInTheDocument();
    });

    it('does not render rating when negative', () => {
      const anime = createMockAnime({ rating: -1 });
      render(<TopStory anime={anime} />);

      expect(screen.queryByText(/★/)).not.toBeInTheDocument();
    });

    it('does not render genres/themes section when both arrays are empty', () => {
      const anime = createMockAnime({ genres: [], themes: [] });
      render(<TopStory anime={anime} />);

      // The genres/themes container should not exist
      const tags = screen.queryAllByText(/Action|Drama|Military|Survival/);
      expect(tags).toHaveLength(0);
    });

    it('renders only genres when themes array is empty', () => {
      const anime = createMockAnime({
        genres: ['Action', 'Drama'],
        themes: []
      });
      render(<TopStory anime={anime} />);

      expect(screen.getByText('Action')).toBeInTheDocument();
      expect(screen.getByText('Drama')).toBeInTheDocument();
    });

    it('renders only themes when genres array is empty', () => {
      const anime = createMockAnime({
        genres: [],
        themes: ['Military', 'Survival']
      });
      render(<TopStory anime={anime} />);

      expect(screen.getByText('Military')).toBeInTheDocument();
      expect(screen.getByText('Survival')).toBeInTheDocument();
    });

    it('uses placeholder image when imageUrl is empty', () => {
      const anime = createMockAnime({ imageUrl: '' });
      render(<TopStory anime={anime} />);

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', '/placeholder-anime.svg');
    });

    it('handles vintage with valid ISO date', () => {
      const anime = createMockAnime({ vintage: '2022-12-25' });
      render(<TopStory anime={anime} />);

      // Should format to a readable date
      expect(screen.getByText(/Dec.*2022/)).toBeInTheDocument();
    });

    it('shows "Date TBA" when vintage is empty', () => {
      const anime = createMockAnime({ vintage: '' });
      render(<TopStory anime={anime} />);

      expect(screen.getByText('Date TBA')).toBeInTheDocument();
    });

    it('handles single genre correctly', () => {
      const anime = createMockAnime({ genres: ['Action'], themes: [] });
      render(<TopStory anime={anime} />);

      expect(screen.getByText('Action')).toBeInTheDocument();
    });

    it('handles single theme correctly', () => {
      const anime = createMockAnime({ genres: [], themes: ['Military'] });
      render(<TopStory anime={anime} />);

      expect(screen.getByText('Military')).toBeInTheDocument();
    });

    it('formats rating to one decimal place', () => {
      const anime = createMockAnime({ rating: 7.856 });
      render(<TopStory anime={anime} />);

      expect(screen.getByText('★ 7.9')).toBeInTheDocument();
    });

    it('handles very long anime name', () => {
      const longName = 'This Is An Extremely Long Anime Name That Goes On And On And Should Still Render Properly';
      const anime = createMockAnime({ name: longName });
      render(<TopStory anime={anime} />);

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(longName);
    });

    it('handles very long description', () => {
      const longDescription = 'A'.repeat(500);
      const anime = createMockAnime({ description: longDescription });
      render(<TopStory anime={anime} />);

      expect(screen.getByText(longDescription)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has accessible link with focus styles', () => {
      const anime = createMockAnime();
      render(<TopStory anime={anime} />);

      const link = screen.getByRole('link');
      expect(link).toHaveClass('focus-visible:ring-2');
    });

    it('renders article element for semantic structure', () => {
      const anime = createMockAnime();
      render(<TopStory anime={anime} />);

      expect(screen.getByRole('article')).toBeInTheDocument();
    });

    it('image has descriptive alt text', () => {
      const anime = createMockAnime({ name: 'My Hero Academia' });
      render(<TopStory anime={anime} />);

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt', 'My Hero Academia');
    });
  });

  describe('Different Anime Types', () => {
    const animeTypes = ['TV', 'Movie', 'ONA', 'OVA', 'Special'];

    animeTypes.forEach((type) => {
      it(`renders ${type} type badge correctly`, () => {
        const anime = createMockAnime({ type });
        render(<TopStory anime={anime} />);

        expect(screen.getByText(type)).toBeInTheDocument();
      });
    });
  });
});
