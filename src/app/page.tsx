import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-primary text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Enneagram Test</h1>
          <div className="space-x-6">
            <Link href="/" className="hover:text-secondary transition-colors">
              Home
            </Link>
            <Link href="/test" className="hover:text-secondary transition-colors">
              Take Test
            </Link>
            <Link href="/articles" className="hover:text-secondary transition-colors">
              Articles
            </Link>
            <Link href="/auth/login" className="hover:text-secondary transition-colors">
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl font-bold mb-6">
            Discover Your True Self
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Take our comprehensive Enneagram personality test to uncover your core motivations, 
            fears, and growth opportunities. Gain deep insights into your personality type 
            and transform your understanding of yourself.
          </p>
          <Link 
            href="/test"
            className="inline-block bg-accent hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform"
          >
            Start Your Journey
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12 text-primary">
            Why Choose Our Enneagram Test?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-3 text-primary">Scientifically Validated</h4>
              <p className="text-gray-600">
                Our test is based on decades of psychological research and validated methodologies 
                to ensure accurate and meaningful results.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-3 text-primary">Instant Results</h4>
              <p className="text-gray-600">
                Get your personality type and detailed analysis immediately after completing 
                the test, with interactive charts and personalized insights.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-3 text-primary">Growth Resources</h4>
              <p className="text-gray-600">
                Access curated articles, growth tips, and resources tailored to your 
                personality type to support your personal development journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles Preview */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12 text-primary">
            Featured Articles
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-secondary to-primary"></div>
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-3 text-primary">
                  Understanding the Nine Types
                </h4>
                <p className="text-gray-600 mb-4">
                  A comprehensive guide to the nine Enneagram personality types and their core characteristics.
                </p>
                <Link href="/articles/understanding-nine-types" className="text-secondary hover:text-primary font-medium">
                  Read More →
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-accent to-secondary"></div>
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-3 text-primary">
                  Growth and Development
                </h4>
                <p className="text-gray-600 mb-4">
                  Learn how to use your Enneagram type for personal growth and self-improvement.
                </p>
                <Link href="/articles/growth-development" className="text-secondary hover:text-primary font-medium">
                  Read More →
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-primary to-accent"></div>
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-3 text-primary">
                  Relationships & Communication
                </h4>
                <p className="text-gray-600 mb-4">
                  Discover how different Enneagram types interact and communicate in relationships.
                </p>
                <Link href="/articles/relationships-communication" className="text-secondary hover:text-primary font-medium">
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h5 className="text-xl font-bold mb-4">Enneagram Test</h5>
              <p className="text-gray-300">
                Discover your personality type and unlock your potential for growth and self-understanding.
              </p>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Quick Links</h6>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/test" className="hover:text-white">Take Test</Link></li>
                <li><Link href="/articles" className="hover:text-white">Articles</Link></li>
                <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Support</h6>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Connect</h6>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Enneagram Test. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}