'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { personalityTypes, LocalPersonalityType } from '@/data/personality-types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Share2, Download, BookOpen, ArrowLeft } from 'lucide-react';

interface TestResult {
  id: string;
  answers: number[];
  personality_type: number;
  scores: { [key: string]: number };
  created_at: string;
}

interface RadarData {
  type: string;
  score: number;
  fullMark: number;
}

const ResultsPage = () => {
  const params = useParams();
  const router = useRouter();
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [personalityType, setPersonalityType] = useState<LocalPersonalityType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = () => {
      try {
        // 从 localStorage 获取测试结果
        const resultData = localStorage.getItem(`enneagram_test_result_${params.id}`);
        
        if (!resultData) {
          setError('Test result not found');
          setLoading(false);
          return;
        }

        const result: TestResult = JSON.parse(resultData);
        setTestResult(result);

        // 获取对应的人格类型数据
        const typeData = personalityTypes.find(type => type.type_number === result.personality_type);
        
        if (!typeData) {
          setError('Personality type data not found');
          setLoading(false);
          return;
        }

        setPersonalityType(typeData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load results');
        console.error('Error fetching results:', err);
        setLoading(false);
      }
    };

    if (params.id) {
      fetchResults();
    }
  }, [params.id]);

  const getRadarData = (): RadarData[] => {
    if (!testResult) return [];

    const typeNames = {
      perfectionist: 'Type 1\nPerfectionist',
      helper: 'Type 2\nHelper',
      achiever: 'Type 3\nAchiever',
      individualist: 'Type 4\nIndividualist',
      investigator: 'Type 5\nInvestigator',
      loyalist: 'Type 6\nLoyalist',
      enthusiast: 'Type 7\nEnthusiast',
      challenger: 'Type 8\nChallenger',
      peacemaker: 'Type 9\nPeacemaker'
    };

    return Object.entries(testResult.scores).map(([key, value]) => ({
      type: typeNames[key as keyof typeof typeNames] || key,
      score: value as number,
      fullMark: 25
    }));
  };

  const shareResults = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `My Enneagram Type: ${personalityType?.title}`,
          text: `I just discovered I'm ${personalityType?.title}! Take the test to find your type.`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Results link copied to clipboard!');
    }
  };

  const downloadResults = () => {
    if (!testResult || !personalityType) return;

    const content = `
Enneagram Test Results
===================

Your Type: ${personalityType.title}

Description: ${personalityType.description}

Strengths: ${personalityType.strengths.join(', ')}

Growth Areas: ${personalityType.growth_areas.join(', ')}

Core Motivation: ${personalityType.characteristics.core_motivation}

Basic Fear: ${personalityType.characteristics.basic_fear}

Test Date: ${new Date(testResult.created_at).toLocaleDateString()}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `enneagram-results-type-${personalityType.type_number}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (error || !testResult || !personalityType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Results Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The test results could not be loaded.'}</p>
          <button
            onClick={() => router.push('/test')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Take the Test
          </button>
        </div>
      </div>
    );
  }

  const radarData = getRadarData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.push('/')}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
          
          <div className="flex space-x-3">
            <button
              onClick={shareResults}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </button>
            <button
              onClick={downloadResults}
              className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </button>
          </div>
        </div>

        {/* Main Results */}
        <div className="max-w-6xl mx-auto">
          {/* Type Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-3xl font-bold rounded-full mb-6">
              {personalityType.type_number}
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {personalityType.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {personalityType.description}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Radar Chart */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Your Personality Profile
              </h2>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid gridType="polygon" className="opacity-30" />
                    <PolarAngleAxis 
                      dataKey="type" 
                      tick={{ fontSize: 12, fill: '#4B5563' }}
                      className="text-xs"
                    />
                    <PolarRadiusAxis 
                      angle={90} 
                      domain={[0, 25]} 
                      tick={{ fontSize: 10, fill: '#9CA3AF' }}
                      tickCount={6}
                    />
                    <Radar
                      name="Score"
                      dataKey="score"
                      stroke="#6366F1"
                      fill="#6366F1"
                      fillOpacity={0.3}
                      strokeWidth={3}
                      dot={{ fill: '#6366F1', strokeWidth: 2, r: 6 }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-500 text-center mt-4">
                This chart shows your relative scores across all nine personality types.
              </p>
            </div>

            {/* Core Characteristics */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Core Motivation</h3>
                <p className="text-gray-600 leading-relaxed">
                  {personalityType.characteristics.core_motivation}
                </p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Basic Fear</h3>
                <p className="text-gray-600 leading-relaxed">
                  {personalityType.characteristics.basic_fear}
                </p>
              </div>
            </div>
          </div>

          {/* Strengths and Growth Areas */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-green-800 mb-6 flex items-center">
                <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">✓</span>
                Your Strengths
              </h3>
              <p className="text-green-700 leading-relaxed text-lg">
                {personalityType.strengths}
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-amber-800 mb-6 flex items-center">
                <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">↗</span>
                Growth Areas
              </h3>
              <p className="text-amber-700 leading-relaxed text-lg">
                {personalityType.growth_areas}
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Continue Your Journey</h3>
            <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
              Understanding your Enneagram type is just the beginning. Explore our articles and resources to deepen your self-awareness and personal growth.
            </p>
            <button
              onClick={() => router.push('/articles')}
              className="inline-flex items-center px-8 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Explore Articles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;