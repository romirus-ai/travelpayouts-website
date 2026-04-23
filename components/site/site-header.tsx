'use client'

import Link from 'next/link'
import { Plane } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/#flights', label: 'Авиабилеты' },
  { href: '/#hotels', label: 'Отели' },
  { href: '/#destinations', label: 'Направления' },
  { href: '/#esim', label: 'eSIM' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled((window?.scrollY ?? 0) > 8)
    onScroll()
    window?.addEventListener?.('scroll', onScroll, { passive: true })
    return () => window?.removeEventListener?.('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all',
        scrolled ? 'backdrop-blur-md bg-white/75 shadow-sm' : 'bg-white/40 backdrop-blur-sm'
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-cyan-500 shadow-md shadow-sky-500/30 transition-transform group-hover:scale-105">
            <Plane className="h-5 w-5 -rotate-45 text-white" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-slate-900">
            Sales<span className="text-sky-600">Travel</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item?.href}
              href={item?.href ?? '#'}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-sky-50 hover:text-sky-700"
            >
              {item?.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#flights"
          className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-slate-800 hover:shadow-lg"
        >
          <Plane className="h-3.5 w-3.5 -rotate-45" /> Найти билет
        </Link>
      </div>
    </header>
  )
}
