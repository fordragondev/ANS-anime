import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CategoryHubSection } from '@/features/home-v2/components/CategoryHubSection';
import { V2Category } from '@/features/home-v2/types';

// Mock next/image
jest.mock('next/image', () => {
    const MockImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className={className} data-testid="category-image" />
    );
    MockImage.displayName = 'MockImage';
    return MockImage;
});

const createMockCategory = (overrides: Partial<V2Category> = {}): V2Category => ({
    id: 1,
    title: 'TV Series',
    heroImage: 'https://example.com/tv.jpg',
    mainStory: 'New TV anime announced for Spring 2024',
    substories: ['Story A', 'Story B', 'Story C'],
    ...overrides,
});

describe('CategoryHubSection', () => {
    it('renders the "Category Hub" heading', () => {
        render(<CategoryHubSection categories={[createMockCategory()]} />);
        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Category Hub');
    });

    it('renders a card for each category', () => {
        const categories = [
            createMockCategory({ id: 1, title: 'TV Series' }),
            createMockCategory({ id: 2, title: 'Movies' }),
            createMockCategory({ id: 3, title: 'OVA' }),
        ];
        render(<CategoryHubSection categories={categories} />);

        // Each category renders an article-like card with its title
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
        // Section heading should still render
        expect(screen.getByText('Category Hub')).toBeInTheDocument();
        // But no category items
        expect(container.querySelectorAll('img')).toHaveLength(0);
    });
});
