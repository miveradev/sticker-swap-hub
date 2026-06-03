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
    <section className="max-w-3xl mx-auto px-8 flex flex-col items-center text-center gap-6">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">{t("title")}</h2>
      <p className="text-base text-muted-foreground">{t("subtitle")}</p>
      <Button size="lg" className="mt-4" onClick={handleStartTracking}>
        {t("button")}
      </Button>
    </section>
  )
}
