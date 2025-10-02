'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'

interface TestResult {
  id: string
  personality_type: number
  scores: number[]
  created_at: string
}

interface UserProfile {
  id: string
  full_name: string
  email: string
  avatar_url?: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Redirect to home page since authentication is removed
    router.push('/')
  }, [router])

  const checkUser = async () => {
    // Authentication removed - redirect to home
    router.push('/')
  }

  const fetchTestResults = async () => {
    // No user authentication - redirect to home
    router.push('/')
  }

  const handleSignOut = async () => {
    // No authentication to sign out from - redirect to home
    router.push('/')
  }

  useEffect(() => {
    checkUser()
  }, [])

  useEffect(() => {
    if (user) {
      fetchTestResults()
    }
  }, [user])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">正在加载...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">仪表板功能已禁用</h1>
          <p className="text-xl text-gray-600 mb-8">
            由于移除了用户认证系统，仪表板功能暂时不可用。
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            返回首页
          </Link>
        </div>
      </div>
    </div>
  )
}