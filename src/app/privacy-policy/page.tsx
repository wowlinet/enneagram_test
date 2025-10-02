import type { Metadata } from 'next'
import { Shield, Eye, Lock, Users, FileText, Clock, AlertCircle, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy - Enneagram Test',
  description: 'Learn how we collect, use, and protect your personal information when you use our Enneagram personality test.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Shield className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: January 15, 2024
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Quick Overview */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
            <div className="flex items-start">
              <AlertCircle className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Quick Overview</h3>
                <p className="text-blue-800">
                  We collect minimal personal information necessary to provide our Enneagram test service. We never sell your data, 
                  and you have full control over your information. Your test results are encrypted and stored securely.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            
            {/* Information We Collect */}
            <section>
              <div className="flex items-center mb-4">
                <Eye className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">1. Information We Collect</h2>
              </div>
              
              <div className="space-y-4 ml-9">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Email address (for account creation and communication)</li>
                    <li>Name (optional, for personalized results)</li>
                    <li>Age range (for demographic analysis)</li>
                    <li>Test responses and results</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Technical Information</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>IP address and browser information</li>
                    <li>Device type and operating system</li>
                    <li>Usage patterns and interaction data</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section>
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">2. How We Use Your Information</h2>
              </div>
              
              <div className="ml-9 space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600">Provide and improve our Enneagram test service</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600">Generate personalized test results and recommendations</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600">Send important updates about your account or our services</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600">Conduct research to improve our assessment accuracy (anonymized data only)</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600">Ensure security and prevent fraud or abuse</p>
                </div>
              </div>
            </section>

            {/* Data Protection */}
            <section>
              <div className="flex items-center mb-4">
                <Lock className="h-6 w-6 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">3. Data Protection &amp; Security</h2>
              </div>
              
              <div className="ml-9 space-y-4">
                <p className="text-gray-600">
                  We implement industry-standard security measures to protect your personal information:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Encryption</h4>
                    <p className="text-sm text-gray-600">All data is encrypted in transit and at rest using AES-256 encryption.</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Access Control</h4>
                    <p className="text-sm text-gray-600">Strict access controls ensure only authorized personnel can access your data.</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Regular Audits</h4>
                    <p className="text-sm text-gray-600">We conduct regular security audits and vulnerability assessments.</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Data Minimization</h4>
                    <p className="text-sm text-gray-600">We collect only the minimum data necessary for our services.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookie Policy */}
            <section>
              <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 text-orange-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">4. Cookie Policy</h2>
              </div>
              
              <div className="ml-9 space-y-4">
                <p className="text-gray-600">
                  We use cookies and similar technologies to enhance your experience:
                </p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">Essential Cookies</h4>
                    <p className="text-gray-600 text-sm">Required for basic site functionality and security.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900">Analytics Cookies</h4>
                    <p className="text-gray-600 text-sm">Help us understand how visitors interact with our website (anonymized).</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900">Preference Cookies</h4>
                    <p className="text-gray-600 text-sm">Remember your settings and preferences for a better experience.</p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm">
                  You can control cookie settings through your browser preferences. Note that disabling certain cookies may affect site functionality.
                </p>
              </div>
            </section>

            {/* Your Rights */}
            <section>
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-red-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">5. Your Rights</h2>
              </div>
              
              <div className="ml-9 space-y-3">
                <p className="text-gray-600 mb-4">
                  You have the following rights regarding your personal information:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-900">Access</h4>
                    <p className="text-sm text-gray-600">Request a copy of your personal data we hold.</p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-gray-900">Correction</h4>
                    <p className="text-sm text-gray-600">Update or correct inaccurate information.</p>
                  </div>
                  
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h4 className="font-semibold text-gray-900">Deletion</h4>
                    <p className="text-sm text-gray-600">Request deletion of your personal data.</p>
                  </div>
                  
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-gray-900">Portability</h4>
                    <p className="text-sm text-gray-600">Export your data in a machine-readable format.</p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mt-4">
                  To exercise these rights, please contact us at privacy@enneagramtest.com. We will respond within 30 days.
                </p>
              </div>
            </section>

            {/* Data Retention */}
            <section>
              <div className="flex items-center mb-4">
                <Clock className="h-6 w-6 text-indigo-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">6. Data Retention</h2>
              </div>
              
              <div className="ml-9 space-y-3">
                <p className="text-gray-600">
                  We retain your personal information only as long as necessary:
                </p>
                
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li><strong>Account Data:</strong> Retained while your account is active, plus 3 years after closure</li>
                  <li><strong>Test Results:</strong> Stored indefinitely unless you request deletion</li>
                  <li><strong>Analytics Data:</strong> Anonymized and retained for up to 2 years</li>
                  <li><strong>Communication Records:</strong> Kept for 7 years for legal compliance</li>
                </ul>
              </div>
            </section>

            {/* Third-Party Services */}
            <section>
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">7. Third-Party Services</h2>
              </div>
              
              <div className="ml-9 space-y-3">
                <p className="text-gray-600">
                  We may use trusted third-party services that comply with our privacy standards:
                </p>
                
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Cloud hosting providers (AWS, Google Cloud) for secure data storage</li>
                  <li>Email service providers for account communications</li>
                  <li>Analytics services for website improvement (anonymized data only)</li>
                  <li>Payment processors for subscription services (we don&apos;t store payment details)</li>
                </ul>
                
                <p className="text-gray-600 text-sm">
                  All third-party services are bound by strict data processing agreements and privacy commitments.
                </p>
              </div>
            </section>

            {/* International Transfers */}
            <section>
              <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 text-pink-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">8. International Data Transfers</h2>
              </div>
              
              <div className="ml-9">
                <p className="text-gray-600">
                  Your information may be transferred to and processed in countries other than your own. We ensure adequate 
                  protection through appropriate safeguards such as Standard Contractual Clauses and adequacy decisions 
                  recognized by relevant data protection authorities.
                </p>
              </div>
            </section>

            {/* Changes to Policy */}
            <section>
              <div className="flex items-center mb-4">
                <AlertCircle className="h-6 w-6 text-amber-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">9. Changes to This Policy</h2>
              </div>
              
              <div className="ml-9">
                <p className="text-gray-600">
                  We may update this privacy policy from time to time. We will notify you of any material changes by 
                  email or through a prominent notice on our website. Your continued use of our services after such 
                  modifications constitutes acceptance of the updated policy.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              
              <div className="space-y-2 text-gray-600">
                <p><strong>Email:</strong> privacy@enneagramtest.com</p>
              </div>
              
              <p className="text-sm text-gray-500 mt-4">
                We are committed to resolving any privacy concerns promptly and transparently.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}