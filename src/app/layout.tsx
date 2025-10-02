import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Free Enneagram Test Online - Discover Your Personality Type',
  description: 'Take the free Enneagram Test online and find out your personality type. Explore Enneagram types, traits, and growth paths to improve self-awareness and relationships.',
  keywords: 'enneagram, personality test, psychology, self-discovery, personal development',
  authors: [{ name: 'Enneagram Test Team' }],
  openGraph: {
    title: 'Free Enneagram Test Online - Discover Your Personality Type',
    description: 'Take the free Enneagram Test online and find out your personality type. Explore Enneagram types, traits, and growth paths to improve self-awareness and relationships.',  
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Enneagram Test Online - Discover Your Personality Type',
    description: 'Take the free Enneagram Test online and find out your personality type. Explore Enneagram types, traits, and growth paths to improve self-awareness and relationships.',
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
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  )
}