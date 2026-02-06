import { MetadataRoute } from 'next'
import { i18n } from '@/i18n/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://beva.com.hk'
  
  // Define all routes
  const routes = [
    '',
    '/login',
    '/register',
    '/bookings',
  ]
  
  // Generate sitemap entries for all locale combinations
  const sitemapEntries: MetadataRoute.Sitemap = []
  
  for (const locale of i18n.locales) {
    for (const route of routes) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: {
            'en': `${baseUrl}/en${route}`,
            'zh-TW': `${baseUrl}/zh-TW${route}`,
          },
        },
      })
    }
  }
  
  return sitemapEntries
}
