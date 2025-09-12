'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { questions, calculateEnneagramType } from '@/data/questions';
import { createClient } from '@/lib/supabase';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TestPage = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(0));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitTest = async () => {
    if (answers.some(answer => answer === 0)) {
      alert('Please answer all questions before submitting.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = calculateEnneagramType(answers);
      
      // Get current user
      const supabase = createClient()
      const { data: user } = await supabase.auth.getUser();
      
      // Save test result to database
      const { data, error } = await supabase
        .from('test_results')
        .insert({
          user_id: user?.id || null,
          answers,
          personality_type: result.type,
          scores: result.scores
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving test result:', error);
        alert('Error saving test result. Please try again.');
        return;
      }

      // Redirect to results page
      router.push(`/results/${data.id}`);
    } catch (error) {
      console.error('Error submitting test:', error);
      alert('Error submitting test. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const currentAnswer = answers[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Enneagram Personality Test
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover your personality type through this comprehensive assessment. 
            Answer honestly for the most accurate results.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-indigo-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 leading-relaxed">
                {questions[currentQuestion].text}
              </h2>
              
              {/* Answer Options */}
              <div className="space-y-3">
                {[
                  { value: 1, label: 'Strongly Disagree', color: 'from-red-500 to-red-600' },
                  { value: 2, label: 'Disagree', color: 'from-orange-500 to-orange-600' },
                  { value: 3, label: 'Neutral', color: 'from-yellow-500 to-yellow-600' },
                  { value: 4, label: 'Agree', color: 'from-green-500 to-green-600' },
                  { value: 5, label: 'Strongly Agree', color: 'from-emerald-500 to-emerald-600' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      currentAnswer === option.value
                        ? `bg-gradient-to-r ${option.color} text-white border-transparent shadow-lg transform scale-105`
                        : 'bg-gray-50 hover:bg-gray-100 border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option.label}</span>
                      <div className={`w-6 h-6 rounded-full border-2 ${
                        currentAnswer === option.value
                          ? 'bg-white border-white'
                          : 'border-gray-300'
                      }`}>
                        {currentAnswer === option.value && (
                          <div className="w-full h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  currentQuestion === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700 hover:shadow-md'
                }`}
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </button>

              {isLastQuestion ? (
                <button
                  onClick={submitTest}
                  disabled={currentAnswer === 0 || isSubmitting}
                  className={`flex items-center px-8 py-3 rounded-xl font-medium transition-all duration-200 ${
                    currentAnswer === 0 || isSubmitting
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Test'}
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  disabled={currentAnswer === 0}
                  className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    currentAnswer === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                  }`}
                >
                  Next
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
            <h3 className="font-semibold text-indigo-800 mb-2">💡 Tips for Accurate Results</h3>
            <ul className="text-indigo-700 space-y-1 text-sm">
              <li>• Answer based on how you naturally are, not how you think you should be</li>
              <li>• Consider your typical behavior patterns over time</li>
              <li>• Don't overthink - go with your first instinct</li>
              <li>• Be honest with yourself for the most accurate assessment</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;