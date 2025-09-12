'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { Mail, CheckCircle, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'

export default function VerifyEmailPage() {
  const [email, setEmail] = useState('')
  const [isResending, setIsResending] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Get email from session or localStorage
    const getEmail = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.email) {
        setEmail(user.email)
      }
    }
    getEmail()

    // Check if user is already verified
    const checkVerification = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.email_confirmed_at) {
        router.push('/dashboard')
      }
    }
    checkVerification()

    // Start cooldown timer if needed
    const lastResend = localStorage.getItem('lastResendTime')
    if (lastResend) {
      const timeDiff = Date.now() - parseInt(lastResend)
      const remainingTime = Math.max(0, 60000 - timeDiff) // 60 seconds cooldown
      if (remainingTime > 0) {
        setResendCooldown(Math.ceil(remainingTime / 1000))
      }
    }
  }, [])

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  const handleResendEmail = async () => {
    if (!email || isResending || resendCooldown > 0) return

    setIsResending(true)

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      })

      if (error) {
        toast.error('重发邮件失败：' + error.message)
        return
      }

      toast.success('验证邮件已重新发送！')
      localStorage.setItem('lastResendTime', Date.now().toString())
      setResendCooldown(60)
    } catch (error) {
      toast.error('重发邮件失败，请重试')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-10 h-10 text-white" />
          </div>

          {/* Header */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">验证您的邮箱</h1>
          <p className="text-gray-600 mb-6">
            我们已向 <span className="font-medium text-gray-900">{email}</span> 发送了一封验证邮件。
            请点击邮件中的链接来激活您的账户。
          </p>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              接下来的步骤：
            </h3>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>检查您的邮箱收件箱</li>
              <li>查找来自我们的验证邮件</li>
              <li>点击邮件中的"验证邮箱"按钮</li>
              <li>返回此页面或直接登录</li>
            </ol>
          </div>

          {/* Resend Button */}
          <div className="space-y-4">
            <button
              onClick={handleResendEmail}
              disabled={isResending || resendCooldown > 0}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isResending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  发送中...
                </>
              ) : resendCooldown > 0 ? (
                <>
                  <RefreshCw className="w-4 h-4" />
                  {resendCooldown}秒后可重发
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  重新发送验证邮件
                </>
              )}
            </button>

            <p className="text-sm text-gray-500">
              没有收到邮件？请检查垃圾邮件文件夹，或者重新发送验证邮件。
            </p>
          </div>

          {/* Navigation Links */}
          <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
            <Link
              href="/auth/login"
              className="block text-purple-600 hover:text-purple-700 font-medium transition-colors"
            >
              已验证？立即登录
            </Link>
            <Link
              href="/"
              className="block text-gray-600 hover:text-gray-800 transition-colors"
            >
              返回首页
            </Link>
          </div>
        </div>

        {/* Help Text */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            遇到问题？请联系我们的{' '}
            <Link href="/support" className="text-purple-600 hover:text-purple-700">
              客服支持
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}