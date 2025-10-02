import type { Metadata } from 'next'
import { Users, Target, Heart, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us - Enneagram Test',
  description: 'Learn about our mission to help people discover their true selves through the Enneagram personality system.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Our Mission
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are dedicated to helping individuals discover their authentic selves through the profound wisdom of the Enneagram personality system.
          </p>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Target className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              To provide accessible, accurate, and insightful Enneagram assessments that empower individuals to understand their core motivations, overcome limiting patterns, and unlock their full potential for personal and professional growth.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Heart className="h-8 w-8 text-red-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              To create a world where people understand themselves and others more deeply, fostering compassion, effective communication, and meaningful relationships through the transformative power of Enneagram wisdom.
            </p>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Authenticity</h3>
              <p className="text-gray-600">
                We believe in the power of authentic self-discovery and encourage genuine exploration of one&apos;s true nature without judgment.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Compassion</h3>
              <p className="text-gray-600">
                We approach every individual with empathy and understanding, recognizing that personal growth is a unique journey for everyone.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">
                We are committed to providing the highest quality assessments and insights based on rigorous research and proven methodologies.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Our Enneagram Test?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Scientifically Validated</h3>
              <p className="text-gray-600 text-sm">
                Our assessment is based on extensive research and validated methodologies in personality psychology.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Comprehensive Results</h3>
              <p className="text-gray-600 text-sm">
                Receive detailed insights into your type, including strengths, challenges, and growth opportunities.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Privacy Protected</h3>
              <p className="text-gray-600 text-sm">
                Your personal information and test results are kept strictly confidential and secure.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Ongoing Support</h3>
              <p className="text-gray-600 text-sm">
                Access to resources, articles, and guidance to support your continued personal development journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}