import type { MetadataRoute } from 'next'
import { headers } from 'next/headers'
import { DESTINATIONS } from '@/lib/destinations'

export const dynamic = 'force-dynamic'

function baseUrl(): string {
  try {
    const h = headers()
    const host = h.get('x-forwarded-host') ?? h.get('host') ?? ''
    const proto = h.get('x-forwarded-proto') ?? 'https'
    if (host) return `${proto}://${host}`
  } catch {}
  return process.env.NEXTAUTH_URL ?? 'https://sales-travel.ru'
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = baseUrl()
  const now = new Date()
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: 'daily', priority: 1 },
    ...DESTINATIONS.map((d) => ({
      url: `${base}/search/${d?.slug}`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    })),
  ]
}
