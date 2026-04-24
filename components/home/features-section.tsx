'use client'

import { Gauge, CreditCard, Globe2, Headphones } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function FeaturesSection() {
  const { t } = useTranslation()

  const features = [
    { icon: Gauge, title: t('features.items.fast.title'), text: t('features.items.fast.text') },
    { icon: CreditCard, title: t('features.items.payments.title'), text: t('features.items.payments.text') },
    { icon: Globe2, title: t('features.items.global.title'), text: t('features.items.global.text') },
    { icon: Headphones, title: t('features.items.support.title'), text: t('features.items.support.text') },
  ]

  return (
    <section className="bg-white/15 py-14 md:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-600">{t('features.badge')}</p>
          <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            {t('features.title')}
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <div
                key={i}
                className="glass-panel rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/80 hover:shadow-md"
              >
                <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-sky-600 shadow-sm">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="font-display text-lg font-bold text-slate-900">{f.title}</div>
                <p className="mt-1 text-sm text-slate-600">{f.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
