import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CategoryHubSection } from '@/features/home-v2/components/CategoryHubSection';
import { AnimeDetailItem, SectionData } from '@/types/anime';

// Mock next/image
jest.mock('next/image', () => {
    const MockImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className={className} data-testid="category-image" />
    );
    MockImage.displayName = 'MockImage';
    return MockImage;
});

const createMockDetailItem = (overrides: Partial<AnimeDetailItem> = {}): AnimeDetailItem => ({
    id: '1',
    type: 'TV',
    name: 'Test Anime',
    vintage: '2024',
    description: 'Test description',
    imageUrl: 'https://example.com/tv.jpg',
    director: 'Test Director',
    rating: 8.0,
    voteCount: 100,
    genres: ['Action'],
    themes: ['Adventure'],
    ...overrides,
});

type CategoryEntry = { key: string; data: SectionData["categories"][string] };

const createMockCategory = (overrides: Partial<{ key: string; mainStory: string; substories: string[] }> = {}): CategoryEntry => ({
    key: overrides.key ?? 'TV Series',
    data: {
        featured: createMockDetailItem({ name: overrides.mainStory ?? 'New TV anime announced for Spring 2024' }),
        links: (overrides.substories ?? ['Story A', 'Story B', 'Story C']).map((name, i) =>
            createMockDetailItem({ id: String(i + 10), name })
        ),
    },
});

describe('CategoryHubSection', () => {
    it('renders the "Category Hub" heading', () => {
        render(<CategoryHubSection categories={[createMockCategory()]} />);
        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Category Hub');
    });

    it('renders a card for each category', () => {
        const categories = [
            createMockCategory({ key: 'TV Series' }),
            createMockCategory({ key: 'Movies' }),
            createMockCategory({ key: 'OVA' }),
        ];
        render(<CategoryHubSection categories={categories} />);

        expect(screen.getByText('TV Series')).toBeInTheDocument();
        expect(screen.getByText('Movies')).toBeInTheDocument();
        expect(screen.getByText('OVA')).toBeInTheDocument();
    });

    it('renders substories within a category', () => {
        const categories = [
            createMockCategory({
                substories: ['Sub A', 'Sub B'],
            }),
        ];
        render(<CategoryHubSection categories={categories} />);

        expect(screen.getByText('Sub A')).toBeInTheDocument();
        expect(screen.getByText('Sub B')).toBeInTheDocument();
    });

    it('renders main story title', () => {
        render(<CategoryHubSection categories={[createMockCategory({ mainStory: 'Big Announcement' })]} />);
        expect(screen.getByText('Big Announcement')).toBeInTheDocument();
    });

    it('renders empty grid when categories array is empty', () => {
        const { container } = render(<CategoryHubSection categories={[]} />);
        expect(screen.getByText('Category Hub')).toBeInTheDocument();
        expect(container.querySelectorAll('img')).toHaveLength(0);
    });
});
