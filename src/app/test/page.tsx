import { Metadata } from 'next';
import TestPageClient from './TestPageClient';

export const metadata: Metadata = {
  title: 'Free Enneagram Test and Results Online - Quick Enneagram Assessment',
  description: 'Take the free Enneagram Test online and get instant results. Complete this quick Enneagram assessment to discover your personality type in minutes.',
  keywords: 'nneagram Test and Results',
  openGraph: {
    title: 'Free Enneagram Test and Results Online - Quick Enneagram Assessment',
    description: 'Take the free Enneagram Test online and get instant results. Complete this quick Enneagram assessment to discover your personality type in minutes.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Enneagram Test',
    images: [
      {
        url: '/og-test.jpg',
        width: 1200,
        height: 630,
        alt: 'Enneagram Test and Results',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Enneagram Test and Results Online - Quick Enneagram Assessment',
    description: 'Take the free Enneagram Test online and get instant results. Complete this quick Enneagram assessment to discover your personality type in minutes.',
    images: ['/og-test.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/test',
  },
};

export default function TestPage() {
  return <TestPageClient />;
}