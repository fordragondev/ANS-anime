import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HeroSection } from '@/features/home-v2/components/HeroSection';
import { V2Featured } from '@/features/home-v2/types';

// Mock next/image
jest.mock('next/image', () => {
    const MockImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className={className} data-testid="hero-image" />
    );
    MockImage.displayName = 'MockImage';
    return MockImage;
});

const createMockFeatured = (overrides: Partial<V2Featured> = {}): V2Featured => ({
    title: 'Attack on Titan Final Season',
    excerpt: 'The epic conclusion to the beloved anime series arrives this spring.',
    ago: 'Since 2023-04-01',
    comments: 42,
    image: 'https://example.com/aot-hero.jpg',
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

        it('renders the time ago text', () => {
            render(<HeroSection featured={createMockFeatured({ ago: '2 hours ago' })} />);
            expect(screen.getByText('2 hours ago')).toBeInTheDocument();
        });

        it('renders the comments count', () => {
            render(<HeroSection featured={createMockFeatured({ comments: 99 })} />);
            expect(screen.getByText('99 comments')).toBeInTheDocument();
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

        it('handles empty excerpt', () => {
            render(<HeroSection featured={createMockFeatured({ excerpt: '' })} />);
            expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Attack on Titan Final Season');
        });

        it('handles zero comments', () => {
            render(<HeroSection featured={createMockFeatured({ comments: 0 })} />);
            expect(screen.getByText('0 comments')).toBeInTheDocument();
        });
    });
});
