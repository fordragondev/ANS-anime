import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CategorySection from '@/features/home-v1/components/CategorySection';
import { AnimeDetailItem } from '@/types/anime';

// Mock next/link
jest.mock('next/link', () => {
  const MockLink = ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

// Mock next/image
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
  const MockSectionHeader = ({ title, linkHref }: { title: string; linkHref?: string }) => (
    <div data-testid="section-header">
      <span data-testid="header-title">{title}</span>
      {linkHref && <a href={linkHref} data-testid="header-link">»</a>}
    </div>
  );
  MockSectionHeader.displayName = 'MockSectionHeader';
  return MockSectionHeader;
});

const createMockAnime = (overrides: Partial<AnimeDetailItem> = {}): AnimeDetailItem => ({
  id: '12345',
  type: 'TV',
  name: 'Attack on Titan',
  vintage: '2023-04-15',
  description: 'A thrilling anime about humanity fighting against titans.',
  imageUrl: 'https://example.com/aot.jpg',
  director: 'Tetsuro Araki',
  rating: 9.2,
  voteCount: 15000,
  genres: ['Action', 'Drama'],
  themes: ['Military', 'Survival'],
  episodeCount: 25,
  ...overrides,
});

describe('CategorySection', () => {
  describe('Happy Paths', () => {
    it('renders section header with title', () => {
      const featured = createMockAnime();
      render(<CategorySection title="Action" featured={featured} links={[]} />);

      expect(screen.getByTestId('header-title')).toHaveTextContent('Action');
    });

    it('renders section header with category link', () => {
      const featured = createMockAnime();
      render(<CategorySection title="Drama" featured={featured} links={[]} />);

      const link = screen.getByTestId('header-link');
      expect(link).toHaveAttribute('href', '/category/drama');
    });

    it('renders featured anime image', () => {
      const featured = createMockAnime({ name: 'Featured Anime', imageUrl: 'https://example.com/featured.jpg' });
      render(<CategorySection title="Action" featured={featured} links={[]} />);

      const image = screen.getByTestId('anime-image');
      expect(image).toHaveAttribute('src', 'https://example.com/featured.jpg');
      expect(image).toHaveAttribute('alt', 'Featured Anime');
    });

    it('renders featured anime name', () => {
      const featured = createMockAnime({ name: 'My Featured Anime' });
      render(<CategorySection title="Action" featured={featured} links={[]} />);

      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('My Featured Anime');
    });

    it('links featured anime to detail page', () => {
      const featured = createMockAnime({ id: '999' });
      render(<CategorySection title="Action" featured={featured} links={[]} />);

      const links = screen.getAllByRole('link');
      const featuredLink = links.find(link => link.getAttribute('href') === '/anime/999');
      expect(featuredLink).toBeInTheDocument();
    });

    it('renders links list', () => {
      const featured = createMockAnime();
      const links = [
        createMockAnime({ id: '1', name: 'Link One' }),
        createMockAnime({ id: '2', name: 'Link Two' }),
        createMockAnime({ id: '3', name: 'Link Three' }),
      ];
      render(<CategorySection title="Action" featured={featured} links={links} />);

      expect(screen.getByText('Link One')).toBeInTheDocument();
      expect(screen.getByText('Link Two')).toBeInTheDocument();
      expect(screen.getByText('Link Three')).toBeInTheDocument();
    });

    it('links list items to detail pages', () => {
      const featured = createMockAnime();
      const links = [
        createMockAnime({ id: '111', name: 'Link One' }),
        createMockAnime({ id: '222', name: 'Link Two' }),
      ];
      render(<CategorySection title="Action" featured={featured} links={links} />);

      expect(screen.getByText('Link One').closest('a')).toHaveAttribute('href', '/anime/111');
      expect(screen.getByText('Link Two').closest('a')).toHaveAttribute('href', '/anime/222');
    });

    it('renders bullet points for links', () => {
      const featured = createMockAnime();
      const links = [createMockAnime({ id: '1' }), createMockAnime({ id: '2' })];
      render(<CategorySection title="Action" featured={featured} links={links} />);

      const bullets = screen.getAllByText('•');
      expect(bullets).toHaveLength(2);
    });

    it('renders links in unordered list', () => {
      const featured = createMockAnime();
      const links = [createMockAnime({ id: '1' })];
      render(<CategorySection title="Action" featured={featured} links={links} />);

      expect(screen.getByRole('list')).toBeInTheDocument();
      expect(screen.getAllByRole('listitem')).toHaveLength(1);
    });
  });

  describe('Edge Cases', () => {
    it('returns null when no featured and empty links', () => {
      const { container } = render(
        <CategorySection title="Action" featured={null as unknown as AnimeDetailItem} links={[]} />
      );

      expect(container.firstChild).toBeNull();
    });

    it('renders only links when featured is null/undefined', () => {
      const links = [createMockAnime({ id: '1', name: 'Link Only' })];
      render(
        <CategorySection title="Action" featured={null as unknown as AnimeDetailItem} links={links} />
      );

      expect(screen.getByText('Link Only')).toBeInTheDocument();
      expect(screen.queryByTestId('anime-image')).not.toBeInTheDocument();
    });

    it('renders only featured when links is empty', () => {
      const featured = createMockAnime({ name: 'Featured Only' });
      render(<CategorySection title="Action" featured={featured} links={[]} />);

      expect(screen.getByText('Featured Only')).toBeInTheDocument();
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

    it('uses placeholder image when featured imageUrl is empty', () => {
      const featured = createMockAnime({ imageUrl: '' });
      render(<CategorySection title="Action" featured={featured} links={[]} />);

      const image = screen.getByTestId('anime-image');
      expect(image).toHaveAttribute('src', '/placeholder-anime.svg');
    });

    it('handles title with spaces for category link', () => {
      const featured = createMockAnime();
      render(<CategorySection title="Slice of Life" featured={featured} links={[]} />);

      const link = screen.getByTestId('header-link');
      expect(link).toHaveAttribute('href', '/category/slice of life');
    });

    it('handles title with uppercase for category link', () => {
      const featured = createMockAnime();
      render(<CategorySection title="ACTION" featured={featured} links={[]} />);

      const link = screen.getByTestId('header-link');
      expect(link).toHaveAttribute('href', '/category/action');
    });

    it('handles very long anime names with line clamp', () => {
      const longName = 'This Is An Extremely Long Anime Name That Should Be Clamped After Two Lines';
      const featured = createMockAnime({ name: longName });
      render(<CategorySection title="Action" featured={featured} links={[]} />);

      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveClass('line-clamp-2');
    });

    it('handles very long link names with line clamp', () => {
      const longName = 'This Is A Very Long Link Name That Should Be Truncated';
      const featured = createMockAnime();
      const links = [createMockAnime({ id: '1', name: longName })];
      render(<CategorySection title="Action" featured={featured} links={links} />);

      const linkElement = screen.getByText(longName);
      expect(linkElement).toHaveClass('line-clamp-1');
    });

    it('handles many links', () => {
      const featured = createMockAnime();
      const links = Array.from({ length: 10 }, (_, i) =>
        createMockAnime({ id: String(i), name: `Link ${i}` })
      );
      render(<CategorySection title="Action" featured={featured} links={links} />);

      expect(screen.getAllByRole('listitem')).toHaveLength(10);
    });
  });

  describe('Accessibility', () => {
    it('has accessible featured link with focus styles', () => {
      const featured = createMockAnime();
      render(<CategorySection title="Action" featured={featured} links={[]} />);

      const links = screen.getAllByRole('link');
      const featuredLink = links.find(link => link.getAttribute('href')?.includes('/anime/'));
      expect(featuredLink).toHaveClass('focus-visible:ring-2');
    });

    it('featured image has descriptive alt text', () => {
      const featured = createMockAnime({ name: 'Demon Slayer' });
      render(<CategorySection title="Action" featured={featured} links={[]} />);

      const image = screen.getByTestId('anime-image');
      expect(image).toHaveAttribute('alt', 'Demon Slayer');
    });

    it('uses semantic article for featured anime', () => {
      const featured = createMockAnime();
      render(<CategorySection title="Action" featured={featured} links={[]} />);

      expect(screen.getByRole('article')).toBeInTheDocument();
    });

    it('uses semantic list for links', () => {
      const featured = createMockAnime();
      const links = [createMockAnime({ id: '1' })];
      render(<CategorySection title="Action" featured={featured} links={links} />);

      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('links have hover styles for visibility', () => {
      const featured = createMockAnime();
      const links = [createMockAnime({ id: '1', name: 'Test Link' })];
      render(<CategorySection title="Action" featured={featured} links={links} />);

      const linkElement = screen.getByText('Test Link');
      expect(linkElement).toHaveClass('hover:text-primary');
      expect(linkElement).toHaveClass('hover:underline');
    });
  });

  describe('Visual Structure', () => {
    it('has hover scale effect on featured image', () => {
      const featured = createMockAnime();
      render(<CategorySection title="Action" featured={featured} links={[]} />);

      const image = screen.getByTestId('anime-image');
      expect(image).toHaveClass('group-hover:scale-105');
    });

    it('has dark mode styles on links', () => {
      const featured = createMockAnime();
      const links = [createMockAnime({ id: '1', name: 'Test Link' })];
      render(<CategorySection title="Action" featured={featured} links={links} />);

      const linkElement = screen.getByText('Test Link');
      expect(linkElement).toHaveClass('dark:text-gray-300');
    });

    it('featured heading has dark mode styles', () => {
      const featured = createMockAnime();
      render(<CategorySection title="Action" featured={featured} links={[]} />);

      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveClass('dark:text-gray-100');
    });

    it('has category-section class on container', () => {
      const featured = createMockAnime();
      const { container } = render(<CategorySection title="Action" featured={featured} links={[]} />);

      expect(container.firstChild).toHaveClass('category-section');
    });
  });
});
