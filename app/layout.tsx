import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { getLocale } from "next-intl/server"
import { Toaster } from "sonner"
import { RouteProgressBar } from "@/components/navigation/RouteProgressBar"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      className={`${inter.variable} ${geistMono.variable} h-full antialiased dark scroll-smooth scroll-pt-24`}
    >
      <body className="min-h-full flex flex-col">
        <RouteProgressBar />
        {children}
        <Toaster position="bottom-center" theme="dark" />
      </body>
    </html>
  )
}
