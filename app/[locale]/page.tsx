import { headers } from "next/headers"
import { setRequestLocale } from "next-intl/server"
import { Header } from "@/components/landing/Header"
import { Hero } from "@/components/landing/Hero"
import { Features } from "@/components/landing/Features"
import { Stats } from "@/components/landing/Stats"
import { Cta } from "@/components/landing/Cta"
import { Footer } from "@/components/landing/Footer"
import { auth } from "@/lib/auth"

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const h = await headers()
  const session = await auth.api.getSession({ headers: h as unknown as Headers })

  const viewer = session?.user
    ? {
        name: session.user.name,
        email: ((session.user as Record<string, unknown>).email as string) ?? "",
        image: ((session.user as Record<string, unknown>).image as string | null) ?? null,
        username: ((session.user as Record<string, unknown>).username as string | null) ?? null,
      }
    : null

  return (
    <>
      <Header initialViewer={viewer} />
      <main className="pt-[120px] pb-16 flex flex-col gap-[120px]">
        <Hero />
        <Features />
        <Stats />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
