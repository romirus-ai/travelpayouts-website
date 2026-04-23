import { Gauge, CreditCard, Globe2, Headphones } from 'lucide-react'

const FEATURES = [
  { icon: Gauge, title: 'Поиск за 5 секунд', text: 'Опрашиваем 100+ источников одновременно и показываем лучшие варианты.' },
  { icon: CreditCard, title: 'Рубли и российские карты', text: 'Оплачивайте картами МИР, Visa, Mastercard и другими способами.' },
  { icon: Globe2, title: 'Мир на ладони', text: 'Билеты в любые страны — от Бали до Исландии.' },
  { icon: Headphones, title: 'Поддержка 24/7', text: 'Партнёры помогут с возвратом, обменом и вопросами по бронированию.' },
]

export function FeaturesSection() {
  return (
    <section className="bg-white py-14 md:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-600">Почему мы</p>
          <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Удобно, прозрачно, <span className="text-sky-600">выгодно</span>
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES?.map?.((f, i) => {
            const Icon = f?.icon
            return (
              <div
                key={i}
                className="rounded-2xl bg-slate-50 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-50 hover:shadow-md"
              >
                <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-sky-600 shadow-sm">
                  {Icon ? <Icon className="h-5 w-5" /> : null}
                </span>
                <div className="font-display text-lg font-bold text-slate-900">{f?.title}</div>
                <p className="mt-1 text-sm text-slate-600">{f?.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
