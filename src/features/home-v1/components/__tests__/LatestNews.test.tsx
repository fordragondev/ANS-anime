import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LatestNews from '@/features/home-v1/components/LatestNews';
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

// Mock lucide-react
jest.mock('lucide-react', () => ({
  Settings: function MockSettings({ className }: { className?: string }) {
    return <span data-testid="settings-icon" className={className}>⚙️</span>;
  },
  Bookmark: function MockBookmark({ className }: { className?: string }) {
    return <span data-testid="bookmark-icon" className={className}>🔖</span>;
  },
}));

// Mock FilterDropdown
jest.mock('@/components/FilterDropdown', () => {
  const MockFilterDropdown = ({ types, selectedType, onTypeChange }: { types: string[]; selectedType: string; onTypeChange: (type: string) => void }) => (
    <select
      data-testid="filter-dropdown"
      value={selectedType}
      onChange={(e) => onTypeChange(e.target.value)}
    >
      {types.map((type) => (
        <option key={type} value={type}>{type}</option>
      ))}
    </select>
  );
  MockFilterDropdown.displayName = 'MockFilterDropdown';
  return MockFilterDropdown;
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

const defaultProps = {
  items: [createMockAnime()],
  onLoadMore: jest.fn(),
  hasMore: true,
  isLoading: false,
  types: ['All', 'TV', 'Movie', 'ONA'],
  selectedType: 'All',
  onTypeChange: jest.fn(),
};

describe('LatestNews', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Happy Paths', () => {
    it('renders section header', () => {
      render(<LatestNews {...defaultProps} />);

      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Latest News & Features');
    });

    it('renders all anime items', () => {
      const items = [
        createMockAnime({ id: '1', name: 'Anime One' }),
        createMockAnime({ id: '2', name: 'Anime Two' }),
        createMockAnime({ id: '3', name: 'Anime Three' }),
      ];
      render(<LatestNews {...defaultProps} items={items} />);

      expect(screen.getByText('Anime One')).toBeInTheDocument();
      expect(screen.getByText('Anime Two')).toBeInTheDocument();
      expect(screen.getByText('Anime Three')).toBeInTheDocument();
    });

    it('renders anime images', () => {
      const items = [createMockAnime({ name: 'My Hero Academia', imageUrl: 'https://example.com/mha.jpg' })];
      render(<LatestNews {...defaultProps} items={items} />);

      const image = screen.getByTestId('anime-image');
      expect(image).toHaveAttribute('src', 'https://example.com/mha.jpg');
      expect(image).toHaveAttribute('alt', 'My Hero Academia');
    });

    it('renders type badge', () => {
      const items = [createMockAnime({ type: 'Special' })];
      render(<LatestNews {...defaultProps} items={items} />);

      // Use getAllByText since 'Special' might not be in dropdown options
      const badges = screen.getAllByText('Special');
      expect(badges.length).toBeGreaterThanOrEqual(1);
    });

    it('renders director name', () => {
      const items = [createMockAnime({ director: 'Hayao Miyazaki' })];
      render(<LatestNews {...defaultProps} items={items} />);

      expect(screen.getByText('Hayao Miyazaki')).toBeInTheDocument();
    });

    it('renders formatted date', () => {
      const items = [createMockAnime({ vintage: '2022-12-25' })];
      render(<LatestNews {...defaultProps} items={items} />);

      expect(screen.getByText(/Dec.*2022/)).toBeInTheDocument();
    });

    it('renders description', () => {
      const items = [createMockAnime({ description: 'An epic adventure story.' })];
      render(<LatestNews {...defaultProps} items={items} />);

      expect(screen.getByText('An epic adventure story.')).toBeInTheDocument();
    });

    it('renders rating when greater than zero', () => {
      const items = [createMockAnime({ rating: 8.5, voteCount: 1000 })];
      render(<LatestNews {...defaultProps} items={items} />);

      expect(screen.getByText('★')).toBeInTheDocument();
      expect(screen.getByText('8.5 (1000 votes)')).toBeInTheDocument();
    });

    it('renders Save button with bookmark icon', () => {
      render(<LatestNews {...defaultProps} />);

      expect(screen.getByTestId('bookmark-icon')).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
    });

    it('renders filter dropdown', () => {
      render(<LatestNews {...defaultProps} />);

      expect(screen.getByTestId('filter-dropdown')).toBeInTheDocument();
    });

    it('renders Customize button', () => {
      render(<LatestNews {...defaultProps} />);

      expect(screen.getByTestId('settings-icon')).toBeInTheDocument();
      expect(screen.getByText('Customize')).toBeInTheDocument();
    });

    it('links to correct anime detail pages', () => {
      const items = [createMockAnime({ id: '999' })];
      render(<LatestNews {...defaultProps} items={items} />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/anime/999');
    });
  });

  describe('Load More Button', () => {
    it('renders Load More button when hasMore is true', () => {
      render(<LatestNews {...defaultProps} hasMore={true} />);

      expect(screen.getByRole('button', { name: 'Load More Stories' })).toBeInTheDocument();
    });

    it('does not render Load More button when hasMore is false', () => {
      render(<LatestNews {...defaultProps} hasMore={false} />);

      expect(screen.queryByRole('button', { name: 'Load More Stories' })).not.toBeInTheDocument();
    });

    it('calls onLoadMore when button is clicked', () => {
      const onLoadMore = jest.fn();
      render(<LatestNews {...defaultProps} onLoadMore={onLoadMore} />);

      fireEvent.click(screen.getByRole('button', { name: 'Load More Stories' }));

      expect(onLoadMore).toHaveBeenCalledTimes(1);
    });

    it('shows "Loading..." when isLoading is true', () => {
      render(<LatestNews {...defaultProps} isLoading={true} />);

      expect(screen.getByRole('button', { name: 'Loading...' })).toBeInTheDocument();
    });

    it('disables button when isLoading is true', () => {
      render(<LatestNews {...defaultProps} isLoading={true} />);

      const button = screen.getByRole('button', { name: 'Loading...' });
      expect(button).toBeDisabled();
    });

    it('has focus styles on Load More button', () => {
      render(<LatestNews {...defaultProps} />);

      const button = screen.getByRole('button', { name: 'Load More Stories' });
      expect(button).toHaveClass('focus-visible:ring-2');
    });
  });

  describe('Filter Dropdown', () => {
    it('calls onTypeChange when filter is changed', () => {
      const onTypeChange = jest.fn();
      render(<LatestNews {...defaultProps} onTypeChange={onTypeChange} />);

      fireEvent.change(screen.getByTestId('filter-dropdown'), { target: { value: 'Movie' } });

      expect(onTypeChange).toHaveBeenCalledWith('Movie');
    });

    it('displays selected type in dropdown', () => {
      render(<LatestNews {...defaultProps} selectedType="TV" />);

      const dropdown = screen.getByTestId('filter-dropdown') as HTMLSelectElement;
      expect(dropdown.value).toBe('TV');
    });
  });

  describe('Edge Cases', () => {
    it('shows empty state message when items is empty', () => {
      render(<LatestNews {...defaultProps} items={[]} />);

      expect(screen.getByText('No anime found matching your filter.')).toBeInTheDocument();
    });

    it('shows "Anime News Staff" when director is empty', () => {
      const items = [createMockAnime({ director: '' })];
      render(<LatestNews {...defaultProps} items={items} />);

      expect(screen.getByText('Anime News Staff')).toBeInTheDocument();
    });

    it('does not render rating when rating is zero', () => {
      const items = [createMockAnime({ rating: 0 })];
      render(<LatestNews {...defaultProps} items={items} />);

      expect(screen.queryByText('★')).not.toBeInTheDocument();
    });

    it('does not render rating when rating is negative', () => {
      const items = [createMockAnime({ rating: -1 })];
      render(<LatestNews {...defaultProps} items={items} />);

      expect(screen.queryByText('★')).not.toBeInTheDocument();
    });

    it('uses placeholder image when imageUrl is empty', () => {
      const items = [createMockAnime({ imageUrl: '' })];
      render(<LatestNews {...defaultProps} items={items} />);

      const image = screen.getByTestId('anime-image');
      expect(image).toHaveAttribute('src', '/placeholder-anime.svg');
    });

    it('shows "Date TBA" when vintage is empty', () => {
      const items = [createMockAnime({ vintage: '' })];
      render(<LatestNews {...defaultProps} items={items} />);

      expect(screen.getByText('Date TBA')).toBeInTheDocument();
    });

    it('handles very long description with line clamp', () => {
      const longDescription = 'A'.repeat(500);
      const items = [createMockAnime({ description: longDescription })];
      render(<LatestNews {...defaultProps} items={items} />);

      const description = screen.getByText(longDescription);
      expect(description).toHaveClass('line-clamp-2');
    });
  });

  describe('Save Button Behavior', () => {
    it('Save button is rendered and clickable', () => {
      const items = [createMockAnime()];
      render(<LatestNews {...defaultProps} items={items} />);

      const saveButton = screen.getByText('Save');
      expect(saveButton).toBeInTheDocument();

      // Click should not throw
      fireEvent.click(saveButton);
    });
  });

  describe('Accessibility', () => {
    it('has accessible links with focus styles', () => {
      render(<LatestNews {...defaultProps} />);

      const link = screen.getByRole('link');
      expect(link).toHaveClass('focus-visible:ring-2');
    });

    it('uses semantic article elements', () => {
      const items = [createMockAnime(), createMockAnime({ id: '2' })];
      render(<LatestNews {...defaultProps} items={items} />);

      expect(screen.getAllByRole('article')).toHaveLength(2);
    });

    it('uses semantic heading for section title', () => {
      render(<LatestNews {...defaultProps} />);

      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Latest News & Features');
    });

    it('uses semantic heading for anime names', () => {
      render(<LatestNews {...defaultProps} />);

      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    });
  });

  describe('Visual Structure', () => {
    it('has dark mode styles on container', () => {
      const { container } = render(<LatestNews {...defaultProps} />);

      const mainContainer = container.firstChild;
      expect(mainContainer).toHaveClass('dark:bg-gray-800');
    });

    it('has hover scale effect on images', () => {
      render(<LatestNews {...defaultProps} />);

      const image = screen.getByTestId('anime-image');
      expect(image).toHaveClass('group-hover:scale-105');
    });
  });
});
