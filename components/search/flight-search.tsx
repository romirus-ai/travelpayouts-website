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

  const { t } = useTranslation()
  const { locale, currency } = useLocalization()

  const minDate = useMemo(() => todayPlus(0), [])
  const minBack = useMemo(() => (depart ? depart : minDate), [depart, minDate])

  const swap = () => {
    setOrigin(dest)
    setDest(origin)
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!origin?.code || !dest?.code) {
      toast.error(t('search.flight.errorCity'))
      return
    }

    setLoading(true)
    try {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          kind: 'flight',
          origin: origin.code,
          destination: dest.code,
          depart,
          return: back,
          currency,
          locale,
        }),
      }).catch(() => {})

      const url = buildAviasalesSearchUrl({
        origin: origin.code,
        destination: dest.code,
        depart: depart || undefined,
        back: back || undefined,
        adults,
        locale,
        currency,
      })
      window.open(url, '_blank', 'noopener')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full rounded-2xl bg-white p-4 shadow-xl ring-1 ring-slate-100 md:p-5">
      {compactTitle ? (
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
          <Plane className="h-4 w-4 text-sky-600 -rotate-45" /> {compactTitle}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto_1fr_auto_auto_auto_auto]">
        <CityAutocomplete
          label={t('search.flight.origin')}
          value={origin}
          onChange={setOrigin}
          icon={<Plane className="h-4 w-4 -rotate-45" />}
          placeholder={t('search.flight.originPlaceholder')}
        />

        <button
          type="button"
          onClick={swap}
          className="hidden h-11 items-center justify-center self-end rounded-full bg-slate-50 p-2 text-slate-500 transition hover:bg-sky-50 hover:text-sky-600 md:flex"
          aria-label={t('search.flight.swap')}
        >
          <ArrowLeftRight className="h-4 w-4" />
        </button>

        <CityAutocomplete
          label={t('search.flight.destination')}
          value={dest}
          onChange={setDest}
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
              onChange={(e) => setDepart(e.target.value)}
              className="h-11 w-full min-w-[140px] rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
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
              className="h-11 w-full min-w-[140px] rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
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
              className="h-11 w-full min-w-[90px] appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
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
            disabled={loading}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-500 px-6 text-sm font-semibold text-white shadow-md shadow-sky-500/30 transition hover:shadow-lg hover:brightness-110 disabled:opacity-60 md:w-auto"
          >
            <Search className="h-4 w-4" /> {t('common.search')}
          </button>
        </div>
      </div>
    </form>
  )
}
