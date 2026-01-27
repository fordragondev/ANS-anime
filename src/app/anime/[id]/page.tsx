import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { fetchAnimeData } from '@/lib/api';
import { formatDate, PLACEHOLDER_IMAGE } from '@/lib/utils';

interface AnimeDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  try {
    const anime = await fetchAnimeData();
    return anime.map((item) => ({
      id: item.id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: AnimeDetailPageProps) {
  const { id } = await params;
  try {
    const allAnime = await fetchAnimeData();
    const anime = allAnime.find((item) => item.id === id);

    if (!anime) {
      return {
        title: 'Anime Not Found',
      };
    }

    return {
      title: `${anime.name} | Anime News`,
      description: `${anime.type} anime from ${anime.vintage}`,
    };
  } catch (error) {
    return {
      title: 'Anime Details',
    };
  }
}

export default async function AnimeDetailPage({ params }: AnimeDetailPageProps) {
  const { id } = await params;

  try {
    const allAnime = await fetchAnimeData();
    const anime = allAnime.find((item) => item.id === id);

    if (!anime) {
      notFound();
    }

    const getTypeColor = (type: string) => {
      const colors: Record<string, string> = {
        ONA: 'bg-blue-600',
        TV: 'bg-green-600',
        Movie: 'bg-purple-600',
        OVA: 'bg-orange-600',
        Special: 'bg-pink-600',
      };
      return colors[type] || 'bg-gray-600';
    };

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* Header */}
        <header className="bg-primary text-white py-4 shadow-md">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity focus-visible:ring-2 focus-visible:ring-white/50 rounded"
            >
              <ArrowLeft size={20} />
              <span className="font-semibold">Back to Home</span>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <article className="bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden max-w-4xl mx-auto">
            {/* Hero Image */}
            <div className="relative w-full h-[300px] sm:h-[400px] bg-gray-100 dark:bg-gray-800">
              <Image
                src={PLACEHOLDER_IMAGE}
                unoptimized
                alt={anime.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                <span
                  className={`${getTypeColor(anime.type)} text-white text-sm font-semibold px-3 py-1 rounded`}
                >
                  {anime.type}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 lg:p-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {anime.name}
              </h1>

              <div className="flex flex-wrap gap-4 sm:gap-6 text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">
                <div>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Type:</span>{' '}
                  {anime.type}
                </div>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Release Date:</span>{' '}
                  {formatDate(anime.vintage)}
                </div>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">ID:</span>{' '}
                  {anime.id}
                </div>
              </div>

              {/* Description Placeholder */}
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
                  About
                </h2>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 rounded-lg">
                  <p className="text-gray-600 dark:text-gray-400 italic text-sm sm:text-base">
                    Detailed information about this anime is not available from the
                    current API. This would typically include a synopsis, staff
                    information, and other relevant details.
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 sm:pt-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
                  Additional Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Source</p>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">Anime News Network</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">Information Available</p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Back Button */}
          <div className="text-center mt-6 sm:mt-8">
            <Link
              href="/"
              className="inline-block bg-primary text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Back to All Anime
            </Link>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error loading anime details:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 sm:p-8 max-w-md w-full text-center mx-4">
          <h2 className="text-xl sm:text-2xl font-bold text-accent mb-4">
            Error Loading Anime
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Failed to load anime details. Please try again later.
          </p>
          <Link
            href="/"
            className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }
}
