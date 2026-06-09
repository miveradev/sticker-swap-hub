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
      <div className="max-w-3xl flex flex-col gap-5">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/25 rounded px-4 py-1.5 mx-auto">
          <span className="font-mono text-[10px] font-semibold tracking-[0.15em] uppercase text-primary">
            FIFA World Cup 2026
          </span>
        </div>
        <h1 className="font-display text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
          {t("title")}
        </h1>
        <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          {t("subtitle")}
        </p>
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
