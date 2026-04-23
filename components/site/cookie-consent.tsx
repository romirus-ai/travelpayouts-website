'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { ShieldCheck, Settings2, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import {
  COOKIE_CONSENT_STORAGE_KEY,
  COOKIE_SETTINGS_EVENT,
  DEFAULT_COOKIE_PREFERENCES,
  createCookieConsent,
  type CookieConsent,
} from '@/lib/cookie-consent'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    ym?: (...args: unknown[]) => void
    [key: string]: unknown
  }
}

type PreferencesState = {
  analytics: boolean
  marketing: boolean
}

const GA_SCRIPT_ID = 'ga-consent-script'
const GA_INLINE_SCRIPT_ID = 'ga-consent-inline'
const YM_INLINE_SCRIPT_ID = 'ym-consent-inline'

function removeScriptById(id: string) {
  const script = document.getElementById(id)
  if (script) {
    script.remove()
  }
}

function disableGoogleAnalytics(gaId: string) {
  if (!gaId) return

  removeScriptById(GA_SCRIPT_ID)
  removeScriptById(GA_INLINE_SCRIPT_ID)
  window[`ga-disable-${gaId}`] = true
}

function enableGoogleAnalytics(gaId: string) {
  if (!gaId) return

  window[`ga-disable-${gaId}`] = false

  if (!document.getElementById(GA_SCRIPT_ID)) {
    const script = document.createElement('script')
    script.id = GA_SCRIPT_ID
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    document.head.appendChild(script)
  }

  if (!document.getElementById(GA_INLINE_SCRIPT_ID)) {
    const inlineScript = document.createElement('script')
    inlineScript.id = GA_INLINE_SCRIPT_ID
    inlineScript.text = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', '${gaId}', { anonymize_ip: true });
    `
    document.head.appendChild(inlineScript)
  }
}

function disableYandexMetrika(ymId: string) {
  if (!ymId) return

  removeScriptById(YM_INLINE_SCRIPT_ID)

  const yandexScripts = document.querySelectorAll('script[src="https://mc.yandex.ru/metrika/tag.js"]')
  yandexScripts.forEach((script) => script.remove())

  window[`ym-disable-${ymId}`] = true
}

function enableYandexMetrika(ymId: string) {
  if (!ymId) return

  window[`ym-disable-${ymId}`] = false

  if (!document.getElementById(YM_INLINE_SCRIPT_ID)) {
    const inlineScript = document.createElement('script')
    inlineScript.id = YM_INLINE_SCRIPT_ID
    inlineScript.text = `
      (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {
          if (document.scripts[j].src === r) {
            return;
          }
        }
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
      })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
      ym(${ymId}, 'init', { clickmap: true, trackLinks: true, accurateTrackBounce: true });
    `
    document.head.appendChild(inlineScript)
  }
}

export function CookieConsent() {
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)
  const [savedConsent, setSavedConsent] = useState<CookieConsent | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [preferences, setPreferences] = useState<PreferencesState>(DEFAULT_COOKIE_PREFERENCES)

  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? ''
  const ymId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID ?? ''

  useEffect(() => {
    setMounted(true)

    const rawConsent = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)
    if (rawConsent) {
      try {
        const parsed = JSON.parse(rawConsent) as CookieConsent
        setSavedConsent(parsed)
        setPreferences({ analytics: parsed.analytics, marketing: parsed.marketing })
      } catch {
        window.localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY)
      }
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleOpenSettings = () => {
      setPreferences({
        analytics: savedConsent?.analytics ?? DEFAULT_COOKIE_PREFERENCES.analytics,
        marketing: savedConsent?.marketing ?? DEFAULT_COOKIE_PREFERENCES.marketing,
      })
      setIsModalOpen(true)
    }

    window.addEventListener(COOKIE_SETTINGS_EVENT, handleOpenSettings)
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, handleOpenSettings)
  }, [mounted, savedConsent])

  useEffect(() => {
    if (!mounted) return

    if (savedConsent?.analytics) {
      enableGoogleAnalytics(gaId)
    } else {
      disableGoogleAnalytics(gaId)
    }

    if (savedConsent?.marketing) {
      enableYandexMetrika(ymId)
    } else {
      disableYandexMetrika(ymId)
    }
  }, [mounted, savedConsent, gaId, ymId])

  const hasDecision = useMemo(() => Boolean(savedConsent), [savedConsent])
  const isBannerVisible = mounted && !hasDecision

  const persistConsent = useCallback((nextPreferences: PreferencesState) => {
    const consent = createCookieConsent(nextPreferences)
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(consent))
    setSavedConsent(consent)
    setPreferences(nextPreferences)
    setIsModalOpen(false)
  }, [])

  const acceptAll = () => {
    persistConsent({ analytics: true, marketing: true })
  }

  const rejectOptional = () => {
    persistConsent({ analytics: false, marketing: false })
  }

  const openSettings = () => {
    setPreferences({
      analytics: savedConsent?.analytics ?? DEFAULT_COOKIE_PREFERENCES.analytics,
      marketing: savedConsent?.marketing ?? DEFAULT_COOKIE_PREFERENCES.marketing,
    })
    setIsModalOpen(true)
  }

  if (!mounted) return null

  return (
    <>
      <div
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 px-3 pb-3 transition-all duration-300 sm:px-6 sm:pb-6',
          isBannerVisible
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-8 opacity-0',
        )}
      >
        <div className="mx-auto w-full max-w-4xl rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-900">
                <ShieldCheck className="h-5 w-5 text-sky-600" />
                <p className="text-sm font-semibold sm:text-base">{t('cookieConsent.banner.title')}</p>
              </div>
              <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">{t('cookieConsent.banner.description')}</p>
            </div>

            <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3 lg:w-auto lg:min-w-[420px]">
              <button
                type="button"
                onClick={acceptAll}
                className="min-h-11 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
              >
                {t('cookieConsent.banner.acceptAll')}
              </button>
              <button
                type="button"
                onClick={rejectOptional}
                className="min-h-11 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                {t('cookieConsent.banner.rejectOptional')}
              </button>
              <button
                type="button"
                onClick={openSettings}
                className="min-h-11 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                {t('cookieConsent.banner.settings')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen ? (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-900/45 p-3 sm:items-center sm:p-6">
          <div className="w-full max-w-2xl animate-in rounded-2xl border border-slate-200 bg-white shadow-2xl fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between gap-3 border-b border-slate-200 px-4 py-4 sm:px-5">
              <div>
                <h3 className="text-base font-semibold text-slate-900 md:text-lg">{t('cookieConsent.modal.title')}</h3>
                <p className="mt-1 text-xs text-slate-600 md:text-sm">{t('cookieConsent.modal.description')}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                aria-label={t('cookieConsent.modal.close')}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 px-4 py-4 sm:px-5">
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t('cookieConsent.categories.necessary.title')}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600 md:text-sm">
                      {t('cookieConsent.categories.necessary.description')}
                    </p>
                  </div>
                  <span className="rounded-full bg-slate-200 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-700">
                    {t('cookieConsent.modal.alwaysOn')}
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 px-4 py-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t('cookieConsent.categories.analytics.title')}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600 md:text-sm">
                      {t('cookieConsent.categories.analytics.description')}
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={preferences.analytics}
                    onClick={() => setPreferences((prev) => ({ ...prev, analytics: !prev.analytics }))}
                    className={cn(
                      'relative inline-flex h-7 w-12 shrink-0 rounded-full transition',
                      preferences.analytics ? 'bg-sky-600' : 'bg-slate-300',
                    )}
                  >
                    <span
                      className={cn(
                        'pointer-events-none inline-block h-6 w-6 translate-y-0.5 rounded-full bg-white shadow transition',
                        preferences.analytics ? 'translate-x-5.5' : 'translate-x-0.5',
                      )}
                    />
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 px-4 py-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t('cookieConsent.categories.marketing.title')}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600 md:text-sm">
                      {t('cookieConsent.categories.marketing.description')}
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={preferences.marketing}
                    onClick={() => setPreferences((prev) => ({ ...prev, marketing: !prev.marketing }))}
                    className={cn(
                      'relative inline-flex h-7 w-12 shrink-0 rounded-full transition',
                      preferences.marketing ? 'bg-sky-600' : 'bg-slate-300',
                    )}
                  >
                    <span
                      className={cn(
                        'pointer-events-none inline-block h-6 w-6 translate-y-0.5 rounded-full bg-white shadow transition',
                        preferences.marketing ? 'translate-x-5.5' : 'translate-x-0.5',
                      )}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 border-t border-slate-200 px-4 py-4 sm:flex-row sm:justify-end sm:px-5">
              <button
                type="button"
                onClick={rejectOptional}
                className="min-h-11 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                {t('cookieConsent.modal.rejectOptional')}
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="min-h-11 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                {t('cookieConsent.modal.acceptAll')}
              </button>
              <button
                type="button"
                onClick={() => persistConsent(preferences)}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
              >
                <Settings2 className="h-4 w-4" />
                {t('cookieConsent.modal.save')}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
