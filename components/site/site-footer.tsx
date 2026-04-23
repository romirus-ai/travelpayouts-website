import Link from 'next/link'
import { Plane } from 'lucide-react'

export function SiteFooter() {
  const year = 2026
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-10 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-cyan-500 shadow-md">
                <Plane className="h-5 w-5 -rotate-45 text-white" />
              </span>
              <span className="font-display text-lg font-bold tracking-tight text-slate-900">
                Sales<span className="text-sky-600">Travel</span>
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-sm text-slate-600">
              Поиск дешёвых авиабилетов и отелей по всему миру. Сравниваем цены десятков авиакомпаний за несколько секунд.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900">Популярные направления</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link href="/search/iz-moskvy-v-sochi" className="hover:text-sky-700">Москва — Сочи</Link></li>
              <li><Link href="/search/iz-moskvy-v-sankt-peterburg" className="hover:text-sky-700">Москва — Санкт-Петербург</Link></li>
              <li><Link href="/search/iz-moskvy-v-kazan" className="hover:text-sky-700">Москва — Казань</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900">Разделы</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><Link href="/#flights" className="hover:text-sky-700">Поиск авиабилетов</Link></li>
              <li><Link href="/#hotels" className="hover:text-sky-700">Поиск отелей</Link></li>
              <li><Link href="/#esim" className="hover:text-sky-700">eSIM и сим-карты</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start gap-2 border-t border-slate-200 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <div>© {year} Sales Travel. Все права защищены.</div>
          <div>Поиск и бронирование предоставлено партнёрами Aviasales &amp; Hotellook.</div>
        </div>
      </div>
    </footer>
  )
}
