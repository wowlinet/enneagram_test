import { Metadata } from 'next';
import { Suspense } from 'react';
import ArticlesPageClient from './ArticlesPageClient';

export const metadata: Metadata = {
  metadataBase: new URL('https://enneagram-test.com'),
  title: 'Enneagram Articles - In-depth Analysis of Nine Personality Types',
  description: 'Explore in-depth Enneagram articles covering self-discovery, relationships, career development, and more. Through professional psychological analysis, gain better understanding of the characteristics and growth paths of the nine personality types.',
  keywords: [
    'Enneagram',
    'personality types',
    'psychology',
    'self-discovery',
    'personal growth',
    'relationships',
    'career development'
  ],
  openGraph: {
    title: 'Enneagram Articles',
    description: 'Explore in-depth Enneagram articles covering self-discovery, relationships, career development, and more. Through professional psychological analysis, gain better understanding of the nine personality types.',
    type: 'website',
    url: 'https://enneagram-test.com/articles',
    siteName: 'Enneagram Test',
    images: [
      {
        url: '/og-articles.jpg',
        width: 1200,
        height: 630,
        alt: 'Enneagram Articles',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enneagram Articles',
    description: 'Explore in-depth Enneagram articles covering self-discovery, relationships, career development, and more.',
    images: ['/og-articles.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://enneagram-test.com/articles',
  },
};

export default function ArticlesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading articles...</p>
            </div>
          </div>
        </div>
      </div>
    }>
      <ArticlesPageClient />
    </Suspense>
  );
}