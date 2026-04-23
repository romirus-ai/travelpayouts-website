export type DestinationLocale = 'ru' | 'en'

export type Destination = {
  routeId: 'sea' | 'culture' | 'citybreak'
  locale: DestinationLocale
  slug: string
  origin: { code: string; name: string; cityCode: string }
  dest: { code: string; name: string; cityCode: string }
  title: string
  shortTitle: string
  headline: string
  lead: string
  image: string
  country: string
  priceFromRub: number
  flightTime: string
  tips: { title: string; text: string }[]
  faq: { q: string; a: string }[]
}

const IMAGE_MAP: Record<string, string> = {
  // RU routes (current Russian cities)
  sochi:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/%D0%90%D1%8D%D1%80%D0%BE%D1%84%D0%BE%D1%82%D0%BE%D1%81%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA_%D0%97%D0%B8%D0%BC%D0%BD%D0%B5%D0%B3%D0%BE_%D1%82%D0%B5%D0%B0%D1%82%D1%80%D0%B0_02.jpg/330px-%D0%90%D1%8D%D1%80%D0%BE%D1%84%D0%BE%D1%82%D0%BE%D1%81%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA_%D0%97%D0%B8%D0%BC%D0%BD%D0%B5%D0%B3%D0%BE_%D1%82%D0%B5%D0%B0%D1%82%D1%80%D0%B0_02.jpg',
  spb:
    'https://images.unsplash.com/photo-1550482753-428ea8f7c863?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  kazan: 'https://images.pexels.com/photos/8590426/pexels-photo-8590426.jpeg',

  // EN routes (international city pairs)
  nycLon: '/images/route-nyc-lon.jpg',
  lonLax: '/images/route-lon-lax.jpg',
  chiMan: '/images/route-chi-man.jpg',
}

function img(slug: string): string {
  return IMAGE_MAP[slug] ?? ''
}

const DESTINATIONS_RU: Destination[] = [
  {
    routeId: 'sea',
    locale: 'ru',
    slug: 'iz-moskvy-v-sochi',
    origin: { code: 'MOW', name: 'Москва', cityCode: 'MOW' },
    dest: { code: 'AER', name: 'Сочи', cityCode: 'AER' },
    title: 'Авиабилеты Москва — Сочи',
    shortTitle: 'Москва → Сочи',
    headline: 'К морю и пальмам за пару часов',
    lead: 'Сравните цены десятков авиакомпаний и найдите самый дешёвый билет из Москвы в Сочи. Пляжи Чёрного моря, Красная Поляна и мягкий климат круглый год.',
    image: img('sochi'),
    country: 'Россия',
    priceFromRub: 4200,
    flightTime: '~2 ч 25 мин',
    tips: [
      { title: 'Когда лететь', text: 'Самые низкие цены — в ноябре и в начале весны. В высокий сезон (июнь–август) бронируйте билеты за 2–3 месяца.' },
      { title: 'Где жить', text: 'Адлер ближе к аэропорту и Олимпийскому парку, Центральный Сочи — для променадов, Красная Поляна — для гор и спа.' },
      { title: 'Что посмотреть', text: 'Курортный проспект, дендрарий, Красная Поляна, Олимпийский парк, Роза Хутор, Ахштырская пещера.' },
      { title: 'Лайфхак', text: 'Ищите билеты во вторник и среду — в эти дни чаще всего появляются скидки и распродажи.' },
    ],
    faq: [
      { q: 'Сколько лететь из Москвы в Сочи?', a: 'Прямой рейс занимает около 2 часов 25 минут. Самолёты вылетают из Шереметьево, Домодедово и Внуково.' },
      { q: 'Сколько стоит билет Москва — Сочи?', a: 'В низкий сезон можно улететь от 4 200 ₽ в одну сторону. Летом средняя цена — 7 000–12 000 ₽.' },
      { q: 'Нужен ли загранпаспорт?', a: 'Нет, Сочи — внутреннее направление. Достаточно российского паспорта, для детей — свидетельство о рождении.' },
    ],
  },
  {
    routeId: 'culture',
    locale: 'ru',
    slug: 'iz-moskvy-v-sankt-peterburg',
    origin: { code: 'MOW', name: 'Москва', cityCode: 'MOW' },
    dest: { code: 'LED', name: 'Санкт-Петербург', cityCode: 'LED' },
    title: 'Авиабилеты Москва — Санкт-Петербург',
    shortTitle: 'Москва → Санкт-Петербург',
    headline: 'Полтора часа — и вы в культурной столице',
    lead: 'Десятки рейсов в день, удобное время и цены от нескольких авиакомпаний. Эрмитаж, разводные мосты, Петергоф и белые ночи — всё в одном полёте.',
    image: img('spb'),
    country: 'Россия',
    priceFromRub: 3100,
    flightTime: '~1 ч 30 мин',
    tips: [
      { title: 'Когда лететь', text: 'Сезон белых ночей — с конца мая по середину июля. Зимой цены заметно ниже, а город особенно атмосферный.' },
      { title: 'Аэропорт', text: 'Пулково — единственный аэропорт СПб. До центра — 30–40 минут на автобусе №39 и метро.' },
      { title: 'Что посмотреть', text: 'Эрмитаж, Спас на Крови, Петергоф, Царское Село, крыши Петроградки, Новая Голландия.' },
      { title: 'Лайфхак', text: 'Разводка мостов — с конца апреля по ноябрь. Планируйте ночную прогулку по Неве заранее.' },
    ],
    faq: [
      { q: 'Сколько лететь Москва — Санкт-Петербург?', a: 'Около 1 часа 30 минут. Это быстрее, чем на «Сапсане», если учитывать время в аэропорту.' },
      { q: 'Сколько стоит перелёт?', a: 'От 3 100 ₽ в одну сторону при раннем бронировании. Средняя цена — 4 500–6 500 ₽.' },
      { q: 'Лететь или ехать на поезде?', a: 'Самолёт выгоднее по времени «от двери до двери» только при раннем бронировании и багаже ручной клади.' },
    ],
  },
  {
    routeId: 'citybreak',
    locale: 'ru',
    slug: 'iz-moskvy-v-kazan',
    origin: { code: 'MOW', name: 'Москва', cityCode: 'MOW' },
    dest: { code: 'KZN', name: 'Казань', cityCode: 'KZN' },
    title: 'Авиабилеты Москва — Казань',
    shortTitle: 'Москва → Казань',
    headline: 'Третья столица России — за 1 ч 30 мин',
    lead: 'Найдите дешёвые авиабилеты из Москвы в Казань: Кремль с Кул-Шариф, эчпочмаки, набережная Казанки и современный аквапарк — всё в одной поездке.',
    image: img('kazan'),
    country: 'Россия',
    priceFromRub: 3800,
    flightTime: '~1 ч 30 мин',
    tips: [
      { title: 'Когда лететь', text: 'Лучшее время — май–сентябрь. Зимой Казань красива, но морозно. Ловите скидки в феврале и октябре.' },
      { title: 'Где жить', text: 'Центр — улица Баумана и Кремль. Для тишины — район Ново-Савиновский у озера Кабан.' },
      { title: 'Что попробовать', text: 'Эчпочмак, чак-чак, азу по-татарски, талкыш калеве, казанский чай с кыстыбый.' },
      { title: 'Лайфхак', text: 'Купите Kazan City Pass — он даёт скидки на входные билеты в музеи и транспорт.' },
    ],
    faq: [
      { q: 'Сколько лететь из Москвы в Казань?', a: 'Прямой рейс — около 1 часа 30 минут. Вылеты из всех трёх московских аэропортов.' },
      { q: 'Сколько стоит билет?', a: 'От 3 800 ₽ в одну сторону при бронировании за 1–2 месяца.' },
      { q: 'Какой аэропорт в Казани?', a: 'Международный аэропорт Казань (KZN), до центра — 25–30 минут на аэроэкспрессе.' },
    ],
  },
]

const DESTINATIONS_EN: Destination[] = [
  {
    routeId: 'sea',
    locale: 'en',
    slug: 'new-york-to-london',
    origin: { code: 'NYC', name: 'New York', cityCode: 'NYC' },
    dest: { code: 'LON', name: 'London', cityCode: 'LON' },
    title: 'Flights New York — London',
    shortTitle: 'New York → London',
    headline: 'Classic transatlantic route for work and city breaks',
    lead: 'Compare fares from major airlines and book your NYC–London flight in a few clicks. Great for business trips, theatre weekends, and museum-focused getaways.',
    image: img('nycLon'),
    country: 'United Kingdom',
    priceFromRub: 36500,
    flightTime: '~7h 00m',
    tips: [
      { title: 'Best time to book', text: 'The lowest fares usually appear 6–10 weeks before departure. Shoulder months (March, April, October) often give the best value.' },
      { title: 'Airport choice', text: 'Depart from JFK or Newark, and compare arrivals to Heathrow and Gatwick for easier transfers.' },
      { title: 'Save on baggage', text: 'Basic economy fares can look cheap but often exclude checked luggage. Compare the final price before paying.' },
      { title: 'Jet lag tip', text: 'Choose evening flights from NYC and try to sleep on board to adapt to UK time faster.' },
    ],
    faq: [
      { q: 'How long is a direct NYC to London flight?', a: 'Most direct flights take around 7 hours eastbound.' },
      { q: 'What is a good fare for New York to London?', a: 'A competitive round-trip fare usually starts from about $420–$550 in low and shoulder seasons.' },
      { q: 'Do I need a visa for the UK?', a: 'Entry requirements depend on your passport. Always check official UK government guidance before booking.' },
    ],
  },
  {
    routeId: 'culture',
    locale: 'en',
    slug: 'london-to-los-angeles',
    origin: { code: 'LON', name: 'London', cityCode: 'LON' },
    dest: { code: 'LAX', name: 'Los Angeles', cityCode: 'LAX' },
    title: 'Flights London — Los Angeles',
    shortTitle: 'London → Los Angeles',
    headline: 'From rainy mornings to California sunshine',
    lead: 'Find the best London–LAX fares for holidays, film industry trips, or visiting friends. Compare nonstop and one-stop itineraries and book smarter.',
    image: img('lonLax'),
    country: 'United States',
    priceFromRub: 42800,
    flightTime: '~11h 10m',
    tips: [
      { title: 'When to fly', text: 'Late January to March and mid-September to November often have better prices than peak summer dates.' },
      { title: 'Arrival planning', text: 'LAX can be busy at all hours. Pre-book airport transfers or compare FlyAway bus routes in advance.' },
      { title: 'Choose your fare wisely', text: 'Long-haul comfort matters. Sometimes premium economy gives better value than the cheapest economy fare.' },
      { title: 'Booking trick', text: 'Check both Heathrow and Gatwick departures—pricing can differ significantly on the same dates.' },
    ],
    faq: [
      { q: 'How long is London to Los Angeles flight time?', a: 'Direct flights usually take around 11 hours westbound.' },
      { q: 'How much do flights to LAX cost?', a: 'Good deals are often available from around $520 one way or lower during promotions.' },
      { q: 'Is ESTA required for UK travellers to the USA?', a: 'Many travellers need a valid ESTA before boarding. Check the official U.S. travel rules for your nationality.' },
    ],
  },
  {
    routeId: 'citybreak',
    locale: 'en',
    slug: 'chicago-to-manchester',
    origin: { code: 'CHI', name: 'Chicago', cityCode: 'CHI' },
    dest: { code: 'MAN', name: 'Manchester', cityCode: 'MAN' },
    title: 'Flights Chicago — Manchester',
    shortTitle: 'Chicago → Manchester',
    headline: 'Easy gateway to Northern England',
    lead: 'Book your Chicago to Manchester flight for football weekends, university visits, and UK regional travel. Compare routes with quick connections and flexible fares.',
    image: img('chiMan'),
    country: 'United Kingdom',
    priceFromRub: 31600,
    flightTime: '~8h 05m',
    tips: [
      { title: 'Look at nearby dates', text: 'Moving your trip by 1–2 days can significantly reduce airfare on this route.' },
      { title: 'Connection hubs', text: 'Popular one-stop options include Dublin, Reykjavik, and Amsterdam depending on the season.' },
      { title: 'Ground transport', text: 'From Manchester Airport, trains to the city centre are frequent and usually faster than taxis in traffic.' },
      { title: 'Carry-on strategy', text: 'For short stays, a carry-on only fare can save money and speed up your arrival.' },
    ],
    faq: [
      { q: 'Are there direct flights from Chicago to Manchester?', a: 'Direct options can be seasonal. One-stop flights are available year-round.' },
      { q: 'What fare should I expect?', a: 'A solid one-way deal can start around $390–$480 depending on season and baggage rules.' },
      { q: 'Is Manchester a good base for UK travel?', a: 'Yes. It has strong rail links to Liverpool, Leeds, York, and London.' },
    ],
  },
]

export const DESTINATIONS: Destination[] = [...DESTINATIONS_RU, ...DESTINATIONS_EN]

export function getDestinations(locale: DestinationLocale): Destination[] {
  return DESTINATIONS.filter((d) => d.locale === locale)
}

export function getDestination(slug: string): Destination | undefined {
  return DESTINATIONS.find((d) => d.slug === slug)
}

export function getDestinationByRouteId(routeId: Destination['routeId'], locale: DestinationLocale): Destination | undefined {
  return DESTINATIONS.find((d) => d.routeId === routeId && d.locale === locale)
}
