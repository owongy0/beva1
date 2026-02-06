import { Metadata } from "next"
import { Suspense } from "react"
import Link from "next/link"
import { getDictionary } from "@/i18n/get-dictionary"
import { Locale } from "@/i18n/config"
import LoginForm from "./login-form"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'zh-TW' ? '登入 - BEVA 診所' : 'Sign In - BEVA Clinic',
    description: lang === 'zh-TW' 
      ? '登入您的 BEVA 診所帳戶' 
      : 'Sign in to your BEVA Clinic account',
  }
}

function LoginFormSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-10 bg-gray-200 rounded" />
      <div className="h-10 bg-gray-200 rounded" />
      <div className="h-10 bg-gray-200 rounded" />
    </div>
  )
}

export default async function LoginPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as Locale)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {lang === 'zh-TW' ? '歡迎回來' : 'Welcome back'}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {lang === 'zh-TW' 
              ? '登入您的帳戶以管理預約' 
              : 'Sign in to your account to manage bookings'}
          </p>
        </div>
        
        <Suspense fallback={<LoginFormSkeleton />}>
          <LoginForm lang={lang as Locale} dict={dict} />
        </Suspense>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {lang === 'zh-TW' ? '還沒有帳戶？' : "Don't have an account?"}{' '}
            <Link href={`/${lang}/register`} className="text-[#00477f] hover:text-[#003d70] font-medium">
              {lang === 'zh-TW' ? '立即註冊' : 'Register now'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
