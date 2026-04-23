import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as { path?: string; route?: string }
    if (!body?.path) return NextResponse.json({ ok: false })
    await prisma.pageView.create({
      data: {
        path: body?.path ?? '/',
        route: body?.route ?? null,
        referer: req.headers.get('referer') ?? null,
      },
    })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 })
  }
}
