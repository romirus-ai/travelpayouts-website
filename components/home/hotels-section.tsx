import { HotelSearch } from '@/components/search/hotel-search'
import { BedDouble, Hotel, Percent } from 'lucide-react'

export function HotelsSection() {
  return (
    <section id="hotels" className="bg-gradient-to-b from-emerald-50/60 to-white py-16 md:py-20">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Отели и апартаменты</p>
          <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Проживание на <span className="text-emerald-600">любой</span> вкус и бюджет
          </h2>
          <p className="mt-2 text-sm text-slate-600 md:text-base">
            Сравниваем цены сразу в Booking, Agoda, Ostrovok и других системах бронирования — выбирайте лучшую.
          </p>
        </div>

        <HotelSearch />

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Hotel, title: '2M+ отелей', text: 'От хостелов до 5-звездочных курортов' },
            { icon: Percent, title: 'До -60%', text: 'Экономьте на сравнении цен между системами' },
            { icon: BedDouble, title: 'Без предоплаты', text: 'Бронируйте с возможностью бесплатной отмены' },
          ].map((f, i) => {
            const Icon = f.icon
            return (
              <div
                key={i}
                className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-display font-semibold text-slate-900">{f?.title}</div>
                  <div className="text-sm text-slate-600">{f?.text}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
