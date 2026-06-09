import { headers } from "next/headers"
import { setRequestLocale, getTranslations } from "next-intl/server"
import { Header } from "@/components/landing/Header"
import { Footer } from "@/components/landing/Footer"
import { auth } from "@/lib/auth"

export default async function TermsPage({
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

  const t = await getTranslations("termsPage")

  const sectionKeys = [
    "service",
    "account",
    "userContent",
    "conduct",
    "disclaimer",
    "liability",
    "changes",
    "contact",
  ] as const

  return (
    <>
      <Header initialViewer={viewer} />
      <main className="pt-16 min-h-screen">
        <div className="max-w-3xl mx-auto px-8 py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-foreground">
              {t("title")}
            </h1>
            <p className="font-mono text-xs text-muted-foreground">{t("lastUpdated")}</p>
            <p className="text-base text-muted-foreground leading-relaxed">{t("intro")}</p>
          </div>

          <div className="flex flex-col gap-8">
            {sectionKeys.map((key) => (
              <section key={key} className="bg-card border border-border rounded p-6 flex flex-col gap-3">
                <h2 className="font-display text-lg font-bold text-foreground">
                  {t(`sections.${key}.title`)}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`sections.${key}.body`)}
                </p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
