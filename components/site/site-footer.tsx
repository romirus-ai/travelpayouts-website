'use client'

import Link from 'next/link'
import { Plane, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLocalization } from '@/components/providers/localization-provider'
import { getDestinations } from '@/lib/destinations'
import { COOKIE_SETTINGS_EVENT } from '@/lib/cookie-consent'

export function SiteFooter() {
  const year = 2026
  const { t } = useTranslation()
  const { locale } = useLocalization()
  const popular = getDestinations(locale).slice(0, 3)

  const openCookieSettings = () => {
    window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))
  }

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
            <p className="mt-3 max-w-sm text-sm text-slate-600">{t('footer.description')}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900">{t('footer.popular')}</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {popular.map((d) => (
                <li key={d.slug}>
                  <Link href={`/search/${d.slug}`} className="hover:text-sky-700">
                    {d.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900">{t('footer.sections')}</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/#flights" className="hover:text-sky-700">
                  {t('footer.sectionsLinks.flights')}
                </Link>
              </li>
              <li>
                <Link href="/#hotels" className="hover:text-sky-700">
                  {t('footer.sectionsLinks.hotels')}
                </Link>
              </li>
              <li>
                <Link href="/#esim" className="hover:text-sky-700">
                  {t('footer.sectionsLinks.esim')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
            <div>
              © {year} Sales Travel. {t('common.allRightsReserved')}
            </div>
            <button
              type="button"
              onClick={openCookieSettings}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              {t('footer.cookieSettings')}
            </button>
          </div>
          <div>{t('footer.partners')}</div>
        </div>
      </div>
    </footer>
  )
}
