'use client'

import { useMemo, useState } from 'react'
import { Building2, CalendarDays, Users, Search } from 'lucide-react'
import { CityAutocomplete, type CityValue } from './city-autocomplete'
import { buildHotellookUrl } from '@/lib/travelpayouts'
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
  defaultDestination?: CityValue | null
}

export function HotelSearch({ defaultDestination = null }: Props) {
  const [dest, setDest] = useState<CityValue | null>(defaultDestination)
  const [checkIn, setCheckIn] = useState<string>('')
  const [checkOut, setCheckOut] = useState<string>('')
  const [adults, setAdults] = useState<number>(2)
  const [loading, setLoading] = useState(false)

  const { t } = useTranslation()
  const { locale, currency } = useLocalization()

  const minDate = useMemo(() => todayPlus(0), [])
  const minOut = useMemo(() => (checkIn ? checkIn : minDate), [checkIn, minDate])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!dest?.name) {
      toast.error(t('search.hotel.errorCity'))
      return
    }

    setLoading(true)

    const trackPayload = {
      kind: 'hotel',
      destination: dest.code,
      query: dest.name,
      depart: checkIn,
      return: checkOut,
      currency,
      locale,
    }

    try {
      const url = buildHotellookUrl({
        destination: dest.name,
        checkIn: checkIn || undefined,
        checkOut: checkOut || undefined,
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
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_auto_auto]">
        <CityAutocomplete
          label={t('search.hotel.destination')}
          value={dest}
          onChange={setDest}
          icon={<Building2 className="h-4 w-4" />}
          placeholder={t('search.hotel.destinationPlaceholder')}
        />

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">{t('search.hotel.checkIn')}</label>
          <div className="relative">
            <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="date"
              min={minDate}
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-base text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">{t('search.hotel.checkOut')}</label>
          <div className="relative">
            <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="date"
              min={minOut}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-base text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">{t('search.hotel.guests')}</label>
          <div className="relative">
            <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              value={String(adults)}
              onChange={(e) => setAdults(parseInt(e.target.value, 10) || 2)}
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
            disabled={loading}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-6 text-base font-semibold text-white shadow-md shadow-emerald-500/30 transition hover:shadow-lg hover:brightness-110 disabled:opacity-60 sm:text-sm lg:w-auto"
          >
            <Search className="h-4 w-4" /> {t('common.searchHotel')}
          </button>
        </div>
      </div>
    </form>
  )
}
