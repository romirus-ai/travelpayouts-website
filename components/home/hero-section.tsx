'use client'

import Image from 'next/image'
import { SearchTabs } from '@/components/search/search-tabs'
import { Sparkles, ShieldCheck, Wallet } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function HeroSection({ heroImage }: { heroImage: string }) {
  const { t } = useTranslation()

  return (
    <section id="flights" className="relative w-full overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {heroImage ? (
          <Image
            src={heroImage}
            alt={t('hero.imageAlt')}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/50 to-white/10" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FFD700]/20 via-[#FFA500]/15 to-[#DAA520]/20 mix-blend-screen" />
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-4 pb-10 pt-14 sm:pt-16 sm:pb-12 md:px-6 md:pb-20 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-white/15 px-3 py-2 text-xs font-medium text-white/90 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> {t('hero.badge')}
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-6xl">
            {t('hero.titlePrefix')} <span className="text-sky-200">{t('hero.titleAccent')}</span> {t('hero.titleSuffix')}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/90 sm:text-base md:text-lg">
            {t('hero.description')}
          </p>
        </div>

        <div className="mx-auto mt-6 max-w-[1060px] sm:mt-8">
          <SearchTabs />
        </div>

        <div className="mx-auto mt-6 grid max-w-3xl grid-cols-1 gap-3 text-sm text-white/90 sm:grid-cols-3">
          <div className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-white/10 px-3 py-2 backdrop-blur">
            <Wallet className="h-4 w-4" /> {t('hero.chips.noFees')}
          </div>
          <div className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-white/10 px-3 py-2 backdrop-blur">
            <ShieldCheck className="h-4 w-4" /> {t('hero.chips.trusted')}
          </div>
          <div className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-white/10 px-3 py-2 backdrop-blur">
            <Sparkles className="h-4 w-4" /> {t('hero.chips.cards')}
          </div>
        </div>
      </div>
    </section>
  )
}
