import type { MetadataRoute } from 'next'
import { headers } from 'next/headers'

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

export default function robots(): MetadataRoute.Robots {
  const base = baseUrl()
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${base}/sitemap.xml`,
  }
}
