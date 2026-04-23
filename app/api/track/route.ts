import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as {
      kind?: string
      origin?: string
      destination?: string
      query?: string
      depart?: string
      return?: string
    }
    const kind = body?.kind === 'hotel' ? 'hotel' : 'flight'
    await prisma.searchEvent.create({
      data: {
        kind,
        origin: body?.origin ?? null,
        destination: body?.destination ?? null,
        query: body?.query ?? null,
        depart: body?.depart ?? null,
        return: body?.return ?? null,
        marker: process.env.TRAVELPAYOUTS_MARKER ?? null,
        referer: req.headers.get('referer') ?? null,
      },
    })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 })
  }
}
