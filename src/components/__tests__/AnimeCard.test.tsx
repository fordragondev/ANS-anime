import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AnimeCard from '@/components/AnimeCard';
import { AnimeItem } from '@/types/anime';

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

const createMockAnime = (overrides: Partial<AnimeItem> = {}): AnimeItem => ({
  id: '12345',
  type: 'TV',
  name: 'Attack on Titan',
  vintage: '2023-04-15',
  ...overrides,
});

describe('AnimeCard', () => {
  describe('Happy Paths', () => {
    it('renders the anime name', () => {
      const anime = createMockAnime();
      render(<AnimeCard anime={anime} />);

      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Attack on Titan');
    });

    it('renders the anime image with placeholder and alt text', () => {
      const anime = createMockAnime({ name: 'My Hero Academia' });
      render(<AnimeCard anime={anime} />);

      const image = screen.getByTestId('anime-image');
      expect(image).toHaveAttribute('src', '/placeholder-anime.svg');
      expect(image).toHaveAttribute('alt', 'My Hero Academia');
    });

    it('renders the anime type badge', () => {
      const anime = createMockAnime({ type: 'Movie' });
      render(<AnimeCard anime={anime} />);

      expect(screen.getByText('Movie')).toBeInTheDocument();
    });

    it('renders formatted vintage date', () => {
      const anime = createMockAnime({ vintage: '2022-12-25' });
      render(<AnimeCard anime={anime} />);

      expect(screen.getByText(/Dec.*2022/)).toBeInTheDocument();
    });

    it('links to the correct anime detail page', () => {
      const anime = createMockAnime({ id: '99999' });
      render(<AnimeCard anime={anime} />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/anime/99999');
    });

    it('renders article element for semantic structure', () => {
      const anime = createMockAnime();
      render(<AnimeCard anime={anime} />);

      expect(screen.getByRole('article')).toBeInTheDocument();
    });
  });

  describe('Type Badge Colors', () => {
    it('renders TV type with green background', () => {
      const anime = createMockAnime({ type: 'TV' });
      render(<AnimeCard anime={anime} />);

      const badge = screen.getByText('TV');
      expect(badge).toHaveClass('bg-green-600');
    });

    it('renders Movie type with purple background', () => {
      const anime = createMockAnime({ type: 'Movie' });
      render(<AnimeCard anime={anime} />);

      const badge = screen.getByText('Movie');
      expect(badge).toHaveClass('bg-purple-600');
    });

    it('renders ONA type with blue background', () => {
      const anime = createMockAnime({ type: 'ONA' });
      render(<AnimeCard anime={anime} />);

      const badge = screen.getByText('ONA');
      expect(badge).toHaveClass('bg-blue-600');
    });

    it('renders OVA type with orange background', () => {
      const anime = createMockAnime({ type: 'OVA' });
      render(<AnimeCard anime={anime} />);

      const badge = screen.getByText('OVA');
      expect(badge).toHaveClass('bg-orange-600');
    });

    it('renders Special type with pink background', () => {
      const anime = createMockAnime({ type: 'Special' });
      render(<AnimeCard anime={anime} />);

      const badge = screen.getByText('Special');
      expect(badge).toHaveClass('bg-pink-600');
    });

    it('renders unknown type with gray background fallback', () => {
      const anime = createMockAnime({ type: 'Unknown' });
      render(<AnimeCard anime={anime} />);

      const badge = screen.getByText('Unknown');
      expect(badge).toHaveClass('bg-gray-600');
    });
  });

  describe('Edge Cases', () => {
    it('shows "Date TBA" when vintage is empty', () => {
      const anime = createMockAnime({ vintage: '' });
      render(<AnimeCard anime={anime} />);

      expect(screen.getByText('Date TBA')).toBeInTheDocument();
    });

    it('handles very long anime name with line clamp', () => {
      const longName = 'This Is An Extremely Long Anime Name That Should Be Truncated After Two Lines Of Text';
      const anime = createMockAnime({ name: longName });
      render(<AnimeCard anime={anime} />);

      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveTextContent(longName);
      expect(heading).toHaveClass('line-clamp-2');
    });

    it('handles special characters in anime name', () => {
      const anime = createMockAnime({ name: 'Re:Zero − Starting Life in Another World' });
      render(<AnimeCard anime={anime} />);

      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Re:Zero − Starting Life in Another World');
    });

    it('handles numeric anime id', () => {
      const anime = createMockAnime({ id: '1' });
      render(<AnimeCard anime={anime} />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/anime/1');
    });

    it('handles empty type string with gray fallback', () => {
      const anime = createMockAnime({ type: '' });
      render(<AnimeCard anime={anime} />);

      const badge = screen.getByText('', { selector: 'span.bg-gray-600' });
      expect(badge).toHaveClass('bg-gray-600');
    });

    it('handles case-sensitive type matching', () => {
      // lowercase 'tv' should not match 'TV' and fall back to gray
      const anime = createMockAnime({ type: 'tv' });
      render(<AnimeCard anime={anime} />);

      const badge = screen.getByText('tv');
      expect(badge).toHaveClass('bg-gray-600');
    });
  });

  describe('Accessibility', () => {
    it('has accessible link with focus styles', () => {
      const anime = createMockAnime();
      render(<AnimeCard anime={anime} />);

      const link = screen.getByRole('link');
      expect(link).toHaveClass('focus-visible:ring-2');
      expect(link).toHaveClass('focus-visible:ring-blue-500');
    });

    it('image has descriptive alt text matching anime name', () => {
      const anime = createMockAnime({ name: 'Demon Slayer' });
      render(<AnimeCard anime={anime} />);

      const image = screen.getByTestId('anime-image');
      expect(image).toHaveAttribute('alt', 'Demon Slayer');
    });

    it('uses semantic heading for anime name', () => {
      const anime = createMockAnime();
      render(<AnimeCard anime={anime} />);

      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    });

    it('uses semantic article element', () => {
      const anime = createMockAnime();
      render(<AnimeCard anime={anime} />);

      expect(screen.getByRole('article')).toBeInTheDocument();
    });
  });

  describe('Visual Structure', () => {
    it('has hover styles on article', () => {
      const anime = createMockAnime();
      render(<AnimeCard anime={anime} />);

      const article = screen.getByRole('article');
      expect(article).toHaveClass('hover:shadow-xl');
      expect(article).toHaveClass('hover:border-primary/20');
    });

    it('has dark mode styles', () => {
      const anime = createMockAnime();
      render(<AnimeCard anime={anime} />);

      const article = screen.getByRole('article');
      expect(article).toHaveClass('dark:bg-gray-900');

      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveClass('dark:text-gray-100');
    });

    it('has aspect-video container for image', () => {
      const anime = createMockAnime();
      render(<AnimeCard anime={anime} />);

      const image = screen.getByTestId('anime-image');
      const imageContainer = image.parentElement;
      expect(imageContainer).toHaveClass('aspect-video');
    });
  });
});
