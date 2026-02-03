import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
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

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = !pathnameHasLocale(request)

  // If no locale in pathname, redirect to the detected locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)

    // Redirect to the path with locale prefix
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`, request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
