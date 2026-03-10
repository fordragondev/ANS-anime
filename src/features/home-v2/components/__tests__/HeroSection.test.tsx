import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HeroSection } from '../HeroSection';
import { AnimeDetailItem } from '@/types/anime';

// Mock next/image
jest.mock('next/image', () => {
    const MockImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className={className} data-testid="hero-image" />
    );
    MockImage.displayName = 'MockImage';
    return MockImage;
});

const createMockFeatured = (overrides: Partial<AnimeDetailItem> = {}): AnimeDetailItem => ({
    id: '1',
    type: 'TV',
    name: 'Attack on Titan Final Season',
    vintage: '2023-04-01',
    description: 'The epic conclusion to the beloved anime series arrives this spring.',
    imageUrl: 'https://example.com/aot-hero.jpg',
    director: 'Test Director',
    rating: 8.5,
    voteCount: 42,
    genres: ['Action'],
    themes: ['Military'],
    ...overrides,
});

describe('HeroSection', () => {
    describe('Happy Paths', () => {
        it('renders the featured title', () => {
            render(<HeroSection featured={createMockFeatured()} />);
            expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Attack on Titan Final Season');
        });

        it('renders the excerpt text', () => {
            render(<HeroSection featured={createMockFeatured()} />);
            expect(screen.getByText(/epic conclusion to the beloved anime/)).toBeInTheDocument();
        });

        it('renders the vintage date', () => {
            render(<HeroSection featured={createMockFeatured({ vintage: '2024 Spring' })} />);
            expect(screen.getByText('2024 Spring')).toBeInTheDocument();
        });

        it('renders the votes count', () => {
            render(<HeroSection featured={createMockFeatured({ voteCount: 99 })} />);
            expect(screen.getByText('99 votes')).toBeInTheDocument();
        });

        it('renders the hero image with correct src', () => {
            render(<HeroSection featured={createMockFeatured()} />);
            const image = screen.getByTestId('hero-image');
            expect(image).toHaveAttribute('src', 'https://example.com/aot-hero.jpg');
        });

        it('renders the "Featured Story" badge', () => {
            render(<HeroSection featured={createMockFeatured()} />);
            expect(screen.getByText('Featured Story')).toBeInTheDocument();
        });
    });

    describe('Edge Cases', () => {
        it('returns null when featured is falsy', () => {
            // @ts-expect-error Testing null guard
            const { container } = render(<HeroSection featured={null} />);
            expect(container.innerHTML).toBe('');
        });

        it('handles empty description', () => {
            render(<HeroSection featured={createMockFeatured({ description: '' })} />);
            expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Attack on Titan Final Season');
        });

        it('handles zero votes', () => {
            render(<HeroSection featured={createMockFeatured({ voteCount: 0 })} />);
            expect(screen.getByText('0 votes')).toBeInTheDocument();
        });
    });
});
