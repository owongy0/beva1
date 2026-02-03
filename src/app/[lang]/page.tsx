import { getDictionary } from '@/i18n/get-dictionary'
import { i18n } from '@/i18n/config'
import HomePageClient from './page-client'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dictionary = await getDictionary(lang as 'en' | 'zh-TW')

  return <HomePageClient lang={lang as 'en' | 'zh-TW'} dictionary={dictionary} />
}
