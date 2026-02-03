import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { i18n } from './i18n/config'

// Get the preferred locale from the Accept-Language header
function getLocale(request: Request): string {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  const locales = i18n.locales

  return matchLocale(languages, locales, i18n.defaultLocale)
}

// Check if the pathname has a valid locale
function pathnameHasLocale(request: Request): boolean {
  const pathname = new URL(request.url).pathname
  return i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
}

// Public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  // Root paths with locale
  '/:locale',
  '/:locale/procedures',
  '/:locale/about',
  '/:locale/contact',
  '/:locale/faq',
  '/:locale/sign-in(.*)',
  '/:locale/sign-up(.*)',
  // Root paths without locale (will be redirected)
  '/',
  '/procedures',
  '/about',
  '/contact',
  '/faq',
  '/sign-in(.*)',
  '/sign-up(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  const pathname = new URL(req.url).pathname

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = !pathnameHasLocale(req)

  // If no locale in pathname, redirect to the detected locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(req)

    // Redirect to the path with locale prefix
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`, req.url)
    )
  }

  // Protect routes that require authentication
  // The bookings page and API routes should be protected
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
