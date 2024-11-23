import { type Metadata } from 'next'
import { Toaster } from '@/components/ui/toaster'

import '@/styles/tailwind.css'

import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { RootLayout } from '@/components/ui/RootLayout'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'

export const metadata: Metadata = {
  title: {
    template: '%s -  Agence Digitale Écoresponsable - Tagadart',
    default: 'Tagadart - Agence Digitale Eco Responsable Lausanne',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const monaSans = localFont({
  src: '../../../public/fonts/Mona-Sans.var.woff2',
  variable: '--font-mona-sans',
  display: 'swap',
})

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={`h-full bg-neutral-950 text-base antialiased ${inter.variable} ${monaSans.variable}`}
    >
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-16700186470"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-16700186470');
        `}
        </Script>
      </head>
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider messages={messages}>
          <RootLayout>{children}</RootLayout>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
