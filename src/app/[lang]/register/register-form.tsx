"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Locale } from "@/i18n/config"
import { Dictionary } from "@/i18n/get-dictionary"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle } from "lucide-react"

interface RegisterFormProps {
  lang: Locale
  dict: Dictionary
}

export default function RegisterForm({ lang, dict }: RegisterFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError(lang === 'zh-TW' ? '請輸入您的姓名' : 'Please enter your name')
      return false
    }

    if (!formData.email.trim()) {
      setError(lang === 'zh-TW' ? '請輸入電郵地址' : 'Please enter your email')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError(lang === 'zh-TW' ? '請輸入有效的電郵地址' : 'Please enter a valid email address')
      return false
    }

    if (formData.password.length < 8) {
      setError(lang === 'zh-TW' ? '密碼必須至少 8 個字符' : 'Password must be at least 8 characters')
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setError(lang === 'zh-TW' ? '密碼不匹配' : 'Passwords do not match')
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!validateForm()) return

    setLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          lang,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || (lang === 'zh-TW' ? '註冊失敗' : 'Registration failed'))
      } else {
        setSuccess(true)
        // Auto redirect after 2 seconds
        setTimeout(() => {
          router.push(`/${lang}/login`)
        }, 2000)
      }
    } catch {
      setError(lang === 'zh-TW' ? '發生錯誤，請稍後再試' : 'An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {lang === 'zh-TW' ? '註冊成功！' : 'Registration Successful!'}
          </h2>
          <p className="text-gray-600 mb-4">
            {lang === 'zh-TW'
              ? '正在跳轉到登入頁面...'
              : 'Redirecting to login page...'}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">
              {lang === 'zh-TW' ? '姓名' : 'Full Name'}
            </Label>
            <Input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={lang === 'zh-TW' ? '您的姓名' : 'Your name'}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              {lang === 'zh-TW' ? '電郵地址' : 'Email Address'}
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@example.com"
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              {lang === 'zh-TW' ? '密碼' : 'Password'}
            </Label>
            <Input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder={lang === 'zh-TW' ? '至少 8 個字符' : 'At least 8 characters'}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              {lang === 'zh-TW' ? '確認密碼' : 'Confirm Password'}
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder={lang === 'zh-TW' ? '再次輸入密碼' : 'Re-enter password'}
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#00477f] hover:bg-[#003d70]"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {lang === 'zh-TW' ? '註冊' : 'Register'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
