export const TP_MARKER = process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER ?? process.env.TRAVELPAYOUTS_MARKER ?? ''
export const TP_TOKEN = process.env.TRAVELPAYOUTS_API_TOKEN ?? ''

/**
 * Build a search URL on aviasales.ru that Travelpayouts understands.
 * Format: /search/ORIGINddmmDESTINATIONddmmPAX
 * Example: /search/MOW2805AER04061 — Moscow→Sochi, 28.05 out, 04.06 back, 1 adult
 */
export function buildAviasalesSearchUrl(params: {
  origin: string
  destination: string
  depart?: string // yyyy-mm-dd
  back?: string   // yyyy-mm-dd
  adults?: number
  marker?: string
}): string {
  const { origin, destination, depart, back, adults = 1, marker = TP_MARKER } = params
  const dd = (iso?: string) => {
    if (!iso) return ''
    const [y, m, d] = (iso ?? '').split('-')
    if (!y || !m || !d) return ''
    return `${d}${m}`
  }
  const segment = `${origin}${dd(depart)}${destination}${dd(back)}${adults}`
  const url = new URL(`https://www.aviasales.ru/search/${segment}`)
  if (marker) url.searchParams.set('marker', marker)
  return url.toString()
}

export function buildHotellookUrl(params: {
  destination: string
  checkIn?: string
  checkOut?: string
  adults?: number
  marker?: string
}): string {
  const { destination, checkIn, checkOut, adults = 2, marker = TP_MARKER } = params
  const url = new URL('https://search.hotellook.com/')
  url.searchParams.set('destination', destination)
  if (checkIn) url.searchParams.set('checkIn', checkIn)
  if (checkOut) url.searchParams.set('checkOut', checkOut)
  url.searchParams.set('adults', String(adults ?? 2))
  if (marker) url.searchParams.set('marker', marker)
  return url.toString()
}

export type CitySuggestion = {
  code: string
  name: string
  country_name?: string
  iata?: string[]
}

export async function suggestCities(query: string): Promise<CitySuggestion[]> {
  if (!query || query.trim().length < 1) return []
  try {
    const url = `https://autocomplete.travelpayouts.com/places2?term=${encodeURIComponent(query)}&locale=ru&types[]=city`
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
