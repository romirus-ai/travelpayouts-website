import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const FALLBACK_RATE = 0.011

export async function GET(req: NextRequest) {
  const from = (req.nextUrl.searchParams.get('from') ?? 'RUB').toUpperCase()
  const to = (req.nextUrl.searchParams.get('to') ?? 'USD').toUpperCase()

  try {
    const res = await fetch(`https://open.er-api.com/v6/latest/${encodeURIComponent(from)}`, {
      next: { revalidate: 3600 },
      headers: { accept: 'application/json' },
    })

    if (!res.ok) {
      return NextResponse.json({ rate: FALLBACK_RATE, source: 'fallback' }, { status: 200 })
    }

    const data = (await res.json()) as {
      rates?: Record<string, number>
    }

    const rate = data?.rates?.[to]
    if (!rate || !Number.isFinite(rate)) {
      return NextResponse.json({ rate: FALLBACK_RATE, source: 'fallback' }, { status: 200 })
    }

    return NextResponse.json({ rate, source: 'open.er-api.com' }, { status: 200 })
  } catch {
    return NextResponse.json({ rate: FALLBACK_RATE, source: 'fallback' }, { status: 200 })
  }
}
