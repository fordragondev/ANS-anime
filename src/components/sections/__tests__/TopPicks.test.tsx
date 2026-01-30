import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TopPicks from '@/components/sections/TopPicks';
import { AnimeDetailItem } from '@/types/anime';

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  );
});

// Mock next/image
jest.mock('next/image', () => {
  return ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} data-testid="anime-image" />
  );
});

// Mock lucide-react
jest.mock('lucide-react', () => ({
  MessageCircle: ({ className }: { className?: string }) => (
    <span data-testid="message-icon" className={className}>💬</span>
  ),
}));

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

describe('TopPicks', () => {
  describe('Happy Paths', () => {
    it('renders all anime items in the grid', () => {
      const items = [
        createMockAnime({ id: '1', name: 'Anime One' }),
        createMockAnime({ id: '2', name: 'Anime Two' }),
        createMockAnime({ id: '3', name: 'Anime Three' }),
      ];
      render(<TopPicks items={items} />);

      expect(screen.getByText('Anime One')).toBeInTheDocument();
      expect(screen.getByText('Anime Two')).toBeInTheDocument();
      expect(screen.getByText('Anime Three')).toBeInTheDocument();
    });

    it('renders correct number of articles', () => {
      const items = [
        createMockAnime({ id: '1' }),
        createMockAnime({ id: '2' }),
        createMockAnime({ id: '3' }),
      ];
      render(<TopPicks items={items} />);

      expect(screen.getAllByRole('article')).toHaveLength(3);
    });

    it('renders anime images with correct src and alt', () => {
      const items = [
        createMockAnime({ id: '1', name: 'My Hero Academia', imageUrl: 'https://example.com/mha.jpg' }),
      ];
      render(<TopPicks items={items} />);

      const image = screen.getByTestId('anime-image');
      expect(image).toHaveAttribute('src', 'https://example.com/mha.jpg');
      expect(image).toHaveAttribute('alt', 'My Hero Academia');
    });

    it('renders type badge for each anime', () => {
      const items = [
        createMockAnime({ id: '1', type: 'Movie' }),
        createMockAnime({ id: '2', type: 'TV' }),
      ];
      render(<TopPicks items={items} />);

      expect(screen.getByText('Movie')).toBeInTheDocument();
      expect(screen.getByText('TV')).toBeInTheDocument();
    });

    it('renders director name when available', () => {
      const items = [createMockAnime({ director: 'Hayao Miyazaki' })];
      render(<TopPicks items={items} />);

      expect(screen.getByText('Hayao Miyazaki')).toBeInTheDocument();
    });

    it('renders vote count with message icon', () => {
      const items = [createMockAnime({ voteCount: 5000 })];
      render(<TopPicks items={items} />);

      expect(screen.getByTestId('message-icon')).toBeInTheDocument();
      expect(screen.getByText('5000')).toBeInTheDocument();
    });

    it('links to correct anime detail pages', () => {
      const items = [
        createMockAnime({ id: '111' }),
        createMockAnime({ id: '222' }),
      ];
      render(<TopPicks items={items} />);

      const links = screen.getAllByRole('link');
      expect(links[0]).toHaveAttribute('href', '/anime/111');
      expect(links[1]).toHaveAttribute('href', '/anime/222');
    });

    it('renders in 3-column grid layout', () => {
      const items = [createMockAnime()];
      const { container } = render(<TopPicks items={items} />);

      const grid = container.firstChild;
      expect(grid).toHaveClass('grid');
      expect(grid).toHaveClass('md:grid-cols-3');
    });
  });

  describe('Edge Cases', () => {
    it('returns null when items array is empty', () => {
      const { container } = render(<TopPicks items={[]} />);

      expect(container.firstChild).toBeNull();
    });

    it('shows "Anime News Staff" when director is empty', () => {
      const items = [createMockAnime({ director: '' })];
      render(<TopPicks items={items} />);

      expect(screen.getByText('Anime News Staff')).toBeInTheDocument();
    });

    it('shows 0 when voteCount is undefined', () => {
      const anime = createMockAnime();
      delete (anime as Partial<AnimeDetailItem>).voteCount;
      const items = [anime];
      render(<TopPicks items={items} />);

      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('handles single item', () => {
      const items = [createMockAnime({ id: '1', name: 'Solo Anime' })];
      render(<TopPicks items={items} />);

      expect(screen.getByText('Solo Anime')).toBeInTheDocument();
      expect(screen.getAllByRole('article')).toHaveLength(1);
    });

    it('handles many items', () => {
      const items = Array.from({ length: 10 }, (_, i) =>
        createMockAnime({ id: String(i), name: `Anime ${i}` })
      );
      render(<TopPicks items={items} />);

      expect(screen.getAllByRole('article')).toHaveLength(10);
    });

    it('uses placeholder image when imageUrl is empty', () => {
      const items = [createMockAnime({ imageUrl: '' })];
      render(<TopPicks items={items} />);

      const image = screen.getByTestId('anime-image');
      expect(image).toHaveAttribute('src', '/placeholder-anime.svg');
    });

    it('handles very long anime name with line clamp', () => {
      const longName = 'This Is An Extremely Long Anime Name That Should Be Clamped';
      const items = [createMockAnime({ name: longName })];
      render(<TopPicks items={items} />);

      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveTextContent(longName);
      expect(heading).toHaveClass('line-clamp-2');
    });
  });

  describe('Accessibility', () => {
    it('has accessible links with focus styles', () => {
      const items = [createMockAnime()];
      render(<TopPicks items={items} />);

      const link = screen.getByRole('link');
      expect(link).toHaveClass('focus-visible:ring-2');
    });

    it('uses semantic article elements', () => {
      const items = [createMockAnime(), createMockAnime({ id: '2' })];
      render(<TopPicks items={items} />);

      expect(screen.getAllByRole('article')).toHaveLength(2);
    });

    it('images have descriptive alt text', () => {
      const items = [createMockAnime({ name: 'Demon Slayer' })];
      render(<TopPicks items={items} />);

      const image = screen.getByTestId('anime-image');
      expect(image).toHaveAttribute('alt', 'Demon Slayer');
    });

    it('uses semantic heading for anime name', () => {
      const items = [createMockAnime()];
      render(<TopPicks items={items} />);

      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    });
  });

  describe('Visual Structure', () => {
    it('has hover scale effect on images', () => {
      const items = [createMockAnime()];
      render(<TopPicks items={items} />);

      const image = screen.getByTestId('anime-image');
      expect(image).toHaveClass('group-hover:scale-105');
    });

    it('has dark mode styles', () => {
      const items = [createMockAnime()];
      render(<TopPicks items={items} />);

      const article = screen.getByRole('article');
      expect(article).toHaveClass('dark:bg-gray-900');
    });
  });
});
