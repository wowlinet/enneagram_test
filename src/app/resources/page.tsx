import { Metadata } from 'next';
import ResourcesPageClient from './ResourcesPageClient';

export const metadata: Metadata = {
  metadataBase: new URL('https://enneagram-test.com'),
  title: 'Free Enneagram Test Printable PDF Resources | Enneagram Test',
  description: 'Download free printable Enneagram test PDFs. Choose from 10, 20, or 45 questions. Perfect for workshops, self-discovery, and personality assessment.',
  keywords: 'enneagram test free printable, enneagram test free pdf, personality test printable, nine types test pdf, enneagram worksheet, free personality assessment',
  authors: [{ name: 'Enneagram Test Team' }],
  openGraph: {
    title: 'Free Enneagram Test Printable PDF Resources',
    description: 'Download free printable Enneagram test PDFs. Choose from 10, 20, or 45 questions. Perfect for workshops, self-discovery, and personality assessment.',
    type: 'website',
    url: 'https://enneagram-test.com/resources',
    siteName: 'Enneagram Test',
    images: [
      {
        url: '/article_cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Enneagram Test Printable Resources',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Enneagram Test Printable PDF Resources',
    description: 'Download free printable Enneagram test PDFs. Choose from 10, 20, or 45 questions.',
    images: ['/article_cover.jpg'],
    creator: '@enneagram_test',
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
    canonical: 'https://enneagram-test.com/resources',
  },
};

export default function ResourcesPage() {
  return <ResourcesPageClient />;
}