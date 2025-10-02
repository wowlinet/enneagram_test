import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Enneagram Test - Discover Your Personality Type',
  description: 'Take our comprehensive Enneagram personality test to discover your type and gain insights into your motivations, fears, and growth opportunities.',
  keywords: 'enneagram, personality test, psychology, self-discovery, personal development',
  authors: [{ name: 'Enneagram Test Team' }],
  openGraph: {
    title: 'Enneagram Test - Discover Your Personality Type',
    description: 'Take our comprehensive Enneagram personality test to discover your type and gain insights into your motivations, fears, and growth opportunities.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enneagram Test - Discover Your Personality Type',
    description: 'Take our comprehensive Enneagram personality test to discover your type and gain insights into your motivations, fears, and growth opportunities.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}