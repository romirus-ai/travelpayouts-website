import { DM_Sans, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { ChunkLoadErrorHandler } from '@/components/chunk-load-error-handler'
import Script from 'next/script'
import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' })
const jakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-display' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: {
    default: 'Sales Travel — дешёвые авиабилеты и отели',
    template: '%s — Sales Travel',
  },
  description:
    'Сравниваем цены десятков авиакомпаний и систем бронирования. Находите дешёвые авиабилеты и отели за несколько секунд.',
  keywords: ['авиабилеты', 'отели', 'дешёвые билеты', 'поиск авиабилетов', 'Москва Сочи', 'Москва СПб', 'Москва Казань'],
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Sales Travel',
    title: 'Sales Travel — дешёвые авиабилеты и отели',
    description:
      'Сравниваем цены десятков авиакомпаний и систем бронирования. Русский интерфейс, цены в рублях.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
}

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? ''
const YM_ID = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID ?? ''

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js" async />
      </head>
      <body className={`${dmSans.variable} ${jakartaSans.variable} ${jetbrainsMono.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
          <Toaster />
          <ChunkLoadErrorHandler />
        </ThemeProvider>

        {GA_ID ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GA_ID}', { anonymize_ip: true });`}
            </Script>
          </>
        ) : null}

        {YM_ID ? (
          <Script id="ym-init" strategy="afterInteractive">
            {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');ym(${YM_ID},'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true});`}
          </Script>
        ) : null}
      </body>
    </html>
  )
}
