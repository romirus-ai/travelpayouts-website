'use client'

import { useState } from 'react'
import { Plane, BedDouble } from 'lucide-react'
import { FlightSearch } from './flight-search'
import { HotelSearch } from './hotel-search'
import { cn } from '@/lib/utils'
import type { CityValue } from './city-autocomplete'
import { useTranslation } from 'react-i18next'

interface Props {
  defaultOrigin?: CityValue | null
  defaultDestination?: CityValue | null
  initialTab?: 'flights' | 'hotels'
}

export function SearchTabs({ defaultOrigin = null, defaultDestination = null, initialTab = 'flights' }: Props) {
  const [tab, setTab] = useState<'flights' | 'hotels'>(initialTab)
  const { t } = useTranslation()

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setTab('flights')}
          className={cn(
            'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition',
            tab === 'flights' ? 'bg-white text-sky-700 shadow-md' : 'bg-white/60 text-slate-700 hover:bg-white/90'
          )}
        >
          <Plane className="h-4 w-4 -rotate-45" /> {t('search.tabs.flights')}
        </button>
        <button
          type="button"
          onClick={() => setTab('hotels')}
          className={cn(
            'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition',
            tab === 'hotels' ? 'bg-white text-emerald-700 shadow-md' : 'bg-white/60 text-slate-700 hover:bg-white/90'
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
