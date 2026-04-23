import { DM_Sans, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { ChunkLoadErrorHandler } from '@/components/chunk-load-error-handler'
import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { CookieConsent } from '@/components/site/cookie-consent'
import { LocalizationProvider } from '@/components/providers/localization-provider'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' })
const jakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-display' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: {
    default: 'Sales Travel — flights and hotels',
    template: '%s — Sales Travel',
  },
  description: 'Compare flights and hotels from dozens of providers in one place.',
  keywords: ['авиабилеты', 'flights', 'hotels', 'travel', 'travelpayouts'],
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Sales Travel',
    title: 'Sales Travel — flights and hotels',
    description: 'Compare flights and hotels in Russian and English with RUB/USD support.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js" async />
        <script
          {...({
            nowprocket: '',
            'data-noptimize': '1',
            'data-cfasync': 'false',
            'data-wpfc-render': 'false',
            'seraph-accel-crit': '1',
            'data-no-defer': '1',
          } as any)}
          dangerouslySetInnerHTML={{
            __html: `(function () {
              var script = document.createElement("script");
              script.async = 1;
              script.src = "https://tp-em.com/MTM5MzMz.js?t=139333";
              document.head.appendChild(script);
            })();`,
          }}
        />
      </head>
      <body className={`${dmSans.variable} ${jakartaSans.variable} ${jetbrainsMono.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <LocalizationProvider>
            <div className="flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex-1">{children}</div>
              <SiteFooter />
            </div>
            <CookieConsent />
            <Toaster />
            <ChunkLoadErrorHandler />
          </LocalizationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
