import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  TopStorySkeleton,
  TopPicksSkeleton,
  LatestNewsSkeleton,
  CategorySectionSkeleton,
} from '@/features/home-v1/components/LoadingSkeletons';

describe('LoadingSkeletons', () => {
  describe('TopStorySkeleton', () => {
    it('renders without crashing', () => {
      const { container } = render(<TopStorySkeleton />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('has pulse animation', () => {
      const { container } = render(<TopStorySkeleton />);
      expect(container.firstChild).toHaveClass('animate-pulse');
    });

    it('has correct layout structure', () => {
      const { container } = render(<TopStorySkeleton />);
      const skeleton = container.firstChild;

      expect(skeleton).toHaveClass('flex');
      expect(skeleton).toHaveClass('md:flex-row');
    });

    it('has minimum height', () => {
      const { container } = render(<TopStorySkeleton />);
      expect(container.firstChild).toHaveClass('min-h-[400px]');
      expect(container.firstChild).toHaveClass('md:min-h-[500px]');
    });

    it('has image placeholder section', () => {
      const { container } = render(<TopStorySkeleton />);
      const imagePlaceholder = container.querySelector('.md\\:w-\\[65\\%\\]');
      expect(imagePlaceholder).toBeInTheDocument();
      expect(imagePlaceholder).toHaveClass('bg-gray-300');
    });

    it('has content placeholder section', () => {
      const { container } = render(<TopStorySkeleton />);
      const contentPlaceholder = container.querySelector('.md\\:w-\\[35\\%\\]');
      expect(contentPlaceholder).toBeInTheDocument();
      expect(contentPlaceholder).toHaveClass('bg-[#2a2a2a]');
    });

    it('has dark mode styles', () => {
      const { container } = render(<TopStorySkeleton />);
      const imagePlaceholder = container.querySelector('.md\\:w-\\[65\\%\\]');
      expect(imagePlaceholder).toHaveClass('dark:bg-gray-700');
    });
  });

  describe('TopPicksSkeleton', () => {
    it('renders without crashing', () => {
      const { container } = render(<TopPicksSkeleton />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders exactly 3 skeleton cards', () => {
      const { container } = render(<TopPicksSkeleton />);
      const cards = container.querySelectorAll('.animate-pulse');
      expect(cards).toHaveLength(3);
    });

    it('has grid layout', () => {
      const { container } = render(<TopPicksSkeleton />);
      expect(container.firstChild).toHaveClass('grid');
      expect(container.firstChild).toHaveClass('md:grid-cols-3');
    });

    it('each card has pulse animation', () => {
      const { container } = render(<TopPicksSkeleton />);
      const cards = container.querySelectorAll('.animate-pulse');
      cards.forEach(card => {
        expect(card).toHaveClass('animate-pulse');
      });
    });

    it('each card has image placeholder with aspect ratio', () => {
      const { container } = render(<TopPicksSkeleton />);
      const imagePlaceholders = container.querySelectorAll('.aspect-\\[16\\/10\\]');
      expect(imagePlaceholders).toHaveLength(3);
    });

    it('each card has rounded corners', () => {
      const { container } = render(<TopPicksSkeleton />);
      const cards = container.querySelectorAll('.rounded-lg');
      expect(cards.length).toBeGreaterThanOrEqual(3);
    });

    it('has dark mode styles', () => {
      const { container } = render(<TopPicksSkeleton />);
      const darkElements = container.querySelectorAll('.dark\\:bg-gray-900');
      expect(darkElements.length).toBeGreaterThan(0);
    });
  });

  describe('LatestNewsSkeleton', () => {
    it('renders without crashing', () => {
      const { container } = render(<LatestNewsSkeleton />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('has pulse animation on container', () => {
      const { container } = render(<LatestNewsSkeleton />);
      expect(container.firstChild).toHaveClass('animate-pulse');
    });

    it('has correct background color', () => {
      const { container } = render(<LatestNewsSkeleton />);
      expect(container.firstChild).toHaveClass('bg-[#f5f5f5]');
    });

    it('renders exactly 5 news item skeletons', () => {
      const { container } = render(<LatestNewsSkeleton />);
      const newsItems = container.querySelectorAll('.sm\\:w-48');
      expect(newsItems).toHaveLength(5);
    });

    it('has header placeholder', () => {
      const { container } = render(<LatestNewsSkeleton />);
      const header = container.querySelector('.mb-6');
      expect(header).toBeInTheDocument();
    });

    it('has filter button placeholders', () => {
      const { container } = render(<LatestNewsSkeleton />);
      const filterPlaceholder = container.querySelector('.w-32');
      expect(filterPlaceholder).toBeInTheDocument();
    });

    it('has load more button placeholder', () => {
      const { container } = render(<LatestNewsSkeleton />);
      const loadMorePlaceholder = container.querySelector('.w-40');
      expect(loadMorePlaceholder).toBeInTheDocument();
    });

    it('has dark mode styles', () => {
      const { container } = render(<LatestNewsSkeleton />);
      expect(container.firstChild).toHaveClass('dark:bg-gray-800');
    });

    it('each news item has thumbnail placeholder', () => {
      const { container } = render(<LatestNewsSkeleton />);
      const thumbnails = container.querySelectorAll('.h-36');
      expect(thumbnails).toHaveLength(5);
    });
  });

  describe('CategorySectionSkeleton', () => {
    it('renders without crashing', () => {
      const { container } = render(<CategorySectionSkeleton />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('has pulse animation', () => {
      const { container } = render(<CategorySectionSkeleton />);
      expect(container.firstChild).toHaveClass('animate-pulse');
    });

    it('has header placeholder with border', () => {
      const { container } = render(<CategorySectionSkeleton />);
      const header = container.querySelector('.border-b-2');
      expect(header).toBeInTheDocument();
    });

    it('has featured image placeholder', () => {
      const { container } = render(<CategorySectionSkeleton />);
      const imagePlaceholder = container.querySelector('.aspect-\\[16\\/10\\]');
      expect(imagePlaceholder).toBeInTheDocument();
    });

    it('renders exactly 4 link placeholders', () => {
      const { container } = render(<CategorySectionSkeleton />);
      const linkPlaceholders = container.querySelectorAll('.w-5.h-5');
      expect(linkPlaceholders).toHaveLength(4);
    });

    it('has grid layout for content', () => {
      const { container } = render(<CategorySectionSkeleton />);
      const grid = container.querySelector('.grid');
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveClass('md:grid-cols-2');
    });

    it('has margin bottom', () => {
      const { container } = render(<CategorySectionSkeleton />);
      expect(container.firstChild).toHaveClass('mb-8');
    });

    it('has dark mode styles', () => {
      const { container } = render(<CategorySectionSkeleton />);
      const darkElements = container.querySelectorAll('.dark\\:bg-gray-700');
      expect(darkElements.length).toBeGreaterThan(0);
    });

    it('link placeholders are in a flex column', () => {
      const { container } = render(<CategorySectionSkeleton />);
      const linksContainer = container.querySelector('.flex.flex-col.gap-3');
      expect(linksContainer).toBeInTheDocument();
    });
  });

  describe('Consistency', () => {
    it('all skeletons use consistent gray colors', () => {
      const { container: topStory } = render(<TopStorySkeleton />);
      const { container: topPicks } = render(<TopPicksSkeleton />);
      const { container: latestNews } = render(<LatestNewsSkeleton />);
      const { container: category } = render(<CategorySectionSkeleton />);

      // All should use bg-gray-300 for light mode placeholders
      expect(topStory.querySelector('.bg-gray-300')).toBeInTheDocument();
      expect(topPicks.querySelector('.bg-gray-300')).toBeInTheDocument();
      expect(latestNews.querySelector('.bg-gray-300')).toBeInTheDocument();
      expect(category.querySelector('.bg-gray-300')).toBeInTheDocument();
    });

    it('all skeletons have dark mode support', () => {
      const { container: topStory } = render(<TopStorySkeleton />);
      const { container: topPicks } = render(<TopPicksSkeleton />);
      const { container: latestNews } = render(<LatestNewsSkeleton />);
      const { container: category } = render(<CategorySectionSkeleton />);

      expect(topStory.querySelector('[class*="dark:"]')).toBeInTheDocument();
      expect(topPicks.querySelector('[class*="dark:"]')).toBeInTheDocument();
      expect(latestNews.querySelector('[class*="dark:"]')).toBeInTheDocument();
      expect(category.querySelector('[class*="dark:"]')).toBeInTheDocument();
    });

    it('all skeletons use animate-pulse for loading effect', () => {
      const { container: topStory } = render(<TopStorySkeleton />);
      const { container: topPicks } = render(<TopPicksSkeleton />);
      const { container: latestNews } = render(<LatestNewsSkeleton />);
      const { container: category } = render(<CategorySectionSkeleton />);

      expect(topStory.querySelector('.animate-pulse')).toBeInTheDocument();
      expect(topPicks.querySelector('.animate-pulse')).toBeInTheDocument();
      expect(latestNews.querySelector('.animate-pulse')).toBeInTheDocument();
      expect(category.querySelector('.animate-pulse')).toBeInTheDocument();
    });
  });
});
