import fs from 'fs'
import path from 'path'
import { HeroSection } from '@/components/home/hero-section'
import { DestinationsSection } from '@/components/home/destinations-section'
import { HotelsSection } from '@/components/home/hotels-section'
import { EsimSection } from '@/components/home/esim-section'
import { FeaturesSection } from '@/components/home/features-section'

export const dynamic = 'force-static'

function getHeroImage(): string {
  try {
    const p = path.join(process.cwd(), 'public', 'images-manifest.json')
    const raw = fs.readFileSync(p, 'utf-8')
    const m = JSON.parse(raw ?? '{}') as Record<string, string>
    return m?.hero ?? ''
  } catch {
    return ''
  }
}

export default function HomePage() {
  const hero = getHeroImage()

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Sales Travel',
    url: 'https://sales-travel.ru/',
    inLanguage: 'ru-RU',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://avia.sales.travel/search/{search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <HeroSection heroImage={hero} />
      <FeaturesSection />
      <DestinationsSection />
      <HotelsSection />
      <EsimSection />
    </main>
  )
}
