'use client'

import { useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Plane, Clock, Wallet, MapPin, CalendarCheck, Info, ArrowLeft } from 'lucide-react'
import { getDestination, getDestinationByRouteId, getDestinations } from '@/lib/destinations'
import { RouteSearch } from './route-search'
import { useLocalization } from '@/components/providers/localization-provider'
import { useTranslation } from 'react-i18next'

export function RoutePageClient({ route }: { route: string }) {
  const router = useRouter()
  const { locale, formatPrice, currency } = useLocalization()
  const { t } = useTranslation()

  const destination = useMemo(() => getDestination(route), [route])

  useEffect(() => {
    if (!destination) return
    if (destination.locale === locale) return

    const translated = getDestinationByRouteId(destination.routeId, locale)
    if (translated && translated.slug !== route) {
      router.replace(`/search/${translated.slug}`)
    }
  }, [destination, locale, route, router])

  if (!destination) return null

  const related = getDestinations(locale).filter((x) => x.slug !== destination.slug)

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Flight',
    flightNumber: `${destination.origin.code}-${destination.dest.code}`,
    provider: { '@type': 'Organization', name: 'Sales Travel' },
    departureAirport: { '@type': 'Airport', iataCode: destination.origin.code, name: destination.origin.name },
    arrivalAirport: { '@type': 'Airport', iataCode: destination.dest.code, name: destination.dest.name },
    estimatedFlightDuration: destination.flightTime,
    offers: {
      '@type': 'Offer',
      price: destination.priceFromRub,
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
    },
  }

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('common.home'), item: '/' },
      { '@type': 'ListItem', position: 2, name: destination.shortTitle, item: `/search/${destination.slug}` },
    ],
  }

  return (
    <main className="relative pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 -z-10">
          {destination.image ? (
            <Image
              src={destination.image}
              alt={`${destination.dest.name} — ${destination.shortTitle}`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/75 via-slate-900/55 to-white/10" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FFD700]/20 via-[#FFA500]/15 to-[#DAA520]/20 mix-blend-screen" />
        </div>

        <div className="mx-auto w-full max-w-[1200px] px-4 pb-10 pt-16 md:px-6 md:pb-16 md:pt-24">
          <Link
            href="/"
            className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur transition hover:bg-white/25"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> {t('routePage.toSearch')}
          </Link>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-medium text-white/85">
            <span className="rounded-full bg-white/15 px-2.5 py-0.5 font-mono uppercase backdrop-blur">{destination.origin.code}</span>
            <Plane className="h-3 w-3 rotate-45 text-white/85" />
            <span className="rounded-full bg-white/15 px-2.5 py-0.5 font-mono uppercase backdrop-blur">{destination.dest.code}</span>
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 backdrop-blur">
              <Clock className="mr-1 inline h-3 w-3" />
              {destination.flightTime}
            </span>
            <span className="rounded-full bg-emerald-500/80 px-2.5 py-0.5 text-white">
              <Wallet className="mr-1 inline h-3 w-3" />
              {t('common.from')} {formatPrice(destination.priceFromRub)}
            </span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white md:text-5xl">{destination.title}</h1>
          <p className="mt-3 max-w-2xl text-base text-white/85 md:text-lg">{destination.lead}</p>

          <div className="mt-8">
            <RouteSearch
              defaultOrigin={{ code: destination.origin.code, name: destination.origin.name }}
              defaultDestination={{ code: destination.dest.code, name: destination.dest.name }}
            />
          </div>
        </div>
      </section>

      <section className="bg-white/20 py-14">
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: Clock, label: t('routePage.timeInAir'), value: destination.flightTime },
              { icon: Wallet, label: t('routePage.pricesFrom'), value: formatPrice(destination.priceFromRub) },
              { icon: MapPin, label: t('routePage.direction'), value: `${destination.origin.name} → ${destination.dest.name}` },
            ].map((x, i) => {
              const Icon = x.icon
              return (
                <div key={i} className="glass-panel rounded-2xl p-5">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="mt-2 text-xs uppercase tracking-wide text-slate-500">{x.label}</div>
                  <div className="font-display text-xl font-bold text-slate-900">{x.value}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-white/10 py-14">
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-600">{t('routePage.tipsBadge')}</p>
          <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            {t('routePage.tipsTitle', { route: destination.shortTitle })}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {destination.tips.map((tip, i) => (
              <div key={i} className="glass-panel flex items-start gap-3 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-md">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
                  <Info className="h-4 w-4" />
                </span>
                <div>
                  <div className="font-display text-lg font-bold text-slate-900">{tip.title}</div>
                  <p className="mt-1 text-sm text-slate-700">{tip.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/15 py-14">
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">{t('routePage.faqBadge')}</p>
          <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            {t('routePage.faqTitle', { route: destination.shortTitle })}
          </h2>
          <div className="mt-6 space-y-3">
            {destination.faq.map((q, i) => (
              <details key={i} className="group glass-panel rounded-2xl p-5 transition-all open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                  <span className="flex items-center gap-2 font-display text-base font-semibold text-slate-900">
                    <CalendarCheck className="h-4 w-4 text-emerald-600" />
                    {q.q}
                  </span>
                  <span className="text-slate-400 transition-transform group-open:rotate-180">▾</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{q.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/10 py-14">
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-600">{t('routePage.otherBadge')}</p>
          <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">{t('routePage.otherTitle')}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {related.map((o) => (
              <Link
                key={o.slug}
                href={`/search/${o.slug}`}
                className="group glass-panel flex items-center gap-4 rounded-2xl p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-slate-200">
                  {o.image ? (
                    <Image
                      src={o.image}
                      alt={o.shortTitle}
                      fill
                      sizes="120px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : null}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 font-mono uppercase">{o.origin.code}</span>
                    <Plane className="h-3 w-3 rotate-45" />
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 font-mono uppercase">{o.dest.code}</span>
                  </div>
                  <div className="mt-1 font-display text-lg font-bold text-slate-900">{o.shortTitle}</div>
                  <div className="text-sm text-slate-600">
                    {t('common.from')} {formatPrice(o.priceFromRub)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
