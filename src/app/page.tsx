import { redirect } from 'next/navigation'
import { i18n } from '@/i18n/config'

// This page only renders when the middleware doesn't redirect (e.g., during development)
export default function RootPage() {
  redirect(`/${i18n.defaultLocale}`)
}
