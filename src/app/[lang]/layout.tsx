import { type Metadata } from 'next'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import '../globals.css'
import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from '@/components/ui/sheet'
import { Menu, Stethoscope, Users, Phone, HelpCircle, Calendar, LayoutDashboard, LogIn, Home, X } from 'lucide-react'
import { i18n } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'
import { LanguageSwitcher } from '@/components/language-switcher'
import { UserNav } from '@/components/user-nav'
import { Providers } from '../providers'
import { auth } from '@/auth'

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
  const session = await auth()
  const user = session?.user
  const isAdmin = user?.role === 'admin'

  const t = {
    menu: lang === 'zh-TW' ? '選單' : 'Menu',
    explore: lang === 'zh-TW' ? '瀏覽' : 'Explore',
    account: lang === 'zh-TW' ? '帳戶' : 'Account',
    quickContact: lang === 'zh-TW' ? '快速聯絡' : 'Quick Contact',
    home: lang === 'zh-TW' ? '首頁' : 'Home',
    myBookings: lang === 'zh-TW' ? '我的預約' : 'My Bookings',
    adminDashboard: lang === 'zh-TW' ? '管理員控制台' : 'Admin Dashboard',
    signIn: lang === 'zh-TW' ? '登入' : 'Sign In',
    callUs: lang === 'zh-TW' ? '致電我們' : 'Call Us',
  }

  return (
    <html lang={lang} className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-white text-black`}>
        <Providers>
          <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
              
              {/* Logo */}
              <Link href={`/${lang}`} className="flex items-center cursor-pointer">
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
                  className="relative text-sm font-medium text-gray-700 hover:text-black transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all hover:after:w-full"
                >
                  {dict.nav.procedures}
                </a>
                <a 
                  href={`/${lang}#about`} 
                  className="relative text-sm font-medium text-gray-700 hover:text-black transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all hover:after:w-full"
                >
                  {dict.nav.about}
                </a>
                <a 
                  href={`/${lang}#contact`} 
                  className="relative text-sm font-medium text-gray-700 hover:text-black transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all hover:after:w-full"
                >
                  {dict.nav.contact}
                </a>
                <a 
                  href={`/${lang}#faq`} 
                  className="relative text-sm font-medium text-gray-700 hover:text-black transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all hover:after:w-full"
                >
                  {dict.nav.faq}
                </a>
              </nav>
              
              {/* Desktop Right Section: Language + Bookings (if logged in) + User */}
              <div className="hidden md:flex items-center gap-4">
                <LanguageSwitcher currentLang={lang as 'en' | 'zh-TW'} dictionary={{ language: dict.language }} />
                {user && (
                  <Link
                    href={`/${lang}/bookings`}
                    className="flex items-center gap-2 px-4 py-2 bg-[#00477f]/10 text-[#00477f] rounded-lg text-sm font-medium hover:bg-[#00477f]/20 transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    {t.myBookings}
                  </Link>
                )}
                <UserNav lang={lang as 'en' | 'zh-TW'} dict={dict} />
              </div>
              
              {/* Mobile Menu */}
              <div className="md:hidden flex items-center gap-2">
                <LanguageSwitcher currentLang={lang as 'en' | 'zh-TW'} dictionary={{ language: dict.language }} />
                <Sheet>
                  <SheetTrigger asChild>
                    <button className="p-2 text-black hover:bg-gray-100 rounded-md transition-colors">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">{dict.nav.menu}</span>
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[280px] sm:w-[320px] bg-white p-0" showCloseButton={false}>
                    {/* Header with Logo and Close */}
                    <div className="p-4 sm:p-6 border-b bg-gray-50 flex items-center justify-between">
                      <SheetTitle className="text-left">
                        <Link href={`/${lang}`} className="flex items-center">
                          <Image 
                            src="/BEVA1.svg" 
                            alt="BEVA Clinic" 
                            width={120} 
                            height={40} 
                            className="h-8 sm:h-10 w-auto"
                          />
                        </Link>
                      </SheetTitle>
                      <SheetClose asChild>
                        <button className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors">
                          <X className="w-4 h-4 text-gray-600" />
                        </button>
                      </SheetClose>
                    </div>
                    
                    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto max-h-[calc(100vh-180px)]">
                      {/* Explore Section */}
                      <div>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 sm:mb-3">
                          {t.explore}
                        </h3>
                        <nav className="flex flex-col gap-0.5 sm:gap-1">
                          <MobileNavLink 
                            href={`/${lang}`} 
                            icon={<Home className="w-4 h-4 sm:w-5 sm:h-5" />}
                          >
                            {t.home}
                          </MobileNavLink>
                          <MobileNavLink 
                            href={`/${lang}#procedures`} 
                            icon={<Stethoscope className="w-4 h-4 sm:w-5 sm:h-5" />}
                          >
                            {dict.nav.procedures}
                          </MobileNavLink>
                          <MobileNavLink 
                            href={`/${lang}#about`} 
                            icon={<Users className="w-4 h-4 sm:w-5 sm:h-5" />}
                          >
                            {dict.nav.about}
                          </MobileNavLink>
                          <MobileNavLink 
                            href={`/${lang}#contact`} 
                            icon={<Phone className="w-4 h-4 sm:w-5 sm:h-5" />}
                          >
                            {dict.nav.contact}
                          </MobileNavLink>
                          <MobileNavLink 
                            href={`/${lang}#faq`} 
                            icon={<HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />}
                          >
                            {dict.nav.faq}
                          </MobileNavLink>
                        </nav>
                      </div>

                      {/* Account Section */}
                      <div>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 sm:mb-3">
                          {t.account}
                        </h3>
                        <nav className="flex flex-col gap-0.5 sm:gap-1">
                          {user ? (
                            <>
                              <MobileNavLink 
                                href={`/${lang}/bookings`} 
                                icon={<Calendar className="w-4 h-4 sm:w-5 sm:h-5" />}
                                className="text-[#00477f]"
                              >
                                {t.myBookings}
                              </MobileNavLink>
                              {isAdmin && (
                                <MobileNavLink 
                                  href={`/${lang}/admin`} 
                                  icon={<LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5" />}
                                  className="text-purple-600"
                                >
                                  {t.adminDashboard}
                                </MobileNavLink>
                              )}
                            </>
                          ) : (
                            <MobileNavLink 
                              href={`/${lang}/login`} 
                              icon={<LogIn className="w-4 h-4 sm:w-5 sm:h-5" />}
                              className="text-[#00477f]"
                            >
                              {t.signIn}
                            </MobileNavLink>
                          )}
                        </nav>
                      </div>

                      {/* Quick Contact */}
                      <div className="pt-3 sm:pt-4 border-t">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 sm:mb-3">
                          {t.quickContact}
                        </h3>
                        <a 
                          href={`tel:${dict.contact.phone.replace(/\s/g, '')}`}
                          className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors"
                        >
                          <Phone className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                          <div className="min-w-0">
                            <p className="font-medium text-sm">{dict.contact.phone}</p>
                            <p className="text-xs text-blue-600">{t.callUs}</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              
            </div>
          </header>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}

// Mobile Nav Link Component
function MobileNavLink({ 
  href, 
  children, 
  icon,
  className = ""
}: { 
  href: string
  children: React.ReactNode
  icon: React.ReactNode
  className?: string
}) {
  return (
    <SheetClose asChild>
      <a 
        href={href}
        className={`flex items-center gap-2 sm:gap-3 px-2.5 sm:px-3 py-2.5 sm:py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-black transition-colors min-h-[44px] ${className}`}
      >
        <span className="text-gray-400">{icon}</span>
        <span className="font-medium text-sm sm:text-base">{children}</span>
      </a>
    </SheetClose>
  )
}
