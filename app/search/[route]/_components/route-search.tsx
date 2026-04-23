'use client'

import { useState } from 'react'
import { Plane, BedDouble } from 'lucide-react'
import { FlightSearch } from '@/components/search/flight-search'
import { HotelSearch } from '@/components/search/hotel-search'
import { cn } from '@/lib/utils'
import type { CityValue } from '@/components/search/city-autocomplete'
import { useTranslation } from 'react-i18next'

interface Props {
  defaultOrigin: CityValue
  defaultDestination: CityValue
}

export function RouteSearch({ defaultOrigin, defaultDestination }: Props) {
  const [tab, setTab] = useState<'flights' | 'hotels'>('flights')
  const { t } = useTranslation()

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setTab('flights')}
          className={cn(
            'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition',
            tab === 'flights' ? 'bg-white text-sky-700 shadow-md' : 'bg-white/20 text-white hover:bg-white/30'
          )}
        >
          <Plane className="h-4 w-4 -rotate-45" /> {t('search.tabs.flights')}
        </button>
        <button
          type="button"
          onClick={() => setTab('hotels')}
          className={cn(
            'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition',
            tab === 'hotels' ? 'bg-white text-emerald-700 shadow-md' : 'bg-white/20 text-white hover:bg-white/30'
          )}
        >
          <BedDouble className="h-4 w-4" /> {t('search.tabs.hotels')}
        </button>
      </div>

      {tab === 'flights' ? (
        <FlightSearch defaultOrigin={defaultOrigin} defaultDestination={defaultDestination} />
      ) : (
        <HotelSearch defaultDestination={defaultDestination} />
      )}
    </div>
  )
}
