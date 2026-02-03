'use server'

import type { Locale } from './config'

// We enumerate all dictionaries here for better webpack optimization
const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  'zh-TW': () => import('./dictionaries/zh-TW.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]()
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>
