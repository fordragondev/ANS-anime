import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { fetchAnimeData } from '@/lib/api';
import { formatDate, truncateText } from '@/lib/utils';

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
      <div className="min-h-screen bg-secondary">
        {/* Header */}
        <header className="bg-primary text-white py-4 shadow-md">
          <div className="container mx-auto px-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <ArrowLeft size={20} />
              <span className="font-semibold">Back to Home</span>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <article className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl mx-auto">
            {/* Hero Image */}
            <div className="relative w-full h-[400px] bg-secondary">
              <Image
                src={`https://placehold.co/1200x400/003DA5/FFFFFF?text=${encodeURIComponent(truncateText(anime.name, 30))}`}
                alt={anime.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span
                  className={`${getTypeColor(anime.type)} text-white text-sm font-semibold px-3 py-1 rounded`}
                >
                  {anime.type}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                {anime.name}
              </h1>

              <div className="flex flex-wrap gap-6 text-gray-600 mb-8">
                <div>
                  <span className="font-semibold text-foreground">Type:</span>{' '}
                  {anime.type}
                </div>
                <div>
                  <span className="font-semibold text-foreground">Release Date:</span>{' '}
                  {formatDate(anime.vintage)}
                </div>
                <div>
                  <span className="font-semibold text-foreground">ID:</span>{' '}
                  {anime.id}
                </div>
              </div>

              {/* Description Placeholder */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  About
                </h2>
                <div className="bg-secondary p-6 rounded-lg">
                  <p className="text-gray-600 italic">
                    Detailed information about this anime is not available from the
                    current API. This would typically include a synopsis, staff
                    information, and other relevant details.
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Additional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-secondary p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Source</p>
                    <p className="font-semibold">Anime News Network</p>
                  </div>
                  <div className="bg-secondary p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-semibold">Information Available</p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Back Button */}
          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
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
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-accent mb-4">
            Error Loading Anime
          </h2>
          <p className="text-gray-600 mb-6">
            Failed to load anime details. Please try again later.
          </p>
          <Link
            href="/"
            className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }
}
