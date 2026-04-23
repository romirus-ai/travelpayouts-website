'use client'

import { HotelSearch } from '@/components/search/hotel-search'
import { BedDouble, Hotel, Percent } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function HotelsSection() {
  const { t } = useTranslation()

  const features = [
    { icon: Hotel, title: t('hotels.features.inventory.title'), text: t('hotels.features.inventory.text') },
    { icon: Percent, title: t('hotels.features.discounts.title'), text: t('hotels.features.discounts.text') },
    { icon: BedDouble, title: t('hotels.features.cancel.title'), text: t('hotels.features.cancel.text') },
  ]

  return (
    <section id="hotels" className="bg-gradient-to-b from-emerald-50/60 to-white py-16 md:py-20">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{t('hotels.badge')}</p>
          <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">{t('hotels.title')}</h2>
          <p className="mt-2 text-sm text-slate-600 md:text-base">{t('hotels.description')}</p>
        </div>

        <HotelSearch />

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <div key={i} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-display font-semibold text-slate-900">{f.title}</div>
                  <div className="text-sm text-slate-600">{f.text}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
