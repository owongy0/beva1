import { Metadata } from "next"
import { Suspense } from "react"
import { getDictionary } from "@/i18n/get-dictionary"
import { Locale } from "@/i18n/config"
import RegisterForm from "./register-form"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'zh-TW' ? '註冊 - BEVA 診所' : 'Register - BEVA Clinic',
    description: lang === 'zh-TW' 
      ? '創建您的 BEVA 診所帳戶' 
      : 'Create your BEVA Clinic account',
  }
}

function RegisterFormSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-10 bg-gray-200 rounded" />
      <div className="h-10 bg-gray-200 rounded" />
      <div className="h-10 bg-gray-200 rounded" />
      <div className="h-10 bg-gray-200 rounded" />
    </div>
  )
}

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as Locale)

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 pt-8 pb-12 px-4 sm:pt-12 sm:px-6 lg:pt-16 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {lang === 'zh-TW' ? '創建帳戶' : 'Create Account'}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {lang === 'zh-TW' 
              ? '註冊以預約和管理您的預約' 
              : 'Sign up to book and manage your appointments'}
          </p>
        </div>
        
        <Suspense fallback={<RegisterFormSkeleton />}>
          <RegisterForm lang={lang as Locale} dict={dict} />
        </Suspense>
        
        <p className="text-center text-sm text-gray-600">
          {lang === 'zh-TW' ? '已有帳戶？' : 'Already have an account?'}{' '}
          <a href={`/${lang}/login`} className="text-[#00477f] hover:text-[#003d70] font-medium">
            {lang === 'zh-TW' ? '登入' : 'Sign in'}
          </a>
        </p>
      </div>
    </div>
  )
}
