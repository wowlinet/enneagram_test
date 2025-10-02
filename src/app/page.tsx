'use client'

import Link from 'next/link'
import { useState } from 'react'

// FAQ Item Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <button
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-primary text-lg">{question}</span>
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'py-4 max-h-96' : 'py-0 max-h-0'
        }`}
      >
        <p className="text-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl font-bold mb-6">
            Free Enneagram Test – Discover Your Personality Type
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Take our free Enneagram Test to uncover your true personality type. In just a few minutes, you’ll gain powerful insights into your motivations, strengths, challenges, and growth opportunities.
          </p>
          <Link 
            href="/test"
            className="inline-block bg-accent hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform"
          >
            Start Free Test
          </Link>
        </div>
      </section>

      {/* What is the Enneagram Test? Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-8 text-primary">
            What is the Enneagram Test?
          </h3>
          <div className="text-lg text-gray-700 leading-relaxed space-y-4">
            <p>
              The Enneagram Test is a personality assessment tool based on the Enneagram model of nine personality types. Each type represents a unique way of thinking, feeling, and behaving.
            </p>
            <p>
              Unlike simple quizzes, the Enneagram goes deeper—it helps you understand the core motivations behind your actions, offering a clear path to personal growth and improved relationships.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12 text-primary">
            Why Take the Enneagram Test?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-3 text-primary">Understand Yourself Better</h4>
              <p className="text-gray-600">
                Discover what drives you, what challenges you face, and how you naturally approach the world.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-3 text-primary">Improve Relationships & Communication</h4>
              <p className="text-gray-600">
                By understanding your Enneagram type—and the types of others—you’ll learn how to communicate more effectively, reduce conflicts, and build stronger connections.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-3 text-primary">Career & Personal Growth</h4>
              <p className="text-gray-600">
                Use your personality type as a roadmap for choosing the right career path, setting meaningful goals, and developing strategies for long-term growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Does the Enneagram Test Work? Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12 text-primary">
            How Does the Enneagram Test Work?
          </h3>
          
          <div className="space-y-6 mb-12">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white font-semibold">
                1
              </div>
              <p className="text-lg text-gray-700">
                Answer a series of carefully designed personality questions.
              </p>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white font-semibold">
                2
              </div>
              <p className="text-lg text-gray-700">
                Get instant results that identify your dominant Enneagram type.
              </p>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white font-semibold">
                3
              </div>
              <p className="text-lg text-gray-700">
                Explore detailed explanations of your personality, including strengths, blind spots, and growth tips.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 bg-gray-50 rounded-lg p-6">
            <div className="flex items-center space-x-2">
              <span className="text-2xl text-secondary">⏱</span>
              <span className="text-lg font-semibold text-primary">Time Required: 5–10 minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">💯</span>
              <span className="text-lg font-semibold text-primary">Cost: Free</span>
            </div>
          </div>
        </div>
      </section>

      {/* The 9 Enneagram Personality Types Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12 text-primary">
            The 9 Enneagram Personality Types
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-lg font-semibold text-primary mb-2">Type 1 – The Reformer</h4>
              <p className="text-gray-600">Principled, purposeful, and self-controlled.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-lg font-semibold text-primary mb-2">Type 2 – The Helper</h4>
              <p className="text-gray-600">Caring, generous, and people-oriented.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-lg font-semibold text-primary mb-2">Type 3 – The Achiever</h4>
              <p className="text-gray-600">Success-driven, adaptable, and goal-focused.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-lg font-semibold text-primary mb-2">Type 4 – The Individualist</h4>
              <p className="text-gray-600">Creative, sensitive, and expressive.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-lg font-semibold text-primary mb-2">Type 5 – The Investigator</h4>
              <p className="text-gray-600">Analytical, insightful, and independent.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-lg font-semibold text-primary mb-2">Type 6 – The Loyalist</h4>
              <p className="text-gray-600">Responsible, security-focused, and trustworthy.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-lg font-semibold text-primary mb-2">Type 7 – The Enthusiast</h4>
              <p className="text-gray-600">Spontaneous, optimistic, and adventurous.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-lg font-semibold text-primary mb-2">Type 8 – The Challenger</h4>
              <p className="text-gray-600">Confident, decisive, and protective.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-lg font-semibold text-primary mb-2">Type 9 – The Peacemaker</h4>
              <p className="text-gray-600">Easygoing, supportive, and harmonious.</p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="text-2xl">👉</span>
              <span className="text-lg font-medium text-gray-700">Want to know which type you are?</span>
            </div>
            <Link 
              href="/test"
              className="inline-block bg-accent hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform"
            >
              Take the Free Enneagram Test Now
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12 text-primary">
            FAQ – Enneagram Test
          </h3>
          <div className="space-y-4">
            <FAQItem 
              question="Is the Enneagram Test free?"
              answer="Yes! Our online Enneagram Test is 100% free and always will be."
            />
            <FAQItem 
              question="How accurate is the Enneagram Test?"
              answer="While no personality test is perfect, the Enneagram is widely respected for its depth and accuracy. Many find the results highly relatable and transformative."
            />
            <FAQItem 
              question="How long does the test take?"
              answer="The test usually takes about 5–10 minutes to complete."
            />
            <FAQItem 
              question="Can I retake the test?"
              answer="Absolutely! You can retake the test anytime to reflect changes or gain deeper insights."
            />
            <FAQItem 
              question="What can I do with my Enneagram type?"
              answer="Understanding your type can help you improve self-awareness, build better relationships, and guide your personal and professional growth."
            />
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
                  Understanding Type 1: The Perfectionist
                </h4>
                <p className="text-gray-600 mb-4">
                  Learn about the core motivations and characteristics of Type 1 personalities.
                </p>
                <Link href="/articles/understanding-type-1-perfectionist" className="text-secondary hover:text-primary font-medium">
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
                  Enneagram in Relationships
                </h4>
                <p className="text-gray-600 mb-4">
                  Discover how the Enneagram can improve your relationships.
                </p>
                <Link href="/articles/enneagram-relationships" className="text-secondary hover:text-primary font-medium">
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}