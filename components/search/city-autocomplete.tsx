'use client'

import { useEffect, useRef, useState } from 'react'
import { MapPin, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export type CityValue = { code: string; name: string }

type Suggestion = { code: string; name: string; country_name?: string }

interface Props {
  label: string
  icon?: React.ReactNode
  value: CityValue | null
  onChange: (v: CityValue | null) => void
  placeholder?: string
}

export function CityAutocomplete({ label, icon, value, onChange, placeholder }: Props) {
  const [query, setQuery] = useState(value?.name ?? '')
  const [items, setItems] = useState<Suggestion[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [active, setActive] = useState(0)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setQuery(value?.name ?? '')
  }, [value?.code, value?.name])

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!ref?.current) return
      if (!ref.current.contains(e.target as Node)) setOpen(false)
    }
    document?.addEventListener?.('mousedown', onDocClick)
    return () => document?.removeEventListener?.('mousedown', onDocClick)
  }, [])

  useEffect(() => {
    const q = (query ?? '').trim()
    if (q.length < 1) {
      setItems([])
      return
    }
    let aborted = false
    setLoading(true)
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/suggest?q=${encodeURIComponent(q)}`)
        if (!res?.ok) {
          if (!aborted) setItems([])
          return
        }
        const data = (await res.json()) as { items?: Suggestion[] }
        if (!aborted) setItems(data?.items ?? [])
      } catch {
        if (!aborted) setItems([])
      } finally {
        if (!aborted) setLoading(false)
      }
    }, 180)
    return () => {
      aborted = true
      clearTimeout(t)
    }
  }, [query])

  const pick = (it: Suggestion) => {
    onChange?.({ code: it?.code ?? '', name: it?.name ?? '' })
    setQuery(it?.name ?? '')
    setOpen(false)
  }

  return (
    <div className="relative w-full" ref={ref}>
      <label className="mb-1 block text-xs font-medium text-slate-500">{label}</label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon ?? <MapPin className="h-4 w-4" />}
        </span>
        <input
          type="text"
          className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          placeholder={placeholder ?? 'Город или аэропорт'}
          value={query ?? ''}
          onChange={(e) => {
            setQuery(e?.target?.value ?? '')
            setOpen(true)
            setActive(0)
            if (value?.code) onChange?.(null)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (!open) return
            if (e?.key === 'ArrowDown') {
              e.preventDefault()
              setActive((a) => Math.min((items?.length ?? 1) - 1, a + 1))
            } else if (e?.key === 'ArrowUp') {
              e.preventDefault()
              setActive((a) => Math.max(0, a - 1))
            } else if (e?.key === 'Enter') {
              const it = items?.[active]
              if (it) {
                e.preventDefault()
                pick(it)
              }
            } else if (e?.key === 'Escape') {
              setOpen(false)
            }
          }}
        />
        {loading ? (
          <Loader2 className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-sky-500" />
        ) : null}
      </div>

      {open && (items?.length ?? 0) > 0 ? (
        <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-72 overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
          {items?.map?.((it, idx) => (
            <button
              type="button"
              key={`${it?.code}-${idx}`}
              onMouseEnter={() => setActive(idx)}
              onClick={() => pick(it)}
              className={cn(
                'flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm transition-colors',
                idx === active ? 'bg-sky-50 text-sky-900' : 'text-slate-800 hover:bg-slate-50'
              )}
            >
              <span className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                <span className="font-medium">{it?.name ?? ''}</span>
                {it?.country_name ? (
                  <span className="text-xs text-slate-500">• {it?.country_name}</span>
                ) : null}
              </span>
              <span className="font-mono text-[11px] uppercase text-slate-400">{it?.code}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
