export const COOKIE_CONSENT_STORAGE_KEY = 'salestravel.cookie-consent.v1'
export const COOKIE_SETTINGS_EVENT = 'salestravel:open-cookie-settings'

export type CookieConsent = {
  necessary: true
  analytics: boolean
  marketing: boolean
  consentGivenAt: string
}

export const DEFAULT_COOKIE_PREFERENCES = {
  analytics: false,
  marketing: false,
}

export function createCookieConsent(preferences: {
  analytics: boolean
  marketing: boolean
}): CookieConsent {
  return {
    necessary: true,
    analytics: preferences.analytics,
    marketing: preferences.marketing,
    consentGivenAt: new Date().toISOString(),
  }
}
