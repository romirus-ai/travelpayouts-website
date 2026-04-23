import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { DESTINATIONS, getDestination } from '@/lib/destinations'
import { RoutePageClient } from './_components/route-page-client'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return DESTINATIONS.map((d) => ({ route: d.slug }))
}

export function generateMetadata({ params }: { params: { route: string } }): Metadata {
  const d = getDestination(params.route)
  if (!d) return { title: 'Route not found' }

  const title = `${d.title} — from ${d.priceFromRub.toLocaleString('ru-RU')} ₽`
  const description = d.lead

  return {
    title,
    description,
    alternates: { canonical: `/search/${d.slug}` },
    openGraph: {
      title,
      description,
      type: 'website',
      images: d.image ? [{ url: d.image }] : undefined,
    },
  }
}

export default function RoutePage({ params }: { params: { route: string } }) {
  const d = getDestination(params.route)
  if (!d) return notFound()

  return <RoutePageClient route={params.route} />
}
