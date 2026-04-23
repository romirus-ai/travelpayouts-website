'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n, { type AppCurrency, type AppLocale } from '@/lib/i18n'

const LOCALE_KEY = 'sales-travel.locale'
const CURRENCY_KEY = 'sales-travel.currency'

type LocalizationContextValue = {
  locale: AppLocale
  setLocale: (locale: AppLocale) => void
  currency: AppCurrency
  setCurrency: (currency: AppCurrency) => void
  rubToUsdRate: number
  isRateLoading: boolean
  convertRubToCurrent: (rubAmount: number) => number
  formatPrice: (rubAmount: number) => string
}

const LocalizationContext = createContext<LocalizationContextValue | null>(null)

function localeToIntl(locale: AppLocale): string {
  return locale === 'en' ? 'en-US' : 'ru-RU'
}

export function LocalizationProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<AppLocale>('ru')
  const [currency, setCurrencyState] = useState<AppCurrency>('RUB')
  const [rubToUsdRate, setRubToUsdRate] = useState(0.011)
  const [isRateLoading, setIsRateLoading] = useState(false)

  useEffect(() => {
    const savedLocale = (localStorage.getItem(LOCALE_KEY) ?? 'ru') as AppLocale
    const savedCurrency = (localStorage.getItem(CURRENCY_KEY) ?? 'RUB') as AppCurrency

    setLocaleState(savedLocale === 'en' ? 'en' : 'ru')
    setCurrencyState(savedCurrency === 'USD' ? 'USD' : 'RUB')
  }, [])

  useEffect(() => {
    i18n.changeLanguage(locale).catch(() => {})
    document.documentElement.lang = locale
    localStorage.setItem(LOCALE_KEY, locale)
  }, [locale])

  useEffect(() => {
    localStorage.setItem(CURRENCY_KEY, currency)
  }, [currency])

  useEffect(() => {
    let active = true

    const loadRate = async () => {
      setIsRateLoading(true)
      try {
        const res = await fetch('/api/exchange-rate?from=RUB&to=USD', {
          cache: 'no-store',
        })
        if (!res.ok) return
        const data = (await res.json()) as { rate?: number }
        if (active && typeof data?.rate === 'number' && Number.isFinite(data.rate) && data.rate > 0) {
          setRubToUsdRate(data.rate)
        }
      } catch {
        // keep fallback rate
      } finally {
        if (active) setIsRateLoading(false)
      }
    }

    loadRate().catch(() => {})

    return () => {
      active = false
    }
  }, [])

  const value = useMemo<LocalizationContextValue>(() => {
    const convertRubToCurrent = (rubAmount: number) => {
      if (currency === 'USD') return rubAmount * rubToUsdRate
      return rubAmount
    }

    const formatPrice = (rubAmount: number) => {
      const amount = convertRubToCurrent(rubAmount)
      return new Intl.NumberFormat(localeToIntl(locale), {
        style: 'currency',
        currency,
        maximumFractionDigits: currency === 'USD' ? 2 : 0,
      }).format(amount)
    }

    return {
      locale,
      setLocale: setLocaleState,
      currency,
      setCurrency: setCurrencyState,
      rubToUsdRate,
      isRateLoading,
      convertRubToCurrent,
      formatPrice,
    }
  }, [locale, currency, rubToUsdRate, isRateLoading])

  return (
    <I18nextProvider i18n={i18n}>
      <LocalizationContext.Provider value={value}>{children}</LocalizationContext.Provider>
    </I18nextProvider>
  )
}

export function useLocalization() {
  const ctx = useContext(LocalizationContext)
  if (!ctx) throw new Error('useLocalization must be used within LocalizationProvider')
  return ctx
}
