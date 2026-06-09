import type { Metadata } from "next"
import { Anybody, Hanken_Grotesk, JetBrains_Mono } from "next/font/google"
import { getLocale } from "next-intl/server"
import { Toaster } from "sonner"
import { RouteProgressBar } from "@/components/navigation/RouteProgressBar"
import "./globals.css"

const anybody = Anybody({
  variable: "--font-anybody",
  subsets: ["latin"],
})

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
})

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://stickersawphub.com"

const OG_IMAGE = {
  url: "/sticker_swap_hub_OG.webp",
  width: 1200,
  height: 630,
  alt: "Sticker Swap Hub — Trade FIFA World Cup 2026 stickers instantly",
}

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "Trade stickers instantly | Find & complete your album faster",
    template: "%s | Sticker Swap Hub",
  },
  description:
    "Stop losing time in chats and photos. Instantly find who has the stickers you need and discover the best trades to complete your album faster.",
  openGraph: {
    type: "website",
    siteName: "Sticker Swap Hub",
    title: "Trade stickers instantly | Complete your album faster",
    description:
      "Stop wasting time in chats and photos. Instantly find the stickers you need and discover the best trades.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trade stickers instantly | Complete your album faster",
    description:
      "Find who has the stickers you need in seconds and unlock better trades instantly.",
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()

  return (
    <html
      lang={locale}
      className={`${anybody.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased dark scroll-smooth scroll-pt-24`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <RouteProgressBar />
        {children}
        <Toaster position="bottom-center" theme="dark" richColors />
      </body>
    </html>
  )
}
