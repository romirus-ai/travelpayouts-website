'use client'

import { Smartphone, Globe, Zap, ArrowRight } from 'lucide-react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocalization } from '@/components/providers/localization-provider'

const MARKER = process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER ?? ''

function esimLink(subid: string) {
  const params = new URLSearchParams({
    marker: MARKER,
    subid: subid ?? '',
  })
  return `https://www.airalo.com/?${params.toString()}`
}

export function EsimSection() {
  const { t } = useTranslation()
  const { formatPrice, locale } = useLocalization()

  const plans = useMemo(
    () => [
      { region: locale === 'en' ? 'Europe' : 'Европа', priceRub: 790, data: '5 GB', days: 30, subid: 'esim_europe' },
      { region: locale === 'en' ? 'Asia' : 'Азия', priceRub: 690, data: '5 GB', days: 30, subid: 'esim_asia' },
      { region: locale === 'en' ? 'USA' : 'США', priceRub: 990, data: '5 GB', days: 30, subid: 'esim_usa' },
      { region: 'Global', priceRub: 2490, data: '10 GB', days: 30, subid: 'esim_global' },
    ],
    [locale]
  )

  const highlights = [
    { icon: Zap, text: t('esim.highlights.delivery') },
    { icon: Globe, text: t('esim.highlights.instant') },
    { icon: Smartphone, text: t('esim.highlights.devices') },
  ]

  return (
    <section id="esim" className="bg-slate-50 py-16 md:py-20">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-violet-600">{t('esim.badge')}</p>
            <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">{t('esim.title')}</h2>
            <p className="mt-3 text-sm text-slate-600 md:text-base">{t('esim.description')}</p>

            <div className="mt-6 space-y-3">
              {highlights.map((f, i) => {
                const Icon = f.icon
                return (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm text-slate-700">{f.text}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {plans.map((p) => (
              <a
                key={p.subid}
                href={esimLink(p.subid)}
                target="_blank"
                rel="sponsored nofollow noopener"
                className="group flex items-start justify-between gap-3 rounded-2xl bg-white p-5 shadow-md ring-1 ring-slate-100 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-sm">
                      <Smartphone className="h-4 w-4" />
                    </span>
                    <div className="font-display text-lg font-bold text-slate-900">{p.region}</div>
                  </div>
                  <div className="mt-2 text-xs text-slate-500">
                    {p.data} • {p.days} {t('esim.days')}
                  </div>
                  <div className="mt-3">
                    <span className="text-xs text-slate-500">{t('esim.planFrom')} </span>
                    <span className="font-display text-2xl font-bold text-slate-900">{formatPrice(p.priceRub)}</span>
                  </div>
                </div>
                <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white transition-all group-hover:bg-violet-600">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
