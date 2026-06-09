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

export const metadata: Metadata = {
  title: "Sticker Swap Hub",
  description: "Trade and collect FIFA World Cup 2026 stickers",
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
