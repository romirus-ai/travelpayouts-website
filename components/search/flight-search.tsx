'use client'

import { useMemo, useState } from 'react'
import { Plane, ArrowLeftRight, CalendarDays, Users, Search } from 'lucide-react'
import { CityAutocomplete, type CityValue } from './city-autocomplete'
import { buildAviasalesSearchUrl } from '@/lib/travelpayouts'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useLocalization } from '@/components/providers/localization-provider'

function todayPlus(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${dd}`
}

interface Props {
  defaultOrigin?: CityValue | null
  defaultDestination?: CityValue | null
  compactTitle?: string
}

export function FlightSearch({ defaultOrigin = null, defaultDestination = null, compactTitle }: Props) {
  const [origin, setOrigin] = useState<CityValue | null>(defaultOrigin)
  const [dest, setDest] = useState<CityValue | null>(defaultDestination)
  const [depart, setDepart] = useState<string>('')
  const [back, setBack] = useState<string>('')
  const [adults, setAdults] = useState<number>(1)
  const [loading, setLoading] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)

  const { t } = useTranslation()
  const { locale, currency } = useLocalization()

  const minDate = useMemo(() => todayPlus(0), [])
  const minBack = useMemo(() => (depart ? depart : minDate), [depart, minDate])

  const hasOrigin = Boolean(origin?.code)
  const hasDestination = Boolean(dest?.code)
  const hasDepartDate = Boolean(depart)
  const isFormValid = hasOrigin && hasDestination && hasDepartDate

  const swap = () => {
    setOrigin(dest)
    setDest(origin)
    setValidationError(null)
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const originCode = origin?.code
    const destinationCode = dest?.code

    if (!originCode || !destinationCode) {
      const message = t('search.flight.errorCityAutocomplete')
      setValidationError(message)
      toast.error(message)
      return
    }

    if (!hasDepartDate) {
      const message = t('search.flight.errorDate')
      setValidationError(message)
      toast.error(message)
      return
    }

    setValidationError(null)
    setLoading(true)

    const trackPayload = {
      kind: 'flight',
      origin: originCode,
      destination: destinationCode,
      depart,
      return: back,
      currency,
      locale,
    }

    try {
      const url = buildAviasalesSearchUrl({
        origin: originCode,
        destination: destinationCode,
        depart: depart || undefined,
        back: back || undefined,
        adults,
        locale,
        currency,
      })

      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        const body = new Blob([JSON.stringify(trackPayload)], { type: 'application/json' })
        navigator.sendBeacon('/api/track', body)
      } else {
        fetch('/api/track', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(trackPayload),
        }).catch(() => {})
      }

      window.location.href = url
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full rounded-2xl bg-white p-4 shadow-xl ring-1 ring-slate-100 sm:p-5 md:p-6">
      {compactTitle ? (
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
          <Plane className="h-4 w-4 text-sky-600 -rotate-45" /> {compactTitle}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_auto_auto_auto]">
        <CityAutocomplete
          label={t('search.flight.origin')}
          value={origin}
          onChange={(value) => {
            setOrigin(value)
            if (validationError) setValidationError(null)
          }}
          icon={<Plane className="h-4 w-4 -rotate-45" />}
          placeholder={t('search.flight.originPlaceholder')}
        />

        <button
          type="button"
          onClick={swap}
          className="order-3 inline-flex h-11 w-full items-center justify-center self-end rounded-xl bg-slate-50 p-2 text-slate-600 transition hover:bg-sky-50 hover:text-sky-600 sm:order-none lg:h-12 lg:w-12 lg:rounded-full"
          aria-label={t('search.flight.swap')}
        >
          <ArrowLeftRight className="h-4 w-4" />
        </button>

        <CityAutocomplete
          label={t('search.flight.destination')}
          value={dest}
          onChange={(value) => {
            setDest(value)
            if (validationError) setValidationError(null)
          }}
          icon={<Plane className="h-4 w-4 rotate-45" />}
          placeholder={t('search.flight.destinationPlaceholder')}
        />

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">{t('search.flight.depart')}</label>
          <div className="relative">
            <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="date"
              min={minDate}
              value={depart}
              onChange={(e) => {
                setDepart(e.target.value)
                if (validationError) setValidationError(null)
              }}
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-base text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">{t('search.flight.return')}</label>
          <div className="relative">
            <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="date"
              min={minBack}
              value={back}
              onChange={(e) => setBack(e.target.value)}
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-base text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">{t('search.flight.passengers')}</label>
          <div className="relative">
            <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              value={String(adults)}
              onChange={(e) => setAdults(parseInt(e.target.value, 10) || 1)}
              className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-base text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 sm:min-w-[96px] sm:text-sm"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading || !isFormValid}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-500 px-6 text-base font-semibold text-white shadow-md shadow-sky-500/30 transition hover:shadow-lg hover:brightness-110 disabled:cursor-not-allowed disabled:from-slate-400 disabled:to-slate-500 disabled:shadow-none disabled:hover:brightness-100 sm:text-sm lg:w-auto"
          >
            <Search className="h-4 w-4" /> {t('common.search')}
          </button>
        </div>
      </div>

      {validationError ? <p className="mt-3 text-sm text-rose-600">{validationError}</p> : null}
    </form>
  )
}
