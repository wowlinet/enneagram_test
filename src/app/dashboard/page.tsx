'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { User, Calendar, BarChart3, BookOpen, Settings, LogOut, Plus, Eye } from 'lucide-react'
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
  const supabase = createClient()

  const personalityTypes = [
    '完美主义者', '给予者', '成就者', '个人主义者', '调查者',
    '忠诚者', '热情者', '挑战者', '和平者'
  ]

  useEffect(() => {
    checkUser()
    fetchTestResults()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error || !user) {
        router.push('/auth/login')
        return
      }

      setUser({
        id: user.id,
        full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || '用户',
        email: user.email || '',
        avatar_url: user.user_metadata?.avatar_url
      })
    } catch (error) {
      console.error('Error checking user:', error)
      router.push('/auth/login')
    }
  }

  const fetchTestResults = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('test_results')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching test results:', error)
        return
      }

      setTestResults(data || [])
    } catch (error) {
      console.error('Error fetching test results:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/')
      toast.success('已成功退出登录')
    } catch (error) {
      toast.error('退出登录失败')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-xl font-bold text-purple-600">
                九型人格测试
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">欢迎，{user?.full_name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                退出
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - User Profile */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 border">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  {user?.avatar_url ? (
                    <img
                      src={user.avatar_url}
                      alt="Avatar"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10 text-white" />
                  )}
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{user?.full_name}</h2>
                <p className="text-gray-600">{user?.email}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-700">测试次数</span>
                  </div>
                  <span className="font-semibold text-purple-600">{testResults.length}</span>
                </div>

                <Link
                  href="/test"
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  开始新测试
                </Link>

                <Link
                  href="/articles"
                  className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  浏览文章
                </Link>
              </div>
            </div>
          </div>

          {/* Right Content - Test Results */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  测试历史
                </h3>
              </div>

              <div className="p-6">
                {testResults.length === 0 ? (
                  <div className="text-center py-12">
                    <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">还没有测试记录</h4>
                    <p className="text-gray-600 mb-6">开始您的第一次九型人格测试，了解真实的自己</p>
                    <Link
                      href="/test"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
                    >
                      <Plus className="w-4 h-4" />
                      开始测试
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {testResults.map((result) => (
                      <div
                        key={result.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-gray-900">
                              类型 {result.personality_type}: {personalityTypes[result.personality_type - 1]}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {formatDate(result.created_at)}
                            </p>
                          </div>
                          <Link
                            href={`/results/${result.id}`}
                            className="flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            查看详情
                          </Link>
                        </div>

                        {/* Score Preview */}
                        <div className="grid grid-cols-9 gap-1">
                          {result.scores.map((score, index) => (
                            <div key={index} className="text-center">
                              <div className="text-xs text-gray-500 mb-1">{index + 1}</div>
                              <div
                                className="h-2 bg-gray-200 rounded-full overflow-hidden"
                              >
                                <div
                                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300"
                                  style={{ width: `${(score / Math.max(...result.scores)) * 100}%` }}
                                />
                              </div>
                              <div className="text-xs text-gray-600 mt-1">{score}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}