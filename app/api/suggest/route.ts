import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const q = (req?.nextUrl?.searchParams?.get?.('q') ?? '').trim()
  const localeRaw = (req?.nextUrl?.searchParams?.get?.('locale') ?? 'ru').toLowerCase()
  const locale = localeRaw === 'en' ? 'en' : 'ru'

  if (!q) return NextResponse.json({ items: [] })

  try {
    const url = `https://autocomplete.travelpayouts.com/places2?term=${encodeURIComponent(q)}&locale=${locale}&types[]=city`
    const res = await fetch(url, {
      headers: { accept: 'application/json' },
      next: { revalidate: 3600 },
    })

    if (!res?.ok) return NextResponse.json({ items: [] })

    const data = (await res.json()) as any[]
    const items = (data ?? [])
      .filter((x: any) => x?.code)
      .slice(0, 8)
      .map((x: any) => ({
        code: String(x?.code ?? ''),
        name: String(x?.name ?? ''),
        country_name: x?.country_name ? String(x?.country_name) : undefined,
      }))

    return NextResponse.json({ items })
  } catch {
    return NextResponse.json({ items: [] })
  }
}
