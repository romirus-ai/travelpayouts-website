import type { AppCurrency, AppLocale } from '@/lib/i18n'

export const TP_MARKER = process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER ?? process.env.TRAVELPAYOUTS_MARKER ?? ''
export const TP_TOKEN = process.env.TRAVELPAYOUTS_API_TOKEN ?? ''
export const TP_WHITE_LABEL_RESULTS_URL = 'https://avia.sales.travel'

/**
 * Build a search URL on aviasales that Travelpayouts understands.
 * Format: /search/ORIGINddmmDESTINATIONddmmPAX
 */
export function buildAviasalesSearchUrl(params: {
  origin: string
  destination: string
  depart?: string // yyyy-mm-dd
  back?: string // yyyy-mm-dd
  adults?: number
  marker?: string
  locale?: AppLocale
  currency?: AppCurrency
}): string {
  const {
    origin,
    destination,
    depart,
    back,
    adults = 1,
    marker = TP_MARKER,
    locale = 'ru',
    currency = 'RUB',
  } = params

  const dd = (iso?: string) => {
    if (!iso) return ''
    const [y, m, d] = (iso ?? '').split('-')
    if (!y || !m || !d) return ''
    return `${d}${m}`
  }

  const segment = `${origin}${dd(depart)}${destination}${dd(back)}${adults}`
  const url = new URL(`/search/${segment}`, TP_WHITE_LABEL_RESULTS_URL)

  if (marker) url.searchParams.set('marker', marker)
  url.searchParams.set('currency', currency)
  url.searchParams.set('locale', locale)
  url.searchParams.set('resultsURL', TP_WHITE_LABEL_RESULTS_URL)

  return url.toString()
}

export function buildHotellookUrl(params: {
  destination: string
  checkIn?: string
  checkOut?: string
  adults?: number
  marker?: string
  locale?: AppLocale
  currency?: AppCurrency
}): string {
  const {
    destination,
    checkIn,
    checkOut,
    adults = 2,
    marker = TP_MARKER,
    locale = 'ru',
    currency = 'RUB',
  } = params

  const url = new URL('https://search.hotellook.com/')
  url.searchParams.set('destination', destination)
  if (checkIn) url.searchParams.set('checkIn', checkIn)
  if (checkOut) url.searchParams.set('checkOut', checkOut)
  url.searchParams.set('adults', String(adults ?? 2))
  url.searchParams.set('language', locale)
  url.searchParams.set('currency', currency)
  if (marker) url.searchParams.set('marker', marker)
  return url.toString()
}

export type CitySuggestion = {
  code: string
  name: string
  country_name?: string
  iata?: string[]
}

export async function suggestCities(query: string, locale: AppLocale = 'ru'): Promise<CitySuggestion[]> {
  if (!query || query.trim().length < 1) return []
  try {
    const url = `https://autocomplete.travelpayouts.com/places2?term=${encodeURIComponent(query)}&locale=${locale}&types[]=city`
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    const data = (await res.json()) as any[]
    return (data ?? [])
      .filter((x: any) => x?.code)
      .map((x: any) => ({
        code: String(x?.code ?? ''),
        name: String(x?.name ?? ''),
        country_name: x?.country_name ? String(x?.country_name) : undefined,
      }))
  } catch {
    return []
  }
}
