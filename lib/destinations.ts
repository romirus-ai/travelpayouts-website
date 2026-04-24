export type DestinationLocale = 'ru' | 'en'

export type Destination = {
  routeId: 'sea' | 'culture' | 'citybreak' | 'islandGetaway' | 'tropicalEscape' | 'globalMetropolis'
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
  // RU destinations
  MOW: '/images/moscow_red_square.jpg',
  AER: '/images/sochi_black_sea.jpg',
  LED: '/images/saint_petersburg_palace_square.jpg',
  KZN: '/images/kazan_kul_sharif.jpg',
  SVX: '/images/yekaterinburg_city.jpg',
  DPS: '/images/bali-indonesia.png',
  MLE: '/images/maldives.png',
  DXB: '/images/dubai-uae.png',

  // EN destinations
  NYC: '/images/new-york-usa.png',
  LON: '/images/london_big_ben.jpg',
  LAX: '/images/los_angeles_hollywood.jpg',
  CHI: '/images/chicago_skyscrapers.jpg',
  MAN: '/images/manchester_architecture.jpg',
  JTR: '/images/santorini-greece.png',
  TYO: '/images/tokyo-japan.png',
  BKK: '/images/bangkok_temples.jpg',
  CDG: '/images/paris_eiffel_tower.jpg',
  FCO: '/images/rome_colosseum.jpg',

  // Combined route images (kept for compatibility and replaced with new vibrant visuals)
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
    image: img('AER'),
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
    image: img('LED'),
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
    image: img('KZN'),
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
  {
    routeId: 'islandGetaway',
    locale: 'ru',
    slug: 'iz-moskvy-na-bali',
    origin: { code: 'MOW', name: 'Москва', cityCode: 'MOW' },
    dest: { code: 'DPS', name: 'Бали', cityCode: 'DPS' },
    title: 'Авиабилеты Москва — Бали, Индонезия',
    shortTitle: 'Москва → Бали',
    headline: 'Тропический рай, рисовые террасы и океанские закаты',
    lead: 'Подберите удобный перелёт из Москвы на Бали: пляжи Нуса-Дуа, серфинг в Чангу, храмы Улувату и атмосфера островной перезагрузки.',
    image: img('DPS'),
    country: 'Индонезия',
    priceFromRub: 45200,
    flightTime: '~15 ч 30 мин',
    tips: [
      { title: 'Когда лететь', text: 'Сухой сезон на Бали длится с мая по октябрь — это лучшее время для пляжа и активностей.' },
      { title: 'Виза и въезд', text: 'Проверьте актуальные правила въезда заранее: требования могут меняться в зависимости от гражданства.' },
      { title: 'Районы острова', text: 'Убуд подойдёт для природы и йоги, Чангу — для серфинга и кафе, Нуса-Дуа — для комфортного пляжного отдыха.' },
      { title: 'Лайфхак', text: 'На длительных маршрутах часто выгоднее брать перелёт с одной пересадкой и выбирать даты +/- 2 дня.' },
    ],
    faq: [
      { q: 'Сколько лететь из Москвы на Бали?', a: 'Обычно маршрут занимает около 15–18 часов в зависимости от пересадок.' },
      { q: 'Когда билеты дешевле?', a: 'Чаще всего хорошие цены появляются в межсезонье и при бронировании за 1.5–3 месяца.' },
      { q: 'Какой аэропорт на Бали?', a: 'Основной аэропорт — Денпасар Нгурах-Рай (DPS), около 30–60 минут до популярных курортов.' },
    ],
  },
  {
    routeId: 'tropicalEscape',
    locale: 'ru',
    slug: 'iz-moskvy-na-maldivy',
    origin: { code: 'MOW', name: 'Москва', cityCode: 'MOW' },
    dest: { code: 'MLE', name: 'Мальдивы', cityCode: 'MLE' },
    title: 'Авиабилеты Москва — Мальдивы',
    shortTitle: 'Москва → Мальдивы',
    headline: 'Белоснежные пляжи и бирюзовые лагуны Индийского океана',
    lead: 'Сравните авиабилеты из Москвы на Мальдивы и организуйте отпуск мечты: виллы на воде, дайвинг, снорклинг и полный релакс.',
    image: img('MLE'),
    country: 'Мальдивы',
    priceFromRub: 39800,
    flightTime: '~9 ч 10 мин',
    tips: [
      { title: 'Лучший сезон', text: 'Самая комфортная погода обычно с ноября по апрель, когда меньше дождей.' },
      { title: 'Трансфер', text: 'После прилёта в Мале до острова-резорта часто нужен катер или гидросамолёт — учитывайте это в бюджете.' },
      { title: 'Формат отдыха', text: 'Для экономии можно выбрать гостевые острова, а для премиума — приватные резорты с all inclusive.' },
      { title: 'Лайфхак', text: 'Пакет «перелёт + отель» в низкий сезон иногда дешевле, чем бронирование по отдельности.' },
    ],
    faq: [
      { q: 'Сколько длится перелёт Москва — Мальдивы?', a: 'Прямые и стыковочные рейсы обычно занимают от 9 до 12 часов.' },
      { q: 'Когда выгоднее покупать билеты?', a: 'Оптимально смотреть варианты за 6–10 недель до вылета и сравнивать соседние даты.' },
      { q: 'В какой аэропорт прилетать?', a: 'Международный аэропорт Велана (MLE) в Мале — главный авиаузел страны.' },
    ],
  },
  {
    routeId: 'globalMetropolis',
    locale: 'ru',
    slug: 'iz-moskvy-v-dubay',
    origin: { code: 'MOW', name: 'Москва', cityCode: 'MOW' },
    dest: { code: 'DXB', name: 'Дубай', cityCode: 'DXB' },
    title: 'Авиабилеты Москва — Дубай, ОАЭ',
    shortTitle: 'Москва → Дубай',
    headline: 'Небоскрёбы, шопинг и пляжный отдых круглый год',
    lead: 'Найдите выгодные билеты из Москвы в Дубай: Бурдж-Халифа, пустынные сафари, премиальные отели и удобная инфраструктура для отдыха.',
    image: img('DXB'),
    country: 'ОАЭ',
    priceFromRub: 19200,
    flightTime: '~5 ч 20 мин',
    tips: [
      { title: 'Когда лететь', text: 'Лучший период — с ноября по март: мягкая температура и комфорт для экскурсий.' },
      { title: 'Аэропорты', text: 'Большинство рейсов прилетают в Dubai International (DXB), часть лоукостов — в Al Maktoum (DWC).' },
      { title: 'Что посмотреть', text: 'Бурдж-Халифа, Dubai Mall, Марина, Пальма Джумейра, музей будущего и пляжи Джумейры.' },
      { title: 'Лайфхак', text: 'Для экономии на транспорте берите карту Nol и выбирайте отель рядом со станцией метро.' },
    ],
    faq: [
      { q: 'Сколько лететь из Москвы в Дубай?', a: 'Прямой рейс в среднем занимает около 5 часов 20 минут.' },
      { q: 'Сколько стоит билет?', a: 'Вне пиковых дат можно найти варианты от 19 200 ₽ в одну сторону.' },
      { q: 'Нужна ли виза?', a: 'Для разных паспортов действуют разные правила. Проверьте актуальные требования перед поездкой.' },
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
    image: img('LON'),
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
    image: img('LAX'),
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
    image: img('MAN'),
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
  {
    routeId: 'islandGetaway',
    locale: 'en',
    slug: 'london-to-santorini',
    origin: { code: 'LON', name: 'London', cityCode: 'LON' },
    dest: { code: 'JTR', name: 'Santorini', cityCode: 'JTR' },
    title: 'Flights London — Santorini, Greece',
    shortTitle: 'London → Santorini',
    headline: 'Blue domes, caldera sunsets, and Aegean summer vibes',
    lead: 'Book your London to Santorini trip for scenic villages, volcanic beaches, and iconic sunset views in Oia. Compare direct and one-stop fares in minutes.',
    image: img('JTR'),
    country: 'Greece',
    priceFromRub: 18400,
    flightTime: '~4h 00m',
    tips: [
      { title: 'Best season', text: 'Late May to early October is ideal for warm sea temperatures and long daylight hours.' },
      { title: 'Where to stay', text: 'Oia is famous for sunsets, Fira for nightlife, and Imerovigli for quieter caldera views.' },
      { title: 'Airport transfer', text: 'Santorini Airport (JTR) is small and busy in summer—book transfers in advance.' },
      { title: 'Money-saving tip', text: 'Travel in shoulder months (May, June, September) for lower prices and fewer crowds.' },
    ],
    faq: [
      { q: 'How long is a London to Santorini flight?', a: 'Direct flights are typically around 4 hours, while one-stop options take longer.' },
      { q: 'When are fares usually cheapest?', a: 'You can often find better fares in spring and autumn outside peak school-holiday weeks.' },
      { q: 'Which airport serves Santorini?', a: 'Santorini (Thira) National Airport, IATA code JTR.' },
    ],
  },
  {
    routeId: 'tropicalEscape',
    locale: 'en',
    slug: 'singapore-to-tokyo',
    origin: { code: 'SIN', name: 'Singapore', cityCode: 'SIN' },
    dest: { code: 'TYO', name: 'Tokyo', cityCode: 'TYO' },
    title: 'Flights Singapore — Tokyo, Japan',
    shortTitle: 'Singapore → Tokyo',
    headline: 'From tropical city life to neon nights and cherry blossoms',
    lead: 'Compare flights from Singapore to Tokyo and plan your perfect Japan trip: modern districts, historic temples, anime culture, and world-class food.',
    image: img('TYO'),
    country: 'Japan',
    priceFromRub: 23900,
    flightTime: '~7h 05m',
    tips: [
      { title: 'When to go', text: 'Spring (March–April) and autumn (October–November) are top seasons for weather and city walks.' },
      { title: 'Airport choice', text: 'Tokyo has two major airports: Narita (NRT) and Haneda (HND). Compare both for better deals.' },
      { title: 'Transport card', text: 'Get a Suica or PASMO card for easy metro and train travel across Tokyo.' },
      { title: 'Booking trick', text: 'Night departures from Singapore can maximize your first full day in Japan.' },
    ],
    faq: [
      { q: 'How long is the flight from Singapore to Tokyo?', a: 'Most direct flights take roughly 7 hours.' },
      { q: 'What is a good ticket price?', a: 'Competitive one-way deals often start around $260–$340 depending on season.' },
      { q: 'Is Tokyo served by one airport?', a: 'No, flights arrive at either Narita (NRT) or Haneda (HND), depending on airline and schedule.' },
    ],
  },
  {
    routeId: 'globalMetropolis',
    locale: 'en',
    slug: 'los-angeles-to-new-york',
    origin: { code: 'LAX', name: 'Los Angeles', cityCode: 'LAX' },
    dest: { code: 'NYC', name: 'New York', cityCode: 'NYC' },
    title: 'Flights Los Angeles — New York, USA',
    shortTitle: 'Los Angeles → New York',
    headline: 'Coast-to-coast route to the city that never sleeps',
    lead: 'Find the best fares from Los Angeles to New York for business trips, Broadway weekends, and urban getaways. Compare nonstop and flexible options fast.',
    image: img('NYC'),
    country: 'United States',
    priceFromRub: 12800,
    flightTime: '~5h 35m',
    tips: [
      { title: 'Choose your airport', text: 'New York arrivals may be JFK, Newark, or LaGuardia—pick the one closest to your stay.' },
      { title: 'When to fly cheaper', text: 'Mid-week departures are often less expensive than Friday evening flights.' },
      { title: 'Carry-on fares', text: 'Basic fares can exclude checked baggage. Confirm total cost before booking.' },
      { title: 'Time-zone strategy', text: 'Eastbound flights lose time, so morning departures help preserve your evening plans.' },
    ],
    faq: [
      { q: 'How long is a direct LAX to New York flight?', a: 'Typically around 5.5 hours depending on headwinds and destination airport.' },
      { q: 'What fare is considered good on this route?', a: 'A strong one-way deal often starts near $140–$220 outside peak holidays.' },
      { q: 'Which New York airport should I choose?', a: 'JFK is best for many international connections, while LGA can be convenient for Manhattan business trips.' },
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
