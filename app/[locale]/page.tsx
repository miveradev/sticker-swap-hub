import { setRequestLocale } from "next-intl/server"
import { Header } from "@/components/landing/Header"
import { Hero } from "@/components/landing/Hero"
import { Features } from "@/components/landing/Features"
import { Stats } from "@/components/landing/Stats"
import { Footer } from "@/components/landing/Footer"
import { Button } from "@/components/ui/button"

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
        <section className="max-w-3xl mx-auto px-8 flex flex-col items-center text-center gap-6">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Designed for collectors.
          </h2>
          <p className="text-base text-muted-foreground">
            Sticker Swap Hub focuses on one thing: making collection management and trading
            preparation as simple as possible.
          </p>
          <Button size="lg" className="mt-4">
            Start Tracking Your Collection
          </Button>
        </section>
      </main>
      <Footer />
    </>
  )
}
