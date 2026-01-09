import { NextResponse } from 'next/server';
import { fetchAnimeData } from '@/lib/api';

export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    const data = await fetchAnimeData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch anime data' },
      { status: 500 }
    );
  }
}
