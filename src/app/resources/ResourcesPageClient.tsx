'use client'

import { useState, useMemo } from 'react'
import { questions, Question } from '@/data/questions'
import { personalityTypes } from '@/data/personality-types'

// Type mapping
const categoryToTypeMap: Record<string, number> = {
  'perfectionist': 1,
  'helper': 2,
  'achiever': 3,
  'individualist': 4,
  'investigator': 5,
  'loyalist': 6,
  'enthusiast': 7,
  'challenger': 8,
  'peacemaker': 9
}

// FAQ component
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

export default function ResourcesPageClient() {
  const [selectedCount, setSelectedCount] = useState<number>(45)
  const [selectedType, setSelectedType] = useState<number | null>(null)
  const [showQuestions, setShowQuestions] = useState(false)
  
  // Print configuration options
  const [showNumberOfQuestions, setShowNumberOfQuestions] = useState(true)
  const [showFocusType, setShowFocusType] = useState(true)
  const [showTestDate, setShowTestDate] = useState(true)
  const [showScoringMethod, setShowScoringMethod] = useState(true)
  
  // Print preview mode
  const [showPrintPreview, setShowPrintPreview] = useState(false)

  // Question filtering logic
  const filteredQuestions = useMemo(() => {
    let filtered = [...questions]
    
    // Filter by type
    if (selectedType !== null) {
      const targetCategory = Object.keys(categoryToTypeMap).find(
        key => categoryToTypeMap[key] === selectedType
      )
      if (targetCategory) {
        filtered = filtered.filter(q => q.category === targetCategory)
      }
    }
    
    // Filter by count
    if (selectedCount < filtered.length) {
      // If a specific type is selected, prioritize questions of that type
      if (selectedType !== null) {
        return filtered.slice(0, selectedCount)
      } else {
        // Evenly distribute questions across all types
        const questionsPerType = Math.floor(selectedCount / 9)
        const remainder = selectedCount % 9
        const result: Question[] = []
        
        Object.keys(categoryToTypeMap).forEach((category, index) => {
          const categoryQuestions = questions.filter(q => q.category === category)
          const count = questionsPerType + (index < remainder ? 1 : 0)
          result.push(...categoryQuestions.slice(0, count))
        })
        
        return result.sort((a, b) => a.id - b.id)
      }
    }
    
    return filtered
  }, [selectedCount, selectedType])

  const handleGenerateTest = () => {
    setShowQuestions(true)
    // Scroll to questions section
    setTimeout(() => {
      document.getElementById('questions-section')?.scrollIntoView({ 
        behavior: 'smooth' 
      })
    }, 100)
  }

  const handlePreview = () => {
    setShowPrintPreview(true)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleClosePrintPreview = () => {
    setShowPrintPreview(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary">
      {/* Hero Section */}
      <section className="text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h1 className="text-5xl font-bold mb-6">
            Enneagram Test Resources
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Get free printable Enneagram test questions with customizable question count and types, perfect for personal testing, workshops, and team building
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 px-4 py-2 rounded-full">✨ Completely Free</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">📄 Printable PDF</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">🎯 Custom Filtering</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">📱 Responsive Design</span>
          </div>
        </div>
      </section>

      {/* Filter Options */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">
              Customize Test Questions
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Question Count Selection */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  Select Number of Questions
                </label>
                <div className="space-y-3">
                  {[10, 20, 45].map(count => (
                    <label key={count} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="questionCount"
                        value={count}
                        checked={selectedCount === count}
                        onChange={(e) => setSelectedCount(Number(e.target.value))}
                        className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                      />
                      <span className="ml-3 text-gray-700">
                        {count} questions {count === 45 ? '(Full Version)' : '(Simplified Version)'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Type Selection */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  Select Specific Type (Optional)
                </label>
                <select
                  value={selectedType || ''}
                  onChange={(e) => setSelectedType(e.target.value ? Number(e.target.value) : null)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-gray-800"
                >
                  <option value="" className="text-gray-800">All Types</option>
                  {personalityTypes.map(type => (
                    <option key={type.type_number} value={type.type_number} className="text-gray-800">
                      Type {type.type_number} - {type.title}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-2">
                  Selecting a specific type will only show questions related to that type
                </p>
              </div>
            </div>

            {/* Generate Button */}
            <div className="text-center mt-8">
              <button
                onClick={handleGenerateTest}
                className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Generate Test Questions ({filteredQuestions.length} questions)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Questions Display Area */}
      {showQuestions && (
        <section id="questions-section" className="py-16">
          <div className="max-w-4xl mx-auto px-6">
            {/* Print Control Area - Only visible on screen */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 print:hidden">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">
                      Ready to Preview Test Questions
                    </h3>
                    <p className="text-gray-600">
                      Click the button below to preview the print-optimized layout before printing
                    </p>
                  </div>
                </div>
                
                {/* Print Configuration Options */}
                <div className="border-t pt-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Print Configuration Options</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showNumberOfQuestions}
                        onChange={(e) => setShowNumberOfQuestions(e.target.checked)}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
                      />
                      <span className="text-sm text-gray-700">Number of Questions</span>
                    </label>
                    
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showFocusType}
                        onChange={(e) => setShowFocusType(e.target.checked)}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
                      />
                      <span className="text-sm text-gray-700">Focus Type</span>
                    </label>
                    
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showTestDate}
                        onChange={(e) => setShowTestDate(e.target.checked)}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
                      />
                      <span className="text-sm text-gray-700">Test Date</span>
                    </label>
                    
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showScoringMethod}
                        onChange={(e) => setShowScoringMethod(e.target.checked)}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
                      />
                      <span className="text-sm text-gray-700">Test Instructions</span>
                    </label>
                  </div>
                  <button
                    onClick={handlePreview}
                    className="bg-gradient-to-r from-primary to-secondary text-white my-6 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2 mx-auto"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Preview Print Layout
                  </button>
                </div>
              </div>
            </div>

            {/* Printable Question Content */}
            <div className="bg-white rounded-2xl shadow-xl print:shadow-none print:rounded-none">
              {/* Print Header */}
              <div className="p-8 border-b print:border-black">
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-primary print:text-black mb-4">
                    Enneagram Personality Test
                  </h1>
                  <div className="text-gray-600 print:text-black space-y-1">
                    {showNumberOfQuestions && (
                      <p>Number of Questions: {filteredQuestions.length} questions</p>
                    )}
                    {showFocusType && selectedType && (
                      <p>Focus Type: Type {selectedType} - {personalityTypes.find(t => t.type_number === selectedType)?.title}</p>
                    )}
                    {showTestDate && (
                      <p>Test Date: {new Date().toLocaleDateString('en-US')}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Test Instructions */}
              {showScoringMethod && (
                <div className="p-8 border-b print:border-black bg-gray-50 print:bg-white">
                  <h2 className="text-xl font-bold text-primary print:text-black mb-4">Test Instructions</h2>
                  <div className="space-y-2 text-gray-700 print:text-black">
                    <p>• Please answer each question based on your true feelings and behavioral patterns</p>
                    <p>• Choose the option that best matches your usual behavior, not what you think you &quot;should&quot; answer</p>
                    <p>• For each question, select one answer: 1=Strongly Disagree, 2=Disagree, 3=Neutral, 4=Agree, 5=Strongly Agree</p>
                    <p>• Please answer honestly - there are no right or wrong answers, only answers that are right for you</p>
                  </div>
                </div>
              )}

              {/* Question List */}
              <div className="p-8">
                <div className="space-y-6">
                  {filteredQuestions.map((question, index) => (
                    <div key={question.id} className="border-b border-gray-200 print:border-black pb-4 last:border-b-0">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        <div className="flex-1">
                          <p className="text-lg text-gray-800 print:text-black font-medium">
                            {index + 1}. {question.text}
                          </p>
                        </div>
                        <div className="flex gap-2 sm:gap-4 flex-wrap">
                          {[1, 2, 3, 4, 5].map(score => (
                            <label key={score} className="flex items-center cursor-pointer">
                              <input
                                type="radio"
                                name={`question-${question.id}`}
                                value={score}
                                className="w-4 h-4 text-primary border-gray-300"
                              />
                              <span className="ml-1 text-sm text-gray-600 print:text-black">
                                {score}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Usage Instructions */}
      <section className="py-16 print:hidden">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">
              How to Export PDF
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Generate Questions</h3>
                <p className="text-gray-600">
                  Select the number of questions and type, then click &quot;Generate Test Questions&quot;
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Click Print</h3>
                <p className="text-gray-600">
                  Click &quot;Print/Save as PDF&quot; button, or use keyboard shortcut Ctrl+P (Windows) or Cmd+P (Mac)
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Save PDF</h3>
                <p className="text-gray-600">
                  In the print dialog, select &quot;Save as PDF&quot; or &quot;Print to PDF&quot;, then choose save location
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">💡 Tips</h4>
              <ul className="text-blue-700 space-y-1 text-sm">
                <li>• We recommend using Chrome, Firefox, or Safari browsers for the best printing results</li>
                <li>• When printing, select A4 paper size in portrait orientation</li>
                <li>• You can adjust margins and scale in the print preview</li>
                <li>• The generated PDF file can be directly shared with others</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 print:hidden">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            <FAQItem
              question="Is this test free?"
              answer="Yes, our Enneagram personality test is completely free. You can generate and download test questions unlimited times without registration or payment."
            />
            
            <FAQItem
              question="Can I select questions for specific types?"
              answer="Yes, you can choose to focus on a specific Enneagram personality type (1-9), and the generated questions will primarily target the characteristics of that type. This is helpful for in-depth understanding of specific types."
            />
            
            <FAQItem
              question="What's the difference between different question counts?"
              answer="The 10-question version is suitable for quick testing, the 20-question version provides more accurate results, and the 45-question full version offers the most comprehensive assessment of your personality type. More questions typically lead to more accurate results."
            />
            
            <FAQItem
              question="How do I calculate test results?"
              answer="After completing the paper test, you can visit our website for online scoring, or manually calculate scores for each type category. The type with the highest score is usually your primary personality type."
            />
            
            <FAQItem
              question="Can this be used for commercial purposes?"
              answer="Our test questions can be used for educational, training, and non-profit team building activities. For commercial use, please contact us for authorization."
            />
            
            <FAQItem
              question="What if the print quality is poor?"
              answer="Please ensure you're using a modern browser (Chrome, Firefox, Safari), select A4 paper in portrait orientation. If the text is too small, you can adjust the scale to 110%-120% in print settings."
            />
          </div>
        </div>
      </section>

      {/* Print-specific styles */}
      <style jsx global>{`
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          body {
            background: white !important;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          .print\\:text-black {
            color: black !important;
          }
          
          .print\\:bg-white {
            background-color: white !important;
          }
          
          .print\\:border-black {
            border-color: black !important;
          }
          
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          
          .print\\:rounded-none {
            border-radius: 0 !important;
          }
          
          @page {
            margin: 1cm;
            size: A4;
          }
          
          /* Ensure questions don't break across pages */
          .space-y-6 > div {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          
          /* Keep headings on the same page */
          h1, h2, h3 {
            break-after: avoid;
            page-break-after: avoid;
          }
        }
      `}</style>

      {/* Print Preview Modal */}
      {showPrintPreview && (
        <div className="fixed inset-0 z-50 bg-white overflow-auto">
          {/* Print Preview Control Bar */}
          <div className="sticky top-0 z-10 bg-gray-100 border-b border-gray-300 px-6 py-4 print:hidden">
            <div className="flex justify-between items-center max-w-4xl mx-auto">
              <h2 className="text-xl font-semibold text-gray-800">Print Preview</h2>
              <div className="flex gap-3">
                <button
                  onClick={handlePrint}
                  className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print
                </button>
                <button
                  onClick={handleClosePrintPreview}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Close Preview
                </button>
              </div>
            </div>
          </div>

          {/* Print Preview Content */}
          <div className="max-w-4xl mx-auto p-8 bg-white">
            {/* Print Header */}
            <div className="text-center mb-8 pb-6 border-b-2 border-gray-300">
              <h1 className="text-3xl font-bold text-black mb-4">
                Enneagram Personality Test
              </h1>
              <div className="text-black space-y-1">
                {showNumberOfQuestions && (
                  <p>Number of Questions: {filteredQuestions.length} questions</p>
                )}
                {showFocusType && selectedType && (
                  <p>Focus Type: Type {selectedType} - {personalityTypes.find(t => t.type_number === selectedType)?.title}</p>
                )}
                {showTestDate && (
                  <p>Test Date: {new Date().toLocaleDateString('en-US')}</p>
                )}
              </div>
            </div>

            {/* Test Instructions */}
            {showScoringMethod && (
              <div className="mb-8 p-6 bg-gray-50 border border-gray-200">
                <h2 className="text-xl font-bold text-black mb-4">Test Instructions</h2>
                <div className="space-y-2 text-black">
                  <p>• Please answer each question based on your true feelings and behavioral patterns</p>
                  <p>• Choose the option that best matches your usual behavior, not what you think you &quot;should&quot; answer</p>
                  <p>• For each question, select one answer: 1=Strongly Disagree, 2=Disagree, 3=Neutral, 4=Agree, 5=Strongly Agree</p>
                  <p>• Please answer honestly - there are no right or wrong answers, only answers that are right for you</p>
                </div>
              </div>
            )}

            {/* Question List */}
            <div className="space-y-6">
              {filteredQuestions.map((question, index) => (
                <div key={question.id} className="border-b border-gray-300 pb-4 last:border-b-0">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-1">
                      <p className="text-lg text-black font-medium">
                        {index + 1}. {question.text}
                      </p>
                    </div>
                    <div className="flex gap-2 sm:gap-4 flex-wrap">
                      {[1, 2, 3, 4, 5].map(score => (
                        <label key={score} className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={score}
                            className="w-4 h-4 text-black border-gray-300"
                          />
                          <span className="ml-1 text-sm text-black">
                            {score}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}