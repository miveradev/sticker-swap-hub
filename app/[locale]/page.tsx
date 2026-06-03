import { setRequestLocale } from "next-intl/server"
import { Header } from "@/components/landing/Header"
import { Hero } from "@/components/landing/Hero"
import { Features } from "@/components/landing/Features"
import { Stats } from "@/components/landing/Stats"
import { Cta } from "@/components/landing/Cta"
import { Footer } from "@/components/landing/Footer"

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Header />
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
