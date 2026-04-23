'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ru from '@/locales/ru.json'
import en from '@/locales/en.json'

export const SUPPORTED_LOCALES = ['ru', 'en'] as const
export type AppLocale = (typeof SUPPORTED_LOCALES)[number]

export const SUPPORTED_CURRENCIES = ['RUB', 'USD'] as const
export type AppCurrency = (typeof SUPPORTED_CURRENCIES)[number]

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      ru: { translation: ru },
      en: { translation: en },
    },
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: { escapeValue: false },
  })
}

export default i18n
