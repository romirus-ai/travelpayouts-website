'use client'

import Link from 'next/link'
import { Plane } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { useLocalization } from '@/components/providers/localization-provider'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const { t } = useTranslation()
  const { locale, setLocale, currency, setCurrency, rubToUsdRate, isRateLoading } = useLocalization()

  const nav = useMemo(
    () => [
      { href: '/#flights', label: t('header.nav.flights') },
      { href: '/#hotels', label: t('header.nav.hotels') },
      { href: '/#destinations', label: t('header.nav.destinations') },
      { href: '/#esim', label: t('header.nav.esim') },
    ],
    [t]
  )

  useEffect(() => {
    const onScroll = () => setScrolled((window?.scrollY ?? 0) > 8)
    onScroll()
    window?.addEventListener?.('scroll', onScroll, { passive: true })
    return () => window?.removeEventListener?.('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all',
        scrolled ? 'backdrop-blur-md bg-white/75 shadow-sm' : 'bg-white/40 backdrop-blur-sm'
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-3 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-cyan-500 shadow-md shadow-sky-500/30 transition-transform group-hover:scale-105">
            <Plane className="h-5 w-5 -rotate-45 text-white" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-slate-900">
            Sales<span className="text-sky-600">Travel</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-sky-50 hover:text-sky-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-2 py-1 md:flex">
            <span className="text-xs text-slate-500">{t('header.language')}</span>
            <button
              type="button"
              onClick={() => setLocale('ru')}
              className={cn(
                'rounded-full px-2 py-1 text-xs font-semibold transition',
                locale === 'ru' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              )}
            >
              🇷🇺 RU
            </button>
            <button
              type="button"
              onClick={() => setLocale('en')}
              className={cn(
                'rounded-full px-2 py-1 text-xs font-semibold transition',
                locale === 'en' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              )}
            >
              🇬🇧 EN
            </button>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-2 py-1 md:flex">
            <span className="text-xs text-slate-500">{t('header.currency')}</span>
            <button
              type="button"
              onClick={() => setCurrency('RUB')}
              className={cn(
                'rounded-full px-2 py-1 text-xs font-semibold transition',
                currency === 'RUB' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              )}
            >
              ₽ RUB
            </button>
            <button
              type="button"
              onClick={() => setCurrency('USD')}
              className={cn(
                'rounded-full px-2 py-1 text-xs font-semibold transition',
                currency === 'USD' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              )}
            >
              $ USD
            </button>
          </div>

          <Link
            href="/#flights"
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-slate-800 hover:shadow-lg"
          >
            <Plane className="h-3.5 w-3.5 -rotate-45" /> {t('header.findTicket')}
          </Link>
        </div>
      </div>

      <div className="border-t border-slate-100 bg-white/70 px-4 py-1 text-center text-[11px] text-slate-500 md:hidden">
        {t('header.currencyRate', { rate: (1 / Math.max(rubToUsdRate, 0.0001)).toFixed(2) })}
        {isRateLoading ? '…' : ''}
      </div>
    </header>
  )
}
