import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FollowUsSection } from '@/features/home-v2/components/TopPicksSection';

describe('FollowUsSection', () => {
    it('renders the "Follow Us" heading', () => {
        render(<FollowUsSection />);
        expect(screen.getByText('Follow Us')).toBeInTheDocument();
    });

    it('renders all 4 social media links', () => {
        render(<FollowUsSection />);
        const links = screen.getAllByRole('link');
        expect(links).toHaveLength(4);
    });

    it('renders social platform labels', () => {
        render(<FollowUsSection />);
        expect(screen.getByText('X')).toBeInTheDocument();
        expect(screen.getByText('Discord')).toBeInTheDocument();
        expect(screen.getByText('Insta')).toBeInTheDocument();
        expect(screen.getByText('YT')).toBeInTheDocument();
    });

    it('has SVG icons for each platform', () => {
        const { container } = render(<FollowUsSection />);
        const svgs = container.querySelectorAll('svg');
        expect(svgs).toHaveLength(4);
    });
});
