import { type Metadata } from 'next'
import Image from 'next/image'
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import '../globals.css'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { i18n } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'
import { LanguageSwitcher } from '@/components/language-switcher'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang as 'en' | 'zh-TW')
  
  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as 'en' | 'zh-TW')

  return (
    <ClerkProvider>
      <html lang={lang} className="scroll-smooth">
        <body className={`${inter.variable} font-sans antialiased bg-white text-black`}>
          <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
              
              {/* Logo */}
              <Link href={`/${lang}`} className="flex items-center">
                <Image 
                  src="/BEVA1.svg" 
                  alt="BEVA Clinic" 
                  width={150} 
                  height={50} 
                  className="h-12 w-auto"
                />
              </Link>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-6">
                <a 
                  href={`/${lang}#procedures`} 
                  className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
                >
                  {dict.nav.procedures}
                </a>
                <a 
                  href={`/${lang}#about`} 
                  className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
                >
                  {dict.nav.about}
                </a>
                <a 
                  href={`/${lang}#contact`} 
                  className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
                >
                  {dict.nav.contact}
                </a>
                <a 
                  href={`/${lang}#faq`} 
                  className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
                >
                  {dict.nav.faq}
                </a>
              </nav>
              
              {/* Desktop Auth & Language */}
              <div className="hidden md:flex items-center gap-4">
                <LanguageSwitcher currentLang={lang as 'en' | 'zh-TW'} dictionary={{ language: dict.language }} />
                <SignedOut>
                  <Button asChild variant="ghost" className="text-gray-700 hover:text-black">
                    <Link href={`/${lang}/sign-in`}>{dict.nav.signIn}</Link>
                  </Button>
                  <Button asChild variant="ghost" className="text-gray-700 hover:text-black">
                    <Link href={`/${lang}/sign-up`}>{dict.nav.register}</Link>
                  </Button>
                  <Button asChild className="bg-black text-white hover:bg-gray-800">
                    <Link href={`/${lang}/bookings`}>{dict.nav.myBookings}</Link>
                  </Button>
                </SignedOut>
                <SignedIn>
                  <Button asChild className="bg-black text-white hover:bg-gray-800">
                    <Link href={`/${lang}/bookings`}>{dict.nav.myBookings}</Link>
                  </Button>
                  <UserButton />
                </SignedIn>
              </div>
              
              {/* Mobile Menu */}
              <div className="md:hidden flex items-center gap-2">
                <LanguageSwitcher currentLang={lang as 'en' | 'zh-TW'} dictionary={{ language: dict.language }} />
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-black">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">{dict.nav.menu}</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] bg-white">
                    <SheetTitle className="text-left text-lg font-bold text-black mb-6">
                      {dict.nav.menu}
                    </SheetTitle>
                    
                    {/* Mobile Nav Links */}
                    <nav className="flex flex-col gap-4 mb-8">
                      <a 
                        href={`/${lang}#procedures`} 
                        className="text-lg font-medium text-gray-700 hover:text-black transition-colors"
                      >
                        {dict.nav.procedures}
                      </a>
                      <a 
                        href={`/${lang}#about`} 
                        className="text-lg font-medium text-gray-700 hover:text-black transition-colors"
                      >
                        {dict.nav.about}
                      </a>
                      <a 
                        href={`/${lang}#contact`} 
                        className="text-lg font-medium text-gray-700 hover:text-black transition-colors"
                      >
                        {dict.nav.contact}
                      </a>
                      <a 
                        href={`/${lang}#faq`} 
                        className="text-lg font-medium text-gray-700 hover:text-black transition-colors"
                      >
                        {dict.nav.faq}
                      </a>
                    </nav>
                    
                    {/* Mobile Auth */}
                    <div className="flex flex-col gap-3">
                      <SignedOut>
                        <Button asChild variant="outline" className="w-full border-black text-black hover:bg-gray-100">
                          <Link href={`/${lang}/sign-in`}>{dict.nav.signIn}</Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full border-black text-black hover:bg-gray-100">
                          <Link href={`/${lang}/sign-up`}>{dict.nav.register}</Link>
                        </Button>
                        <Button asChild className="w-full bg-black text-white hover:bg-gray-800">
                          <Link href={`/${lang}/bookings`}>{dict.nav.myBookings}</Link>
                        </Button>
                      </SignedOut>
                      <SignedIn>
                        <Button asChild className="w-full bg-black text-white hover:bg-gray-800">
                          <Link href={`/${lang}/bookings`}>{dict.nav.myBookings}</Link>
                        </Button>
                        <div className="flex items-center justify-center gap-2 py-2">
                          <span className="text-sm text-gray-600">{dict.nav.loggedInAs}</span>
                          <UserButton />
                        </div>
                      </SignedIn>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              
            </div>
          </header>
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}
