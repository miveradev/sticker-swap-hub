"use client"

import { useTranslations, useLocale } from "next-intl"
import { useRouter } from "next/navigation"
import { Button, buttonVariants } from "@/components/ui/button"
import { Comparison } from "./Comparison"
import { authClient } from "@/lib/auth-client"

export function Hero() {
  const t = useTranslations("landing.hero")
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
    <section className="max-w-7xl mx-auto px-8 flex flex-col items-center text-center gap-8">
      <div className="max-w-3xl flex flex-col gap-4">
        <h1 className="text-5xl font-semibold tracking-tight text-foreground">{t("title")}</h1>
        <p className="text-base text-muted-foreground">{t("subtitle")}</p>
      </div>
      <div className="flex gap-4">
        <Button size="lg" onClick={handleStartTracking}>
          {t("ctaPrimary")}
        </Button>
        <a href={`/${locale}/album`} className={buttonVariants({ variant: "outline", size: "lg" })}>
          {t("ctaSecondary")}
        </a>
      </div>
      <Comparison />
    </section>
  )
}
