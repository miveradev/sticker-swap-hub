"use client"

import { useTranslations, useLocale } from "next-intl"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

export function Cta() {
  const t = useTranslations("landing.cta")
  const locale = useLocale()
  const router = useRouter()

  async function handleStartTracking() {
    const { data } = await authClient.getSession()
    if (data?.user) {
      router.push(`/${locale}/onboarding/username`)
      return
    }
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `/${locale}/onboarding/username`,
    })
  }

  return (
    <section className="max-w-7xl mx-auto px-8 w-full">
      <div className="bg-card border border-primary/20 rounded p-12 flex flex-col items-center text-center gap-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="relative flex flex-col gap-4 max-w-xl">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground">{t("title")}</h2>
          <p className="text-base text-muted-foreground leading-relaxed">{t("subtitle")}</p>
        </div>
        <Button size="lg" className="relative" onClick={handleStartTracking}>
          {t("button")}
        </Button>
      </div>
    </section>
  )
}
