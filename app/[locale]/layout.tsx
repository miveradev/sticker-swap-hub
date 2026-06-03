import { NextIntlClientProvider } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import { hasLocale } from "next-intl"
import { notFound, redirect } from "next/navigation"
import { headers } from "next/headers"
import { routing } from "@/i18n/routing"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const h = await headers()
  const pathname = h.get("x-pathname") ?? "/"

  // Guard: authenticated users without a username must complete onboarding.
  // Skip for the onboarding page itself to avoid a redirect loop.
  const isOnboarding = pathname.includes("/onboarding/username")

  if (!isOnboarding) {
    const session = await auth.api.getSession({
      headers: h as unknown as Headers,
    })

    if (session?.user) {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { username: true },
      })

      if (!user?.username) {
        redirect(`/${locale}/onboarding/username`)
      }
    }
  }

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}
