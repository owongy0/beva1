"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { Locale } from "@/i18n/config"
import { Dictionary } from "@/i18n/get-dictionary"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

interface LoginFormProps {
  lang: Locale
  dict: Dictionary
}

export default function LoginForm({ lang, dict }: LoginFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || `/${lang}`
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      })

      if (result?.error) {
        setError(
          lang === 'zh-TW' 
            ? '電郵或密碼無效' 
            : 'Invalid email or password'
        )
      } else {
        router.push(callbackUrl)
        router.refresh()
      }
    } catch {
      setError(
        lang === 'zh-TW' 
          ? '發生錯誤，請稍後再試' 
          : 'An error occurred. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">
              {lang === 'zh-TW' ? '電郵地址' : 'Email address'}
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={lang === 'zh-TW' ? '您的電郵' : 'your@email.com'}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              {lang === 'zh-TW' ? '密碼' : 'Password'}
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#00477f] hover:bg-[#003d70]"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {lang === 'zh-TW' ? '登入' : 'Sign In'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
