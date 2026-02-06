import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { i18n } from './i18n/config'

// Get the preferred locale from the Accept-Language header
function getLocale(request: Request): string {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  try {
    // Use negotiator and intl-localematcher to get best locale
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
    const locales = i18n.locales

    // Filter out invalid locales that might cause errors
    const validLanguages = languages.filter(lang => {
      try {
        // Test if it's a valid locale
        Intl.getCanonicalLocales(lang)
        return true
      } catch {
        return false
      }
    })

    if (validLanguages.length === 0) {
      return i18n.defaultLocale
    }

    return matchLocale(validLanguages, locales, i18n.defaultLocale)
  } catch (error) {
    // Fallback to default locale if anything goes wrong
    console.log('Locale detection failed, using default:', error)
    return i18n.defaultLocale
  }
}

// Check if the pathname has a valid locale
function pathnameHasLocale(request: Request): boolean {
  const pathname = new URL(request.url).pathname
  return i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
}

// Define protected routes
const protectedRoutes = ['/bookings']
const adminRoutes = ['/admin']
const authRoutes = ['/login']

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Skip API routes
  if (pathname.startsWith('/api/')) {
    return NextResponse.next()
  }
  
  // Get the token from cookies (NextAuth session token)
  const token = request.cookies.get('next-auth.session-token')?.value || 
                request.cookies.get('__Secure-next-auth.session-token')?.value
  
  // Check if this is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.includes(route)
  )
  
  const isAdminRoute = adminRoutes.some(route => 
    pathname.includes(route)
  )
  
  const isAuthRoute = authRoutes.some(route => 
    pathname.endsWith(route)
  )

  // Handle locale detection and redirection
  const pathnameIsMissingLocale = !pathnameHasLocale(request)

  // If no locale in pathname, we need to redirect to add locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    
    // Check if this is an auth callback or static file
    if (pathname.includes('_next') || pathname.startsWith('/_next')) {
      return NextResponse.next()
    }

    // Redirect to the path with locale prefix
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`, request.url)
    )
  }
  
  // Extract locale from pathname
  const pathnameLocale = i18n.locales.find(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  
  const locale = pathnameLocale || i18n.defaultLocale

  // Redirect authenticated users away from login page
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
