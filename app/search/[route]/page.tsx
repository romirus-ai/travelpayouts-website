import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import {
  Plane,
  Clock,
  Wallet,
  MapPin,
  CalendarCheck,
  Info,
  ArrowLeft,
} from 'lucide-react'
import { DESTINATIONS, getDestination } from '@/lib/destinations'
import { RouteSearch } from './_components/route-search'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return DESTINATIONS.map((d) => ({ route: d?.slug }))
}

export function generateMetadata({ params }: { params: { route: string } }): Metadata {
  const d = getDestination(params?.route ?? '')
  if (!d) return { title: 'Направление не найдено' }
  const title = `${d?.title} — от ${(d?.priceFrom ?? 0).toLocaleString('ru-RU')} ₽`
  const description = d?.lead ?? ''
  return {
    title,
    description,
    alternates: { canonical: `/search/${d?.slug}` },
    openGraph: {
      title,
      description,
      type: 'website',
      images: d?.image ? [{ url: d?.image }] : undefined,
    },
  }
}

export default function RoutePage({ params }: { params: { route: string } }) {
  const d = getDestination(params?.route ?? '')
  if (!d) return notFound()

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Flight',
    flightNumber: `${d?.origin?.code}-${d?.dest?.code}`,
    provider: { '@type': 'Organization', name: 'Sales Travel' },
    departureAirport: { '@type': 'Airport', iataCode: d?.origin?.code, name: d?.origin?.name },
    arrivalAirport: { '@type': 'Airport', iataCode: d?.dest?.code, name: d?.dest?.name },
    estimatedFlightDuration: d?.flightTime,
    offers: {
      '@type': 'Offer',
      price: d?.priceFrom,
      priceCurrency: 'RUB',
      availability: 'https://schema.org/InStock',
    },
  }

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: '/' },
      { '@type': 'ListItem', position: 2, name: d?.shortTitle, item: `/search/${d?.slug}` },
    ],
  }

  return (
    <main className="pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 -z-10">
          {d?.image ? (
            <Image
              src={d?.image}
              alt={`${d?.dest?.name} — авиабилеты из ${d?.origin?.name}`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/75 via-slate-900/55 to-slate-50" />
        </div>

        <div className="mx-auto w-full max-w-[1200px] px-4 pb-10 pt-16 md:px-6 md:pb-16 md:pt-24">
          <Link
            href="/"
            className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur transition hover:bg-white/25"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> К поиску
          </Link>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-medium text-white/85">
            <span className="rounded-full bg-white/15 px-2.5 py-0.5 font-mono uppercase backdrop-blur">
              {d?.origin?.code}
            </span>
            <Plane className="h-3 w-3 rotate-45 text-white/85" />
            <span className="rounded-full bg-white/15 px-2.5 py-0.5 font-mono uppercase backdrop-blur">
              {d?.dest?.code}
            </span>
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 backdrop-blur">
              <Clock className="mr-1 inline h-3 w-3" />
              {d?.flightTime}
            </span>
            <span className="rounded-full bg-emerald-500/80 px-2.5 py-0.5 text-white">
              <Wallet className="mr-1 inline h-3 w-3" />
              от {(d?.priceFrom ?? 0).toLocaleString('ru-RU')} ₽
            </span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
            {d?.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/85 md:text-lg">{d?.lead}</p>

          <div className="mt-8">
            <RouteSearch
              defaultOrigin={{ code: d?.origin?.code ?? '', name: d?.origin?.name ?? '' }}
              defaultDestination={{ code: d?.dest?.code ?? '', name: d?.dest?.name ?? '' }}
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: Clock, label: 'Время в пути', value: d?.flightTime ?? '' },
              { icon: Wallet, label: 'Цены от', value: `${(d?.priceFrom ?? 0).toLocaleString('ru-RU')} ₽` },
              { icon: MapPin, label: 'Направление', value: `${d?.origin?.name} → ${d?.dest?.name}` },
            ].map((x, i) => {
              const Icon = x?.icon
              return (
                <div key={i} className="rounded-2xl bg-slate-50 p-5 shadow-sm">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
                    {Icon ? <Icon className="h-4 w-4" /> : null}
                  </span>
                  <div className="mt-2 text-xs uppercase tracking-wide text-slate-500">{x?.label}</div>
                  <div className="font-display text-xl font-bold text-slate-900">{x?.value}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-600">Советы</p>
          <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Как сэкономить на билетах {d?.shortTitle}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {d?.tips?.map?.((t, i) => (
              <div key={i} className="flex items-start gap-3 rounded-2xl bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
                  <Info className="h-4 w-4" />
                </span>
                <div>
                  <div className="font-display text-lg font-bold text-slate-900">{t?.title}</div>
                  <p className="mt-1 text-sm text-slate-700">{t?.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">Частые вопросы</p>
          <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            FAQ: полёт {d?.shortTitle}
          </h2>
          <div className="mt-6 space-y-3">
            {d?.faq?.map?.((q, i) => (
              <details key={i} className="group rounded-2xl bg-slate-50 p-5 shadow-sm transition-all open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                  <span className="flex items-center gap-2 font-display text-base font-semibold text-slate-900">
                    <CalendarCheck className="h-4 w-4 text-emerald-600" />
                    {q?.q}
                  </span>
                  <span className="text-slate-400 transition-transform group-open:rotate-180">▾</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{q?.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-600">Другие направления</p>
          <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Также ищут
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {DESTINATIONS.filter((x) => x?.slug !== d?.slug).map((o) => (
              <Link
                key={o?.slug}
                href={`/search/${o?.slug}`}
                className="group flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-slate-200">
                  {o?.image ? (
                    <Image
                      src={o?.image}
                      alt={o?.shortTitle ?? ''}
                      fill
                      sizes="120px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : null}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 font-mono uppercase">{o?.origin?.code}</span>
                    <Plane className="h-3 w-3 rotate-45" />
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 font-mono uppercase">{o?.dest?.code}</span>
                  </div>
                  <div className="mt-1 font-display text-lg font-bold text-slate-900">{o?.shortTitle}</div>
                  <div className="text-sm text-slate-600">от {(o?.priceFrom ?? 0).toLocaleString('ru-RU')} ₽</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
