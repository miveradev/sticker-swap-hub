import type { Metadata } from "next"
import { headers } from "next/headers"
import { setRequestLocale } from "next-intl/server"
import { Header } from "@/components/landing/Header"
import { Hero } from "@/components/landing/Hero"
import { PainPoints } from "@/components/landing/PainPoints"
import { Features } from "@/components/landing/Features"
import { ComparisonShowcase } from "@/components/landing/ComparisonShowcase"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { Cta } from "@/components/landing/Cta"
import { Footer } from "@/components/landing/Footer"
import { auth } from "@/lib/auth"

const META: Record<string, { title: string; description: string; ogTitle: string; ogDescription: string; twitterDescription: string }> = {
  en: {
    title: "Sticker Swap Hub | Find sticker trades to complete your album faster",
    description:
      "Stop losing time in chats and photos. Instantly find who has the stickers you need and discover the best trades to complete your album faster.",
    ogTitle: "Sticker Swap Hub | Find sticker trades faster",
    ogDescription:
      "Stop wasting time in chats and photos. Instantly find the stickers you need and discover the best trade opportunities.",
    twitterDescription:
      "Find who has the stickers you need in seconds and discover better trades instantly.",
  },
  es: {
    title: "Sticker Swap Hub | Encuentra intercambios de cromos más rápido",
    description:
      "Deja de perder tiempo en chats y fotos. Encuentra al instante quién tiene los cromos que necesitas y descubre los mejores intercambios para completar tu álbum.",
    ogTitle: "Sticker Swap Hub | Encuentra intercambios de cromos",
    ogDescription:
      "Deja de perder tiempo en chats y fotos. Encuentra los cromos que necesitas y descubre los mejores intercambios.",
    twitterDescription:
      "Descubre en segundos quién tiene los cromos que necesitas y encuentra mejores intercambios al instante.",
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const m = META[locale] ?? META.en

  return {
    title: m.title,
    description: m.description,
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url: `/${locale}`,
    },
    twitter: {
      description: m.twitterDescription,
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        es: "/es",
      },
    },
  }
}

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
      <main className="pt-16 flex flex-col">
        {/* Hero */}
        <section className="py-20 md:py-28">
          <Hero />
        </section>

        {/* Pain points */}
        <PainPoints />

        {/* Features / solution */}
        <section className="py-20 md:py-24">
          <Features />
        </section>

        {/* Comparison showcase */}
        <ComparisonShowcase />

        {/* How it works */}
        <HowItWorks />

        {/* CTA */}
        <section className="py-20 md:py-24">
          <Cta />
        </section>
      </main>
      <Footer />
    </>
  )
}
