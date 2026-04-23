'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Plane, Clock } from 'lucide-react'
import { getDestinations } from '@/lib/destinations'
import { useLocalization } from '@/components/providers/localization-provider'
import { useTranslation } from 'react-i18next'

export function DestinationsSection() {
  const { locale, formatPrice } = useLocalization()
  const { t } = useTranslation()
  const destinations = getDestinations(locale)

  return (
    <section id="destinations" className="bg-white py-16 md:py-20">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
        <div className="mb-8 flex flex-col items-start gap-3 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-600">{t('destinations.badge')}</p>
            <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              {t('destinations.title')}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-600 md:text-base">{t('destinations.description')}</p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {destinations.map((d) => (
            <Link
              key={d.slug}
              href={`/search/${d.slug}`}
              className="group relative flex h-[360px] flex-col overflow-hidden rounded-2xl bg-slate-100 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="absolute inset-0">
                {d.image ? (
                  <Image
                    src={d.image}
                    alt={`${d.dest.name} — ${d.shortTitle}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/35 to-transparent" />
              </div>

              <div className="relative z-10 mt-auto p-5">
                <div className="mb-2 flex items-center gap-2 text-xs font-medium text-white/80">
                  <span className="rounded-full bg-white/15 px-2 py-0.5 font-mono uppercase backdrop-blur">{d.origin.code}</span>
                  <Plane className="h-3 w-3 rotate-45 text-white/80" />
                  <span className="rounded-full bg-white/15 px-2 py-0.5 font-mono uppercase backdrop-blur">{d.dest.code}</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-white">{d.shortTitle}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-white/80">{d.headline}</p>

                <div className="mt-3 flex items-end justify-between">
                  <div className="text-white">
                    <div className="text-xs text-white/70">{t('common.from')}</div>
                    <div className="font-display text-2xl font-bold leading-none">{formatPrice(d.priceFromRub)}</div>
                    <div className="mt-1 flex items-center gap-1 text-xs text-white/70">
                      <Clock className="h-3 w-3" /> {d.flightTime}
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-md transition-all group-hover:bg-sky-500 group-hover:text-white">
                    {t('destinations.cta')} <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
